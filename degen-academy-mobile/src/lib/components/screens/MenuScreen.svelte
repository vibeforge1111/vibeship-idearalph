<script lang="ts">
  import { startGame, ralphQuote } from '../../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../../data/constants';

  const quote = $derived(ralphQuote.value);
</script>

<div class="min-h-screen min-h-dvh flex flex-col bg-cover bg-center relative"
     style="background-image: url('/lab-background.png');">

  <!-- Dark overlay with gradient -->
  <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)]/70 via-[var(--color-bg-dark)]/60 to-purple-950/80"></div>

  <!-- Animated grid pattern overlay -->
  <div class="absolute inset-0 opacity-5 pointer-events-none"
       style="background-image: linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px);
              background-size: 50px 50px;"></div>

  <!-- Content -->
  <div class="relative z-10 flex flex-col min-h-screen min-h-dvh p-4 sm:p-6 safe-area-top safe-area-bottom">

    <!-- Header -->
    <header class="text-center pt-6 sm:pt-10">
      <div class="relative inline-block mb-4">
        <div class="absolute inset-0 text-6xl sm:text-7xl blur-lg text-purple-500/30 animate-pulse">🧪</div>
        <span class="text-6xl sm:text-7xl relative filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">🧪</span>
      </div>
      <h1 class="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text
                 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-3">
        DEGEN ACADEMY
      </h1>
      <p class="text-cyan-400 text-sm sm:text-base font-mono tracking-wider">
        THE LAB - Learn DeFi by getting rekt (safely)
      </p>
    </header>

    <!-- Play Button -->
    <div class="flex-1 flex items-center justify-center py-8">
      <button
        onclick={() => startGame()}
        class="relative group bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600
               hover:from-purple-500 hover:via-fuchsia-500 hover:to-purple-500
               active:from-purple-700 active:via-fuchsia-700 active:to-purple-700
               text-white font-display font-bold text-xl sm:text-2xl
               px-10 sm:px-14 py-5 sm:py-6 rounded-2xl
               shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60
               transition-all duration-200 transform hover:scale-105 active:scale-100
               min-h-[64px] min-w-[220px] overflow-hidden"
      >
        <!-- Shimmer effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <span class="relative z-10 flex items-center justify-center gap-2">
          <span>🚀</span>
          ENTER THE LAB
        </span>
      </button>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <!-- Start Card -->
      <div class="relative rounded-2xl overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 backdrop-blur-md"></div>
        <div class="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl group-hover:border-emerald-400/50 transition-colors"></div>
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>

        <div class="relative p-4 flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-2">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-emerald-500/20 flex items-center justify-center
                      border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <span class="text-3xl sm:text-4xl">💰</span>
          </div>
          <div class="text-left sm:text-center">
            <p class="font-mono font-bold text-white text-lg sm:text-xl">${GAME_CONSTANTS.STARTING_PORTFOLIO.toLocaleString()}</p>
            <p class="text-emerald-400/70 text-xs uppercase tracking-wider">Starting Funds</p>
          </div>
        </div>
      </div>

      <!-- Goal Card -->
      <div class="relative rounded-2xl overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 backdrop-blur-md"></div>
        <div class="absolute inset-0 border-2 border-purple-500/30 rounded-2xl group-hover:border-purple-400/50 transition-colors"></div>
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500"></div>

        <div class="relative p-4 flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-2">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-purple-500/20 flex items-center justify-center
                      border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <span class="text-3xl sm:text-4xl">🎯</span>
          </div>
          <div class="text-left sm:text-center">
            <p class="font-mono font-bold text-white text-lg sm:text-xl">${GAME_CONSTANTS.WIN_PORTFOLIO.toLocaleString()}</p>
            <p class="text-purple-400/70 text-xs uppercase tracking-wider">Goal to Graduate</p>
          </div>
        </div>
      </div>

      <!-- Halving Card -->
      <div class="relative rounded-2xl overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 backdrop-blur-md"></div>
        <div class="absolute inset-0 border-2 border-amber-500/30 rounded-2xl group-hover:border-amber-400/50 transition-colors"></div>
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div>

        <div class="relative p-4 flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-2">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-amber-500/20 flex items-center justify-center
                      border border-amber-500/30 shadow-lg shadow-amber-500/20">
            <span class="text-3xl sm:text-4xl">⏰</span>
          </div>
          <div class="text-left sm:text-center">
            <p class="font-mono font-bold text-white text-lg sm:text-xl">5 min</p>
            <p class="text-amber-400/70 text-xs uppercase tracking-wider">Halving Interval</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ralph Quote -->
    <div class="relative rounded-2xl overflow-hidden group mb-4">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-fuchsia-900/40 backdrop-blur-md"></div>
      <div class="absolute inset-0 border-2 border-purple-500/30 rounded-2xl group-hover:border-purple-400/50 transition-colors"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-purple-500"></div>

      <div class="relative p-4 flex items-center gap-4">
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 bg-purple-500/30 rounded-full blur-md animate-pulse"></div>
          <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600
                      flex items-center justify-center border-2 border-purple-400/50
                      shadow-lg shadow-purple-500/30">
            <span class="text-2xl">🐕</span>
          </div>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-1">
            <p class="text-purple-400 text-xs font-bold uppercase tracking-wider">Ralph</p>
            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-purple-500/30 text-purple-300 border border-purple-500/30">
              Coach
            </span>
          </div>
          <p class="text-zinc-300 text-sm italic leading-relaxed">"{quote}"</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-4">
      <p class="font-mono text-zinc-600 text-xs">
        No real money. Just vibes and education. WAGMI (or not)
      </p>
    </footer>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
</style>
