import { Constants } from "twisted";
import { DB, lAPI, rAPI } from "..";
import * as schema from "../db/schema";
import { ConsoleLogWriter } from "drizzle-orm";

export async function GetPlayerRankedStats() {
    console.log("STEP 4: Get current ranked stats for tracked players.");

    const players = await DB.select().from(schema.players);

    for (const p of players) {
        try {
            const leagues = (await lAPI.League.bySummoner(
                p.summonerId,
                Constants.Regions.AMERICA_NORTH,
            )).response;

            const savedLeagues = leagues.map((league) => ({
                puuid: p.puuid,
                insertedAt: Date.now(),
                league: league,
            }));

            if (savedLeagues.length > 0) {
                await DB.insert(schema.player_ranked_stats).values(savedLeagues);
            }
        } catch (error) {
            console.log("Missing ranked infor for:", p.name, error);
        }
    }

    console.log("STEP 4: DONE.");
}
