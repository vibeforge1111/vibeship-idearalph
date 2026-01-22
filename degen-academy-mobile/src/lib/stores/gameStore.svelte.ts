// Game Store - Svelte 5 Runes
// Central state management for DEGEN ACADEMY

import { GAME_CONSTANTS } from '../../data/constants';
import { createInitialPools } from '../../data/pools';
import { getRandomQuote, type QuoteCategory } from '../../data/ralph-quotes';
import { saveManager } from '../../systems/SaveManager';
import type { GameState, Pool, EventType, GameEvent } from '../../types/game';

// Screen types
export type Screen = 'menu' | 'game' | 'death' | 'win';

type Toast = { id: string; title: string; message: string; type: 'success' | 'danger' | 'warning' | 'info' };

// Create initial game state
function createInitialState(): GameState {
  const savedStats = saveManager.getStats();

  return {
    portfolio: GAME_CONSTANTS.STARTING_PORTFOLIO,
    pools: createInitialPools(),
    items: { audits: 0, insurance: 0 },
    halvingMultiplier: 1,
    gasMultiplier: 1,
    gasEndTime: null,
    whaleEndTime: null,
    isGameOver: false,
    isVictory: false,
    currentRun: {
      startTime: Date.now(),
      elapsed: 0,
      halvingCount: 0,
    },
    stats: {
      rugsEaten: 0,
      highestPortfolio: GAME_CONSTANTS.STARTING_PORTFOLIO,
      gamesPlayed: savedStats.gamesPlayed,
      totalTimePlayed: savedStats.totalTimePlayed,
      fastestWin: savedStats.fastestWin,
    },
  };
}

// Reactive store object - we only mutate properties, never reassign the whole object
const store = $state({
  currentScreen: 'menu' as Screen,
  game: createInitialState(),
  ralphQuote: getRandomQuote('welcome'),
  toasts: [] as Toast[],
});

// Intervals
let yieldInterval: number | null = null;
let rngInterval: number | null = null;
let nextRngTime: number = 0;

// Getter functions for reactive state access
export function getCurrentScreen(): Screen {
  return store.currentScreen;
}

export function getGameState(): GameState {
  return store.game;
}

export function getRalphQuote(): string {
  return store.ralphQuote;
}

export function getToasts(): Toast[] {
  return store.toasts;
}

// Derived getters (exported as functions to maintain reactivity)
export const currentScreen = {
  get value() { return store.currentScreen; }
};

export const gameState = {
  get value() { return store.game; }
};

export const ralphQuote = {
  get value() { return store.ralphQuote; }
};

export const toasts = {
  get value() { return store.toasts; }
};

// Simple derived values
export const portfolio = {
  get value() { return store.game.portfolio; }
};

export const pools = {
  get value() { return store.game.pools; }
};

export const items = {
  get value() { return store.game.items; }
};

export const halvingMultiplier = {
  get value() { return store.game.halvingMultiplier; }
};

export const gasMultiplier = {
  get value() { return store.game.gasMultiplier; }
};

export const isGameOver = {
  get value() { return store.game.isGameOver; }
};

export const isVictory = {
  get value() { return store.game.isVictory; }
};

// Calculate time until next halving
export function halvingTimeRemaining(): number {
  const elapsed = store.game.currentRun.elapsed;
  const interval = GAME_CONSTANTS.HALVING_INTERVAL_MS;
  const timeInCycle = elapsed % interval;
  return interval - timeInCycle;
}

// Calculate total yield per second
export function totalYieldPerSecond(): number {
  let total = 0;
  for (const pool of store.game.pools) {
    if (pool.isRugged || pool.deposited <= 0) continue;
    let yps = pool.deposited * (pool.apy / 100) / 365 / 24 / 60 / 60;
    yps *= store.game.halvingMultiplier;
    if (pool.isPumping) yps *= GAME_CONSTANTS.PUMP_MULTIPLIER;
    if (store.game.whaleEndTime && Date.now() < store.game.whaleEndTime) {
      const reduction = store.game.items.insurance > 0
        ? GAME_CONSTANTS.WHALE_YIELD_REDUCTION * GAME_CONSTANTS.INSURANCE_DAMAGE_REDUCTION
        : GAME_CONSTANTS.WHALE_YIELD_REDUCTION;
      yps *= (1 - reduction);
    }
    total += yps;
  }
  return total;
}

// Actions
export function setScreen(screen: Screen) {
  store.currentScreen = screen;
}

export function startGame() {
  // Reset game state by copying fresh values
  const fresh = createInitialState();
  store.game.portfolio = fresh.portfolio;
  store.game.pools = fresh.pools;
  store.game.items = fresh.items;
  store.game.halvingMultiplier = fresh.halvingMultiplier;
  store.game.gasMultiplier = fresh.gasMultiplier;
  store.game.gasEndTime = fresh.gasEndTime;
  store.game.whaleEndTime = fresh.whaleEndTime;
  store.game.isGameOver = fresh.isGameOver;
  store.game.isVictory = fresh.isVictory;
  store.game.currentRun = fresh.currentRun;
  store.game.stats = fresh.stats;

  store.ralphQuote = getRandomQuote('welcome');
  store.currentScreen = 'game';
  startIntervals();
}

function startIntervals() {
  stopIntervals();

  // Yield tick every second
  yieldInterval = setInterval(() => {
    tickYields();
    updateElapsed();
    checkHalving();
    checkTemporaryEffects();
    checkEndConditions();
  }, GAME_CONSTANTS.YIELD_TICK_MS) as unknown as number;

  // RNG events
  resetRngInterval();
  rngInterval = setInterval(() => {
    if (Date.now() >= nextRngTime) {
      checkRngEvent();
      resetRngInterval();
    }
  }, 1000) as unknown as number;
}

export function stopIntervals() {
  if (yieldInterval) clearInterval(yieldInterval);
  if (rngInterval) clearInterval(rngInterval);
  yieldInterval = null;
  rngInterval = null;
}

function resetRngInterval() {
  const base = GAME_CONSTANTS.RNG_CHECK_INTERVAL_MS;
  const variance = GAME_CONSTANTS.RNG_VARIANCE_MS;
  nextRngTime = Date.now() + base + (Math.random() * variance * 2 - variance);
}

function tickYields() {
  let totalYield = 0;

  for (const pool of store.game.pools) {
    if (pool.isRugged || pool.deposited <= 0) continue;

    let yps = pool.deposited * (pool.apy / 100) / 365 / 24 / 60 / 60;
    yps *= store.game.halvingMultiplier;

    if (store.game.whaleEndTime && Date.now() < store.game.whaleEndTime) {
      const reduction = store.game.items.insurance > 0
        ? GAME_CONSTANTS.WHALE_YIELD_REDUCTION * GAME_CONSTANTS.INSURANCE_DAMAGE_REDUCTION
        : GAME_CONSTANTS.WHALE_YIELD_REDUCTION;
      yps *= (1 - reduction);
    }

    if (pool.isPumping && pool.pumpEndTime && Date.now() < pool.pumpEndTime) {
      yps *= GAME_CONSTANTS.PUMP_MULTIPLIER;
    }

    totalYield += yps;
  }

  store.game.portfolio += totalYield;

  if (store.game.portfolio > store.game.stats.highestPortfolio) {
    store.game.stats.highestPortfolio = store.game.portfolio;
  }
}

function updateElapsed() {
  store.game.currentRun.elapsed = Date.now() - store.game.currentRun.startTime;
}

function checkHalving() {
  const elapsed = store.game.currentRun.elapsed;
  const expectedHalvings = Math.floor(elapsed / GAME_CONSTANTS.HALVING_INTERVAL_MS);

  if (expectedHalvings > store.game.currentRun.halvingCount) {
    store.game.halvingMultiplier *= 0.5;
    store.game.currentRun.halvingCount = expectedHalvings;
    showToast('⏰ HALVING!', 'All yields cut by 50%!', 'warning');
    setRalphQuote('halving');
  }
}

function checkTemporaryEffects() {
  const now = Date.now();

  if (store.game.gasEndTime && now >= store.game.gasEndTime) {
    store.game.gasMultiplier = 1;
    store.game.gasEndTime = null;
  }

  if (store.game.whaleEndTime && now >= store.game.whaleEndTime) {
    store.game.whaleEndTime = null;
  }

  for (const pool of store.game.pools) {
    if (pool.isPumping && pool.pumpEndTime && now >= pool.pumpEndTime) {
      pool.isPumping = false;
      pool.pumpEndTime = null;
    }
  }
}

function checkEndConditions() {
  if (store.game.portfolio >= GAME_CONSTANTS.WIN_PORTFOLIO) {
    store.game.isVictory = true;
    stopIntervals();
    saveManager.recordGameEnd(store.game.stats, true, store.game.currentRun.elapsed);
    store.currentScreen = 'win';
  }

  if (store.game.portfolio <= 0) {
    store.game.isGameOver = true;
    stopIntervals();
    saveManager.recordGameEnd(store.game.stats, false, store.game.currentRun.elapsed);
    store.currentScreen = 'death';
  }
}

function checkRngEvent() {
  const event = rollForEvent();
  if (event) executeEvent(event);
}

function rollForEvent(): GameEvent | null {
  const weights = GAME_CONSTANTS.EVENT_WEIGHTS;
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const roll = Math.random() * total;

  let cumulative = 0;
  let eventType: EventType | null = null;

  for (const [type, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (roll < cumulative) {
      eventType = type as EventType;
      break;
    }
  }

  if (!eventType) return null;

  const targetPool = selectTargetPool(eventType);

  return {
    id: crypto.randomUUID(),
    type: eventType,
    targetPoolId: targetPool?.id ?? null,
    magnitude: Math.random(),
    timestamp: Date.now(),
    blocked: false,
    message: '',
  };
}

function selectTargetPool(eventType: EventType): Pool | null {
  const activePools = store.game.pools.filter(p => !p.isRugged && p.deposited > 0);
  if (activePools.length === 0) return null;

  if (eventType === 'rug' || eventType === 'exploit' || eventType === 'pump') {
    const totalWeight = activePools.reduce((sum, p) => sum + p.apy, 0);
    const roll = Math.random() * totalWeight;
    let cumulative = 0;

    for (const pool of activePools) {
      cumulative += pool.apy;
      if (roll < cumulative) return pool;
    }
  }

  return activePools[Math.floor(Math.random() * activePools.length)] ?? null;
}

function executeEvent(event: GameEvent) {
  switch (event.type) {
    case 'rug': executeRug(event); break;
    case 'exploit': executeExploit(event); break;
    case 'whale': executeWhaleDump(); break;
    case 'gas': executeGasSpike(); break;
    case 'pump': executePump(event); break;
  }
}

function executeRug(event: GameEvent) {
  if (!event.targetPoolId) return;

  const pool = store.game.pools.find(p => p.id === event.targetPoolId);
  if (!pool || pool.isRugged) return;

  const lostAmount = pool.deposited;
  pool.isRugged = true;
  pool.deposited = 0;
  store.game.stats.rugsEaten++;

  showToast('🚨 RUG PULL!', `${pool.name} rugged! Lost $${lostAmount.toFixed(2)}`, 'danger');
  setRalphQuote('rug');
}

function executeExploit(event: GameEvent) {
  if (!event.targetPoolId) return;

  const pool = store.game.pools.find(p => p.id === event.targetPoolId);
  if (!pool || pool.isRugged) return;

  if (store.game.items.audits > 0) {
    store.game.items.audits--;
    showToast('🛡️ EXPLOIT BLOCKED!', `Audit saved ${pool.name}!`, 'success');
    setRalphQuote('exploitBlocked');
    return;
  }

  const lostAmount = pool.deposited * GAME_CONSTANTS.EXPLOIT_DAMAGE;
  pool.deposited -= lostAmount;

  showToast('⚠️ EXPLOIT!', `${pool.name} hacked! Lost $${lostAmount.toFixed(2)}`, 'warning');
  setRalphQuote('exploit');
}

function executeWhaleDump() {
  store.game.whaleEndTime = Date.now() + GAME_CONSTANTS.WHALE_DURATION_MS;
  const reduction = store.game.items.insurance > 0 ? '15%' : '30%';

  showToast('🐋 WHALE DUMP!', `All yields -${reduction} for 60s`, 'info');
  setRalphQuote('whale');
}

function executeGasSpike() {
  store.game.gasMultiplier = GAME_CONSTANTS.GAS_MULTIPLIER;
  store.game.gasEndTime = Date.now() + GAME_CONSTANTS.GAS_DURATION_MS;

  showToast('⛽ GAS SPIKE!', 'Actions cost 3x for 30s!', 'warning');
  setRalphQuote('gas');
}

function executePump(event: GameEvent) {
  if (!event.targetPoolId) return;

  const pool = store.game.pools.find(p => p.id === event.targetPoolId);
  if (!pool || pool.isRugged) return;

  pool.isPumping = true;
  pool.pumpEndTime = Date.now() + GAME_CONSTANTS.PUMP_DURATION_MS;

  showToast('🚀 PUMP!', `${pool.name} 2x yields for 30s!`, 'success');
  setRalphQuote('pump');
}

// Player actions
export function deposit(poolId: string, amount: number) {
  const pool = store.game.pools.find(p => p.id === poolId);
  if (!pool || pool.isRugged) {
    showToast('❌ Pool Rugged', 'This pool has been rugged!', 'danger');
    return;
  }

  const cost = amount * store.game.gasMultiplier;
  if (store.game.portfolio < cost) {
    setRalphQuote('cantAfford');
    showToast('❌ Insufficient Funds', `Need $${cost.toFixed(2)}`, 'danger');
    return;
  }

  store.game.portfolio -= cost;
  pool.deposited += amount;

  const quoteType = pool.riskLevel === 'degen' ? 'depositHighRisk' : 'deposit';
  setRalphQuote(quoteType);
}

export function withdrawAll(poolId: string) {
  const pool = store.game.pools.find(p => p.id === poolId);
  if (!pool || pool.isRugged || pool.deposited <= 0) {
    showToast('❌ Nothing to Withdraw', 'No funds in this pool', 'warning');
    return;
  }

  store.game.portfolio += pool.deposited;
  pool.deposited = 0;
  setRalphQuote('withdraw');
}

export function buyAudit() {
  const cost = GAME_CONSTANTS.AUDIT_COST * store.game.gasMultiplier;
  if (store.game.portfolio < cost) {
    setRalphQuote('cantAfford');
    return;
  }

  store.game.portfolio -= cost;
  store.game.items.audits++;
  setRalphQuote('buyAudit');
  showToast('🛡️ Audit Purchased!', `Protection +1 (${store.game.items.audits} total)`, 'success');
}

export function buyInsurance() {
  const cost = GAME_CONSTANTS.INSURANCE_COST * store.game.gasMultiplier;
  if (store.game.portfolio < cost) {
    setRalphQuote('cantAfford');
    return;
  }

  store.game.portfolio -= cost;
  store.game.items.insurance++;
  setRalphQuote('buyInsurance');
  showToast('🏥 Insurance Purchased!', `Protection +1 (${store.game.items.insurance} total)`, 'success');
}

export function setRalphQuote(category: QuoteCategory) {
  store.ralphQuote = getRandomQuote(category);
}

export function showToast(title: string, message: string, type: 'success' | 'danger' | 'warning' | 'info') {
  const id = crypto.randomUUID();
  store.toasts = [...store.toasts, { id, title, message, type }];

  // Auto remove after 4 seconds
  setTimeout(() => {
    store.toasts = store.toasts.filter(t => t.id !== id);
  }, 4000);
}

export function removeToast(id: string) {
  store.toasts = store.toasts.filter(t => t.id !== id);
}
