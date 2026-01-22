<script lang="ts">
  import { halvingMultiplier, halvingTimeRemaining, gasMultiplier, gameState } from '../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../data/constants';

  const halvingMult = $derived(halvingMultiplier.value);
  const gasMult = $derived(gasMultiplier.value);
  const game = $derived(gameState.value);
  const halvingTime = $derived(halvingTimeRemaining());
  const halvingUrgent = $derived(halvingTime < 60000);

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  function formatMoney(amount: number): string {
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }
</script>

<div class="bg-slate-900/70 backdrop-blur-xl border-y border-white/10 py-4 px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Stats Row - Clean inline style -->
    <div class="flex items-center justify-center gap-8">
      <!-- Halving -->
      <div class="flex items-center gap-2">
        <span class="text-white/40 text-sm">Halving</span>
        <span class="font-mono font-semibold text-base {halvingUrgent ? 'text-red-400' : 'text-amber-400'}">
          {formatTime(halvingTime)}
        </span>
      </div>

      <div class="w-px h-4 bg-white/20"></div>

      <!-- Multiplier -->
      <div class="flex items-center gap-2">
        <span class="text-white/40 text-sm">Multiplier</span>
        <span class="font-mono font-semibold text-base text-purple-400">{halvingMult.toFixed(2)}x</span>
      </div>

      <div class="w-px h-4 bg-white/20"></div>

      <!-- Target -->
      <div class="flex items-center gap-2">
        <span class="text-white/40 text-sm">Target</span>
        <span class="font-mono font-semibold text-base text-white/80">{formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
      </div>

      <!-- Alert indicators -->
      {#if gasMult > 1}
        <div class="w-px h-4 bg-white/20"></div>
        <div class="flex items-center gap-2">
          <span class="text-lg">⛽</span>
          <span class="text-orange-400 font-semibold text-sm">Gas {gasMult}x</span>
        </div>
      {/if}

      {#if game.whaleEndTime && Date.now() < game.whaleEndTime}
        <div class="w-px h-4 bg-white/20"></div>
        <div class="flex items-center gap-2">
          <span class="text-lg">🐋</span>
          <span class="text-blue-400 font-semibold text-sm">Whale Active</span>
        </div>
      {/if}
    </div>
  </div>
</div>
