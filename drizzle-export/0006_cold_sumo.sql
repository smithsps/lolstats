ALTER TABLE `participants` RENAME COLUMN "iteam_position" TO "team_position";--> statement-breakpoint
CREATE TABLE `ranked_stats` (
	`puuid` text PRIMARY KEY NOT NULL,
	`queue_type` text NOT NULL,
	`tier` text,
	`rank` text,
	`wins` text,
	`losses` text,
	`hot_streak` text,
	`veteran` text,
	`inactive` text,
	`fresh_blood` text,
	`league_points` text,
	`mini_series_progress` text,
	`mini_series_losses` text,
	`mini_series_target` text,
	`mini_series_wins` text
);
