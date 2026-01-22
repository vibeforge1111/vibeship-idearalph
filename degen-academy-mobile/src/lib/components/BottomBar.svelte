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
</script>

<div class="flex items-center gap-6">
  <p class="text-white/50 text-sm uppercase tracking-wider font-semibold">Power-Ups</p>

  <div class="flex-1 flex gap-4">
    <!-- Audit Button -->
    <button
      onclick={() => buyAudit()}
      disabled={!canAffordAudit}
      class="flex-1 flex items-center justify-center gap-4 py-4 px-6 rounded-lg transition-all
             border-2 border-b-[5px] active:border-b-2 active:mt-[3px]
             {canAffordAudit
               ? 'bg-purple-600 border-purple-700 text-white hover:bg-purple-500 shadow-lg'
               : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'}"
    >
      <span class="text-2xl">🛡️</span>
      <div class="text-left">
        <span class="block font-bold">Audit</span>
        <span class="text-sm opacity-70">${auditCost.toFixed(0)}</span>
      </div>
      {#if itemsVal.audits > 0}
        <span class="px-3 py-1 bg-white/20 rounded-md text-sm font-bold">{itemsVal.audits}</span>
      {/if}
    </button>

    <!-- Insurance Button -->
    <button
      onclick={() => buyInsurance()}
      disabled={!canAffordInsurance}
      class="flex-1 flex items-center justify-center gap-4 py-4 px-6 rounded-lg transition-all
             border-2 border-b-[5px] active:border-b-2 active:mt-[3px]
             {canAffordInsurance
               ? 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-500 shadow-lg'
               : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'}"
    >
      <span class="text-2xl">🏥</span>
      <div class="text-left">
        <span class="block font-bold">Insurance</span>
        <span class="text-sm opacity-70">${insuranceCost.toFixed(0)}</span>
      </div>
      {#if itemsVal.insurance > 0}
        <span class="px-3 py-1 bg-white/20 rounded-md text-sm font-bold">{itemsVal.insurance}</span>
      {/if}
    </button>
  </div>
</div>
