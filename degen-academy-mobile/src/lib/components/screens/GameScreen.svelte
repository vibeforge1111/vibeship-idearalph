<script lang="ts">
  import { pools, portfolio } from '../../stores/gameStore.svelte';
  import TopBar from '../TopBar.svelte';
  import BottomBar from '../BottomBar.svelte';
  import PoolCard from '../PoolCard.svelte';
  import RalphChat from '../RalphChat.svelte';
  import Toast from '../Toast.svelte';

  const poolList = $derived(pools.value);
  const portfolioVal = $derived(portfolio.value);

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

    <!-- Fixed Header - Left aligned -->
    <header class="flex-shrink-0 py-6 px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/ralph-logo.png" alt="Ralph" class="w-12 h-12 rounded-lg object-cover" />
          <h1 class="text-xl font-bold text-white">Ralph's Degen Academy</h1>
        </div>

        <!-- Wallet -->
        <div class="flex items-center gap-2">
          <span class="text-white/60 text-sm">Wallet</span>
          <span class="font-mono font-bold text-xl text-white">{formatMoney(portfolioVal)}</span>
        </div>
      </div>
    </header>

    <!-- Top Stats Bar - Full width, edge-to-edge -->
    <div class="flex-shrink-0">
      <TopBar />
    </div>

    <!-- Scrollable Pool Grid - Centered -->
    <div class="flex-1 overflow-y-auto pb-8">
      <div class="flex flex-col items-center px-8">
        <!-- Section Header -->
        <div class="flex items-center justify-center mb-6">
          <div class="flex items-center gap-3">
            <h2 class="text-white font-medium">Liquidity Pools</h2>
            <span class="text-gray-400 text-xs px-2 py-1 bg-white/10 border border-white/10 rounded">{poolList.length} Active</span>
          </div>
        </div>

        <!-- Pool Grid - 2 cards per row, centered -->
        <div class="w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {#each poolList as pool (pool.id)}
            <PoolCard {pool} />
          {/each}
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Section - Centered -->
    <div class="flex-shrink-0 bg-slate-900/95 backdrop-blur border-t border-white/10">
      <div class="flex justify-center px-8 py-6">
        <div class="w-full max-w-3xl">
          <RalphChat />
          <div class="mt-5">
            <BottomBar />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
