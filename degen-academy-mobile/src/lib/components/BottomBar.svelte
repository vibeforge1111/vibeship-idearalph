<script lang="ts">
  import { items, gasMultiplier, buyAudit, buyInsurance, portfolio } from '../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../data/constants';

  const itemsVal = $derived(items.value);
  const gasMult = $derived(gasMultiplier.value);
  const portfolioVal = $derived(portfolio.value);

  const auditCost = $derived(GAME_CONSTANTS.AUDIT_COST * gasMult);
  const insuranceCost = $derived(GAME_CONSTANTS.INSURANCE_COST * gasMult);
  const canAffordAudit = $derived(portfolioVal >= auditCost);
  const canAffordInsurance = $derived(portfolioVal >= insuranceCost);
  const progress = $derived(Math.min((portfolioVal / GAME_CONSTANTS.WIN_PORTFOLIO) * 100, 100));

  // For segmented progress bar
  const totalSegments = 20;
  const filledSegments = $derived(Math.floor((progress / 100) * totalSegments));

  function formatMoney(amount: number): string {
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }
</script>

<div style="display: flex; flex-direction: column; gap: 20px;">
  <!-- Power-ups Row -->
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
    <span class="text-white/40 uppercase tracking-wider" style="font-size: 10px;">Power-ups</span>

    <!-- Audit Button - Light grey neumorphism -->
    <button
      onclick={() => buyAudit()}
      disabled={!canAffordAudit}
      class="neu-btn-light"
      class:disabled={!canAffordAudit}
    >
      <span style="font-size: 18px;">🛡️</span>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <span class="font-semibold text-white/90" style="font-size: 13px;">Audit</span>
        <span class="text-white/50" style="font-size: 11px;">${auditCost.toFixed(0)}</span>
      </div>
      {#if itemsVal.audits > 0}
        <span class="font-bold text-purple-300" style="font-size: 14px; margin-left: 4px;">x{itemsVal.audits}</span>
      {/if}
    </button>

    <!-- Insurance Button - Light grey neumorphism -->
    <button
      onclick={() => buyInsurance()}
      disabled={!canAffordInsurance}
      class="neu-btn-light"
      class:disabled={!canAffordInsurance}
    >
      <span style="font-size: 18px;">🏥</span>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <span class="font-semibold text-white/90" style="font-size: 13px;">Insurance</span>
        <span class="text-white/50" style="font-size: 11px;">${insuranceCost.toFixed(0)}</span>
      </div>
      {#if itemsVal.insurance > 0}
        <span class="font-bold text-emerald-300" style="font-size: 14px; margin-left: 4px;">x{itemsVal.insurance}</span>
      {/if}
    </button>
  </div>

  <!-- Progress Bar Section -->
  <div class="rounded-xl" style="padding: 16px 20px; background: #2d2d3a;">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <span class="text-white/50" style="font-size: 12px;">Progress to {formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
      <span class="text-cyan-400 font-mono font-bold" style="font-size: 14px;">{progress.toFixed(1)}%</span>
    </div>

    <!-- Segmented Progress Bar -->
    <div style="display: flex; gap: 4px;">
      {#each Array(totalSegments) as _, i}
        <div
          class="transition-all duration-300"
          style="flex: 1; height: 16px; border-radius: 4px; background: {i < filledSegments ? '#22d3ee' : '#383848'};"
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .neu-btn-light {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: #484858;
    border: none;
    border-radius: 12px;
    box-shadow: 3px 3px 6px #2a2a38, -2px -2px 5px #5a5a6a;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .neu-btn-light:hover:not(.disabled) {
    box-shadow: 2px 2px 4px #2a2a38, -1px -1px 3px #5a5a6a;
  }

  .neu-btn-light:active:not(.disabled) {
    box-shadow: inset 3px 3px 6px #2a2a38, inset -2px -2px 5px #5a5a6a;
  }

  .neu-btn-light.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
