 SELECT
	p2.alt,
	p.team_position,
	avg(t.dragon_kills) - all_avg_dragon_kills,
	avg(t.void_grub_kills) - all_avg_grub_kills,
	avg(t.rift_herald_kills) - all_avg_rift_herald_kills,
	avg(t.atakhan_kills) - all_avg_atakhan_kills,
	avg(t.baron_kills) - all_avg_baron_kills,
	--avg(t.tower_kills) - average.tower_kills,
	count()
FROM matches m
JOIN participants p on p.match_id = m.match_id 
JOIN players p2 on p2.puuid  = p.puuid 
JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
JOIN teams t on t.match_id = m.match_id and t.team_id = p.team_id
LEFT JOIN (
	SELECT
	 	m.queue_id,
		avg(t.baron_kills) / m.game_duration 'all_avg_baron_kills',
		avg(t.champion_kills) / m.game_duration 'all_avg_champion_kills',
		avg(t.dragon_kills) / m.game_duration 'all_avg_dragon_kills',
		avg(t.rift_herald_kills) / m.game_duration 'all_avg_rift_herald_kills',
		avg(t.tower_kills) / m.game_duration 'all_avg_tower_kills',
		avg(t.atakhan_kills) / m.game_duration 'all_avg_atakhan_kills',
		avg(t.void_grub_kills) / m.game_duration 'all_avg_grub_kills',
		count()
	FROM matches m
	--JOIN participants p on p.match_id = m.match_id 
	--JOIN players p2 on p2.puuid  = p.puuid 
	--JOIN challenges c on p.match_id = c.match_id and p.puuid = c.puuid 
	JOIN teams t on t.match_id = m.match_id
	--WHERE p2.is_tracked = 1
	GROUP BY 1
) 'average' on m.queue_id = average.queue_id
WHERE m.queue_id in (440) and p2.is_tracked = 1 --and p2.alt = 'Smith'
GROUP BY 1,2
having count() > 20