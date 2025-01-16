import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DB } from "..";
import * as schema from "../db/schema";
import * as export_schema from "../db/export-schema";
import type { MatchV5DTOs } from "twisted/dist/models-dto";
import type { InferSelectModel } from "drizzle-orm";

const SQLITE = new Database("export.db");
export const EXPORT_DB = drizzle(SQLITE);
await migrate(EXPORT_DB, { migrationsFolder: "./drizzle-export" });

const games = await DB.select().from(schema.matches);

let i = 0;
for (const g of games) {
    const m = g.match as MatchV5DTOs.MatchDto;

    i += 1;
    if (i % 100 == 0) {
        await Bun.write(Bun.stdout, "#");
    }

    type Match = InferSelectModel<typeof export_schema.matches>;
    const match: Match = {
        ...m.metadata,
        ...m.info,
    };

    if (match) {
        await EXPORT_DB.insert(export_schema.matches).values(match);
    }

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
    }

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
