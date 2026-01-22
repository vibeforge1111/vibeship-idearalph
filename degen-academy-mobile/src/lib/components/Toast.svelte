<script lang="ts">
  import { toasts, removeToast } from '../stores/gameStore.svelte';

  const typeStyles = {
    success: 'bg-white border-emerald-300 border-l-emerald-500',
    danger: 'bg-white border-red-300 border-l-red-500',
    warning: 'bg-white border-amber-300 border-l-amber-500',
    info: 'bg-white border-blue-300 border-l-blue-500',
  };

  const typeTextColors = {
    success: 'text-emerald-700',
    danger: 'text-red-700',
    warning: 'text-amber-700',
    info: 'text-blue-700',
  };

  const toastList = $derived(toasts.value);
</script>

<div class="fixed top-8 right-8 z-50 flex flex-col gap-3 max-w-sm">
  {#each toastList as toast (toast.id)}
    <div
      class="border-l-4 border rounded-lg p-4 shadow-lg animate-slide-in {typeStyles[toast.type]}"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <div class="min-w-0 flex-1">
          <p class="font-bold text-gray-900 text-sm">{toast.title}</p>
          <p class="{typeTextColors[toast.type]} text-xs mt-1">{toast.message}</p>
        </div>

        <button
          onclick={() => removeToast(toast.id)}
          class="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slide-in 0.2s ease-out;
  }
</style>
