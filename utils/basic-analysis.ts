import { MatchDto, MatchQueryDTO, type MatchV5DTOs } from "twisted/dist/models-dto";
import { DB, lAPI, rAPI } from "..";
import * as schema from "../db/schema";
import { Constants } from "twisted";

const games = await DB.select().from(schema.matches);

const versions = new Set()
const results = new Set()
const modes = new Set()
const maps = new Set()
const types = new Set()

let gamesLastSeason = 0;
for (const g of games) {
    const m = g.match as MatchV5DTOs.MatchDto;

    const patch = m.info.gameVersion.split('.').slice(0, 2).join('.');

    if (!patch) continue;

    versions.add(patch)
    results.add(m.info.endOfGameResult);
    modes.add(m.info.gameMode);
    types.add(m.info.gameType);

    if (m.info.endOfGameResult == "Abort_AntiCheatExit") console.log(m)

    if (patch.startsWith("14.19") || patch.startsWith("14.20") || patch.startsWith("14.21") || patch.startsWith("14.22") || patch.startsWith("14.23")) {
        if (m.info.gameMode == "CLASSIC") {
            gamesLastSeason += 1
        }
        
    }
}

console.log(games.length)
console.log(modes)
console.log(types)
console.log(gamesLastSeason)