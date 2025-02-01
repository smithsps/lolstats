ALTER TABLE `teams` RENAME COLUMN "riftHerald_first" TO "rift_herald_first";--> statement-breakpoint
ALTER TABLE `teams` RENAME COLUMN "riftHerald_kills" TO "rift_herald_kills";--> statement-breakpoint
ALTER TABLE `teams` ADD `atakhan_first` integer;--> statement-breakpoint
ALTER TABLE `teams` ADD `atakhan_kills` integer;--> statement-breakpoint
ALTER TABLE `teams` ADD `void_grub_first` integer;--> statement-breakpoint
ALTER TABLE `teams` ADD `void_grub_kills` integer;