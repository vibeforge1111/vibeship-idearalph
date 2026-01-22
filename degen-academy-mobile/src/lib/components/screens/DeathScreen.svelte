<script lang="ts">
  import { startGame, gameState, ralphQuote, setRalphQuote } from '../../stores/gameStore.svelte';
  import { onMount } from 'svelte';

  const game = $derived(gameState.value);
  const quote = $derived(ralphQuote.value);

  onMount(() => {
    setRalphQuote('death');
  });

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="min-h-screen min-h-dvh flex flex-col bg-cover bg-center relative"
     style="background-image: url('/lab-background.png');">

  <!-- Dark red overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-red-950/80 via-[var(--color-bg-dark)]/85 to-[var(--color-bg-dark)]/95"></div>

  <!-- Animated particles (blood drip effect) -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    {#each Array(8) as _, i}
      <div
        class="blood-drop"
        style="--delay: {i * 0.5}s; --x: {10 + i * 12}%"
      ></div>
    {/each}
  </div>

  <!-- Content -->
  <div class="relative z-10 flex-1 flex flex-col items-center justify-center p-6 safe-area-top safe-area-bottom">
    <!-- Death Icon with glow -->
    <div class="relative mb-6">
      <div class="absolute inset-0 text-8xl blur-lg text-red-500/50 animate-pulse">☠️</div>
      <div class="text-8xl relative animate-float filter drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
        ☠️
      </div>
    </div>

    <!-- Title -->
    <h1 class="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text
               bg-gradient-to-b from-red-400 to-red-600 mb-2 text-center
               drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
      REKT
    </h1>
    <p class="text-zinc-400 text-lg mb-8 text-center">
      Your portfolio has been liquidated
    </p>

    <!-- Stats Card -->
    <div class="relative w-full max-w-sm mb-8 rounded-2xl overflow-hidden">
      <!-- Card background -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95 backdrop-blur-md"></div>
      <div class="absolute inset-0 border-2 border-red-500/30 rounded-2xl"></div>

      <div class="relative p-6">
        <h2 class="text-red-400/80 text-xs uppercase tracking-widest font-bold mb-4 text-center flex items-center justify-center gap-2">
          <span>💀</span>
          Run Statistics
          <span>💀</span>
        </h2>

        <div class="space-y-3">
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Survival Time</span>
            <span class="font-mono text-white font-bold">{formatTime(game.currentRun.elapsed)}</span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Peak Portfolio</span>
            <span class="font-mono text-emerald-400 font-bold">
              ${game.stats.highestPortfolio.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Rugs Eaten</span>
            <span class="font-mono text-red-400 font-bold">{game.stats.rugsEaten}</span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Halvings</span>
            <span class="font-mono text-amber-400 font-bold">{game.currentRun.halvingCount}</span>
          </div>
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent my-4"></div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-zinc-500 text-sm">Total Games</span>
            <span class="font-mono text-cyan-400 font-bold">{game.stats.gamesPlayed}</span>
          </div>
          {#if game.stats.fastestWin}
            <div class="flex justify-between items-center">
              <span class="text-zinc-500 text-sm">Best Win Time</span>
              <span class="font-mono text-purple-400 font-bold">{formatTime(game.stats.fastestWin)}</span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Ralph Quote -->
    <div class="relative w-full max-w-sm mb-8 rounded-2xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-red-900/30 via-slate-900/80 to-red-900/30 backdrop-blur-md"></div>
      <div class="absolute inset-0 border-2 border-purple-500/30 rounded-2xl"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>

      <div class="relative p-4 flex items-center gap-4">
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 bg-purple-500/30 rounded-full blur-md"></div>
          <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600
                      flex items-center justify-center border-2 border-purple-400/50">
            <span class="text-2xl">🐕</span>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Ralph</p>
          <p class="text-zinc-300 text-sm italic">"{quote}"</p>
        </div>
      </div>
    </div>

    <!-- Play Again Button -->
    <button
      onclick={() => startGame()}
      class="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500
             hover:from-red-500 hover:to-red-400
             active:from-red-700 active:to-red-600
             text-white font-display font-bold text-lg
             px-12 py-4 rounded-xl
             shadow-xl shadow-red-500/40 hover:shadow-red-500/60
             transition-all duration-200 transform hover:scale-105 active:scale-100"
    >
      <span class="relative z-10 flex items-center gap-2">
        <span>🔄</span>
        TRY AGAIN
      </span>
    </button>
  </div>

  <!-- Footer -->
  <footer class="relative z-10 text-center py-4">
    <p class="font-mono text-zinc-600 text-xs">
      The real rug was the lessons we learned along the way
    </p>
  </footer>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 2s ease-in-out infinite;
  }

  @keyframes blood-drop {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  .blood-drop {
    position: absolute;
    width: 4px;
    height: 20px;
    background: linear-gradient(to bottom, rgba(239, 68, 68, 0.6), transparent);
    left: var(--x);
    top: -20px;
    animation: blood-drop 3s ease-in infinite;
    animation-delay: var(--delay);
    border-radius: 0 0 4px 4px;
  }
</style>
