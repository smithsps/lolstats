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

    let i = 0;
    for (const g of games) {
        const m = g.match as MatchV5DTOs.MatchDto;

        i += 1;
        if (i % 100 == 0) {
            await Bun.write(Bun.stdout, "#");
        }

        const last = i == games.length - 1;

        await mapMatch(m, last);
        await mapParticipants(m, last);
        await mapChallenges(m, last);
        await mapTeams(m, last);
        await mapBans(m, last);
    }

    await Bun.write(Bun.stdout, "\n");

    // Get all tracked players and mark them in aggergate.
    for (const p of players) {
        allPlayers[p.puuid] = {
            puuid: p.puuid,
            name: p.name,
            tag: p.tag,
            isTracked: 1,
        };
    }

    await mapPlayers();

    await Bun.write(Bun.stdout, "\n");

    // await writeData();

    await SQLITE.close();

    // const VACUUM = new Database("export.db");
    // await VACUUM.exec("VACUUM");
    // await VACUUM.close();

    console.log("STEP 4: Done, enjoy!");
}

type Match = InferSelectModel<typeof export_schema.matches>;
const matchsAgg: Match[] = [];
async function mapMatch(m: MatchV5DTOs.MatchDto, last: boolean) {
    const match: Match = {
        ...m.metadata,
        ...m.info,
    };

    if (match) {
        matchsAgg.push(match);
    }

    if (matchsAgg.length > 500 || last && matchsAgg.length > 0) {
        await EXPORT_DB.insert(export_schema.matches).values(matchsAgg);
        matchsAgg.length = 0;
    }
}

type Participant = InferSelectModel<typeof export_schema.participants>;
const participantAgg: Participant[] = [];
async function mapParticipants(m: MatchV5DTOs.MatchDto, last: boolean) {
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
        participantAgg.push(...participants);

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

    if (participantAgg.length > 500 || last && participantAgg.length > 0) {
        await EXPORT_DB.insert(export_schema.participants).values(
            participantAgg,
        );
        participantAgg.length = 0;
    }
}

type Challenge = InferSelectModel<typeof export_schema.challenges>;
const challengesAgg: Challenge[] = [];
async function mapChallenges(m: MatchV5DTOs.MatchDto, last: boolean) {
    const challenges: Challenge[] = m.info.participants.filter((p) =>
        p?.challenges
    ).map((
        p,
    ) => ({
        matchId: m.metadata.matchId,
        puuid: p.puuid,
        ...p.challenges,
        assistStreakCount: p.challenges["12AssistStreakCount"],
    }));

    if (challenges.length > 0) {
        challengesAgg.push(...challenges);
    }

    if (challengesAgg.length > 500 || last && challengesAgg.length > 0) {
        await EXPORT_DB.insert(export_schema.challenges).values(challengesAgg);
        challengesAgg.length = 0;
    }
}

type Team = InferSelectModel<typeof export_schema.teams>;
const teamAgg: Team[] = [];
async function mapTeams(m: MatchV5DTOs.MatchDto, last: boolean) {
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
        teamAgg.push(...teams);
    }

    if (teamAgg.length > 500 || last && teamAgg.length > 0) {
        await EXPORT_DB.insert(export_schema.teams).values(teamAgg);
        teamAgg.length = 0;
    }
}

type Ban = InferSelectModel<typeof export_schema.bans>;
const bansAgg: Ban[] = [];
async function mapBans(m: MatchV5DTOs.MatchDto, last: boolean) {
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

    if (bansAgg.length > 500 || last && bansAgg.length > 0) {
        await EXPORT_DB.insert(export_schema.bans).values(bansAgg);
        bansAgg.length = 0;
    }
}

async function mapPlayers() {
    const players = Object.values(allPlayers);
    await batch(
        EXPORT_DB.insert(export_schema.players),
        players,
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
