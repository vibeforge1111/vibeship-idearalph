#!/usr/bin/env python3
"""
Soccer Player Scout - Autonomous Scheduler
Runs scouting on all watchlist players. Set it and forget it.

Usage:
    python3 scout_scheduler.py                # run once, now
    python3 scout_scheduler.py --daemon       # loop forever, run at 7am daily
    python3 scout_scheduler.py --install-cron # install crontab entry

Reads players from watchlist.json. Results logged to scout_logs/.
"""

import sys
import os
import json
import time
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
WATCHLIST_FILE = SCRIPT_DIR / "watchlist.json"
SCOUT_SCRIPT = SCRIPT_DIR / "scout.py"

# Import the core runner
sys.path.insert(0, str(SCRIPT_DIR))
from scout import run_scout, load_watchlist, save_watchlist, log_error


def run_all_players():
    """Scout every player on the watchlist. Update their scores. Return summary."""
    wl = load_watchlist()
    players = wl.get("players", [])
    days = wl.get("settings", {}).get("days", 14)

    if not players:
        print("[!] Watchlist is empty. Add players first:")
        print('    python3 scout_web.py  (then use the UI)')
        print('    or edit watchlist.json manually')
        return []

    print(f"[*] Scheduled run: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"[*] Players: {len(players)} | Lookback: {days} days")
    print("-" * 50)

    results = []
    for i, p in enumerate(players):
        name = p if isinstance(p, str) else p.get("name", "")
        if not name:
            continue

        print(f"[{i+1}/{len(players)}] Scouting: {name}...", end=" ", flush=True)

        try:
            result = run_scout(name, days=days, trigger="scheduled")
            score = result["log"]["risk_score"]
            label = result["log"]["risk_label"]
            articles = result["log"]["articles_found"]
            confidence = result["log"]["self_check"]["confidence"]
            issues = result["log"]["self_check"]["issues"]
            duration = result["log"]["duration_ms"]

            print(f"{score}/10 ({label}) | {articles} articles | {int(confidence*100)}% conf | {duration}ms")

            # Print self-check issues if any
            if issues:
                for issue in issues:
                    print(f"    [!] {issue}")

            # Print expensive-tier review items
            for item in result["log"].get("review_items", []):
                print(f"    [REVIEW] {item['reason']}: {item['detail']}")

            # Update watchlist entry with score
            players[i] = {"name": name, "last_score": score, "last_run": datetime.now().isoformat()}
            results.append(result["log"])

        except Exception as e:
            print(f"ERROR: {e}")
            log_error(str(e), name, "scheduler")
            results.append({"player": name, "error": str(e)})

        # Be nice to Google News - wait between requests
        if i < len(players) - 1:
            time.sleep(2)

    # Save updated watchlist
    wl["players"] = players
    wl["last_scheduled_run"] = datetime.now().isoformat()
    save_watchlist(wl)

    print("-" * 50)
    print(f"[*] Done. {len(results)} players scouted.")
    print(f"[*] Logs: {SCRIPT_DIR / 'scout_logs'}")

    # Summary: flag any players that need attention
    attention = [r for r in results if isinstance(r.get("risk_score"), int) and r["risk_score"] >= 5]
    if attention:
        print()
        print("!! PLAYERS NEEDING ATTENTION:")
        for r in attention:
            print(f"   {r['player']}: {r['risk_score']}/10 ({r['risk_label']})")

    return results


def daemon_mode():
    """Run forever. Execute at target_hour every day."""
    target_hour = 7  # 7 AM
    print(f"[*] Daemon mode. Will run daily at {target_hour}:00.")
    print(f"[*] PID: {os.getpid()}")
    print(f"[*] Kill with: kill {os.getpid()}")

    last_run_date = None

    while True:
        now = datetime.now()

        # Run if it's the target hour and we haven't run today
        if now.hour == target_hour and now.strftime("%Y-%m-%d") != last_run_date:
            print(f"\n{'='*50}")
            print(f"  SCHEDULED RUN - {now.strftime('%Y-%m-%d %H:%M')}")
            print(f"{'='*50}")
            try:
                run_all_players()
            except Exception as e:
                print(f"[!] Scheduler error: {e}")
                log_error(str(e), "scheduler", "daemon_mode")
            last_run_date = now.strftime("%Y-%m-%d")

        # Sleep 5 minutes then check again
        time.sleep(300)


def install_cron():
    """Install a crontab entry to run every day at 7 AM."""
    python = sys.executable
    script = str(SCRIPT_DIR / "scout_scheduler.py")
    log_file = str(SCRIPT_DIR / "scout_logs" / "cron.log")

    cron_line = f"0 7 * * * cd {SCRIPT_DIR} && {python} {script} >> {log_file} 2>&1"

    # Check existing crontab
    try:
        existing = subprocess.run(
            ["crontab", "-l"], capture_output=True, text=True
        ).stdout
    except Exception:
        existing = ""

    if "scout_scheduler" in existing:
        print("[*] Cron entry already exists:")
        for line in existing.split("\n"):
            if "scout_scheduler" in line:
                print(f"    {line}")
        print("[*] To remove: crontab -e")
        return

    # Add to crontab
    new_crontab = existing.rstrip("\n") + "\n" + cron_line + "\n"
    proc = subprocess.run(
        ["crontab", "-"], input=new_crontab, text=True, capture_output=True
    )

    if proc.returncode == 0:
        print("[*] Cron job installed successfully!")
        print(f"    Schedule: Every day at 7:00 AM")
        print(f"    Command:  {cron_line}")
        print(f"    Logs:     {log_file}")
        print()
        print("[*] Verify with: crontab -l")
        print("[*] Remove with: crontab -e (delete the scout_scheduler line)")
    else:
        print(f"[!] Failed to install cron: {proc.stderr}")
        print(f"[*] Add this line manually to crontab (crontab -e):")
        print(f"    {cron_line}")


def main():
    if "--help" in sys.argv or "-h" in sys.argv:
        print(__doc__)
        sys.exit(0)

    if "--install-cron" in sys.argv:
        install_cron()
    elif "--daemon" in sys.argv:
        daemon_mode()
    else:
        run_all_players()


if __name__ == "__main__":
    main()
