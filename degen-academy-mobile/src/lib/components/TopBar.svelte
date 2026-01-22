<script lang="ts">
  import { portfolio, halvingMultiplier, halvingTimeRemaining, totalYieldPerSecond, gasMultiplier, gameState } from '../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../data/constants';

  const portfolioVal = $derived(portfolio.value);
  const halvingMult = $derived(halvingMultiplier.value);
  const gasMult = $derived(gasMultiplier.value);
  const game = $derived(gameState.value);
  const progress = $derived(Math.min((portfolioVal / GAME_CONSTANTS.WIN_PORTFOLIO) * 100, 100));
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

<div class="bg-white rounded-lg border-2 border-gray-200 p-6">
  <!-- Main Stats Row -->
  <div class="flex items-center justify-between gap-6 mb-6">
    <!-- Portfolio Value -->
    <div>
      <p class="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Value</p>
      <div class="flex items-center gap-4">
        <p class="font-mono font-bold text-4xl text-gray-900">{formatMoney(portfolioVal)}</p>

        <!-- Yield Badge -->
        <div class="flex items-center gap-2 px-4 py-2 bg-emerald-100 border-2 border-emerald-300 rounded-lg">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span class="text-emerald-700 font-mono font-bold text-sm">+{formatMoney(totalYieldPerSecond())}/s</span>
        </div>
      </div>
    </div>

    <!-- Stats Pills -->
    <div class="flex items-center gap-4">
      <!-- Halving Timer -->
      <div class="px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-center {halvingUrgent ? 'border-red-300 bg-red-50' : ''}">
        <p class="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Halving</p>
        <p class="font-mono font-bold text-lg {halvingUrgent ? 'text-red-600' : 'text-amber-600'}">
          {formatTime(halvingTime)}
        </p>
      </div>

      <!-- Multiplier -->
      <div class="px-5 py-3 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
        <p class="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Multiplier</p>
        <p class="font-mono font-bold text-lg text-purple-700">{halvingMult.toFixed(2)}x</p>
      </div>

      <!-- Goal -->
      <div class="hidden sm:block px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
        <p class="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Target</p>
        <p class="font-mono font-bold text-lg text-gray-700">{formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</p>
      </div>
    </div>
  </div>

  <!-- Progress to Goal -->
  <div>
    <div class="flex items-center justify-between mb-3">
      <span class="text-gray-500 text-sm">Progress to {formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
      <span class="text-purple-600 font-mono font-bold">{progress.toFixed(1)}%</span>
    </div>
    <div class="h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
      <div
        class="h-full bg-purple-600 transition-all duration-300 rounded-full"
        style="width: {progress}%"
      ></div>
    </div>
  </div>

  <!-- Alert Banners -->
  {#if gasMult > 1 || (game.whaleEndTime && Date.now() < game.whaleEndTime)}
    <div class="flex gap-4 mt-6">
      {#if gasMult > 1}
        <div class="flex-1 px-5 py-3 bg-orange-100 border-2 border-orange-300 rounded-lg flex items-center justify-center gap-3">
          <span class="text-xl">⛽</span>
          <span class="text-orange-700 font-bold">Gas Fee {gasMult}x</span>
        </div>
      {/if}
      {#if game.whaleEndTime && Date.now() < game.whaleEndTime}
        <div class="flex-1 px-5 py-3 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center gap-3">
          <span class="text-xl">🐋</span>
          <span class="text-blue-700 font-bold">Whale Dump Active</span>
        </div>
      {/if}
    </div>
  {/if}
</div>
