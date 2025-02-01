import { DB } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const matchesToDelete: string[] = ['NA1_4618404475', 'NA1_4618373951']

for (const m of matchesToDelete) {
    const r = await DB.delete(schema.player_matches).where(eq(schema.player_matches.matchId, m))
    console.log(m, r);
}