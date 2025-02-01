SELECT
	pl.name,
	avg(p.all_in_pings) "avg_all_in_pings",
	sum(p.all_in_pings) "total_all_in_pings",
	avg(p.assist_me_pings) "avg_assist_me_pings",
	sum(p.assist_me_pings) "total_assist_me_pings",
	avg(p.bait_pings) "avg_bait_pings",
	sum(p.bait_pings) "total_bait_pings",
	avg(p.command_pings) "avg_command_pings",
	sum(p.command_pings) "total_command_pings",
	avg(p.danger_pings) "avg_danger_pings",
	sum(p.danger_pings) "total_danger_pings",
	avg(p.get_back_pings) "avg_get_back_pings",
	sum(p.get_back_pings) "total_get_back_pings",
	avg(p.enemy_missing_pings) "avg_enemy_missing_pings",
	sum(p.enemy_missing_pings) "total_enemy_missing_pings",
	avg(p.enemy_vision_pings) "avg_enemy_vision_pings",
	sum(p.enemy_vision_pings) "total_enemy_vision_pings",
	avg(p.hold_pings) "avg_hold_pings",
	sum(p.hold_pings) "total_hold_pings",
	avg(p.need_vision_pings) "avg_need_vision_pings",
	sum(p.need_vision_pings) "total_need_vision_pings",
	avg(p.on_my_way_pings) "avg_on_my_way_pings",
	sum(p.on_my_way_pings) "total_on_my_way_pings",
	avg(p.push_pings) "avg_push_pings",
	sum(p.push_pings) "total_push_pings",
	avg(p.all_in_pings) + avg(p.assist_me_pings) + avg(p.bait_pings) + avg(p.command_pings) + avg(p.danger_pings) + avg(p.get_back_pings) + avg(p.enemy_missing_pings) + avg(p.enemy_vision_pings) + avg(p.hold_pings) + avg(p.need_vision_pings) + avg(p.on_my_way_pings) + avg(p.push_pings) "avg_all_pings",
	sum(p.all_in_pings) + sum(p.assist_me_pings) + sum(p.bait_pings) + sum(p.command_pings) + sum(p.danger_pings) + sum(p.get_back_pings) + sum(p.enemy_missing_pings) + sum(p.enemy_vision_pings) + sum(p.hold_pings) + sum(p.need_vision_pings) + sum(p.on_my_way_pings) + sum(p.push_pings) "all_pings",
	avg(p.all_in_pings) + avg(p.assist_me_pings) + avg(p.bait_pings) + avg(p.danger_pings) + avg(p.get_back_pings) + avg(p.enemy_missing_pings) + avg(p.hold_pings) + avg(p.need_vision_pings) + avg(p.on_my_way_pings) + avg(p.push_pings) "avg_all_pings_no_vision",
	sum(p.all_in_pings) + sum(p.assist_me_pings) + sum(p.bait_pings) + sum(p.danger_pings) + sum(p.get_back_pings) + sum(p.enemy_missing_pings) + sum(p.hold_pings) + sum(p.need_vision_pings) + sum(p.on_my_way_pings) + sum(p.push_pings) "all_pings_no_vision",
	count() "total_matches"
from
	matches m
join participants p on
	p.match_id = m.match_id
join challenges c on
	c.match_id = m.match_id
	and c.puuid = p.puuid
join players pl on
	pl.puuid = p.puuid
where
	pl.is_tracked = 1
	and (m.queue_id in (440))
group by
	1
order by
	"avg_all_pings" desc