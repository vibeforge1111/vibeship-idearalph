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

  function formatMoney(amount: number): string {
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }
</script>

<div class="space-y-4">
  <!-- Power-ups Row - Compact -->
  <div class="flex items-center justify-center gap-3">
    <span class="text-white/40 text-xs uppercase tracking-wider">Power-ups</span>

    <!-- Audit Button - Compact -->
    <button
      onclick={() => buyAudit()}
      disabled={!canAffordAudit}
      class="flex items-center gap-2 py-2 px-4 rounded-lg transition-all text-sm
             {canAffordAudit
               ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30'
               : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'}"
    >
      <span>🛡️</span>
      <span class="font-medium">Audit</span>
      <span class="text-white/50">${auditCost.toFixed(0)}</span>
      {#if itemsVal.audits > 0}
        <span class="px-1.5 py-0.5 bg-purple-500/30 rounded text-xs font-bold">{itemsVal.audits}</span>
      {/if}
    </button>

    <!-- Insurance Button - Compact -->
    <button
      onclick={() => buyInsurance()}
      disabled={!canAffordInsurance}
      class="flex items-center gap-2 py-2 px-4 rounded-lg transition-all text-sm
             {canAffordInsurance
               ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
               : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'}"
    >
      <span>🏥</span>
      <span class="font-medium">Insurance</span>
      <span class="text-white/50">${insuranceCost.toFixed(0)}</span>
      {#if itemsVal.insurance > 0}
        <span class="px-1.5 py-0.5 bg-emerald-500/30 rounded text-xs font-bold">{itemsVal.insurance}</span>
      {/if}
    </button>
  </div>

  <!-- Progress Bar -->
  <div class="px-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-white/40 text-xs">Progress to {formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
      <span class="text-purple-400 font-mono font-semibold text-sm">{progress.toFixed(1)}%</span>
    </div>
    <div class="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div
        class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 rounded-full"
        style="width: {progress}%"
      ></div>
    </div>
  </div>
</div>
