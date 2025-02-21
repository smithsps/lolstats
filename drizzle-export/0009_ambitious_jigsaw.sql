PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ranked_stats` (
	`puuid` text NOT NULL,
	`queue_type` text NOT NULL,
	`tier` text,
	`rank` text,
	`wins` integer,
	`losses` integer,
	`hot_streak` integer,
	`veteran` integer,
	`inactive` integer,
	`fresh_blood` integer,
	`league_points` integer,
	`mini_series_progress` text,
	`mini_series_losses` integer,
	`mini_series_target` integer,
	`mini_series_wins` integer,
	PRIMARY KEY(`puuid`, `queue_type`)
);
--> statement-breakpoint
INSERT INTO `__new_ranked_stats`("puuid", "queue_type", "tier", "rank", "wins", "losses", "hot_streak", "veteran", "inactive", "fresh_blood", "league_points", "mini_series_progress", "mini_series_losses", "mini_series_target", "mini_series_wins") SELECT "puuid", "queue_type", "tier", "rank", "wins", "losses", "hot_streak", "veteran", "inactive", "fresh_blood", "league_points", "mini_series_progress", "mini_series_losses", "mini_series_target", "mini_series_wins" FROM `ranked_stats`;--> statement-breakpoint
DROP TABLE `ranked_stats`;--> statement-breakpoint
ALTER TABLE `__new_ranked_stats` RENAME TO `ranked_stats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;