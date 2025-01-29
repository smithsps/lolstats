SELECT
	players.name,
	avg(participants.all_in_pings) "avg_all_in_pings",
	sum(participants.all_in_pings) "total_all_in_pings",
	avg(participants.assist_me_pings) "avg_assist_me_pings",
	sum(participants.assist_me_pings) "total_assist_me_pings",
	avg(participants.bait_pings) "avg_bait_pings",
	sum(participants.bait_pings) "total_bait_pings",
	avg(participants.command_pings) "avg_command_pings",
	sum(participants.command_pings) "total_command_pings",
	avg(participants.danger_pings) "avg_danger_pings",
	sum(participants.danger_pings) "total_danger_pings",
	avg(participants.get_back_pings) "avg_get_back_pings",
	sum(participants.get_back_pings) "total_get_back_pings",
	avg(participants.enemy_missing_pings) "avg_enemy_missing_pings",
	sum(participants.enemy_missing_pings) "total_enemy_missing_pings",
	avg(participants.enemy_vision_pings) "avg_enemy_vision_pings",
	sum(participants.enemy_vision_pings) "total_enemy_vision_pings",
	avg(participants.hold_pings) "avg_hold_pings",
	sum(participants.hold_pings) "total_hold_pings",
	avg(participants.need_vision_pings) "avg_need_vision_pings",
	sum(participants.need_vision_pings) "total_need_vision_pings",
	avg(participants.on_my_way_pings) "avg_on_my_way_pings",
	sum(participants.on_my_way_pings) "total_on_my_way_pings",
	avg(participants.push_pings) "avg_push_pings",
	sum(participants.push_pings) "total_push_pings",
	avg(participants.all_in_pings) + avg(participants.assist_me_pings) + avg(participants.bait_pings) + avg(participants.command_pings) + avg(participants.danger_pings) + avg(participants.get_back_pings) + avg(participants.enemy_missing_pings) + avg(participants.enemy_vision_pings) + avg(participants.hold_pings) + avg(participants.need_vision_pings) + avg(participants.on_my_way_pings) + avg(participants.push_pings) "avg_all_pings",
	sum(participants.all_in_pings) + sum(participants.assist_me_pings) + sum(participants.bait_pings) + sum(participants.command_pings) + sum(participants.danger_pings) + sum(participants.get_back_pings) + sum(participants.enemy_missing_pings) + sum(participants.enemy_vision_pings) + sum(participants.hold_pings) + sum(participants.need_vision_pings) + sum(participants.on_my_way_pings) + sum(participants.push_pings) "all_pings",
	avg(participants.all_in_pings) + avg(participants.assist_me_pings) + avg(participants.bait_pings) + avg(participants.danger_pings) + avg(participants.get_back_pings) + avg(participants.enemy_missing_pings) + avg(participants.hold_pings) + avg(participants.need_vision_pings) + avg(participants.on_my_way_pings) + avg(participants.push_pings) "avg_all_pings_no_vision",
	sum(participants.all_in_pings) + sum(participants.assist_me_pings) + sum(participants.bait_pings) + sum(participants.danger_pings) + sum(participants.get_back_pings) + sum(participants.enemy_missing_pings) + sum(participants.hold_pings) + sum(participants.need_vision_pings) + sum(participants.on_my_way_pings) + sum(participants.push_pings) "all_pings_no_vision",
	count() "total_matches"
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
group by
	1
order by
	"avg_all_pings" desc