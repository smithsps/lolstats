
SELECT 
	alt, 
	string_agg(champ, ', '), 
	1.0 * count() / sum(total) 'champs_per_g',
	1.0 / (1.0 * count() / sum(total)) 'games_per_champ',
	count() 'total',
	sum(total) 'games'
FROM 
(
	SELECT
		players.alt,
		participants.champion_name 'champ',
		1.0 * sum(participants.kills + participants.assists) / sum(participants.deaths) 'kda',
		100.00 * sum(participants.win) / count() 'winrate',
		sum(participants.win) 'wins',
		count() 'total'
	from
		matches
	join participants on
		participants.match_id = matches.match_id
	join challenges on
		challenges.match_id = matches.match_id
		and challenges.puuid = participants.puuid
	join players on
		players.puuid = participants.puuid
	where
		players.is_tracked = 1
		and (matches.queue_id in (440))
	group by 1, 2
	having wins >= 10
	order by 1, 2
)
group by 1
order by count() desc