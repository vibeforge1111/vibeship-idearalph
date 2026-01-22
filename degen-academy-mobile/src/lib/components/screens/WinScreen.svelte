<script lang="ts">
  import { startGame, gameState, ralphQuote, setRalphQuote } from '../../stores/gameStore.svelte';
  import { GAME_CONSTANTS } from '../../../data/constants';
  import { onMount } from 'svelte';

  const game = $derived(gameState.value);
  const quote = $derived(ralphQuote.value);

  onMount(() => {
    setRalphQuote('victory');
  });

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const isNewRecord = $derived(game.stats.fastestWin === game.currentRun.elapsed);
</script>

<div class="min-h-screen min-h-dvh flex flex-col bg-cover bg-center relative"
     style="background-image: url('/lab-background.png');">

  <!-- Victory gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-purple-950/70 via-[var(--color-bg-dark)]/80 to-emerald-950/70"></div>

  <!-- Confetti Effect -->
  <div class="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
    {#each Array(30) as _, i}
      <div
        class="confetti"
        style="--delay: {Math.random() * 5}s; --x: {Math.random() * 100}vw; --duration: {3 + Math.random() * 3}s; --color: {['#a855f7', '#22d3ee', '#facc15', '#22c55e', '#f472b6'][i % 5]}"
      ></div>
    {/each}
  </div>

  <!-- Content -->
  <div class="relative z-10 flex-1 flex flex-col items-center justify-center p-6 safe-area-top safe-area-bottom">
    <!-- Trophy Icon with glow -->
    <div class="relative mb-6">
      <div class="absolute inset-0 text-8xl blur-xl text-amber-500/50 animate-pulse">🏆</div>
      <div class="text-8xl relative animate-glow filter drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
        🏆
      </div>
    </div>

    <!-- Title -->
    <h1 class="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text
               bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-2 text-center animate-gradient">
      GRADUATED!
    </h1>
    <p class="text-zinc-400 text-lg mb-2 text-center">
      You reached ${GAME_CONSTANTS.WIN_PORTFOLIO.toLocaleString()}!
    </p>
    {#if isNewRecord}
      <div class="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/50 mb-6">
        <p class="text-amber-400 text-sm font-bold animate-pulse flex items-center gap-2">
          <span>🎉</span> NEW RECORD TIME! <span>🎉</span>
        </p>
      </div>
    {:else}
      <div class="mb-6"></div>
    {/if}

    <!-- Stats Card -->
    <div class="relative w-full max-w-sm mb-8 rounded-2xl overflow-hidden">
      <!-- Card background -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95 backdrop-blur-md"></div>
      <div class="absolute inset-0 border-2 border-purple-500/40 rounded-2xl"></div>

      <div class="relative p-6">
        <h2 class="text-purple-400/80 text-xs uppercase tracking-widest font-bold mb-4 text-center flex items-center justify-center gap-2">
          <span>🎓</span>
          Graduation Stats
          <span>🎓</span>
        </h2>

        <div class="space-y-3">
          <div class="flex justify-between items-center p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <span class="text-zinc-400 text-sm">Time to Graduate</span>
            <span class="font-mono text-cyan-400 font-bold">{formatTime(game.currentRun.elapsed)}</span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Final Portfolio</span>
            <span class="font-mono text-emerald-400 font-bold">
              ${game.portfolio.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Peak Portfolio</span>
            <span class="font-mono text-purple-400 font-bold">
              ${game.stats.highestPortfolio.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Rugs Survived</span>
            <span class="font-mono text-red-400 font-bold">{game.stats.rugsEaten}</span>
          </div>
          <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
            <span class="text-zinc-400 text-sm">Halvings</span>
            <span class="font-mono text-amber-400 font-bold">{game.currentRun.halvingCount}</span>
          </div>
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-4"></div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-zinc-500 text-sm">Total Wins</span>
            <span class="font-mono text-cyan-400 font-bold">{game.stats.gamesPlayed}</span>
          </div>
          {#if game.stats.fastestWin}
            <div class="flex justify-between items-center">
              <span class="text-zinc-500 text-sm">Best Time</span>
              <span class="font-mono text-purple-400 font-bold">{formatTime(game.stats.fastestWin)}</span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Ralph Quote -->
    <div class="relative w-full max-w-sm mb-8 rounded-2xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-cyan-900/40 backdrop-blur-md"></div>
      <div class="absolute inset-0 border-2 border-purple-500/30 rounded-2xl"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-cyan-500"></div>

      <div class="relative p-4 flex items-center gap-4">
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 bg-amber-500/30 rounded-full blur-md animate-pulse"></div>
          <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600
                      flex items-center justify-center border-2 border-amber-400/50
                      shadow-lg shadow-amber-500/30">
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
      class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600
             hover:from-purple-500 hover:via-fuchsia-500 hover:to-cyan-500
             active:from-purple-700 active:via-fuchsia-700 active:to-cyan-700
             text-white font-display font-bold text-lg
             px-12 py-4 rounded-xl
             shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60
             transition-all duration-200 transform hover:scale-105 active:scale-100"
    >
      <span class="relative z-10 flex items-center gap-2">
        <span>🚀</span>
        PLAY AGAIN
      </span>
    </button>
  </div>

  <!-- Footer -->
  <footer class="relative z-10 text-center py-4">
    <p class="font-mono text-zinc-600 text-xs">
      True degen: completing the game and immediately starting over
    </p>
  </footer>
</div>

<style>
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.5)); }
    50% { filter: drop-shadow(0 0 40px rgba(34, 211, 238, 0.8)); }
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-gradient {
    background-size: 200% auto;
    animation: gradient 3s ease infinite;
  }

  @keyframes confetti-fall {
    0% {
      transform: translateY(-20px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--color);
    left: var(--x);
    top: -20px;
    animation: confetti-fall var(--duration) linear infinite;
    animation-delay: var(--delay);
    border-radius: 2px;
  }

  .confetti:nth-child(odd) {
    width: 8px;
    height: 12px;
  }

  .confetti:nth-child(3n) {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
</style>
