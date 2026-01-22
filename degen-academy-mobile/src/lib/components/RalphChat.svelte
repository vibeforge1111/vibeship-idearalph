<script lang="ts">
  import { ralphQuote } from '../stores/gameStore.svelte';

  const quote = $derived(ralphQuote.value);
</script>

<div class="rounded-xl" style="padding: 16px 20px; background: #2d2d3a;">
  <div class="flex items-center gap-3 mb-2">
    <p class="text-purple-300 text-sm font-bold">Ralph</p>
    <span class="text-xs text-white/40 px-2 py-1 rounded-md" style="background: #383848;">AI Advisor</span>
  </div>
  <p class="text-white/80 text-sm italic">"{quote}"</p>
</div>
