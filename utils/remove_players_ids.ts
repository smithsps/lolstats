import { DB } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const playersToDelete: string[] = ['0d88d556-40a8-5f13-93aa-789fe33f2bee', 'd9cb852b-dde2-5dd4-b1d1-917746e8fd4a', '565f57fa-3dca-56e6-b773-969fd784a1c9']

for (const puuid of playersToDelete) {
    const r = await DB.delete(schema.players).where(eq(schema.players.puuid, puuid))
    console.log(puuid, r);
}