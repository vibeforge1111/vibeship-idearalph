<script lang="ts">
  import { pools, portfolio, ralphQuote, ralphNotification, items, gasMultiplier, buyAudit, buyInsurance, halvingMultiplier, halvingTimeRemaining, gameState } from '../../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../../data/constants';
  import BottomBar from '../BottomBar.svelte';
  import PoolCard from '../PoolCard.svelte';

  const poolList = $derived(pools.value);
  const portfolioVal = $derived(portfolio.value);
  const quote = $derived(ralphQuote.value);
  const notification = $derived(ralphNotification.value);
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

  // Notification type colors
  const notificationColors = {
    success: { bg: '#2a3a2a', border: '#4ade80', text: '#4ade80' },
    danger: { bg: '#3a2a2a', border: '#f87171', text: '#f87171' },
    warning: { bg: '#3a3528', border: '#fbbf24', text: '#fbbf24' },
    info: { bg: '#2a2a3a', border: '#60a5fa', text: '#60a5fa' },
    neutral: { bg: '#2d2d3a', border: '#a78bfa', text: '#a78bfa' },
  };

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

        <!-- Wallet (display only, not clickable) -->
        <div style="display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: #2d2d3a; border-radius: 8px;">
          <span style="font-size: 14px;">💰</span>
          <span class="font-mono font-bold" style="font-size: 15px; color: #fff;">{formatMoney(portfolioVal)}</span>
        </div>
      </div>

      <!-- Second Row: Ralph + Actions (left) | Stats (right) -->
      <div style="display: flex; gap: 16px;">
        <!-- Ralph Panel with Audit/Insurance -->
        <div class="ralph-panel" style="flex: 1;">
          <!-- Ralph Message -->
          {#if notification}
            {@const colors = notificationColors[notification.type]}
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <span class="font-bold" style="font-size: 12px; color: {colors.text};">{notification.title}</span>
              <p style="font-size: 12px; color: {colors.text}; opacity: 0.9; flex: 1;">{notification.message}</p>
            </div>
          {:else}
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <span class="text-purple-300 font-semibold" style="font-size: 11px;">Ralph:</span>
              <p class="text-white/70 italic" style="font-size: 12px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">"{quote}"</p>
            </div>
          {/if}

          <!-- Action Buttons -->
          <div style="display: flex; gap: 10px;">
            <!-- Audit Button -->
            <button
              onclick={() => buyAudit()}
              disabled={!canAffordAudit}
              class="action-btn"
              class:disabled={!canAffordAudit}
            >
              <span>🛡️</span>
              <span class="font-medium">Audit</span>
              {#if itemsVal.audits > 0}
                <span style="color: #a78bfa; font-weight: 700;">x{itemsVal.audits}</span>
              {:else}
                <span style="color: rgba(255,255,255,0.4);">${auditCost.toFixed(0)}</span>
              {/if}
            </button>

            <!-- Insurance Button -->
            <button
              onclick={() => buyInsurance()}
              disabled={!canAffordInsurance}
              class="action-btn"
              class:disabled={!canAffordInsurance}
            >
              <span>🏥</span>
              <span class="font-medium">Insurance</span>
              {#if itemsVal.insurance > 0}
                <span style="color: #4ade80; font-weight: 700;">x{itemsVal.insurance}</span>
              {:else}
                <span style="color: rgba(255,255,255,0.4);">${insuranceCost.toFixed(0)}</span>
              {/if}
            </button>
          </div>
        </div>

        <!-- Stats Panel -->
        <div class="stats-panel">
          <!-- Halving Timer -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 10px; color: rgba(255,255,255,0.4);">Halving</span>
            <span class="font-mono font-bold" style="font-size: 13px; color: {halvingUrgent ? '#f87171' : '#fbbf24'};">
              {formatTime(halvingTime)}
            </span>
          </div>

          <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.15);"></div>

          <!-- Multiplier -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 10px; color: rgba(255,255,255,0.4);">Mult</span>
            <span class="font-mono font-bold" style="font-size: 13px; color: #a78bfa;">{halvingMult.toFixed(2)}x</span>
          </div>

          <!-- Gas indicator (only when active) -->
          {#if gasMult > 1}
            <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.15);"></div>
            <div class="status-indicator warning">
              <span>⛽</span>
              <span class="font-bold">{gasMult}x</span>
            </div>
          {/if}

          <!-- Whale indicator (only when active) -->
          {#if game.whaleEndTime && Date.now() < game.whaleEndTime}
            <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.15);"></div>
            <div class="status-indicator info">
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
  /* Ralph panel - bulkier container */
  .ralph-panel {
    padding: 16px 20px;
    background: #2d2d3a;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
  }

  /* Action button - simple, clean */
  .action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    font-size: 12px;
    background: #3a3a4a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    transition: all 0.15s ease;
    cursor: pointer;
    color: rgba(255,255,255,0.9);
  }

  .action-btn:hover:not(.disabled) {
    background: #454555;
    border-color: rgba(255,255,255,0.2);
  }

  .action-btn:active:not(.disabled) {
    background: #333343;
  }

  .action-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Stats panel - bulkier */
  .stats-panel {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px 24px;
    background: #2d2d3a;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
  }

  /* Status indicators */
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    font-size: 11px;
    border-radius: 6px;
  }

  .status-indicator.warning {
    background: rgba(251, 191, 36, 0.15);
    color: #fbbf24;
  }

  .status-indicator.info {
    background: rgba(96, 165, 250, 0.15);
    color: #60a5fa;
  }
</style>
