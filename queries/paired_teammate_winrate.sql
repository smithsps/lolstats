SELECT
p.alt 'player',
other_p.alt 'teammate',
100.00 * sum(pa.win) / count() 'winrate',
count() 'games'
FROM players p
JOIN participants pa on pa.puuid = p.puuid
JOIN matches m on m.match_id = pa.match_id
JOIN participants other_pa on other_pa.match_id = m.match_id and pa.team_id = other_pa.team_id and other_pa.puuid != p.puuid
JOIN players other_p on other_p.puuid = other_pa.puuid
WHERE m.queue_id in (440) and p.is_tracked = 1 and other_p.is_tracked = 1
GROUP BY 1, 2