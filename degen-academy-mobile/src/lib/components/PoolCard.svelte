<script lang="ts">
  import { deposit, withdrawAll, gasMultiplier, portfolio } from '../stores/gameStore.svelte';
  import type { Pool } from '../../types/game';

  interface Props {
    pool: Pool;
  }

  let { pool }: Props = $props();

  const gasMult = $derived(gasMultiplier.value);
  const portfolioVal = $derived(portfolio.value);

  const depositAmount = 1000;
  const depositCost = $derived(depositAmount * gasMult);
  const canDeposit = $derived(!pool.isRugged && portfolioVal >= depositCost);
  const canWithdraw = $derived(!pool.isRugged && pool.deposited > 0);

  const riskConfig = {
    safe: { label: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-300' },
    medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300' },
    degen: { label: 'High Risk', color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-300' },
  };

  const config = $derived(riskConfig[pool.riskLevel]);

  const tvl = $derived(Math.floor(1000000 / (pool.apy / 100 + 1)));

  function formatTVL(amount: number): string {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
    return `$${amount}`;
  }
</script>

<div
  class="bg-white rounded-lg border-2 overflow-hidden transition-all duration-200
         {pool.isRugged ? 'opacity-50 border-gray-200' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'}
         {pool.isPumping ? 'border-emerald-400 shadow-lg' : ''}"
>
  <div class="p-8">
    <!-- Header Row -->
    <div class="flex items-center justify-between mb-8">
      <!-- Token Info -->
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl">
          {pool.emoji}
        </div>
        <div>
          <h3 class="font-bold text-gray-900">{pool.name}</h3>
          <p class="text-gray-400 text-sm">/ USDC</p>
        </div>
      </div>

      <!-- Risk Badge -->
      <span class="px-2 py-1 text-xs font-semibold rounded {config.bg} {config.color}">
        {config.label}
      </span>
    </div>

    <!-- Stats Row -->
    <div class="flex items-center gap-8 mb-8">
      <!-- APR -->
      <div>
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-2">APR</p>
        <p class="font-mono font-bold text-4xl text-gray-900">
          {pool.apy}%
          {#if pool.isPumping}
            <span class="text-emerald-500 text-xl ml-2">🔥</span>
          {/if}
        </p>
      </div>

      <!-- TVL -->
      <div>
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-2">TVL</p>
        <p class="font-mono text-gray-600 text-2xl">{formatTVL(tvl)}</p>
      </div>
    </div>

    <!-- Your Position Box -->
    <div class="bg-gray-50 border border-gray-200 rounded-md p-5 mb-8">
      <div class="flex items-center justify-between">
        <span class="text-gray-500 text-sm">Your Position</span>
        <span class="font-mono text-gray-900 font-semibold">
          ${pool.deposited.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    {#if !pool.isRugged}
      <div class="flex gap-3">
        <!-- Deposit Button - Black -->
        <button
          onclick={() => deposit(pool.id, depositAmount)}
          disabled={!canDeposit}
          class="flex-1 py-3 font-semibold text-sm rounded-md transition-all
                 border-2 border-b-4 active:border-b-2 active:mt-[2px]
                 {canDeposit
                   ? 'bg-gray-900 border-gray-950 text-white hover:bg-gray-800'
                   : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}"
        >
          Deposit +$1K
        </button>

        <!-- Withdraw Button -->
        <button
          onclick={() => withdrawAll(pool.id)}
          disabled={!canWithdraw}
          class="flex-1 py-3 font-semibold text-sm rounded-md transition-all
                 border-2 border-b-4 active:border-b-2 active:mt-[2px]
                 {canWithdraw
                   ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                   : 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'}"
        >
          Withdraw
        </button>
      </div>
    {:else}
      <div class="py-3 bg-red-50 border border-red-200 rounded-md text-center">
        <p class="text-red-600 font-semibold flex items-center justify-center gap-2">
          <span>⚠️</span> Pool Rugged
        </p>
      </div>
    {/if}
  </div>
</div>
