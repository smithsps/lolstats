import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const matches = sqliteTable('matches', {
    matchId: text('match_id').primaryKey(),
    dataVersion: text('data_version'),
    endOfGameResult: text('end_of_game_result'),
    gameCreation: integer('game_creation'),
    gameDuration: integer('game_duration'),
    gameEndTimestamp: integer('game_end_timestamp'),
    gameId: integer('game_id'),
    gameMode: text('game_mode'),
    gameName: text('game_name'),
    gameStartTimestamp: integer('game_start_timestamp'),
    gameType: text('game_type'),
    gameVersion: text('game_version'),
    mapId: integer('map_id'),
    platformId: text('platform_id'),
    queueId: integer('queue_id'),
    tournamentCode: text('tournament_code'),
});

export const participants = sqliteTable('participants', {
    matchId: text('match_id'),
    puuid: text('puuid'),
    riotIdName: text('riot_id_name'),
    riotIdGameName: text('riot_id_game_name'),
    riotIdTagline: text('riot_id_tagline'),
    allInPings: integer('all_in_pings'),
    assistMePings: integer('assist_me_pings'),
    assists: integer('assists'),
    baitPings: integer('bait_pings'),
    baronKills: integer('baron_kills'),
    basicPings: integer('basic_pings'),
    bountyLevel: integer('bounty_level'),
    champExperience: integer('champ_experience'),
    champLevel: integer('champ_level'),
    championId: integer('champion_id'),
    championName: text('champion_name'),
    championTransform: integer('champion_transform').default(0),
    commandPings: integer('command_pings'),
    consumablesPurchased: integer('consumables_purchased'),
    damageDealtToBuildings: integer('damage_dealt_to_buildings'),
    damageDealtToObjectives: integer('damage_dealt_to_objectives'),
    damageDealtToTurrets: integer('damage_dealt_to_turrets'),
    damageSelfMitigated: integer('damage_self_mitigated'),
    dangerPings: integer('danger_pings'),
    deaths: integer('deaths'),
    detectorWardsPlaced: integer('detector_wards_placed'),
    doubleKills: integer('double_kills'),
    dragonKills: integer('dragon_kills'),
    eligibleForProgression: integer('eligible_for_progression'),
    enemyMissingPings: integer('enemy_missing_pings'),
    enemyVisionPings: integer('enemy_vision_pings'),
    firstBloodAssist: integer('first_blood_assist'),
    firstBloodKill: integer('first_blood_kill'),
    firstTowerAssist: integer('first_tower_assist'),
    firstTowerKill: integer('first_tower_kill'),
    gameEndedInEarlySurrender: integer('game_ended_in_early_surrender'),
    gameEndedInSurrender: integer('game_ended_in_surrender'),
    getBackPings: integer('get_back_pings'),
    goldEarned: integer('gold_earned'),
    goldSpent: integer('gold_spent'),
    holdPings: integer('hold_pings'),
    inhibitorKills: integer('inhibitor_kills'),
    inhibitorTakedowns: integer('inhibitor_takedowns'),
    inhibitorsLost: integer('inhibitors_lost'),
    item0: integer('item_0'),
    item1: integer('item_1'),
    item2: integer('item_2'),
    item3: integer('item_3'),
    item4: integer('item_4'),
    item5: integer('item_5'),
    item6: integer('item_6'),
    itemsPurchased: integer('items_purchased'),
    killingSprees: integer('killing_sprees'),
    kills: integer('kills'),
    lane: text('lane'),
    largestCriticalStrike: integer('largest_critical_strike'),
    largestKillingSpree: integer('largest_killing_spree'),
    largestMultiKill: integer('largest_multi_kill'),
    longestTimeSpentLiving: integer('longest_time_spent_living'),
    magicDamageDealt: integer('magic_damage_dealt'),
    magicDamageDealtToChampions: integer('magic_damage_dealt_to_champions'),
    magicDamageTaken: integer('magic_damage_taken'),
    needVisionPings: integer('need_vision_pings'),
    neutralMinionsKilled: integer('neutral_minions_killed'),
    nexusKills: integer('nexus_kills'),
    nexusLost: integer('nexus_lost'),
    nexusTakedowns: integer('nexus_takedowns'),
    objectivesStolen: integer('objectives_stolen'),
    objectivesStolenAssists: integer('objectives_stolen_assists'),
    onMyWayPings: integer('on_my_way_pings'),
    participantId: integer('participant_id'),
    pentaKills: integer('penta_kills'),
    physicalDamageDealt: integer('physical_damage_dealt'),
    physicalDamageDealtToChampions: integer('physical_damage_dealt_to_champions'),
    physicalDamageTaken: integer('physical_damage_taken'),
    profileIcon: integer('profile_icon'),
    pushPings: integer('push_pings'),
    quadraKills: integer('quadra_kills'),
    sightWardsBoughtInGame: integer('sight_wards_bought_in_game'),
    spell1Casts: integer('spell_1_casts'),
    spell2Casts: integer('spell_2_casts'),
    spell3Casts: integer('spell_3_casts'),
    spell4Casts: integer('spell_4_casts'),
    summoner1Casts: integer('summoner_1_casts'),
    summoner1Id: integer('summoner_1_id'),
    summoner2Casts: integer('summoner_2_casts'),
    summoner2Id: integer('summoner_2_id'),
    summonerId: text('summoner_id'),
    summonerLevel: integer('summoner_level'),
    summonerName: text('summoner_name'),
    teamEarlySurrendered: integer('team_early_surrendered'),
    teamId: integer('team_id'),
    timeCCingOthers: integer('time_ccing_others'),
    timePlayed: integer('time_played'),
    totalAllyJungleMinionsKilled: integer('total_ally_jungle_minions_killed'),
    totalDamageDealt: integer('total_damage_dealt'),
    totalDamageDealtToChampions: integer('total_damage_dealt_to_champions'),
    totalDamageShieldedOnTeammates: integer('total_damage_shielded_on_teammates'),
    totalDamageTaken: integer('total_damage_taken'),
    totalEnemyJungleMinionsKilled: integer('total_enemy_jungle_minions_killed'),
    totalHeal: integer('total_heal'),
    totalHealsOnTeammates: integer('total_heals_on_teammates'),
    totalMinionsKilled: integer('total_minions_killed'),
    totalTimeCCDealt: integer('total_time_cc_dealt'),
    totalTimeSpentDead: integer('total_time_spent_dead'),
    totalUnitsHealed: integer('total_units_healed'),
    tripleKills: integer('triple_kills'),
    trueDamageDealt: integer('true_damage_dealt'),
    trueDamageDealtToChampions: integer('true_damage_dealt_to_champions'),
    trueDamageTaken: integer('true_damage_taken'),
    turretKills: integer('turret_kills'),
    turretTakedowns: integer('turret_takedowns'),
    turretsLost: integer('turrets_lost'),
    unrealKills: integer('unreal_kills'),
    visionScore: integer('vision_score'),
    visionWardsBoughtInGame: integer('vision_wards_bought_in_game'),
    wardsKilled: integer('wards_killed'),
    wardsPlaced: integer('wards_placed'),
    win: integer('win'),
}, (table) => [
    primaryKey({ columns: [table.matchId, table.puuid] })
]);

export const challenges = sqliteTable('challenges', {
    matchId: text('match_id'),
    puuid: text('puuid'),
    assistStreakCount: integer('assist_streak_count'),
    abilityUses: integer('ability_uses'),
    acesBefore15Minutes: integer('aces_before_15_minutes'),
    alliedJungleMonsterKills: integer('allied_jungle_monster_kills'),
    baronBuffsGoldAdvantageOverThreshold: integer('baron_buffs_gold_advantage_over_threshold'),
    baronTakedowns: integer('baron_takedowns'),
    blastConeOppositeOpponentCount: integer('blast_cone_opposite_opponent_count'),
    bountyGold: integer('bounty_gold'),
    buffsStolen: integer('buffs_stolen'),
    completeSupportQuestInTime: integer('complete_support_quest_in_time'),
    controlWardsPlaced: integer('control_wards_placed'),
    damagePerMinute: integer('damage_per_minute'),
    damageTakenOnTeamPercentage: integer('damage_taken_on_team_percentage'),
    dancedWithRiftHerald: integer('danced_with_rift_herald'),
    deathsByEnemyChamps: integer('deaths_by_enemy_champs'),
    dodgeSkillShotsSmallWindow: integer('dodge_skill_shots_small_window'),
    doubleAces: integer('double_aces'),
    dragonTakedowns: integer('dragon_takedowns'),
    earliestBaron: integer('earliest_baron'),
    earlyLaningPhaseGoldExpAdvantage: integer('early_laning_phase_gold_exp_advantage'),
    effectiveHealAndShielding: integer('effective_heal_and_shielding'),
    elderDragonKillsWithOpposingSoul: integer('elder_dragon_kills_with_opposing_soul'),
    elderDragonMultikills: integer('elder_dragon_multikills'),
    enemyChampionImmobilizations: integer('enemy_champion_immobilizations'),
    enemyJungleMonsterKills: integer('enemy_jungle_monster_kills'),
    epicMonsterKillsNearEnemyJungler: integer('epic_monster_kills_near_enemy_jungler'),
    epicMonsterKillsWithin30SecondsOfSpawn: integer('epic_monster_kills_within_30_seconds_of_spawn'),
    epicMonsterSteals: integer('epic_monster_steals'),
    epicMonsterStolenWithoutSmite: integer('epic_monster_stolen_without_smite'),
    firstTurretKilled: integer('first_turret_killed'),
    firstTurretKilledTime: integer('first_turret_killed_time'),
    flawlessAces: integer('flawless_aces'),
    fullTeamTakedown: integer('full_team_takedown'),
    gameLength: integer('game_length'),
    getTakedownsInAllLanesEarlyJungleAsLaner: integer('get_takedowns_in_all_lanes_early_jungle_as_laner'),
    goldPerMinute: integer('gold_per_minute'),
    hadOpenNexus: integer('had_open_nexus'),
    highestCrowdControlScore: integer('highest_crowd_control_score'),
    immobilizeAndKillWithAlly: integer('immobilize_and_kill_with_ally'),
    initialBuffCount: integer('initial_buff_count'),
    initialCrabCount: integer('initial_crab_count'),
    jungleCsBefore10Minutes: integer('jungle_cs_before_10_minutes'),
    junglerTakedownsNearDamagedEpicMonster: integer('jungler_takedowns_near_damaged_epic_monster'),
    junglerKillsEarlyJungle: integer('jungler_kills_early_jungle'),
    kTurretsDestroyedBeforePlatesFall: integer('k_turrets_destroyed_before_plates_fall'),
    kda: integer('kda'),
    killAfterHiddenWithAlly: integer('kill_after_hidden_with_ally'),
    killParticipation: integer('kill_participation'),
    killedChampTookFullTeamDamageSurvived: integer('killed_champ_took_full_team_damage_survived'),
    killingSprees: integer('killing_sprees'),
    killsNearEnemyTurret: integer('kills_near_enemy_turret'),
    killsOnLanersEarlyJungleAsJungler: integer('kills_on_laners_early_jungle_as_jungler'),
    killsOnRecentlyHealedByAramPack: integer('kills_on_recently_healed_by_aram_pack'),
    killsUnderOwnTurret: integer('kills_under_own_turret'),
    killsWithHelpFromEpicMonster: integer('kills_with_help_from_epic_monster'),
    knockEnemyIntoTeamAndKill: integer('knock_enemy_into_team_and_kill'),
    landSkillShotsEarlyGame: integer('land_skill_shots_early_game'),
    laneMinionsFirst10Minutes: integer('lane_minions_first_10_minutes'),
    laningPhaseGoldExpAdvantage: integer('laning_phase_gold_exp_advantage'),
    legendaryCount: integer('legendary_count'),
    lostAnInhibitor: integer('lost_an_inhibitor'),
    maxCsAdvantageOnLaneOpponent: integer('max_cs_advantage_on_lane_opponent'),
    maxKillDeficit: integer('max_kill_deficit'),
    maxLevelLeadLaneOpponent: integer('max_level_lead_lane_opponent'),
    mejaisFullStackInTime: integer('mejais_full_stack_in_time'),
    moreEnemyJungleThanOpponent: integer('more_enemy_jungle_than_opponent'),
    multiKillOneSpell: integer('multi_kill_one_spell'),
    multiTurretRiftHeraldCount: integer('multi_turret_rift_herald_count'),
    multikills: integer('multikills'),
    multikillsAfterAggressiveFlash: integer('multikills_after_aggressive_flash'),
    mythicItemUsed: integer('mythic_item_used'),
    outerTurretExecutesBefore10Minutes: integer('outer_turret_executes_before_10_minutes'),
    outnumberedKills: integer('outnumbered_kills'),
    outnumberedNexusKill: integer('outnumbered_nexus_kill'),
    perfectDragonSoulsTaken: integer('perfect_dragon_souls_taken'),
    perfectGame: integer('perfect_game'),
    pickKillWithAlly: integer('pick_kill_with_ally'),
    playedChampSelectPosition: integer('played_champ_select_position'),
    poroExplosions: integer('poro_explosions'),
    quickCleanse: integer('quick_cleanse'),
    quickFirstTurret: integer('quick_first_turret'),
    quickSoloKills: integer('quick_solo_kills'),
    riftHeraldTakedowns: integer('rift_herald_takedowns'),
    saveAllyFromDeath: integer('save_ally_from_death'),
    scuttleCrabKills: integer('scuttle_crab_kills'),
    shortestTimeToAceFromFirstTakedown: integer('shortest_time_to_ace_from_first_takedown'),
    skillshotsDodged: integer('skillshots_dodged'),
    skillshotsHit: integer('skillshots_hit'),
    snowballsHit: integer('snowballs_hit'),
    soloBaronKills: integer('solo_baron_kills'),
    soloKills: integer('solo_kills'),
    stealthWardsPlaced: integer('stealth_wards_placed'),
    survivedSingleDigitHpCount: integer('survived_single_digit_hp_count'),
    survivedThreeImmobilizesInFight: integer('survived_three_immobilizes_in_fight'),
    takedownOnFirstTurret: integer('takedown_on_first_turret'),
    takedowns: integer('takedowns'),
    takedownsAfterGainingLevelAdvantage: integer('takedowns_after_gaining_level_advantage'),
    takedownsBeforeJungleMinionSpawn: integer('takedowns_before_jungle_minion_spawn'),
    takedownsFirstXMinutes: integer('takedowns_first_x_minutes'),
    takedownsInAlcove: integer('takedowns_in_alcove'),
    takedownsInEnemyFountain: integer('takedowns_in_enemy_fountain'),
    teamBaronKills: integer('team_baron_kills'),
    teamDamagePercentage: integer('team_damage_percentage'),
    teamElderDragonKills: integer('team_elder_dragon_kills'),
    teamRiftHeraldKills: integer('team_rift_herald_kills'),
    threeWardsOneSweeperCount: integer('three_wards_one_sweeper_count'),
    tookLargeDamageSurvived: integer('took_large_damage_survived'),
    turretPlatesTaken: integer('turret_plates_taken'),
    turretTakedowns: integer('turret_takedowns'),
    turretsTakenWithRiftHerald: integer('turrets_taken_with_rift_herald'),
    twentyMinionsIn3SecondsCount: integer('twenty_minions_in_3_seconds_count'),
    twoWardsOneSweeperCount: integer('two_wards_one_sweeper_count'),
    unseenRecalls: integer('unseen_recalls'),
    visionScoreAdvantageLaneOpponent: integer('vision_score_advantage_lane_opponent'),
    visionScorePerMinute: integer('vision_score_per_minute'),
    wardTakedowns: integer('ward_takedowns'),
    wardTakedownsBefore20M: integer('ward_takedowns_before_20_m'),
    wardsGuarded: integer('wards_guarded'),
}, (table) => [
    primaryKey({ columns: [table.matchId, table.puuid] })
]);

export const teams = sqliteTable("teams", {
    matchId: text('match_id'),
    teamId: integer("team_id"),
    win: integer("win"),
    baronFirst: integer("baron_first"),
    baronKills: integer("baron_kills"),
    championFirst: integer("champion_first"),
    championKills: integer("champion_kills"),
    dragonFirst: integer("dragon_first"),
    dragonKills: integer("dragon_kills"),
    inhibitorFirst: integer("inhibitor_first"),
    inhibitorKills: integer("inhibitor_kills"),
    riftHeraldFirst: integer("riftHerald_first"),
    riftHeraldKills: integer("riftHerald_kills"),
    towerFirst: integer("tower_first"),
    towerKills: integer("tower_kills"),
}, (table) => [
    primaryKey({ columns: [table.matchId, table.teamId] })
]);

export const bans = sqliteTable("bans", {
    matchId: text('match_id'),
    teamId: integer("team_id"),
    championId: integer("champion_id"),
    pickTurn: integer("pick_turn")
}, (table) => [
    primaryKey({ columns: [table.matchId, table.teamId, table.pickTurn] })
]);