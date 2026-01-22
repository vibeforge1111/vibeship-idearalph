// Game balance constants for DEGEN ACADEMY

export const GAME_CONSTANTS = {
  // Starting conditions
  STARTING_PORTFOLIO: 10_000,
  WIN_PORTFOLIO: 1_000_000,

  // Halving
  HALVING_INTERVAL_MS: 5 * 60 * 1000, // 5 minutes

  // RNG timing
  RNG_CHECK_INTERVAL_MS: 45_000, // Check every 45 seconds
  RNG_VARIANCE_MS: 15_000, // +/- 15 seconds randomness

  // Event probabilities (must sum to 100)
  EVENT_WEIGHTS: {
    rug: 15,
    exploit: 20,
    whale: 25,
    gas: 30,
    pump: 10,
  } as const,

  // Event effects
  EXPLOIT_DAMAGE: 0.5, // 50% of pool
  WHALE_YIELD_REDUCTION: 0.3, // -30% yields
  WHALE_DURATION_MS: 60_000,
  GAS_MULTIPLIER: 3,
  GAS_DURATION_MS: 30_000,
  PUMP_MULTIPLIER: 2,
  PUMP_DURATION_MS: 30_000,

  // Item costs
  AUDIT_COST: 500,
  INSURANCE_COST: 200,

  // Item effects
  INSURANCE_DAMAGE_REDUCTION: 0.5, // Reduces whale damage by 50%

  // Deposit limits
  MIN_DEPOSIT: 100,
  DEPOSIT_INCREMENT: 100,

  // UI
  YIELD_TICK_MS: 1000, // Update yields every second
} as const;

// Colors for UI
export const COLORS = {
  primary: 0x8B5CF6,
  secondary: 0xF59E0B,
  accent: 0x06B6D4,
  success: 0x10B981,
  danger: 0xEF4444,
  warning: 0xF59E0B,
  bgPrimary: 0x0F0F1A,
  bgSecondary: 0x1A1A2E,
  surface: 0x1E1E32,
  textPrimary: 0xFFFFFF,
  textSecondary: 0xA1A1AA,
} as const;
