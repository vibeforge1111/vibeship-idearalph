<script lang="ts">
  import './app.css';
  import { currentScreen } from './lib/stores/gameStore.svelte';
  import MenuScreen from './lib/components/screens/MenuScreen.svelte';
  import GameScreen from './lib/components/screens/GameScreen.svelte';
  import DeathScreen from './lib/components/screens/DeathScreen.svelte';
  import WinScreen from './lib/components/screens/WinScreen.svelte';
</script>

<main class="min-h-screen min-h-dvh bg-[var(--color-bg-dark)]">
  {#if currentScreen.value === 'menu'}
    <MenuScreen />
  {:else if currentScreen.value === 'game'}
    <GameScreen />
  {:else if currentScreen.value === 'death'}
    <DeathScreen />
  {:else if currentScreen.value === 'win'}
    <WinScreen />
  {/if}
</main>
