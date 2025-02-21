WITH 
all_matches_without_support AS (
	SELECT *
	FROM matches m
	JOIN participants p on p.match_id = m.match_id 
	WHERE team_position != 'UTILITY'
),
all_matches_without_jungle AS (
	SELECT *
	FROM matches m
	JOIN participants p on p.match_id = m.match_id 
	WHERE team_position != 'JUNGLE'
),
tracked_players_in_match AS (
	SELECT m.match_id, COUNT() tracked_players
	FROM matches m
	JOIN participants p on p.match_id = m.match_id
	JOIN players p2 on p2.puuid  = p.puuid 
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
	ROUND(100.0 * SUM(p.win) / COUNT(), 1) 'win %',
	COUNT() 'total_games'
	--SUM(CASE WHEN tpim.tracked_players >= 3 THEN 1 ELSE 0 END) 'valid_games' 
	--COUNT(agws.match_id) 'total_no_support_games',
	--COUNT(agws.match_id) 'total_no_jungle_games'
	FROM matches m
	JOIN participants p on p.match_id = m.match_id 
	JOIN players p2 on p2.puuid  = p.puuid 
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
	"win %",
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
	ROW_NUMBER() OVER (ORDER BY feat_of_control DESC) 'feat_of_control_pos'
from feats