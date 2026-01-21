<script lang="ts">
</script>

<nav class="bg-paper border-b-4 border-chalkboard sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo with Ralph's head -->
      <a href="/" class="flex items-center gap-2 group">
        <svg class="w-10 h-10 transition-transform group-hover:scale-110" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="128" cy="128" r="120" fill="#FFD93D" stroke="none"/>
          <line x1="128" y1="48" x2="128" y2="16"/>
          <line x1="128" y1="208" x2="128" y2="240"/>
          <line x1="48" y1="128" x2="16" y2="128"/>
          <line x1="208" y1="128" x2="240" y2="128"/>
          <line x1="68" y1="68" x2="44" y2="44"/>
          <line x1="188" y1="68" x2="212" y2="44"/>
          <line x1="68" y1="188" x2="44" y2="212"/>
          <line x1="188" y1="188" x2="212" y2="212"/>
          <circle cx="128" cy="128" r="72"/>
          <path d="M80,72 Q90,56 100,72" fill="none"/>
          <path d="M116,64 Q128,48 140,64" fill="none"/>
          <path d="M156,72 Q166,56 176,72" fill="none"/>
          <circle cx="104" cy="118" r="12" fill="currentColor"/>
          <circle cx="152" cy="122" r="12" fill="currentColor"/>
          <circle cx="128" cy="140" r="4" fill="currentColor"/>
          <path d="M100,160 Q128,184 156,160" fill="none"/>
        </svg>
        <span class="font-chalk text-xl text-chalkboard hidden sm:block">IdeaRalph</span>
      </a>

      <!-- Hackathon Button -->
      <a
        href="/hackathon"
        class="bg-[#8B7BF7] hover:bg-[#7B6BE7] text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        <span class="hidden sm:inline">Hackathon</span>
      </a>
    </div>
  </div>
</nav>
