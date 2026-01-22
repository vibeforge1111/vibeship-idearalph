<script lang="ts">
  import { pools, portfolio, ralphQuote, items, gasMultiplier, buyAudit, buyInsurance, halvingMultiplier, halvingTimeRemaining, gameState } from '../../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../../data/constants';
  import BottomBar from '../BottomBar.svelte';
  import PoolCard from '../PoolCard.svelte';
  import Toast from '../Toast.svelte';

  const poolList = $derived(pools.value);
  const portfolioVal = $derived(portfolio.value);
  const quote = $derived(ralphQuote.value);
  const itemsVal = $derived(items.value);
  const gasMult = $derived(gasMultiplier.value);
  const halvingMult = $derived(halvingMultiplier.value);
  const game = $derived(gameState.value);
  const halvingTime = $derived(halvingTimeRemaining());
  const halvingUrgent = $derived(halvingTime < 60000);

  const auditCost = $derived(GAME_CONSTANTS.AUDIT_COST * gasMult);
  const insuranceCost = $derived(GAME_CONSTANTS.INSURANCE_COST * gasMult);
  const canAffordAudit = $derived(portfolioVal >= auditCost);
  const canAffordInsurance = $derived(portfolioVal >= insuranceCost);

  function formatMoney(amount: number): string {
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="min-h-screen min-h-dvh flex flex-col bg-cover bg-center bg-fixed relative"
     style="background-image: url('/ralph-lab-bg.png');">

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-slate-950/85"></div>

  <!-- Toast Notifications -->
  <Toast />

  <!-- Main Content -->
  <div class="relative z-10 flex-1 flex flex-col h-screen h-dvh overflow-hidden">

    <!-- Header Section -->
    <header class="flex-shrink-0" style="padding: 20px 32px;">
      <!-- Top Row: Logo, Controls, Wallet -->
      <div class="flex items-center justify-between" style="margin-bottom: 16px;">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <img src="/ralph-logo.png" alt="Ralph" class="w-10 h-10 rounded-lg object-cover" />
          <h1 class="text-lg font-bold text-white">Ralph's Degen Academy</h1>
        </div>

        <!-- Light Neumorphic Controls Panel -->
        <div class="flex items-center" style="gap: 10px;">
          <!-- Halving Timer - Light Neumorphic Badge -->
          <div class="neu-light-badge" class:urgent={halvingUrgent}>
            <span style="font-size: 11px; color: #666;">Halving</span>
            <span class="font-mono font-bold" style="font-size: 14px; color: {halvingUrgent ? '#dc2626' : '#d97706'};">
              {formatTime(halvingTime)}
            </span>
          </div>

          <!-- Audit Button - Light Neumorphic -->
          <button
            onclick={() => buyAudit()}
            disabled={!canAffordAudit}
            class="neu-light-btn"
            class:disabled={!canAffordAudit}
          >
            <span>🛡️</span>
            <span class="font-medium" style="color: #444;">Audit</span>
            {#if itemsVal.audits > 0}
              <span style="color: #7c3aed; font-weight: 700;">x{itemsVal.audits}</span>
            {:else}
              <span style="color: #888;">${auditCost.toFixed(0)}</span>
            {/if}
          </button>

          <!-- Insurance Button - Light Neumorphic -->
          <button
            onclick={() => buyInsurance()}
            disabled={!canAffordInsurance}
            class="neu-light-btn"
            class:disabled={!canAffordInsurance}
          >
            <span>🏥</span>
            <span class="font-medium" style="color: #444;">Insurance</span>
            {#if itemsVal.insurance > 0}
              <span style="color: #059669; font-weight: 700;">x{itemsVal.insurance}</span>
            {:else}
              <span style="color: #888;">${insuranceCost.toFixed(0)}</span>
            {/if}
          </button>

          <!-- Wallet - Light Neumorphic -->
          <div class="neu-light-badge" style="gap: 8px;">
            <span style="font-size: 11px; color: #666;">Wallet</span>
            <span class="font-mono font-bold" style="font-size: 16px; color: #1e293b;">{formatMoney(portfolioVal)}</span>
          </div>
        </div>
      </div>

      <!-- Second Row: Ralph (left) | Stats (right) -->
      <div style="display: flex; gap: 16px;">
        <!-- Ralph Notification Banner -->
        <div class="rounded-lg flex items-center" style="flex: 1; padding: 10px 16px; background: #2d2d3a; gap: 10px;">
          <span class="text-purple-300 font-semibold" style="font-size: 11px;">Ralph:</span>
          <p class="text-white/70 italic" style="font-size: 12px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">"{quote}"</p>
        </div>

        <!-- Stats Panel - Light Neumorphic -->
        <div class="neu-light-panel" style="display: flex; align-items: center; gap: 16px;">
          <!-- Multiplier -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 10px; color: #666;">Mult</span>
            <span class="font-mono font-bold" style="font-size: 13px; color: #7c3aed;">{halvingMult.toFixed(2)}x</span>
          </div>

          <div style="width: 1px; height: 16px; background: #ccc;"></div>

          <!-- Target -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 10px; color: #666;">Target</span>
            <span class="font-mono font-bold" style="font-size: 13px; color: #1e293b;">{formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
          </div>

          <!-- Gas indicator (only when active) -->
          {#if gasMult > 1}
            <div style="width: 1px; height: 16px; background: #ccc;"></div>
            <div class="neu-light-indicator warning">
              <span>⛽</span>
              <span class="font-bold">{gasMult}x</span>
            </div>
          {/if}

          <!-- Whale indicator (only when active) -->
          {#if game.whaleEndTime && Date.now() < game.whaleEndTime}
            <div style="width: 1px; height: 16px; background: #ccc;"></div>
            <div class="neu-light-indicator info">
              <span>🐋</span>
              <span class="font-bold">Active</span>
            </div>
          {/if}
        </div>
      </div>
    </header>

    <!-- Scrollable Pool Grid - Centered -->
    <div class="flex-1 overflow-y-auto" style="padding-bottom: 32px;">
      <div class="flex flex-col items-center" style="padding: 32px 32px 0 32px;">
        <!-- Section Header -->
        <div class="flex items-center justify-center mb-6">
          <div class="flex items-center gap-4">
            <h2 class="text-white font-semibold text-lg">Liquidity Pools</h2>
            <span class="text-gray-400 text-xs px-2 py-1 bg-white/10 border border-white/10 rounded">{poolList.length} Active</span>
          </div>
        </div>

        <!-- Pool Grid - 2 cards per row, centered -->
        <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {#each poolList as pool (pool.id)}
            <PoolCard {pool} />
          {/each}
        </div>
      </div>
    </div>

    <!-- Simplified Footer - Just Progress Bar -->
    <div class="flex-shrink-0" style="padding: 16px 32px 24px 32px; background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.1);">
      <BottomBar />
    </div>
  </div>
</div>

<style>
  /* Light Neumorphic Button */
  .neu-light-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    font-size: 12px;
    background: #e0e5ec;
    border: none;
    border-radius: 10px;
    box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .neu-light-btn:hover:not(.disabled) {
    box-shadow: 4px 4px 8px #b8bec7, -4px -4px 8px #ffffff;
  }

  .neu-light-btn:active:not(.disabled) {
    box-shadow: inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff;
  }

  .neu-light-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Light Neumorphic Badge */
  .neu-light-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: #e0e5ec;
    border-radius: 10px;
    box-shadow: 4px 4px 8px #b8bec7, -4px -4px 8px #ffffff;
  }

  .neu-light-badge.urgent {
    box-shadow: 4px 4px 8px #b8bec7, -4px -4px 8px #ffffff, inset 0 0 0 2px #fca5a5;
  }

  /* Light Neumorphic Panel */
  .neu-light-panel {
    padding: 10px 20px;
    background: #e0e5ec;
    border-radius: 12px;
    box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
  }

  /* Light Neumorphic Indicator */
  .neu-light-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff;
  }

  .neu-light-indicator.warning {
    background: #fef3c7;
    color: #d97706;
  }

  .neu-light-indicator.info {
    background: #dbeafe;
    color: #2563eb;
  }
</style>
