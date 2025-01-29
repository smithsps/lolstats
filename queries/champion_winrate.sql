SELECT
	players.alt,
	participants.champion_name,
	1.0 * sum(participants.kills + participants.assists) / sum(participants.deaths) 'kda' ,
	100.00 * sum(participants.win) / count() 'winrate', 
	count()
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
	and (matches.queue_id in (420, 440))
	and participants.team_position = 'UTILITY'
group by 1, 2
having count() > 5
