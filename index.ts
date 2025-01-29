import { Constants, LolApi, RiotApi } from "twisted";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { GetPlayerDetails } from "./pipeline/add-players";
import { GetNewMatchesAndTimelines as DownloadMissingMatchesAndTimelines } from "./pipeline/get-match-data";
import { GetNewPlayerMatchIds as GetPlayersNewMatchIds } from "./pipeline/get-player-matches";
import { ExportData } from "./pipeline/export-games";
import { GetPlayerRankedStats } from "./pipeline/get-player-ranked-stats";

const SQLITE = new Database("games.db");
export const DB = drizzle(SQLITE);
await migrate(DB, { migrationsFolder: "./drizzle" });

export const rAPI = new RiotApi({ key: Bun.env.RIOT_API, rateLimitRetry: true });
export const lAPI = new LolApi({ key: Bun.env.RIOT_API, rateLimitRetry: true });



await GetPlayerDetails();
await GetPlayersNewMatchIds();
await DownloadMissingMatchesAndTimelines();
await GetPlayerRankedStats();
await ExportData();
