import { GetPlayerDetails } from "./pipeline/add-players";
import { GetNewMatchesAndTimelines as DownloadMissingMatchesAndTimelines } from "./pipeline/get-match-data";
import { GetNewPlayerMatchIds as GetPlayersNewMatchIds } from "./pipeline/get-player-matches";
import { ExportData } from "./pipeline/export-games";
import { GetPlayerRankedStats } from "./pipeline/get-player-ranked-stats";

await GetPlayerDetails();
await GetPlayersNewMatchIds();
await DownloadMissingMatchesAndTimelines();
await GetPlayerRankedStats();
await ExportData();
