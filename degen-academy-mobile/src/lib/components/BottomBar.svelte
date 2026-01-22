<script lang="ts">
  import { portfolio } from '../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../data/constants';

  const portfolioVal = $derived(portfolio.value);
  const progress = $derived(Math.min((portfolioVal / GAME_CONSTANTS.WIN_PORTFOLIO) * 100, 100));

  // For segmented progress bar
  const totalSegments = 24;
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

<!-- Full-width Progress Bar -->
<div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
    <span class="text-white/50" style="font-size: 12px;">Progress to {formatMoney(GAME_CONSTANTS.WIN_PORTFOLIO)}</span>
    <span class="text-cyan-400 font-mono font-bold" style="font-size: 14px;">{progress.toFixed(1)}%</span>
  </div>

  <!-- Segmented Progress Bar - Full Width -->
  <div style="display: flex; gap: 3px;">
    {#each Array(totalSegments) as _, i}
      <div
        class="transition-all duration-300"
        style="flex: 1; height: 12px; border-radius: 3px; background: {i < filledSegments ? '#22d3ee' : '#383848'};"
      ></div>
    {/each}
  </div>
</div>
