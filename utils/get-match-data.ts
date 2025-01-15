import { Constants } from "twisted";
import { DB, lAPI } from "..";
import * as schema from "../db/schema";

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

const error_ids = []
const error_timelines = []

for (const match_id of match_ids) {
    if (!existing_match_ids.has(match_id)) {
        await Bun.write(Bun.stdout, "#");
        try {
            await loadMatch(match_id);
        } catch (e) {
            console.log(match_id, e);
            error_ids.push(match_id);
        } 
    }

    if (!existing_timeline_ids.has(match_id)) {
        try {
            await Bun.write(Bun.stdout, "^");
            await loadTimeline(match_id);
        } catch (e) {
            console.log(match_id, e);
            error_timelines.push(match_id);
        } 
    }
}

if (error_ids || error_timelines) {
    console.log("Errors", error_ids, error_timelines)
}