import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const SQLITE = new Database("games.db");
export const DB = drizzle(SQLITE);
await migrate(DB, { migrationsFolder: "./drizzle" });
