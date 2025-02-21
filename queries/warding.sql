SELECT
p2.alt,
p.team_position,
STRFTIME('%Y', DATETIME(m.game_creation / 1000, 'unixepoch')) 'year',
ROUND(AVG(p.vision_score), 2) 'vision_score',
ROUND(AVG(p.wards_placed), 2) 'wards_placed',
ROUND(AVG(p.wards_killed), 2) 'wards_killed',
ROUND(AVG(p.vision_wards_bought_in_game), 2) 'pink_wards',
COUNT() 'games'
FROM matches m
JOIN participants p on p.match_id = m.match_id 
JOIN players p2 on p2.puuid  = p.puuid 
JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
JOIN teams t on t.match_id = m.match_id and t.team_id = p.team_id 
WHERE m.queue_id in (420, 440) and p2.is_tracked = 1
GROUP BY 1,2,3