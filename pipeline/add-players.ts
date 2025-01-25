import { Constants } from "twisted";
import { DB, lAPI, rAPI } from "..";
import * as schema from "../db/schema";

const players = [
    { name: "Sparky", tag: "REAL" },
    { name: "Smith", tag: "NA1" },
    { name: "Auri", tag: "FOXEN" },
    { name: "Rezz", tag: "NA1" },
    { name: "Diogenes The Cat", tag: "NA1" },
    { name: "Sivrag9000", tag: "NA1" },
    { name: "Sun", tag: "0064" },
    { name: "Searing Shadow", tag: "NA1" },
    { name: "Downinthebend", tag: "NA1" },
    { name: "Greebo775", tag: "NA1" },
    { name: "Lupercus", tag: "NA1" },
    { name: "LuckyHarm", tag: "LUCKY" },
    { name: "Def Not Sion", tag: "NA1" },
    { name: "LegendaryVamp", tag: "NA1" },
    { name: "xPsyd", tag: "NA2" },
    { name: "Randuin", tag: "NA1" },
    { name: "Tejster", tag: "NA1" },
    { name: "voug", tag: "NA1" },
    { name: "ManakaRei", tag: "smoge" },
    { name: "C9 Vocaloid", tag: "NA1" },
    { name: "thresh b0t", tag: "NA1"},
    { name: "fafs", tag: "NA1" },
    { name: "Rinaria", tag: "NA1" },
    { name: "bonebickler", tag: "bone" },
];

export async function GetPlayerDetails() {
    console.log("STEP 1: Getting player details.")

    for (const p of players) {
        const account = (await rAPI.Account.getByRiotId(
            p.name,
            p.tag,
            Constants.RegionGroups.AMERICAS
        )).response;

        const player = (await lAPI.Summoner.getByPUUID(
            account.puuid,
            Constants.Regions.AMERICA_NORTH
        )).response;

        const result = await DB.insert(schema.players).values({
            summonerId: player.id,
            accountId: player.accountId,
            puuid: player.puuid,
            name: account.gameName,
            tag: account.tagLine,
        }).onConflictDoNothing();
        await Bun.write(Bun.stdout, "#");
    }
    await Bun.write(Bun.stdout, "\n");
    console.log("STEP 1: DONE.")
}
