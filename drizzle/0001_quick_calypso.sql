PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_player_matches` (
	`puuid` text NOT NULL,
	`match_id` text NOT NULL,
	PRIMARY KEY(`puuid`, `match_id`)
);
--> statement-breakpoint
INSERT INTO `__new_player_matches`("puuid", "match_id") SELECT "puuid", "match_id" FROM `player_matches`;--> statement-breakpoint
DROP TABLE `player_matches`;--> statement-breakpoint
ALTER TABLE `__new_player_matches` RENAME TO `player_matches`;--> statement-breakpoint
PRAGMA foreign_keys=ON;