import { Constants } from "twisted";
import { lAPI } from "../api";
import { DB } from "../db";
import * as schema from "../db/schema";

export async function GetNewMatchesAndTimelines() {
    console.log("STEP 3: Download new/missing matches.");

    const match_ids = new Set(
        (await DB.selectDistinct({ id: schema.player_matches.matchId }).from(
            schema.player_matches,
        )).map((m) => m.id),
    );
    const existing_match_ids = new Set(
        (await DB.selectDistinct({ id: schema.matches.matchId }).from(
            schema.matches,
        )).map((m) => m.id),
    );
    const existing_timeline_ids = new Set(
        (await DB.selectDistinct({ id: schema.match_timelines.matchId }).from(
            schema.match_timelines,
        )).map((m) => m.id),
    );

    console.log(
        `Found ${
            match_ids.size - existing_match_ids.size
        } matches needed to download...`,
    );

    const error_ids: string[] = [];
    const error_timelines: string[] = [];

    for (const match_id of match_ids) {
        if (!existing_match_ids.has(match_id)) {
            await Bun.write(Bun.stdout, "#");

            let sleep = false;
            await loadMatch(match_id).catch((e) => {
                if (e.status && e.status == 429) {
                    Bun.write(Bun.stdout, "R"); 
                    return Bun.sleep(125 * 1000);
                } else {
                    Bun.write(Bun.stdout, "E");
                    error_ids.push(match_id);
                }
            });
        }

        if (!existing_timeline_ids.has(match_id)) {
            await Bun.write(Bun.stdout, "^");

            let sleep = false;
            await loadTimeline(match_id).catch((e) => {
                if (e.status && e.status == 429) {
                    Bun.write(Bun.stdout, "R");
                    return Bun.sleep(125 * 1000);
                } else {
                    Bun.write(Bun.stdout, "E");
                    error_ids.push(match_id);
                }
            });
        }
    }

    if (error_ids || error_timelines) {
        console.log("\nErrors", error_ids, error_timelines);
    }

    console.log("STEP 3: DONE.");
}

async function loadMatch(match_id: string) {
    const response = await lAPI.MatchV5.get(
        match_id,
        Constants.RegionGroups.AMERICAS,
    );
    const match = response.response;
    await DB.insert(schema.matches).values({ matchId: match_id, match });
}

async function loadTimeline(match_id: string) {
    const response = await lAPI.MatchV5.get(
        match_id,
        Constants.RegionGroups.AMERICAS,
    );
    const timeline = response.response;

    await DB.insert(schema.match_timelines).values({
        matchId: match_id,
        timeline,
    });
}
