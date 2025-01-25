import { Constants } from "twisted";
import { DB, lAPI, rAPI } from "..";
import * as schema from "../db/schema";
import { count, eq, type InferSelectModel } from "drizzle-orm";
import type { MatchQueryV5DTO } from "twisted/dist/models-dto/matches/query-v5";

type Player = InferSelectModel<typeof schema.players>;

export async function GetNewPlayerMatchIds() {
    console.log("STEP 2: Get new matches from players.");

    const players = await DB.select().from(schema.players);

    for (const p of players) {
        const lastUpdatedQuery = await DB.select().from(
            schema.player_last_update,
        )
            .where(
                eq(schema.player_last_update.puuid, p.puuid),
            );

        let matches;
        if (lastUpdatedQuery.length === 1) {
            const startTime = lastUpdatedQuery[0].matches_last_updated;
            matches = await getMatchList(p, startTime);
        } else {
            matches = await getMatchList(p);
        }

        const totalStoredMatches = (await DB.select({ count: count() }).from(
            schema.player_matches,
        ).where(eq(schema.player_matches.puuid, p.puuid)))[0].count;

        console.log(
            `For ${p.name}#${p.tag} - Found ${matches.length} new matches / ${totalStoredMatches} stored.`,
        );

        if (matches.length === 0) {
            continue;
        }

        const records = matches.map((m) => ({
            puuid: p.puuid,
            matchId: m,
        }));

        await DB.insert(schema.player_matches).values(records)
            .onConflictDoNothing();

        const updateTime = Math.floor(Date.now() / 1000);

        await DB.insert(schema.player_last_update).values({
            puuid: p.puuid,
            matches_last_updated: updateTime,
        }).onConflictDoUpdate({
            target: schema.player_last_update.puuid,
            set: { matches_last_updated: updateTime },
        });
    }
}

async function getMatchList(p: Player, startTime?: number): Promise<string[]> {
    const BATCH_SIZE = 100;
    let start = 0;

    let options: MatchQueryV5DTO = { start, count: BATCH_SIZE };
    if (startTime) {
        options.startTime = startTime;
    }

    let allMatches: string[] = [];
    let lastCountOfMatches = 0;
    do {
        options.start = start;

        const response = await lAPI.MatchV5.list(
            p.puuid,
            Constants.RegionGroups.AMERICAS,
            options,
        );
        const matches = response.response;

        await Bun.write(Bun.stdout, "#");

        lastCountOfMatches = matches.length;
        start += lastCountOfMatches;

        allMatches = allMatches.concat(matches);
    } while (lastCountOfMatches > 0);

    await Bun.write(Bun.stdout, "!\n");
    return allMatches;
}
