#!/usr/bin/env python3
"""
VibeCheck - The Credit Score for Athlete Behavior
Web UI: Dashboard + Public Score Cards + VibeCheck Index
Uses Python's built-in http.server. No Flask. No Django. No npm. Just stdlib.

Usage:
    python3 scout_web.py              # http://localhost:8888
    python3 scout_web.py --port 9000  # http://localhost:9000
"""

import sys
import json
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from scout import (
    run_scout, load_watchlist, save_watchlist, get_recent_logs,
    get_history, compute_trend, get_vibecheck_index, categorize_risk,
)

PORT = 8888

# ─── HTML Templates ───────────────────────────────────────────────────────────

STYLE = """
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0a0e17; color: #c8d6e5;
    min-height: 100vh;
}
a { color: #00d4aa; text-decoration: none; }
a:hover { text-decoration: underline; }

.topbar {
    background: #0d1117; border-bottom: 1px solid #1e3a5f;
    padding: 14px 28px; display: flex; align-items: center;
    justify-content: space-between;
}
.topbar .brand { display: flex; align-items: center; gap: 12px; }
.topbar .brand h1 {
    font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
}
.topbar .brand h1 span { color: #00d4aa; }
.topbar .brand .tag {
    font-size: 11px; color: #0a0e17; background: #00d4aa;
    padding: 2px 8px; border-radius: 10px; font-weight: 700;
}
.topbar nav { display: flex; gap: 24px; }
.topbar nav a {
    font-size: 14px; color: #5a6e82; font-weight: 500;
    transition: color 0.15s;
}
.topbar nav a:hover, .topbar nav a.active { color: #00d4aa; text-decoration: none; }

/* Score Badge */
.vibe-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 56px; height: 56px; border-radius: 50%; font-size: 20px;
    font-weight: 800; border: 3px solid;
}
.vibe-badge.low { border-color: #00d4aa; color: #00d4aa; background: #0a2e22; }
.vibe-badge.mod { border-color: #ffd700; color: #ffd700; background: #2a2400; }
.vibe-badge.high { border-color: #ff6b35; color: #ff6b35; background: #2a1508; }
.vibe-badge.crit { border-color: #ff4444; color: #ff4444; background: #2a0a0a; }
.vibe-badge-sm {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 50%; font-size: 14px;
    font-weight: 700; border: 2px solid;
}
.vibe-badge-sm.low { border-color: #00d4aa; color: #00d4aa; }
.vibe-badge-sm.mod { border-color: #ffd700; color: #ffd700; }
.vibe-badge-sm.high { border-color: #ff6b35; color: #ff6b35; }
.vibe-badge-sm.crit { border-color: #ff4444; color: #ff4444; }

/* Trend Arrows */
.trend-up { color: #ff4444; }
.trend-down { color: #00d4aa; }
.trend-stable { color: #5a6e82; }
.trend-unknown { color: #2a3a4c; }

/* Sparkline */
.sparkline { font-family: 'Courier New', monospace; letter-spacing: 1px; color: #5a6e82; }

/* Layout */
.page { max-width: 1100px; margin: 0 auto; padding: 28px; }

/* Cards */
.card {
    background: #0d1117; border: 1px solid #1e3a5f; border-radius: 12px;
    padding: 24px; margin-bottom: 20px;
}
.card h2 { font-size: 16px; color: #8b9cb5; margin-bottom: 16px; font-weight: 600; }

/* Search */
.search-row {
    display: flex; gap: 10px; margin-bottom: 24px;
}
.search-row input {
    flex: 1; background: #131a2b; border: 1px solid #1e3a5f;
    color: #c8d6e5; padding: 12px 16px; border-radius: 8px;
    font-size: 15px; font-family: inherit;
}
.search-row input::placeholder { color: #3a4a5c; }
.search-row select {
    background: #131a2b; border: 1px solid #1e3a5f;
    color: #c8d6e5; padding: 12px; border-radius: 8px; font-family: inherit;
}
.search-row button {
    background: #00d4aa; color: #0a0e17; border: none;
    padding: 12px 28px; border-radius: 8px; cursor: pointer;
    font-weight: 700; font-size: 15px; font-family: inherit;
    transition: background 0.15s;
}
.search-row button:hover { background: #00e8bb; }
.search-row button:disabled { background: #1e3a5f; color: #3a4a5c; cursor: wait; }

/* Index Table */
.index-table { width: 100%; border-collapse: collapse; }
.index-table th {
    text-align: left; padding: 10px 12px; font-size: 11px;
    color: #5a6e82; text-transform: uppercase; letter-spacing: 0.5px;
    border-bottom: 1px solid #1e3a5f;
}
.index-table td {
    padding: 14px 12px; border-bottom: 1px solid #131a2b;
    font-size: 14px;
}
.index-table tr:hover { background: #131a2b; }
.index-table .player-name { font-weight: 600; }

/* Score Card */
.scorecard {
    display: flex; gap: 24px; align-items: flex-start;
}
.scorecard-main { flex: 1; }
.scorecard-side {
    width: 200px; display: flex; flex-direction: column;
    align-items: center; gap: 8px; padding: 20px;
    background: #131a2b; border-radius: 12px;
}
.scorecard-side .big-score {
    font-size: 48px; font-weight: 800;
}
.scorecard-side .label {
    font-size: 12px; color: #5a6e82; text-transform: uppercase; letter-spacing: 1px;
}

/* Prediction */
.pred-row {
    display: flex; gap: 12px; margin-top: 16px;
}
.pred-box {
    flex: 1; background: #131a2b; border-radius: 8px; padding: 14px;
    text-align: center;
}
.pred-box .value { font-size: 22px; font-weight: 700; }
.pred-box .label { font-size: 11px; color: #5a6e82; margin-top: 4px; }

/* Alert */
.alert {
    padding: 14px 18px; border-radius: 8px; margin-bottom: 16px;
    border-left: 4px solid;
}
.alert.critical { background: #2a0a0a; border-color: #ff4444; }
.alert.warning { background: #2a2000; border-color: #ffd700; }
.alert.positive { background: #0a2e22; border-color: #00d4aa; }
.alert .alert-title { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
.alert .alert-msg { font-size: 13px; color: #8b9cb5; }

/* Report */
.report-pre {
    white-space: pre-wrap; font-family: 'Courier New', monospace;
    font-size: 12px; line-height: 1.6; color: #8b9cb5;
    background: #080b12; border-radius: 8px; padding: 20px;
    max-height: 600px; overflow-y: auto;
}

/* Watchlist */
.wl-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid #131a2b;
    cursor: pointer; transition: opacity 0.15s;
}
.wl-item:hover { opacity: 0.8; }
.wl-item .wl-name { flex: 1; font-size: 14px; font-weight: 500; }
.wl-item .wl-remove {
    color: #3a4050; font-size: 18px; cursor: pointer;
    width: 24px; text-align: center;
}
.wl-item .wl-remove:hover { color: #ff4444; }

/* Tabs */
.tabs { display: flex; gap: 0; margin-bottom: 20px; }
.tab-btn {
    padding: 10px 20px; background: none; border: none;
    color: #5a6e82; font-size: 14px; cursor: pointer;
    border-bottom: 2px solid transparent; font-family: inherit;
    font-weight: 500; transition: all 0.15s;
}
.tab-btn:hover { color: #c8d6e5; }
.tab-btn.active { color: #00d4aa; border-bottom-color: #00d4aa; }

/* Logs */
.log-row {
    display: flex; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid #131a2b; font-size: 13px; align-items: center;
}
.log-row .log-ts { color: #3a4a5c; width: 130px; flex-shrink: 0; }
.log-row .log-player { color: #00d4aa; width: 150px; flex-shrink: 0; font-weight: 500; }
.log-row .log-info { flex: 1; color: #5a6e82; }
.log-row .log-trigger {
    font-size: 11px; background: #131a2b; padding: 2px 8px;
    border-radius: 8px; color: #5a6e82;
}

/* Spinner */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid #1e3a5f; border-top-color: #00d4aa;
    border-radius: 50%; animation: spin 0.6s linear infinite;
    margin-right: 8px; vertical-align: middle;
}

/* Responsive */
@media (max-width: 768px) {
    .scorecard { flex-direction: column-reverse; }
    .scorecard-side { width: 100%; flex-direction: row; justify-content: center; }
    .pred-row { flex-direction: column; }
    .search-row { flex-direction: column; }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0e17; }
::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
"""

DASHBOARD_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VibeCheck - Athlete Behavioral Intelligence</title>
<style>""" + STYLE + """</style>
</head>
<body>

<div class="topbar">
    <div class="brand">
        <h1>VIBE<span>CHECK</span></h1>
        <span class="tag">BETA</span>
    </div>
    <nav>
        <a href="/" class="active">Dashboard</a>
        <a href="/index">Index</a>
    </nav>
</div>

<div class="page">

    <!-- Search -->
    <div class="search-row">
        <input type="text" id="scoutName" placeholder="Check any player's vibe..." onkeydown="if(event.key==='Enter')doCheck()">
        <select id="scoutDays">
            <option value="7">7 days</option>
            <option value="14" selected>14 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
        </select>
        <button id="checkBtn" onclick="doCheck()">VIBECHECK</button>
    </div>

    <!-- Result Area -->
    <div id="resultArea" style="display:none">

        <!-- Score Card -->
        <div class="card" id="scorecardArea"></div>

        <!-- Tabs: Report / Audit / Logs -->
        <div class="tabs">
            <button class="tab-btn active" data-tab="report" onclick="switchTab('report')">Full Report</button>
            <button class="tab-btn" data-tab="audit" onclick="switchTab('audit')">Self-Check</button>
            <button class="tab-btn" data-tab="trend" onclick="switchTab('trend')">Trend & Prediction</button>
        </div>
        <div class="card">
            <div id="tabReport"><div class="report-pre" id="reportText"></div></div>
            <div id="tabAudit" style="display:none"></div>
            <div id="tabTrend" style="display:none"></div>
        </div>
    </div>

    <!-- Watchlist + Logs (two columns) -->
    <div style="display:flex;gap:20px;margin-top:8px">
        <div class="card" style="flex:1">
            <h2>Watchlist</h2>
            <div style="display:flex;gap:6px;margin-bottom:14px">
                <input type="text" id="addName" placeholder="Add player..." onkeydown="if(event.key==='Enter')addPlayer()" style="flex:1;background:#131a2b;border:1px solid #1e3a5f;color:#c8d6e5;padding:8px 10px;border-radius:6px;font-family:inherit;font-size:13px">
                <button onclick="addPlayer()" style="background:#00d4aa;color:#0a0e17;border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-weight:700;font-family:inherit">+</button>
            </div>
            <div id="watchlistArea"></div>
        </div>
        <div class="card" style="flex:2">
            <h2>Recent Checks</h2>
            <div id="logsArea"></div>
        </div>
    </div>

</div>

<script>
let currentResult = null;
let watchlist = { players: [], settings: { days: 14 } };

async function api(method, path, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(path, opts);
    return r.json();
}

function badgeClass(score) {
    if (score <= 2) return 'low';
    if (score <= 5) return 'mod';
    if (score <= 7) return 'high';
    return 'crit';
}

function trendArrow(dir) {
    if (dir === 'rising') return '<span class="trend-up">&#9650; Rising</span>';
    if (dir === 'falling') return '<span class="trend-down">&#9660; Falling</span>';
    if (dir === 'stable') return '<span class="trend-stable">&#9654; Stable</span>';
    return '<span class="trend-unknown">-- No data</span>';
}

// ── VibeCheck a player ──
async function doCheck() {
    const name = document.getElementById('scoutName').value.trim();
    if (!name) return;
    const days = parseInt(document.getElementById('scoutDays').value);
    const btn = document.getElementById('checkBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Checking...';

    try {
        currentResult = await api('POST', '/api/scout', { player: name, days });
        showScorecard();
        showReportTab();
        document.getElementById('resultArea').style.display = 'block';
        switchTab('report');
        loadLogs();
    } catch(e) {
        alert('Error: ' + e.message);
    }
    btn.disabled = false;
    btn.textContent = 'VIBECHECK';
}

function showScorecard() {
    const r = currentResult;
    const log = r.log;
    const trend = r.trend || {};
    const sc = log.risk_score;
    const cls = badgeClass(sc);

    let alertHtml = '';
    if (trend.alert) {
        const a = trend.alert;
        alertHtml = '<div class="alert ' + a.level + '">' +
            '<div class="alert-title">' + a.level.toUpperCase() + ' ALERT</div>' +
            '<div class="alert-msg">' + a.message + '</div>' +
            '<div class="alert-msg" style="margin-top:4px;color:#c8d6e5">&#8594; ' + a.action + '</div>' +
            '</div>';
    }

    let predHtml = '';
    if (trend.prediction_30d !== null && trend.prediction_30d !== undefined) {
        predHtml = '<div class="pred-row">' +
            '<div class="pred-box"><div class="value ' + badgeClass(trend.prediction_30d) + '">' + trend.prediction_30d + '</div><div class="label">Predicted 30d</div></div>' +
            '<div class="pred-box"><div class="value ' + badgeClass(trend.prediction_90d) + '">' + trend.prediction_90d + '</div><div class="label">Predicted 90d</div></div>' +
            '<div class="pred-box"><div class="value">' + (trend.data_points || 1) + '</div><div class="label">Data Points</div></div>' +
            '</div>';
    }

    document.getElementById('scorecardArea').innerHTML =
        alertHtml +
        '<div class="scorecard">' +
        '  <div class="scorecard-main">' +
        '    <h2 style="font-size:22px;color:#c8d6e5;margin-bottom:4px">' + log.player + '</h2>' +
        '    <div style="color:#5a6e82;font-size:14px;margin-bottom:12px">' +
        '      ' + log.risk_label + ' &middot; ' + log.articles_found + ' articles &middot; ' +
        '      ' + Math.round(log.self_check.confidence * 100) + '% confidence &middot; ' +
        '      ' + trendArrow(trend.direction || 'insufficient_data') +
        '      ' + (trend.sparkline ? ' &nbsp;<span class="sparkline">[' + trend.sparkline + ']</span>' : '') +
        '    </div>' +
        predHtml +
        '  </div>' +
        '  <div class="scorecard-side">' +
        '    <div class="label">VibeScore</div>' +
        '    <div class="big-score" style="color:' + ({low:'#00d4aa',mod:'#ffd700',high:'#ff6b35',crit:'#ff4444'}[cls]) + '">' + sc + '</div>' +
        '    <div class="label">out of 10</div>' +
        '  </div>' +
        '</div>';
}

function showReportTab() {
    if (!currentResult) return;
    document.getElementById('reportText').textContent = currentResult.report;
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.getElementById('tabReport').style.display = tab === 'report' ? 'block' : 'none';
    document.getElementById('tabAudit').style.display = tab === 'audit' ? 'block' : 'none';
    document.getElementById('tabTrend').style.display = tab === 'trend' ? 'block' : 'none';

    if (tab === 'audit') showAuditTab();
    if (tab === 'trend') showTrendTab();
}

function showAuditTab() {
    const el = document.getElementById('tabAudit');
    if (!currentResult) { el.innerHTML = '<p style="color:#3a4a5c">Run a check first</p>'; return; }
    const sc = currentResult.log.self_check;
    const ri = currentResult.log.review_items || [];
    let h = '<div style="margin-bottom:16px"><span style="font-size:32px;font-weight:800;color:' +
        (sc.confidence >= 0.8 ? '#00d4aa' : sc.confidence >= 0.5 ? '#ffd700' : '#ff4444') + '">' +
        Math.round(sc.confidence * 100) + '%</span><span style="color:#5a6e82;margin-left:8px">confidence</span></div>';

    if (sc.passed) {
        h += '<div class="alert positive"><div class="alert-title">ALL CHECKS PASSED</div><div class="alert-msg">Output looks reliable.</div></div>';
    } else {
        sc.issues.forEach((issue, i) => {
            h += '<div class="alert critical" style="margin-bottom:8px"><div class="alert-title">' + issue + '</div><div class="alert-msg">Fix: ' + sc.suggestions[i] + '</div></div>';
        });
    }
    if (ri.length) {
        h += '<h3 style="color:#ffd700;margin:20px 0 12px;font-size:14px">Needs Human Review</h3>';
        ri.forEach(item => {
            h += '<div class="alert warning" style="margin-bottom:8px"><div class="alert-title">' + item.reason + '</div><div class="alert-msg">' + item.detail + '</div><div class="alert-msg" style="margin-top:4px;color:#c8d6e5">&#8594; ' + item.action + '</div></div>';
        });
    }

    const tiers = currentResult.log.tiers;
    h += '<h3 style="color:#5a6e82;margin:20px 0 12px;font-size:14px">Cost Tiers</h3>';
    h += '<div style="display:flex;gap:10px">';
    h += '<div style="flex:1;padding:12px;background:#131a2b;border-radius:8px;text-align:center"><div style="color:#00d4aa;font-size:11px;font-weight:700">FREE</div><div style="font-size:12px;color:#5a6e82;margin-top:4px">' + tiers.free + '</div></div>';
    h += '<div style="flex:1;padding:12px;background:#131a2b;border-radius:8px;text-align:center"><div style="color:#ffd700;font-size:11px;font-weight:700">CHEAP</div><div style="font-size:12px;color:#5a6e82;margin-top:4px">' + tiers.cheap + '</div></div>';
    h += '<div style="flex:1;padding:12px;background:#131a2b;border-radius:8px;text-align:center"><div style="color:#ff4444;font-size:11px;font-weight:700">EXPENSIVE</div><div style="font-size:12px;color:#5a6e82;margin-top:4px">' + tiers.expensive + '</div></div>';
    h += '</div>';
    el.innerHTML = h;
}

function showTrendTab() {
    const el = document.getElementById('tabTrend');
    if (!currentResult || !currentResult.trend) { el.innerHTML = '<p style="color:#3a4a5c">No trend data yet. Run multiple checks over time.</p>'; return; }
    const t = currentResult.trend;
    let h = '<h3 style="color:#c8d6e5;margin-bottom:16px">Behavioral Trend Analysis</h3>';
    h += '<div style="display:flex;gap:16px;margin-bottom:20px">';
    h += '<div class="pred-box"><div class="value">' + trendArrow(t.direction) + '</div><div class="label">Direction</div></div>';
    h += '<div class="pred-box"><div class="value">' + t.slope + '</div><div class="label">Slope</div></div>';
    h += '<div class="pred-box"><div class="value">' + t.data_points + '</div><div class="label">Data Points</div></div>';
    h += '</div>';

    if (t.prediction_30d !== null) {
        h += '<h3 style="color:#8b9cb5;margin-bottom:12px;font-size:14px">Predictions</h3>';
        h += '<div style="display:flex;gap:16px;margin-bottom:20px">';
        h += '<div class="pred-box"><div class="value" style="color:' + ({low:'#00d4aa',mod:'#ffd700',high:'#ff6b35',crit:'#ff4444'}[badgeClass(t.prediction_30d)]) + '">' + t.prediction_30d + '/10</div><div class="label">30-Day Forecast</div></div>';
        h += '<div class="pred-box"><div class="value" style="color:' + ({low:'#00d4aa',mod:'#ffd700',high:'#ff6b35',crit:'#ff4444'}[badgeClass(t.prediction_90d)]) + '">' + t.prediction_90d + '/10</div><div class="label">90-Day Forecast</div></div>';
        h += '</div>';
    }

    if (t.sparkline) {
        h += '<div style="background:#131a2b;padding:20px;border-radius:8px;text-align:center;margin-bottom:16px">';
        h += '<div style="font-size:11px;color:#5a6e82;margin-bottom:8px">SCORE HISTORY</div>';
        h += '<div class="sparkline" style="font-size:24px;letter-spacing:3px">' + t.sparkline + '</div>';
        h += '</div>';
    }

    if (t.alert) {
        h += '<div class="alert ' + t.alert.level + '"><div class="alert-title">TREND ALERT: ' + t.alert.level.toUpperCase() + '</div><div class="alert-msg">' + t.alert.message + '</div><div class="alert-msg" style="margin-top:4px;color:#c8d6e5">&#8594; ' + t.alert.action + '</div></div>';
    }

    if (t.data_points < 3) {
        h += '<div style="color:#3a4a5c;font-size:13px;margin-top:12px;text-align:center">Need 3+ data points for reliable predictions. Keep running checks.</div>';
    }

    el.innerHTML = h;
}

// ── Watchlist ──
async function loadWatchlist() {
    watchlist = await api('GET', '/api/watchlist');
    renderWatchlist();
}
function renderWatchlist() {
    const el = document.getElementById('watchlistArea');
    const players = watchlist.players || [];
    if (!players.length) {
        el.innerHTML = '<div style="color:#2a3a4c;font-size:13px;padding:12px 0">No players. Add one above.</div>';
        return;
    }
    el.innerHTML = players.map((p, i) => {
        const name = typeof p === 'string' ? p : p.name;
        const score = typeof p === 'object' && p.last_score !== undefined && p.last_score !== null ? p.last_score : null;
        const cls = score === null ? 'trend-unknown' : badgeClass(score);
        return '<div class="wl-item" onclick="checkFromList(\\'' + name.replace(/'/g, "\\\\'") + '\\')">' +
            (score !== null ? '<div class="vibe-badge-sm ' + cls + '">' + score + '</div>' : '<div class="vibe-badge-sm" style="border-color:#2a3a4c;color:#2a3a4c">?</div>') +
            '<span class="wl-name">' + name + '</span>' +
            '<span class="wl-remove" onclick="event.stopPropagation();removePlayer(' + i + ')">x</span>' +
            '</div>';
    }).join('');
}
async function addPlayer() {
    const input = document.getElementById('addName');
    const name = input.value.trim();
    if (!name) return;
    await api('POST', '/api/watchlist', { action: 'add', player: name });
    input.value = '';
    await loadWatchlist();
}
async function removePlayer(i) {
    await api('POST', '/api/watchlist', { action: 'remove', index: i });
    await loadWatchlist();
}
function checkFromList(name) {
    document.getElementById('scoutName').value = name;
    doCheck();
}

// ── Logs ──
async function loadLogs() {
    const logs = await api('GET', '/api/logs');
    const el = document.getElementById('logsArea');
    if (!logs.length) { el.innerHTML = '<div style="color:#2a3a4c;font-size:13px">No checks yet</div>'; return; }
    el.innerHTML = logs.reverse().slice(0, 20).map(l => {
        const ts = (l.timestamp || '').substring(0, 16).replace('T', ' ');
        const cls = badgeClass(l.risk_score);
        return '<div class="log-row">' +
            '<span class="log-ts">' + ts + '</span>' +
            '<span class="log-player">' + (l.player || '?') + '</span>' +
            '<span class="vibe-badge-sm ' + cls + '" style="width:28px;height:28px;font-size:11px">' + l.risk_score + '</span>' +
            '<span class="log-info">' + (l.risk_label || '') + ' &middot; ' + (l.articles_found || 0) + ' articles &middot; ' + (l.duration_ms || 0) + 'ms</span>' +
            '<span class="log-trigger">' + (l.trigger || '?') + '</span>' +
            '</div>';
    }).join('');
}

// ── Init ──
loadWatchlist();
loadLogs();
</script>
</body>
</html>"""


INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VibeCheck Index - Player Rankings</title>
<style>""" + STYLE + """</style>
</head>
<body>

<div class="topbar">
    <div class="brand">
        <h1>VIBE<span>CHECK</span></h1>
        <span class="tag">INDEX</span>
    </div>
    <nav>
        <a href="/">Dashboard</a>
        <a href="/index" class="active">Index</a>
    </nav>
</div>

<div class="page">
    <div class="card">
        <h2 style="font-size:18px;color:#c8d6e5;margin-bottom:4px">VibeCheck Index</h2>
        <p style="color:#5a6e82;font-size:13px;margin-bottom:20px">All monitored players ranked by behavioral risk. Updated every run.</p>
        <div id="indexContent">Loading...</div>
    </div>
</div>

<script>
function badgeClass(score) {
    if (score <= 2) return 'low';
    if (score <= 5) return 'mod';
    if (score <= 7) return 'high';
    return 'crit';
}
function trendArrow(dir) {
    if (dir === 'rising') return '<span class="trend-up">&#9650;</span>';
    if (dir === 'falling') return '<span class="trend-down">&#9660;</span>';
    if (dir === 'stable') return '<span class="trend-stable">&#9654;</span>';
    return '<span class="trend-unknown">--</span>';
}

async function loadIndex() {
    const r = await fetch('/api/index');
    const data = await r.json();
    const el = document.getElementById('indexContent');
    if (!data.length) {
        el.innerHTML = '<p style="color:#3a4a5c">No players tracked yet. <a href="/">Run a check</a> to start building the index.</p>';
        return;
    }
    let h = '<table class="index-table"><thead><tr>';
    h += '<th>#</th><th>Player</th><th>VibeScore</th><th>Trend</th><th>History</th>';
    h += '<th>30d Pred</th><th>90d Pred</th><th>Checks</th><th>Last Check</th><th>Alert</th>';
    h += '</tr></thead><tbody>';
    data.forEach((p, i) => {
        const cls = badgeClass(p.vibe_score);
        const p30cls = p.prediction_30d !== null ? badgeClass(p.prediction_30d) : '';
        const p90cls = p.prediction_90d !== null ? badgeClass(p.prediction_90d) : '';
        h += '<tr>';
        h += '<td style="color:#3a4a5c">' + (i + 1) + '</td>';
        h += '<td class="player-name"><a href="/?player=' + encodeURIComponent(p.player) + '">' + p.player + '</a></td>';
        h += '<td><span class="vibe-badge-sm ' + cls + '">' + p.vibe_score + '</span></td>';
        h += '<td>' + trendArrow(p.trend) + ' <span style="color:#5a6e82;font-size:12px">' + p.slope + '</span></td>';
        h += '<td><span class="sparkline">' + (p.sparkline || '--') + '</span></td>';
        h += '<td style="color:' + ({low:'#00d4aa',mod:'#ffd700',high:'#ff6b35',crit:'#ff4444'}[p30cls] || '#3a4a5c') + '">' + (p.prediction_30d !== null ? p.prediction_30d : '--') + '</td>';
        h += '<td style="color:' + ({low:'#00d4aa',mod:'#ffd700',high:'#ff6b35',crit:'#ff4444'}[p90cls] || '#3a4a5c') + '">' + (p.prediction_90d !== null ? p.prediction_90d : '--') + '</td>';
        h += '<td style="color:#5a6e82">' + p.data_points + '</td>';
        h += '<td style="color:#5a6e82">' + p.last_check + '</td>';
        h += '<td>' + (p.alert ? '<span style="color:' + (p.alert.level === 'critical' ? '#ff4444' : p.alert.level === 'warning' ? '#ffd700' : '#00d4aa') + ';font-size:12px">' + p.alert.level.toUpperCase() + '</span>' : '<span style="color:#2a3a4c">--</span>') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    el.innerHTML = h;
}

loadIndex();
</script>
</body>
</html>"""


PLAYER_CARD_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VibeCheck: {player_name}</title>
<meta property="og:title" content="VibeCheck: {player_name} - {score}/10">
<meta property="og:description" content="{risk_label} | {trend_direction} trend | {articles} articles analyzed">
<style>""" + STYLE + """
.public-card {{
    max-width: 600px; margin: 40px auto; text-align: center;
}}
.public-card .big-ring {{
    width: 120px; height: 120px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; font-weight: 800; margin: 0 auto 16px;
    border: 5px solid;
}}
.public-card .big-ring.low {{ border-color: #00d4aa; color: #00d4aa; background: #0a2e22; }}
.public-card .big-ring.mod {{ border-color: #ffd700; color: #ffd700; background: #2a2400; }}
.public-card .big-ring.high {{ border-color: #ff6b35; color: #ff6b35; background: #2a1508; }}
.public-card .big-ring.crit {{ border-color: #ff4444; color: #ff4444; background: #2a0a0a; }}
</style>
</head>
<body>

<div class="topbar">
    <div class="brand">
        <h1>VIBE<span>CHECK</span></h1>
    </div>
    <nav>
        <a href="/">Dashboard</a>
        <a href="/index">Index</a>
    </nav>
</div>

<div class="page">
    <div class="card public-card">
        <div class="big-ring {badge_class}">{score}</div>
        <h1 style="font-size:28px;margin-bottom:8px">{player_name}</h1>
        <p style="color:#5a6e82;font-size:16px;margin-bottom:20px">{risk_label}</p>

        <div style="display:flex;gap:12px;justify-content:center;margin-bottom:20px">
            <div class="pred-box">
                <div class="value">{trend_arrow}</div>
                <div class="label">Trend</div>
            </div>
            <div class="pred-box">
                <div class="value">{data_points}</div>
                <div class="label">Checks</div>
            </div>
            <div class="pred-box">
                <div class="value">{articles}</div>
                <div class="label">Articles</div>
            </div>
        </div>

        {prediction_html}

        {alert_html}

        {sparkline_html}

        <p style="color:#3a4a5c;font-size:12px;margin-top:24px">
            Last updated: {last_check} | <a href="/">Run a new check</a>
        </p>
    </div>
</div>

</body>
</html>"""


# ─── Server ───────────────────────────────────────────────────────────────────

class VibeCheckHandler(BaseHTTPRequestHandler):

    def log_message(self, fmt, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {args[0]}\n")

    def _json(self, data, status=200):
        body = json.dumps(data, default=str).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _html(self, content):
        body = content.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        return json.loads(self.rfile.read(length))

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        qs = urllib.parse.parse_qs(parsed.query)

        if path == "/":
            self._html(DASHBOARD_HTML)

        elif path == "/index":
            self._html(INDEX_HTML)

        elif path.startswith("/player/"):
            player_slug = path[len("/player/"):]
            self._serve_player_card(player_slug)

        elif path == "/api/watchlist":
            self._json(load_watchlist())

        elif path == "/api/logs":
            self._json(get_recent_logs(100))

        elif path == "/api/index":
            self._json(get_vibecheck_index())

        elif path == "/api/history":
            player = qs.get("player", [""])[0]
            if player:
                from scout import get_history as gh
                self._json(gh(player))
            else:
                self._json([])

        else:
            self.send_error(404)

    def _serve_player_card(self, slug):
        from scout import get_history, compute_trend, _player_slug
        # Find player name from watchlist
        wl = load_watchlist()
        player_name = slug.replace("-", " ").replace("_", " ").title()
        for p in wl.get("players", []):
            pname = p if isinstance(p, str) else p.get("name", "")
            if _player_slug(pname) == slug.replace("-", "_"):
                player_name = pname
                break

        history = get_history(player_name)
        if not history:
            self._html(f"<html><body style='background:#0a0e17;color:#c8d6e5;font-family:sans-serif;text-align:center;padding:80px'>"
                       f"<h1>No data for {player_name}</h1><p><a href='/' style='color:#00d4aa'>Run a check first</a></p></body></html>")
            return

        trend = compute_trend(history)
        latest = history[-1]
        score = latest["score"]

        badge_class = "low" if score <= 2 else "mod" if score <= 5 else "high" if score <= 7 else "crit"
        risk_label = categorize_risk(score)

        trend_arrows = {"rising": '<span class="trend-up">&#9650; Rising</span>',
                       "falling": '<span class="trend-down">&#9660; Falling</span>',
                       "stable": '<span class="trend-stable">&#9654; Stable</span>'}
        trend_arrow = trend_arrows.get(trend["direction"], '<span class="trend-unknown">-- New</span>')

        pred_html = ""
        if trend["prediction_30d"] is not None:
            pred_html = ('<div style="display:flex;gap:12px;justify-content:center;margin-bottom:20px">'
                        f'<div class="pred-box"><div class="value">{trend["prediction_30d"]}/10</div><div class="label">30-Day Forecast</div></div>'
                        f'<div class="pred-box"><div class="value">{trend["prediction_90d"]}/10</div><div class="label">90-Day Forecast</div></div>'
                        '</div>')

        alert_html = ""
        if trend["alert"]:
            a = trend["alert"]
            alert_html = f'<div class="alert {a["level"]}"><div class="alert-title">{a["level"].upper()}</div><div class="alert-msg">{a["message"]}</div></div>'

        spark_html = ""
        if trend["sparkline"]:
            spark_html = f'<div style="background:#131a2b;padding:16px;border-radius:8px;margin-bottom:16px"><div class="sparkline" style="font-size:20px;letter-spacing:3px">{trend["sparkline"]}</div><div style="color:#3a4a5c;font-size:11px;margin-top:6px">Score History</div></div>'

        html = PLAYER_CARD_TEMPLATE.format(
            player_name=player_name,
            score=score,
            badge_class=badge_class,
            risk_label=risk_label,
            trend_direction=trend["direction"],
            trend_arrow=trend_arrow,
            data_points=trend["data_points"],
            articles=latest.get("articles", 0),
            prediction_html=pred_html,
            alert_html=alert_html,
            sparkline_html=spark_html,
            last_check=latest["date"],
        )
        self._html(html)

    def do_POST(self):
        path = urllib.parse.urlparse(self.path).path

        if path == "/api/scout":
            data = self._read_body()
            player = data.get("player", "").strip()
            days = int(data.get("days", 14))
            if not player:
                self._json({"error": "player name required"}, 400)
                return
            result = run_scout(player, days=days, trigger="web")
            # Update watchlist score
            wl = load_watchlist()
            for i, p in enumerate(wl["players"]):
                name = p if isinstance(p, str) else p.get("name", "")
                if name.lower() == player.lower():
                    wl["players"][i] = {"name": name, "last_score": result["log"]["risk_score"]}
                    save_watchlist(wl)
                    break
            self._json(result)

        elif path == "/api/watchlist":
            data = self._read_body()
            wl = load_watchlist()
            action = data.get("action")
            if action == "add":
                name = data.get("player", "").strip()
                if name:
                    existing = [
                        (p if isinstance(p, str) else p.get("name", "")).lower()
                        for p in wl["players"]
                    ]
                    if name.lower() not in existing:
                        wl["players"].append({"name": name, "last_score": None})
                        save_watchlist(wl)
            elif action == "remove":
                idx = data.get("index")
                if isinstance(idx, int) and 0 <= idx < len(wl["players"]):
                    wl["players"].pop(idx)
                    save_watchlist(wl)
            self._json(wl)

        else:
            self.send_error(404)


def main():
    port = PORT
    for i, arg in enumerate(sys.argv[1:], 1):
        if arg == "--port" and i + 1 < len(sys.argv):
            try:
                port = int(sys.argv[i + 1])
            except ValueError:
                pass

    server = HTTPServer(("0.0.0.0", port), VibeCheckHandler)
    print(f"[*] VibeCheck running at http://localhost:{port}")
    print(f"[*] Public player cards at http://localhost:{port}/player/<name>")
    print(f"[*] Index at http://localhost:{port}/index")
    print(f"[*] Press Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Shutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
