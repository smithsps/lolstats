SELECT
	players.alt,
	string_agg(participants.champion_name, ', '),
	count(distinct participants.champion_name),
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
group by 1