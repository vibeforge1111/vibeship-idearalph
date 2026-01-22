// SaveManager - LocalStorage persistence for DEGEN ACADEMY

import type { GameStats } from '../types/game.ts';

const STORAGE_KEY = 'degen-academy-save';
const VERSION = 1;

interface SaveData {
  version: number;
  stats: GameStats;
  lastPlayed: number;
}

const DEFAULT_STATS: GameStats = {
  rugsEaten: 0,
  highestPortfolio: 10_000,
  gamesPlayed: 0,
  totalTimePlayed: 0,
  fastestWin: null,
};

export class SaveManager {
  private static instance: SaveManager | null = null;
  private data: SaveData;

  private constructor() {
    this.data = this.load();
  }

  static getInstance(): SaveManager {
    if (!SaveManager.instance) {
      SaveManager.instance = new SaveManager();
    }
    return SaveManager.instance;
  }

  private load(): SaveData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return this.createDefault();
      }

      const parsed = JSON.parse(raw) as SaveData;

      // Version migration if needed
      if (parsed.version !== VERSION) {
        console.log('[SaveManager] Migrating save data from version', parsed.version, 'to', VERSION);
        return this.migrate(parsed);
      }

      return parsed;
    } catch (error) {
      console.error('[SaveManager] Failed to load save data:', error);
      return this.createDefault();
    }
  }

  private createDefault(): SaveData {
    return {
      version: VERSION,
      stats: { ...DEFAULT_STATS },
      lastPlayed: Date.now(),
    };
  }

  private migrate(oldData: SaveData): SaveData {
    // Future migrations go here
    return {
      version: VERSION,
      stats: oldData.stats ?? { ...DEFAULT_STATS },
      lastPlayed: oldData.lastPlayed ?? Date.now(),
    };
  }

  save(): void {
    try {
      this.data.lastPlayed = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      console.log('[SaveManager] Game saved');
    } catch (error) {
      console.error('[SaveManager] Failed to save:', error);
    }
  }

  getStats(): GameStats {
    return { ...this.data.stats };
  }

  updateStats(updates: Partial<GameStats>): void {
    this.data.stats = { ...this.data.stats, ...updates };
    this.save();
  }

  recordGameEnd(stats: GameStats, isVictory: boolean, elapsed: number): void {
    // Update cumulative stats
    this.data.stats.gamesPlayed++;
    this.data.stats.totalTimePlayed += elapsed;

    // Update best records
    if (stats.highestPortfolio > this.data.stats.highestPortfolio) {
      this.data.stats.highestPortfolio = stats.highestPortfolio;
    }

    this.data.stats.rugsEaten += stats.rugsEaten;

    // Update fastest win
    if (isVictory) {
      if (this.data.stats.fastestWin === null || elapsed < this.data.stats.fastestWin) {
        this.data.stats.fastestWin = elapsed;
      }
    }

    this.save();
    console.log('[SaveManager] Game recorded:', isVictory ? 'VICTORY' : 'DEFEAT');
  }

  getLastPlayed(): Date {
    return new Date(this.data.lastPlayed);
  }

  resetStats(): void {
    this.data.stats = { ...DEFAULT_STATS };
    this.save();
    console.log('[SaveManager] Stats reset');
  }

  // Debug method
  debugPrint(): void {
    console.log('[SaveManager] Current data:', JSON.stringify(this.data, null, 2));
  }
}

// Export singleton instance
export const saveManager = SaveManager.getInstance();
