import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DB } from "..";
import * as schema from "../db/schema";
import * as export_schema from "../db/export-schema";
import type { MatchV5DTOs } from "twisted/dist/models-dto";
import type { InferSelectModel } from "drizzle-orm";

if (await Bun.file("export.db").exists()) {
    await Bun.file("export.db").delete();
}

const SQLITE = new Database("export.db");
const EXPORT_DB = await drizzle(SQLITE);
await migrate(EXPORT_DB, { migrationsFolder: "./drizzle-export" });
// SQLITE.exec("PRAGMA journal_mode = WAL");

type Player = InferSelectModel<typeof export_schema.players>;
const allPlayers: { [id: string]: Player } = {};

export async function ExportData() {
    console.log("STEP 4: Export data to seperate SQLite database.");

    const games = await DB.select().from(schema.matches);
    const players = await DB.select().from(schema.players);

    const allMatches = [];
    const allParticipants = [];
    const allChallenges = [];
    const allTeams = [];
    const allBans = [];

    let i = 0;
    for (const g of games) {
        const m = g.match as MatchV5DTOs.MatchDto;

        i += 1;
        if (i % 100 == 0) {
            await Bun.write(Bun.stdout, "#");
        }

        await mapMatch(m);
        await mapParticipants(m);
        await mapChallenges(m);
        await mapTeams(m);
        await mapBans(m);
        await mapPlayers();
    }
    await Bun.write(Bun.stdout, "\n");

    for (const p of players) {
        allPlayers[p.puuid] = {
            puuid: p.puuid,
            name: p.name,
            tag: p.tag,
            isTracked: 1,
        };
    }

    // await writeData();

    await SQLITE.close();

    // const VACUUM = new Database("export.db");
    // await VACUUM.exec("VACUUM");
    // await VACUUM.close();

    console.log("STEP 4: Done, enjoy!");
}

async function mapMatch(m: MatchV5DTOs.MatchDto) {
    type Match = InferSelectModel<typeof export_schema.matches>;
    const match: Match = {
        ...m.metadata,
        ...m.info,
    };

    if (match) {
        await EXPORT_DB.insert(export_schema.matches).values(match);
    }
}

async function mapBans(m: MatchV5DTOs.MatchDto) {
    type Ban = InferSelectModel<typeof export_schema.bans>;

    let combined_bans: Ban[] = [];
    const t1 = m.info.teams[0];
    if (t1) {
        const bans1: Ban[] = t1.bans.map((b) => ({
            matchId: m.metadata.matchId,
            teamId: t1.teamId,
            championId: b.championId,
            pickTurn: b.pickTurn,
        }));
        combined_bans = combined_bans.concat(bans1);
    }

    const t2 = m.info.teams[1];
    if (t2) {
        const bans2: Ban[] = t2.bans.map((b) => ({
            matchId: m.metadata.matchId,
            teamId: t2.teamId,
            championId: b.championId,
            pickTurn: b.pickTurn,
        }));
        combined_bans = combined_bans.concat(bans2);
    }

    if (combined_bans.length > 0) {
        await EXPORT_DB.insert(export_schema.bans).values(combined_bans);
    }
}

async function mapTeams(m: MatchV5DTOs.MatchDto) {
    type Team = InferSelectModel<typeof export_schema.teams>;
    const teams: Team[] = m.info.teams.map((t) => ({
        matchId: m.metadata.matchId,
        teamId: t.teamId,
        win: t.win ? 1 : 0,
        baronFirst: t.objectives.baron.first ? 1 : 0,
        baronKills: t.objectives.baron.kills,
        championFirst: t.objectives.champion.first ? 1 : 0,
        championKills: t.objectives.champion.kills,
        dragonFirst: t.objectives.dragon.first ? 1 : 0,
        dragonKills: t.objectives.dragon.kills,
        inhibitorFirst: t.objectives.inhibitor.first ? 1 : 0,
        inhibitorKills: t.objectives.inhibitor.kills,
        riftHeraldFirst: t.objectives.riftHerald.first ? 1 : 0,
        riftHeraldKills: t.objectives.riftHerald.kills,
        towerFirst: t.objectives.tower.first ? 1 : 0,
        towerKills: t.objectives.tower.kills,
    }));
    if (teams.length > 0) {
        await EXPORT_DB.insert(export_schema.teams).values(teams);
    }
}

async function mapChallenges(m: MatchV5DTOs.MatchDto) {
    type Challenge = InferSelectModel<typeof export_schema.challenges>;
    const challenges = m.info.participants.filter((p) => p?.challenges).map((
        p,
    ) => ({
        matchId: m.metadata.matchId,
        puuid: p.puuid,
        riotIdName: p.riotIdName ?? "",
        riotIdGameName: p.riotIdGameName ?? "",
        ...p.challenges,
        assistStreakCount: p.challenges["12AssistStreakCount"],
    }));

    if (challenges.length > 0) {
        await EXPORT_DB.insert(export_schema.challenges).values(challenges);
    }
}

async function mapParticipants(m: MatchV5DTOs.MatchDto) {
    type Participant = InferSelectModel<typeof export_schema.participants>;
    const participants: Participant[] = m.info.participants.map((p, i) => ({
        matchId: m.metadata.matchId,
        ...p,
        puuid: p.puuid !== "BOT" ? p.puuid : ("BOT" + i),
        riotIdName: p.riotIdName ?? "",
        riotIdGameName: p.riotIdGameName ?? "",
        eligibleForProgression: p.eligibleForProgression ? 1 : 0,
        firstBloodAssist: p.firstBloodAssist ? 1 : 0,
        firstBloodKill: p.firstBloodKill ? 1 : 0,
        firstTowerAssist: p.firstTowerAssist ? 1 : 0,
        firstTowerKill: p.firstTowerKill ? 1 : 0,
        gameEndedInEarlySurrender: p.gameEndedInEarlySurrender ? 1 : 0,
        gameEndedInSurrender: p.gameEndedInSurrender ? 1 : 0,
        teamEarlySurrendered: p.teamEarlySurrendered ? 1 : 0,
        win: p.win ? 1 : 0,
    }));

    if (participants.length > 0) {
        await EXPORT_DB.insert(export_schema.participants).values(participants);
        participants.forEach((p) => {
            if (p.puuid && p.riotIdGameName && p.riotIdTagline) {
                allPlayers[p.puuid] = {
                    puuid: p.puuid,
                    name: p.riotIdGameName,
                    tag: p.riotIdTagline,
                    isTracked: 0,
                };
            }
        });
    }
}

async function mapPlayers() {
    const players = Object.values(allPlayers);
    await batch(
        EXPORT_DB.insert(export_schema.players),
        allPlayers,
        "P",
        2000,
    );
}

async function batch(
    insert: any,
    values: any[],
    type: string,
    batchSize = 100,
) {
    let i = 0;
    while (i < values.length) {
        await Bun.write(Bun.stdout, type);
        await insert.values(values.slice(i, i + batchSize))
            .onConflictDoNothing();
        i += batchSize;
    }
}

async function writeData() {
    await batch(EXPORT_DB.insert(export_schema.matches), allMatches, "M", 2000);
    await batch(
        EXPORT_DB.insert(export_schema.participants),
        allParticipants,
        "P",
        500,
    );
    await batch(
        EXPORT_DB.insert(export_schema.challenges),
        allChallenges,
        "C",
        500,
    );
    await batch(EXPORT_DB.insert(export_schema.teams), allTeams, "T", 2000);
    await batch(EXPORT_DB.insert(export_schema.bans), allBans, "B", 2000);
}
