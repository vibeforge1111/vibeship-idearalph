# VibeCheck

The credit score for athlete behavior. Automated off-field behavioral intelligence for soccer player scouting.

Zero dependencies. Python stdlib only.

## Quick Start

```bash
# Scout a player from CLI
python3 scout.py "Marcus Rashford"
python3 scout.py "Neymar Jr" --days 30 --json

# Web dashboard
python3 scout_web.py              # http://localhost:8888

# Run all watchlist players
python3 scout_scheduler.py

# Autonomous daily runs
python3 scout_scheduler.py --daemon         # loop, fires at 7am
python3 scout_scheduler.py --install-cron   # install crontab entry
```

## How It Works

1. Fetches news via Google News RSS (free, no API key)
2. Scans for behavioral signals using keyword dictionaries
3. Filters false positives with match-context heuristics
4. Scores risk 0-10 (VibeScore)
5. Tracks history and computes behavioral trends
6. Predicts future risk with linear regression
7. Logs everything for full audit trail

## Cost Tiers

| Tier | What | Cost |
|------|------|------|
| FREE | Keyword matching on all articles | Zero |
| CHEAP | False-positive filtering via match-context detection | Zero |
| EXPENSIVE | Flags items needing human review | Human attention |

## Web UI

- **Dashboard** (`/`) — Search, watchlist, score cards with trends
- **Index** (`/index`) — All players ranked by risk
- **Player Cards** (`/player/<name>`) — Shareable public score cards

## Logging

Every run writes to:
- `scout_logs/audit.jsonl` — append-only audit trail
- `scout_logs/runs/` — individual JSON run files
- `scout_logs/history/` — per-player score history for trend tracking
- `scout_logs/errors.log` — error log

## Files

| File | Purpose |
|------|---------|
| `scout.py` | Core engine: fetch, analyze, self-check, predict, log |
| `scout_web.py` | Web UI on port 8888 |
| `scout_scheduler.py` | Autonomous daily runner |
| `watchlist.json` | Players to monitor |
