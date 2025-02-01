# LoL Stats

For downloading and exporting matches from the Riot API into a SQLite database for analysis.

To install dependencies:

```bash
bun install
```

To main pipeline run:

```bash
bun run main.ts
```

Example pipeline download and export.
```bash
STEP 1: Getting player details.
#############################
STEP 1: DONE.
STEP 2: Get new matches from players.
#!
For Smith#NA1 - Found 0 new matches / 813 stored.
#1
...(iterates through all players)
STEP 3: Download new/missing matches.
Found 0 matches needed to download...

Errors [] []
STEP 3: DONE.
STEP 4: Get current ranked stats for tracked players.
STEP 4: DONE.
STEP 5: Export data to seperate SQLite database.
#############################################################################################################
PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
```

Players themselves are 

This project was created using `bun init` in bun v1.1.43. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
