// Core game types for DEGEN ACADEMY

export type RiskLevel = 'safe' | 'medium' | 'degen';

export interface Pool {
  id: string;
  name: string;
  apy: number;
  riskLevel: RiskLevel;
  deposited: number;
  isRugged: boolean;
  hasAudit: boolean;
  isPumping: boolean;
  pumpEndTime: number | null;
}

export interface Items {
  audits: number;
  insurance: number;
}

export interface GameStats {
  rugsEaten: number;
  highestPortfolio: number;
  gamesPlayed: number;
  totalTimePlayed: number;
  fastestWin: number | null;
}

export interface CurrentRun {
  startTime: number;
  elapsed: number;
  halvingCount: number;
}

export interface GameState {
  portfolio: number;
  pools: Pool[];
  items: Items;
  halvingMultiplier: number;
  gasMultiplier: number;
  gasEndTime: number | null;
  whaleEndTime: number | null;
  isGameOver: boolean;
  isVictory: boolean;
  currentRun: CurrentRun;
  stats: GameStats;
}

export type EventType = 'rug' | 'exploit' | 'whale' | 'gas' | 'pump';

export interface GameEvent {
  id: string;
  type: EventType;
  targetPoolId: string | null;
  magnitude: number;
  timestamp: number;
  blocked: boolean;
  message: string;
}

export interface SaveData {
  version: number;
  portfolio: number;
  pools: Pool[];
  items: Items;
  stats: GameStats;
  settings: GameSettings;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface PoolConfig {
  id: string;
  name: string;
  apy: number;
  riskLevel: RiskLevel;
}
