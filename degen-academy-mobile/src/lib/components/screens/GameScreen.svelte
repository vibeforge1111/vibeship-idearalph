<script lang="ts">
  import { pools } from '../../stores/gameStore.svelte';
  import TopBar from '../TopBar.svelte';
  import BottomBar from '../BottomBar.svelte';
  import PoolCard from '../PoolCard.svelte';
  import RalphChat from '../RalphChat.svelte';
  import Toast from '../Toast.svelte';

  const poolList = $derived(pools.value);
</script>

<div class="min-h-screen min-h-dvh flex flex-col bg-cover bg-center bg-fixed relative"
     style="background-image: url('/ralph-lab-bg.png');">

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-slate-950/85"></div>

  <!-- Toast Notifications -->
  <Toast />

  <!-- Main Content -->
  <div class="relative z-10 flex-1 flex flex-col h-screen h-dvh overflow-hidden">

    <!-- Fixed Header -->
    <header class="flex-shrink-0 py-8">
      <div class="max-w-3xl mx-auto px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 bg-gray-900 flex items-center justify-center rounded-lg">
              <span class="text-xl">🐕</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">Ralph's Degen Academy</h1>
              <p class="text-purple-300/80 text-sm">Learn to survive DeFi</p>
            </div>
          </div>

          <!-- Connected Badge -->
          <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-md">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span class="text-emerald-400 text-xs font-medium">Connected</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Top Stats Bar -->
    <div class="flex-shrink-0 pb-8">
      <div class="max-w-3xl mx-auto px-8">
        <TopBar />
      </div>
    </div>

    <!-- Scrollable Pool Grid -->
    <div class="flex-1 overflow-y-auto pb-8">
      <div class="max-w-3xl mx-auto px-8">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <h2 class="text-white font-medium">Liquidity Pools</h2>
            <span class="text-gray-400 text-xs px-2 py-1 bg-white/10 border border-white/10 rounded">{poolList.length} Active</span>
          </div>
        </div>

        <!-- Pool Grid - 2 cards per row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {#each poolList as pool (pool.id)}
            <PoolCard {pool} />
          {/each}
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Section -->
    <div class="flex-shrink-0 bg-slate-900/95 backdrop-blur border-t border-white/10">
      <div class="max-w-3xl mx-auto px-8 py-6">
        <RalphChat />
        <div class="mt-5">
          <BottomBar />
        </div>
      </div>
    </div>
  </div>
</div>
