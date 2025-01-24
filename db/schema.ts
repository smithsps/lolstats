import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
    puuid: text("puuid").primaryKey().notNull(),
    summonerId: text("summoner_id").notNull(),
    accountId: text("account_id").notNull(),
    name: text("name").notNull(),
    tag: text("tag").notNull(),
});

export const player_matches = sqliteTable("player_matches", {
    puuid: text("puuid").notNull(),
    matchId: text("match_id").notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.puuid, table.matchId]})
    }
})

export const player_last_update = sqliteTable("player_last_update", {
    puuid: text("puuid").primaryKey().notNull(),
    matches_last_updated: integer("matches_last_updated").notNull()
})

export const matches = sqliteTable("matches", {
    matchId: text("match_id").primaryKey().notNull(),
    match: text("match", { mode: "json" }).notNull(),
});

export const match_timelines = sqliteTable("match_timelines", {
    matchId: text("match_id").primaryKey().notNull(),
    timeline: text("timeline", { mode: "json" }).notNull(),
});

export const player_ranked_stats = sqliteTable("player_ranked_stats", {
    puuid: text("puuid").primaryKey().notNull(),
    insertedAt: integer("inserted_at"),
});