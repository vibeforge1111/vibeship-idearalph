<script lang="ts">
  import { pools, portfolio, ralphQuote, items, gasMultiplier, buyAudit, buyInsurance } from '../../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../../data/constants';
  import TopBar from '../TopBar.svelte';
  import BottomBar from '../BottomBar.svelte';
  import PoolCard from '../PoolCard.svelte';
  import Toast from '../Toast.svelte';

  const poolList = $derived(pools.value);
  const portfolioVal = $derived(portfolio.value);
  const quote = $derived(ralphQuote.value);
  const itemsVal = $derived(items.value);
  const gasMult = $derived(gasMultiplier.value);

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
      <!-- Top Row: Logo, Power-ups, Wallet -->
      <div class="flex items-center justify-between" style="margin-bottom: 12px;">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <img src="/ralph-logo.png" alt="Ralph" class="w-10 h-10 rounded-lg object-cover" />
          <h1 class="text-lg font-bold text-white">Ralph's Degen Academy</h1>
        </div>

        <!-- Power-ups & Wallet -->
        <div class="flex items-center" style="gap: 12px;">
          <!-- Audit Button -->
          <button
            onclick={() => buyAudit()}
            disabled={!canAffordAudit}
            class="header-btn"
            class:disabled={!canAffordAudit}
          >
            <span>🛡️</span>
            <span class="font-medium">Audit</span>
            {#if itemsVal.audits > 0}
              <span class="text-purple-300 font-bold">x{itemsVal.audits}</span>
            {:else}
              <span class="text-white/40">${auditCost.toFixed(0)}</span>
            {/if}
          </button>

          <!-- Insurance Button -->
          <button
            onclick={() => buyInsurance()}
            disabled={!canAffordInsurance}
            class="header-btn"
            class:disabled={!canAffordInsurance}
          >
            <span>🏥</span>
            <span class="font-medium">Insurance</span>
            {#if itemsVal.insurance > 0}
              <span class="text-emerald-300 font-bold">x{itemsVal.insurance}</span>
            {:else}
              <span class="text-white/40">${insuranceCost.toFixed(0)}</span>
            {/if}
          </button>

          <!-- Wallet -->
          <div class="flex items-center gap-2" style="margin-left: 8px;">
            <span class="text-white/50" style="font-size: 12px;">Wallet</span>
            <span class="font-mono font-bold text-white" style="font-size: 18px;">{formatMoney(portfolioVal)}</span>
          </div>
        </div>
      </div>

      <!-- Ralph Notification Banner -->
      <div class="rounded-lg flex items-center" style="padding: 10px 16px; background: #2d2d3a; gap: 12px;">
        <span class="text-purple-300 font-semibold" style="font-size: 12px;">Ralph:</span>
        <p class="text-white/70 italic" style="font-size: 13px; flex: 1;">"{quote}"</p>
      </div>
    </header>

    <!-- Top Stats Bar - Full width, edge-to-edge -->
    <div class="flex-shrink-0">
      <TopBar />
    </div>

    <!-- Scrollable Pool Grid - Centered -->
    <div class="flex-1 overflow-y-auto" style="padding-bottom: 32px;">
      <div class="flex flex-col items-center" style="padding: 48px 32px 0 32px;">
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
  .header-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    font-size: 12px;
    background: #3a3a4a;
    border: none;
    border-radius: 8px;
    box-shadow: 2px 2px 4px #1e1e28, -1px -1px 3px #4a4a5a;
    transition: all 0.15s ease;
    cursor: pointer;
    color: rgba(255,255,255,0.85);
  }

  .header-btn:hover:not(.disabled) {
    box-shadow: 1px 1px 2px #1e1e28, -1px -1px 2px #4a4a5a;
  }

  .header-btn:active:not(.disabled) {
    box-shadow: inset 2px 2px 4px #1e1e28, inset -1px -1px 3px #4a4a5a;
  }

  .header-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
