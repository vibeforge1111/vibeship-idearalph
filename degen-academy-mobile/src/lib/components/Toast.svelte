<script lang="ts">
  import { toasts, removeToast } from '../stores/gameStore.svelte';

  const typeConfig = {
    success: { bg: '#d1fae5', accent: '#059669', icon: '✓' },
    danger: { bg: '#fee2e2', accent: '#dc2626', icon: '⚠' },
    warning: { bg: '#fef3c7', accent: '#d97706', icon: '⚡' },
    info: { bg: '#dbeafe', accent: '#2563eb', icon: '●' },
  };

  const toastList = $derived(toasts.value);
</script>

<div class="fixed z-50 flex flex-col" style="top: 24px; right: 32px; gap: 12px; max-width: 320px;">
  {#each toastList as toast (toast.id)}
    {@const config = typeConfig[toast.type]}
    <div
      class="animate-slide-in"
      style="
        padding: 14px 18px;
        background: #e0e5ec;
        border-radius: 12px;
        border-left: 4px solid {config.accent};
        box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
      "
      role="alert"
    >
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <!-- Icon Badge -->
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: {config.bg};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: {config.accent};
          box-shadow: inset 2px 2px 4px rgba(0,0,0,0.05), inset -2px -2px 4px rgba(255,255,255,0.8);
        ">
          {config.icon}
        </div>

        <!-- Content -->
        <div style="flex: 1; min-width: 0;">
          <p style="font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 2px;">{toast.title}</p>
          <p style="font-size: 11px; color: {config.accent};">{toast.message}</p>
        </div>

        <!-- Close button -->
        <button
          onclick={() => removeToast(toast.id)}
          style="
            padding: 4px 8px;
            font-size: 11px;
            color: #94a3b8;
            background: transparent;
            border: none;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s;
          "
          onmouseenter={(e) => e.currentTarget.style.background = '#d1d5db'}
          onmouseleave={(e) => e.currentTarget.style.background = 'transparent'}
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
    animation: slide-in 0.25s ease-out;
  }
</style>
