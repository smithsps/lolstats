SELECT
--p.team_position,
--p.champion_name 'champion',
o.champion_name 'opponent',
100.00 * sum(p.win) / count() 'winrate', 
count()
FROM matches m
JOIN participants p on p.match_id = m.match_id 
JOIN players p2 on p2.puuid  = p.puuid 
JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
JOIN teams t on t.match_id = m.match_id and t.team_id = p.team_id 
LEFT JOIN participants o on o.match_id = m.match_id and o.team_position = p.team_position and o.team_id != p.team_id
LEFT JOIN teams ot on ot.match_id = m.match_id and o.team_id = ot.team_id 
WHERE m.queue_id in (440) and p2.alt = 'Diogenes The Cat' and p.team_position = 'UTILITY'-- and p.win = 0
GROUP BY 1
HAVING count() > 3