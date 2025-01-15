CREATE TABLE `bans` (
	`match_id` text,
	`team_id` integer,
	`champion_id` integer,
	`pick_turn` integer,
	PRIMARY KEY(`match_id`, `team_id`)
);
--> statement-breakpoint
CREATE TABLE `challenges` (
	`match_id` text,
	`puuid` text,
	`assist_streak_count` integer,
	`ability_uses` integer,
	`aces_before_15_minutes` integer,
	`allied_jungle_monster_kills` integer,
	`baron_buffs_gold_advantage_over_threshold` integer,
	`baron_takedowns` integer,
	`blast_cone_opposite_opponent_count` integer,
	`bounty_gold` integer,
	`buffs_stolen` integer,
	`complete_support_quest_in_time` integer,
	`control_wards_placed` integer,
	`damage_per_minute` integer,
	`damage_taken_on_team_percentage` integer,
	`danced_with_rift_herald` integer,
	`deaths_by_enemy_champs` integer,
	`dodge_skill_shots_small_window` integer,
	`double_aces` integer,
	`dragon_takedowns` integer,
	`earliest_baron` integer,
	`early_laning_phase_gold_exp_advantage` integer,
	`effective_heal_and_shielding` integer,
	`elder_dragon_kills_with_opposing_soul` integer,
	`elder_dragon_multikills` integer,
	`enemy_champion_immobilizations` integer,
	`enemy_jungle_monster_kills` integer,
	`epic_monster_kills_near_enemy_jungler` integer,
	`epic_monster_kills_within_30_seconds_of_spawn` integer,
	`epic_monster_steals` integer,
	`epic_monster_stolen_without_smite` integer,
	`first_turret_killed` integer,
	`first_turret_killed_time` integer,
	`flawless_aces` integer,
	`full_team_takedown` integer,
	`game_length` integer,
	`get_takedowns_in_all_lanes_early_jungle_as_laner` integer,
	`gold_per_minute` integer,
	`had_open_nexus` integer,
	`highest_crowd_control_score` integer,
	`immobilize_and_kill_with_ally` integer,
	`initial_buff_count` integer,
	`initial_crab_count` integer,
	`jungle_cs_before_10_minutes` integer,
	`jungler_takedowns_near_damaged_epic_monster` integer,
	`jungler_kills_early_jungle` integer,
	`k_turrets_destroyed_before_plates_fall` integer,
	`kda` integer,
	`kill_after_hidden_with_ally` integer,
	`kill_participation` integer,
	`killed_champ_took_full_team_damage_survived` integer,
	`killing_sprees` integer,
	`kills_near_enemy_turret` integer,
	`kills_on_laners_early_jungle_as_jungler` integer,
	`kills_on_recently_healed_by_aram_pack` integer,
	`kills_under_own_turret` integer,
	`kills_with_help_from_epic_monster` integer,
	`knock_enemy_into_team_and_kill` integer,
	`land_skill_shots_early_game` integer,
	`lane_minions_first_10_minutes` integer,
	`laning_phase_gold_exp_advantage` integer,
	`legendary_count` integer,
	`lost_an_inhibitor` integer,
	`max_cs_advantage_on_lane_opponent` integer,
	`max_kill_deficit` integer,
	`max_level_lead_lane_opponent` integer,
	`mejais_full_stack_in_time` integer,
	`more_enemy_jungle_than_opponent` integer,
	`multi_kill_one_spell` integer,
	`multi_turret_rift_herald_count` integer,
	`multikills` integer,
	`multikills_after_aggressive_flash` integer,
	`mythic_item_used` integer,
	`outer_turret_executes_before_10_minutes` integer,
	`outnumbered_kills` integer,
	`outnumbered_nexus_kill` integer,
	`perfect_dragon_souls_taken` integer,
	`perfect_game` integer,
	`pick_kill_with_ally` integer,
	`played_champ_select_position` integer,
	`poro_explosions` integer,
	`quick_cleanse` integer,
	`quick_first_turret` integer,
	`quick_solo_kills` integer,
	`rift_herald_takedowns` integer,
	`save_ally_from_death` integer,
	`scuttle_crab_kills` integer,
	`shortest_time_to_ace_from_first_takedown` integer,
	`skillshots_dodged` integer,
	`skillshots_hit` integer,
	`snowballs_hit` integer,
	`solo_baron_kills` integer,
	`solo_kills` integer,
	`stealth_wards_placed` integer,
	`survived_single_digit_hp_count` integer,
	`survived_three_immobilizes_in_fight` integer,
	`takedown_on_first_turret` integer,
	`takedowns` integer,
	`takedowns_after_gaining_level_advantage` integer,
	`takedowns_before_jungle_minion_spawn` integer,
	`takedowns_first_x_minutes` integer,
	`takedowns_in_alcove` integer,
	`takedowns_in_enemy_fountain` integer,
	`team_baron_kills` integer,
	`team_damage_percentage` integer,
	`team_elder_dragon_kills` integer,
	`team_rift_herald_kills` integer,
	`three_wards_one_sweeper_count` integer,
	`took_large_damage_survived` integer,
	`turret_plates_taken` integer,
	`turret_takedowns` integer,
	`turrets_taken_with_rift_herald` integer,
	`twenty_minions_in_3_seconds_count` integer,
	`two_wards_one_sweeper_count` integer,
	`unseen_recalls` integer,
	`vision_score_advantage_lane_opponent` integer,
	`vision_score_per_minute` integer,
	`ward_takedowns` integer,
	`ward_takedowns_before_20_m` integer,
	`wards_guarded` integer,
	PRIMARY KEY(`match_id`, `puuid`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`match_id` text PRIMARY KEY NOT NULL,
	`data_version` text,
	`end_of_game_result` text,
	`game_creation` integer,
	`game_duration` integer,
	`game_end_timestamp` integer,
	`game_id` integer,
	`game_mode` text,
	`game_name` text,
	`game_start_timestamp` integer,
	`game_type` text,
	`game_version` text,
	`map_id` integer,
	`platform_id` text,
	`queue_id` integer,
	`tournament_code` text
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`match_id` text,
	`puuid` text,
	`riot_id_name` text,
	`riot_id_game_name` text,
	`riot_id_tagline` text,
	`all_in_pings` integer,
	`assist_me_pings` integer,
	`assists` integer,
	`bait_pings` integer,
	`baron_kills` integer,
	`basic_pings` integer,
	`bounty_level` integer,
	`champ_experience` integer,
	`champ_level` integer,
	`champion_id` integer,
	`champion_name` text,
	`champion_transform` integer DEFAULT 0,
	`command_pings` integer,
	`consumables_purchased` integer,
	`damage_dealt_to_buildings` integer,
	`damage_dealt_to_objectives` integer,
	`damage_dealt_to_turrets` integer,
	`damage_self_mitigated` integer,
	`danger_pings` integer,
	`deaths` integer,
	`detector_wards_placed` integer,
	`double_kills` integer,
	`dragon_kills` integer,
	`eligible_for_progression` integer,
	`enemy_missing_pings` integer,
	`enemy_vision_pings` integer,
	`first_blood_assist` integer,
	`first_blood_kill` integer,
	`first_tower_assist` integer,
	`first_tower_kill` integer,
	`game_ended_in_early_surrender` integer,
	`game_ended_in_surrender` integer,
	`get_back_pings` integer,
	`gold_earned` integer,
	`gold_spent` integer,
	`hold_pings` integer,
	`inhibitor_kills` integer,
	`inhibitor_takedowns` integer,
	`inhibitors_lost` integer,
	`item_0` integer,
	`item_1` integer,
	`item_2` integer,
	`item_3` integer,
	`item_4` integer,
	`item_5` integer,
	`item_6` integer,
	`items_purchased` integer,
	`killing_sprees` integer,
	`kills` integer,
	`lane` text,
	`largest_critical_strike` integer,
	`largest_killing_spree` integer,
	`largest_multi_kill` integer,
	`longest_time_spent_living` integer,
	`magic_damage_dealt` integer,
	`magic_damage_dealt_to_champions` integer,
	`magic_damage_taken` integer,
	`need_vision_pings` integer,
	`neutral_minions_killed` integer,
	`nexus_kills` integer,
	`nexus_lost` integer,
	`nexus_takedowns` integer,
	`objectives_stolen` integer,
	`objectives_stolen_assists` integer,
	`on_my_way_pings` integer,
	`participant_id` integer,
	`penta_kills` integer,
	`physical_damage_dealt` integer,
	`physical_damage_dealt_to_champions` integer,
	`physical_damage_taken` integer,
	`profile_icon` integer,
	`push_pings` integer,
	`quadra_kills` integer,
	`sight_wards_bought_in_game` integer,
	`spell_1_casts` integer,
	`spell_2_casts` integer,
	`spell_3_casts` integer,
	`spell_4_casts` integer,
	`summoner_1_casts` integer,
	`summoner_1_id` integer,
	`summoner_2_casts` integer,
	`summoner_2_id` integer,
	`summoner_id` text,
	`summoner_level` integer,
	`summoner_name` text,
	`team_early_surrendered` integer,
	`team_id` integer,
	`time_ccing_others` integer,
	`time_played` integer,
	`total_ally_jungle_minions_killed` integer,
	`total_damage_dealt` integer,
	`total_damage_dealt_to_champions` integer,
	`total_damage_shielded_on_teammates` integer,
	`total_damage_taken` integer,
	`total_enemy_jungle_minions_killed` integer,
	`total_heal` integer,
	`total_heals_on_teammates` integer,
	`total_minions_killed` integer,
	`total_time_cc_dealt` integer,
	`total_time_spent_dead` integer,
	`total_units_healed` integer,
	`triple_kills` integer,
	`true_damage_dealt` integer,
	`true_damage_dealt_to_champions` integer,
	`true_damage_taken` integer,
	`turret_kills` integer,
	`turret_takedowns` integer,
	`turrets_lost` integer,
	`unreal_kills` integer,
	`vision_score` integer,
	`vision_wards_bought_in_game` integer,
	`wards_killed` integer,
	`wards_placed` integer,
	`win` integer,
	PRIMARY KEY(`match_id`, `puuid`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`match_id` text,
	`team_id` integer,
	`win` integer,
	`baron_first` integer,
	`baron_kills` integer,
	`champion_first` integer,
	`champion_kills` integer,
	`dragon_first` integer,
	`dragon_kills` integer,
	`inhibitor_first` integer,
	`inhibitor_kills` integer,
	`riftHerald_first` integer,
	`riftHerald_kills` integer,
	`tower_first` integer,
	`tower_kills` integer,
	PRIMARY KEY(`match_id`, `team_id`)
);