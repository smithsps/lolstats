import { DB } from "../db";
import * as schema from "../db/schema";
import * as export_schema from "../db/export-schema";
import { eq, sql } from "drizzle-orm";
import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { matches, participants, players } from "../db/export-schema";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT, OAuth2Client } from "google-auth-library";

const SQLITE = new Database("export.db");
const EXPORT_DB = await drizzle(SQLITE);

const serviceAccountAuth = new JWT({
	email: Bun.env.GOOGLE_EMAIL,
	key: Bun.env.GOOGLE_API,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
	"126nHDmDhRPXBSIx2AfNyeF3s_OCzISbMFIkQy5lrxdU",
	serviceAccountAuth,
);
await doc.loadInfo();

type FeatQueryResults = {
	alt: string;
	wins: number;
	"win%": number;
	total_games: number;
	feat_of_rock: number;
	feat_of_rock_pos: number;
	feat_of_mandate: number;
	feat_of_mandate_pos: number;
	feat_of_sacrifice: number;
	feat_of_sacrifice_pos: number;
	feat_of_sight: number;
	feat_of_sight_pos: number;
	feat_of_tactical: number;
	feat_of_tactical_pos: number;
	feat_of_control: number;
	feat_of_control_pos: number;
	total_no_jungle_games: number;
	total_no_support_games: number;
};

const FEAT_QUERY = sql`
	WITH 
	all_matches_without_support AS (
		SELECT *
		FROM ${matches} m
		JOIN ${participants} p on p.match_id = m.match_id 
		WHERE team_position != 'UTILITY'
	),
	all_matches_without_jungle AS (
		SELECT *
		FROM ${matches} m
		JOIN ${participants} p on p.match_id = m.match_id 
		WHERE team_position != 'JUNGLE'
	),
	tracked_players_in_match AS (
		SELECT m.match_id, COUNT() tracked_players
		FROM ${matches} m
		JOIN ${participants} p on p.match_id = m.match_id
		JOIN ${players} p2 on p2.puuid  = p.puuid 
		WHERE p2.is_tracked
		GROUP BY 1
	),
	feats AS (
		SELECT
		p2.alt,
		IFNULL(ROUND(1.0 * SUM(CASE WHEN p.win == 1 THEN p.deaths ELSE 0 END) / SUM(p.win), 2), 0) 'feat_of_rock',
		ROUND(COALESCE(AVG(p.all_in_pings), 0) + COALESCE(AVG(p.assist_me_pings),0) + COALESCE(AVG(p.bait_pings),0) + COALESCE(AVG(p.danger_pings),0) + COALESCE(AVG(p.get_back_pings),0) + 
			COALESCE(AVG(p.enemy_missing_pings),0) + COALESCE(AVG(p.hold_pings),0) + COALESCE(AVG(p.need_vision_pings),0) + COALESCE(AVG(p.on_my_way_pings),0) + COALESCE(AVG(p.push_pings),0),2) 'feat_of_mandate',
		SUM(CASE WHEN p.team_position = 'BOTTOM' or p.team_position = 'JUNGLE' THEN 1 ELSE 0 END) 'feat_of_sacrifice',
		ROUND(1.0 * SUM(CASE WHEN p.win == 0 THEN agws.total_minions_killed + agws.neutral_minions_killed ELSE 0 END) / (COUNT(agws.match_id) - SUM(agws.win)),2) 'feat_of_tactical',
		ROUND(AVG(agws.vision_score), 2) 'feat_of_sight',
		IFNULL(ROUND(AVG(agwj.damage_dealt_to_objectives - agwj.damage_dealt_to_buildings), 2), 0) 'feat_of_control',
		SUM(p.win) 'wins',
		ROUND(100.0 * SUM(p.win) / COUNT(), 1) 'win%',
		COUNT() 'total_games',
		--SUM(CASE WHEN tpim.tracked_players >= 3 THEN 1 ELSE 0 END) 'valid_games'
		COUNT(agws.match_id) 'total_no_support_games',
		COUNT(agwj.match_id) 'total_no_jungle_games'
		FROM matches m
		JOIN ${participants} p on p.match_id = m.match_id 
		JOIN ${players} p2 on p2.puuid  = p.puuid 
		--JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
		--JOIN teams t on t.match_id = m.match_id and t.team_id = p.team_id
		LEFT JOIN all_matches_without_support agws on agws.match_id = m.match_id and agws.puuid = p2.puuid
		LEFT JOIN all_matches_without_jungle agwj on agwj.match_id = m.match_id and agwj.puuid = p2.puuid
		JOIN tracked_players_in_match tpim on tpim.match_id = m.match_id
		WHERE p2.is_tracked = 1 and m.queue_id in (440) and m.game_creation > 1737766800000 and tpim.tracked_players >= 2
		GROUP BY 1
	)
	SELECT
		alt,
		wins,
		"win%",
		total_games,
		feat_of_rock,
		ROW_NUMBER() OVER (ORDER BY feat_of_rock DESC) 'feat_of_rock_pos',
		feat_of_mandate,
		ROW_NUMBER() OVER (ORDER BY feat_of_mandate DESC) 'feat_of_mandate_pos',
		feat_of_sacrifice,
		ROW_NUMBER() OVER (ORDER BY feat_of_sacrifice DESC) 'feat_of_sacrifice_pos',
		feat_of_sight,
		ROW_NUMBER() OVER (ORDER BY feat_of_sight DESC) 'feat_of_sight_pos',
		feat_of_tactical,
		ROW_NUMBER() OVER (ORDER BY feat_of_tactical DESC) 'feat_of_tactical_pos',
		feat_of_control,
		ROW_NUMBER() OVER (ORDER BY feat_of_control DESC) 'feat_of_control_pos',
		total_no_support_games,
		total_no_jungle_games
	from feats`;

const results = EXPORT_DB.all<FeatQueryResults>(FEAT_QUERY);

const sheet = doc.sheetsById[1732866672];
await sheet.clearRows();
await sheet.setHeaderRow([
	"alt",
	"wins",
	"win%",
	"total_games",
	"feat_of_rock",
	"feat_of_rock_pos",
	"feat_of_mandate",
	"feat_of_mandate_pos",
	"feat_of_sacrifice",
	"feat_of_sacrifice_pos",
	"feat_of_sight",
	"feat_of_sight_pos",
	"feat_of_tactical",
	"feat_of_tactical_pos",
	"feat_of_control",
	"feat_of_control_pos",
	"total_no_support_games",
	"total_no_jungle_games"
]);

await sheet.addRows(results);


type RankedStats = {
	alt: string,
	naem: string,
	tag: string,
	queue_type: string,
	tier: string,
	rank: string,
	wins: number,
	losses: number,
	last_played: number
}

let rankedResults = EXPORT_DB.all<RankedStats>(sql`
	WITH
	last_played_match_time AS (
		SELECT 
			p.puuid,
			MAX(m.game_creation) 'last_played'
		FROM matches m
		JOIN participants p on p.match_id = m.match_id
		GROUP BY 1
	)
	SELECT p.alt, p.name, p.tag, r.queue_type, r.tier, r.rank, r.wins, r.losses, l.last_played
	FROM ranked_stats r
	JOIN players p on p.puuid = r.puuid
	JOIN last_played_match_time l on l.puuid = r.puuid
`);

const romanNumeral = (numeral: string) => {
	switch (numeral) {
		case "I": return 1;
		case "II": return 2;
		case "III": return 3;
		case "IV": return 4;
		default: return 0;
	}
}

// Find the player's best rank across alts per a queue. 
const playerBestRank: { [id: string]: string } = {};
rankedResults.forEach((r) => {
	const key = r.alt + r.queue_type;
	const currTierRank = r.tier[0] + romanNumeral(r.rank)
	if (key in playerBestRank) {
		const TIERS: { [id: string]: number } = {
			'I': 0,
			'B': 1,
			'S': 2,
			'G': 3,
			'P': 4,
			'E': 5,
			'D': 6,
			'M': 7,
			'C': 8
		}
		
		const [bestTier, bestRank] = playerBestRank[key].split('');
		const [currTier, currRank] = currTierRank.split('');

		if (TIERS[currTier] > TIERS[bestTier] || (TIERS[currTier] == TIERS[bestTier] && parseInt(currRank) > parseInt(bestRank))) {
			playerBestRank[key] = currTierRank;
		}
	} else {
		playerBestRank[key] = currTierRank;
	}
});

rankedResults = rankedResults.map((r) => ({
	...r,
	percentage: Math.round(r.wins / (r.wins + r.losses) * 100),
	tier_rank: r.tier[0] + romanNumeral(r.rank),
	player_best_rank: playerBestRank[r.alt + r.queue_type]
}));

const rankedSheet = doc.sheetsById[1228422655];
await rankedSheet.clear();

await rankedSheet.setHeaderRow([
	"alt",
	"name",
	"tag",
	"queue_type",
	"tier",
	"rank",
	"wins",
	"losses",
	"percentage",
	"tier_rank",
	"player_best_rank",
	"last_played"
]);
await rankedSheet.addRows(rankedResults, {raw: true});