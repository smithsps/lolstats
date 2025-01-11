CREATE TABLE `match_timelines` (
	`match_id` text PRIMARY KEY NOT NULL,
	`timeline` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`match_id` text PRIMARY KEY NOT NULL,
	`match` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `player_matches` (
	`puuid` text NOT NULL,
	`match_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `players` (
	`puuid` text PRIMARY KEY NOT NULL,
	`summoner_id` text NOT NULL,
	`account_id` text NOT NULL,
	`text` text NOT NULL,
	`tag` text NOT NULL
);
