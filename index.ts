import { Constants, LolApi, RiotApi } from "twisted";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const SQLITE = new Database("games.db");
export const DB = drizzle(SQLITE);
await migrate(DB, { migrationsFolder: "./drizzle" });

export const rAPI = new RiotApi({ key: Bun.env.RIOT_API });
export const lAPI = new LolApi({ key: Bun.env.RIOT_API });


