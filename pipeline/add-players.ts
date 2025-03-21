import { Constants } from "twisted";
import { lAPI, rAPI } from "../api";
import { DB } from "../db";
import * as schema from "../db/schema";

const trackedPlayers = [
    { name: "Sparky", tag: "real", },
    { name: "Smith", tag: "NA1" },
    { name: "Auri", tag: "Foxen", alt: "Rezz"},
    { name: "Rezz", tag: "NA1" },
    { name: "Diogenes The Cat", tag: "NA1" },
    { name: "Sivrag9000", tag: "NA1", alt: "Def Not Sion" },
    { name: "Sun", tag: "0064" },
    { name: "Searing Shadow", tag: "NA1" },
    { name: "Downinthebend", tag: "NA1" },
    { name: "Greebo775", tag: "NA1" },
    { name: "Lupercus", tag: "NA1" },
    { name: "LuckyHarm", tag: "Lucky" },
    { name: "Def Not Sion", tag: "NA1" },
    { name: "LegendaryVamp", tag: "NA1" },
    { name: "xPsyD", tag: "NA2" },
    { name: "Randuin", tag: "NA1", alt: "Rezz" },
    { name: "Tejster", tag: "NA1" },
    { name: "voug", tag: "NA1" },
    { name: "ManakaRei", tag: "smoge" },
    { name: "C9 Vocaloid", tag: "NA1", alt: "voug" },
    { name: "thresh b0t", tag: "NA1", alt: "voug"},
    { name: "fafs", tag: "NA1" },
    { name: "Rinaria", tag: "NA1" },
    { name: "bonebickler", tag: "bone" },
    { name: "SnackDragon", tag: "Cats"},
    { name: "DragonSnack", tag: "Cats", alt: "Rezz"},
    { name: "Dunktropolis", tag: "DUNK"},
    { name: "Shadow Swipe", tag: "NA1"},
    { name: "CowboyKitten", tag: "NA1"},
    { name: "Plato The Potato", tag: "4916", alt: "Diogenes The Cat"},
    { name: "Arie Hon", tag: "NA1", alt: "Rezz"},
    { name: "NTG76", tag: "NA1", alt: "NTG76"}
];

export async function GetPlayerDetails() {
    console.log("STEP 1: Getting player details.")

    const existingPlayers = await DB.select().from(schema.players);
    const playersToGet = trackedPlayers.filter((tp) => !existingPlayers.some((ep) => tp.name == ep.name && tp.tag == ep.tag));

    for (const p of playersToGet) {
        console.log(p)
        const account = (await rAPI.Account.getByRiotId(
            p.name,
            p.tag,
            Constants.RegionGroups.AMERICAS
        )).response;

        const player = (await lAPI.Summoner.getByPUUID(
            account.puuid,
            Constants.Regions.AMERICA_NORTH
        )).response;

        const insertPlayer = {
            summonerId: player.id,
            accountId: player.accountId,
            puuid: player.puuid,
            name: account.gameName,
            tag: account.tagLine,
            alt: p.alt
        };

        const result = await DB.insert(schema.players).values(insertPlayer).onConflictDoUpdate({
            target: schema.players.puuid,
            set: { ...insertPlayer },
        });
        await Bun.write(Bun.stdout, "#");
    }
    await Bun.write(Bun.stdout, "\n");
    console.log("STEP 1: DONE.")
}
