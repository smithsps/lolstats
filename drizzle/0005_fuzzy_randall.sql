PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_player_ranked_stats` (
	`puuid` text PRIMARY KEY NOT NULL,
	`inserted_at` integer NOT NULL,
	`league` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_player_ranked_stats`("puuid", "inserted_at", "league") SELECT "puuid", "inserted_at", "league" FROM `player_ranked_stats`;--> statement-breakpoint
DROP TABLE `player_ranked_stats`;--> statement-breakpoint
ALTER TABLE `__new_player_ranked_stats` RENAME TO `player_ranked_stats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;