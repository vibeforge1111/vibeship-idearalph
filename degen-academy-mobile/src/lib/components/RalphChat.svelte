<script lang="ts">
  import { ralphQuote } from '../stores/gameStore.svelte';

  const quote = $derived(ralphQuote.value);
</script>

<div class="flex items-center gap-5">
  <!-- Avatar -->
  <div class="w-14 h-14 bg-purple-600 flex items-center justify-center rounded-lg shadow-lg flex-shrink-0">
    <span class="text-3xl">🐕</span>
  </div>

  <!-- Message -->
  <div class="min-w-0 flex-1">
    <div class="flex items-center gap-3 mb-1">
      <p class="text-purple-300 text-sm font-bold">Ralph</p>
      <span class="text-xs text-white/40 px-2 py-1 bg-white/10 border border-white/20 rounded-md">AI Advisor</span>
    </div>
    <p class="text-white/90 text-base italic">"{quote}"</p>
  </div>
</div>
