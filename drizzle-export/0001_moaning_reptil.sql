PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bans` (
	`match_id` text,
	`team_id` integer,
	`champion_id` integer,
	`pick_turn` integer,
	PRIMARY KEY(`match_id`, `team_id`, `pick_turn`)
);
--> statement-breakpoint
INSERT INTO `__new_bans`("match_id", "team_id", "champion_id", "pick_turn") SELECT "match_id", "team_id", "champion_id", "pick_turn" FROM `bans`;--> statement-breakpoint
DROP TABLE `bans`;--> statement-breakpoint
ALTER TABLE `__new_bans` RENAME TO `bans`;--> statement-breakpoint
PRAGMA foreign_keys=ON;