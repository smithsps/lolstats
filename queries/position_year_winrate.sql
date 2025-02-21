SELECT
p2.alt,
p.team_position,
STRFTIME('%Y', DATETIME(m.game_creation / 1000, 'unixepoch')) 'year',
ROUND(1.0 * sum(p.kills + p.assists) / sum(p.deaths), 2) 'kda' ,
ROUND(100.00 * sum(p.win) / count(), 2) 'winrate', 
COUNT() 'games'
FROM matches m
JOIN participants p on p.match_id = m.match_id 
JOIN players p2 on p2.puuid  = p.puuid 
JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
JOIN teams t on t.match_id = m.match_id and t.team_id = p.team_id 
WHERE m.queue_id in (440) and p2.is_tracked = 1
GROUP BY 1,2,3
HAVING count() >= 5