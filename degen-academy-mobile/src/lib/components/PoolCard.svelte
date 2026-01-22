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
    safe: { label: 'Low Risk', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
    medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
    degen: { label: 'High Risk', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' },
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
  class="w-full rounded-xl border transition-all duration-200
         {pool.isRugged ? 'opacity-50 border-white/5' : 'border-white/5 hover:border-white/10'}
         {pool.isPumping ? 'border-emerald-500/30' : ''}"
  style="padding: 20px 24px; background: #2d2d3a;"
>
  <!-- Header Row -->
  <div class="flex items-center justify-between" style="margin-bottom: 16px;">
    <!-- Token Info -->
    <div class="flex items-center" style="gap: 12px;">
      <div class="rounded-lg flex items-center justify-center" style="width: 40px; height: 40px; font-size: 20px; background: #383848;">
        {pool.emoji}
      </div>
      <div>
        <h3 class="font-semibold text-white" style="font-size: 14px;">{pool.name}</h3>
        <p class="text-white/40" style="font-size: 11px;">/ USDC</p>
      </div>
    </div>

    <!-- Risk Badge -->
    <span class="font-medium rounded-md border {config.bg} {config.color} {config.border}" style="padding: 5px 10px; font-size: 10px;">
      {config.label}
    </span>
  </div>

  <!-- Stats Row -->
  <div class="flex items-center" style="gap: 28px; margin-bottom: 16px;">
    <!-- APR -->
    <div>
      <p class="text-white/40 uppercase tracking-wider" style="font-size: 9px; margin-bottom: 4px;">APR</p>
      <p class="font-mono font-bold text-white" style="font-size: 24px;">
        {pool.apy}%
        {#if pool.isPumping}
          <span class="text-emerald-400" style="font-size: 14px; margin-left: 4px;">🔥</span>
        {/if}
      </p>
    </div>

    <!-- TVL -->
    <div>
      <p class="text-white/40 uppercase tracking-wider" style="font-size: 9px; margin-bottom: 4px;">TVL</p>
      <p class="font-mono text-white/60" style="font-size: 16px;">{formatTVL(tvl)}</p>
    </div>
  </div>

  <!-- Your Position Box -->
  <div class="rounded-lg" style="padding: 12px 14px; margin-bottom: 16px; background: #252532;">
    <div class="flex items-center justify-between">
      <span class="text-white/40" style="font-size: 12px;">Your Position</span>
      <span class="font-mono text-white font-semibold" style="font-size: 14px;">
        ${pool.deposited.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </div>
  </div>

  <!-- Action Buttons -->
  {#if !pool.isRugged}
    <div class="flex" style="gap: 10px;">
      <!-- Deposit Button - dark neumorphism style -->
      <button
        onclick={() => deposit(pool.id, depositAmount)}
        disabled={!canDeposit}
        class="neu-btn flex-1 font-semibold text-white/90"
        class:disabled={!canDeposit}
      >
        Deposit +$1K
      </button>

      <!-- Withdraw Button - matching neumorphism -->
      <button
        onclick={() => withdrawAll(pool.id)}
        disabled={!canWithdraw}
        class="neu-btn flex-1 font-semibold text-white/70"
        class:disabled={!canWithdraw}
      >
        Withdraw
      </button>
    </div>
  {:else}
    <div class="rounded-lg text-center" style="padding: 12px 16px; background: rgba(239,68,68,0.1);">
      <p class="text-red-400 font-semibold flex items-center justify-center gap-2" style="font-size: 12px;">
        <span>⚠️</span> Pool Rugged
      </p>
    </div>
  {/if}
</div>

<style>
  .neu-btn {
    padding: 12px 16px;
    font-size: 13px;
    background: #3a3a4a;
    border: none;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #1e1e28, -2px -2px 5px #4a4a5a;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .neu-btn:hover:not(.disabled) {
    box-shadow: 2px 2px 4px #1e1e28, -1px -1px 3px #4a4a5a;
  }

  .neu-btn:active:not(.disabled) {
    box-shadow: inset 3px 3px 6px #1e1e28, inset -2px -2px 5px #4a4a5a;
  }

  .neu-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
