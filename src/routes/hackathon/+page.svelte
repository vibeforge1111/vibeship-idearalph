<script lang="ts">
  // FAQ state
  let openFaq = $state<number | null>(null);
  let copied = $state(false);

  // Terminal animation state
  let showLine1 = $state(false);
  let showLine2 = $state(false);
  let showCommand = $state(false);
  let typedCommand = $state('');
  let showOutput = $state(false);
  let typedSpwn = $state('');
  let typedVibecoins = $state('');
  let showCursor = $state(false);
  let animationComplete = $state(false);

  const commandText = 'hackathon';
  const spwnText = '/spwn';
  const vibecoinsText = 'VIBECOINS';

  // Typing effect helper
  function typeText(text: string, setter: (val: string) => void, speed: number = 80): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setter(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  // Run animation sequence on mount
  $effect(() => {
    if (animationComplete) return;

    const runAnimation = async () => {
      await new Promise(r => setTimeout(r, 500)); // Initial delay

      showLine1 = true;
      await new Promise(r => setTimeout(r, 300));

      showLine2 = true;
      await new Promise(r => setTimeout(r, 200));

      showCommand = true;
      await typeText(commandText, (val) => typedCommand = val, 100);
      await new Promise(r => setTimeout(r, 400));

      showOutput = true;
      await typeText(spwnText, (val) => typedSpwn = val, 120);
      await new Promise(r => setTimeout(r, 150));
      await typeText(vibecoinsText, (val) => typedVibecoins = val, 80);
      await new Promise(r => setTimeout(r, 300));

      showCursor = true;
      animationComplete = true;
    };

    runAnimation();
  });

  const faqs = [
    {
      q: "What is vibe coding?",
      a: "Building apps with AI assistance (Claude Code, Cursor, Copilot). You don't need to be a senior dev - if you can ship with AI, you're a vibe coder."
    },
    {
      q: "How does the launchpad work?",
      a: "Build → Grow → Launch on vibe/vibe. Three paths: Community Voted (open to all), Curated (higher raises), or Degen (bonding curve, instant launch). Plus you earn creator fees from trading volume."
    },
    {
      q: "Is there a deadline?",
      a: "No! This is a continuous hackathon. Build at your pace. Launch when you're ready."
    },
    {
      q: "How do I earn tokens?",
      a: "Use IdeaRalph as an MCP to earn a portion. But the biggest allocation goes to vibe coders who actually ship apps. Builders who ship get the most."
    }
  ];

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }

  function copyCommand() {
    navigator.clipboard.writeText('npx github:vibeforge1111/vibeship-idearalph install --with-spawner');
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<svelte:head>
  <title>/spwn VIBECOINS | IdeaRalph x vibe/vibe</title>
  <meta name="description" content="Launchpad for vibe coders, vibecoins, and those who wanna bet on vibecoins. Build with AI, grow your audience, launch on vibe/vibe." />
</svelte:head>

<main class="bg-playground-sunset overflow-hidden">
  <!-- Hero Section (Terminal Style) -->
  <section class="relative py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Terminal Window -->
      <div class="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#333]">
        <!-- Terminal Header -->
        <div class="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#333]">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27ca40]"></div>
          <span class="ml-2 text-white/40 text-xs font-mono">claude-code</span>
        </div>

        <!-- Terminal Content -->
        <div class="p-6 font-mono min-h-[180px]">
          <!-- Logos row -->
          {#if showLine1}
            <div class="flex items-center gap-2 mb-4 text-white/50 text-sm animate-fade-in">
              <span class="text-[#27ca40]">~</span>
              <span>IdeaRalph × vibe/vibe</span>
            </div>
          {/if}

          <!-- Command -->
          {#if showLine2}
            <div class="flex items-center gap-2 mb-2 animate-fade-in">
              <span class="text-[#27ca40]">$</span>
              {#if showCommand}
                <span class="text-white/60 text-sm">{typedCommand}<span class="inline-block w-2 h-4 bg-white/70 ml-0.5 animate-pulse" class:hidden={typedCommand === commandText}></span></span>
              {/if}
            </div>
          {/if}

          <!-- Output - Campaign Name -->
          {#if showOutput}
            <div class="pl-4 animate-fade-in flex items-center">
              <span class="text-[#ffbd2e] text-3xl md:text-4xl font-bold tracking-wide">{typedSpwn}</span>
              {#if typedVibecoins}
                <span class="text-white text-3xl md:text-4xl font-bold tracking-wide ml-2">{typedVibecoins}</span>
              {/if}
              {#if typedVibecoins !== vibecoinsText}
                <span class="w-3 h-8 bg-white/70 ml-1 animate-pulse"></span>
              {:else if showCursor}
                <span class="w-3 h-8 bg-white/70 ml-1 animate-blink"></span>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- The Flow Section (Original Style) -->
  <section class="bg-paper py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-center mb-10">
        <div class="thought-bubble bg-white px-8 py-4">
          <p class="ralph-voice text-xl md:text-2xl text-chalkboard text-center">
            "Build → Grow → Launch"
          </p>
        </div>
      </div>

      <!-- 3 Step Flow -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-10">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-ralph-yellow rounded-full flex items-center justify-center border-3 border-chalkboard shadow-crayon mb-2">
            <!-- Build icon - hammer -->
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <span class="font-chalk text-lg">Build</span>
          <span class="text-xs text-chalkboard/60">Vibe code your app</span>
        </div>
        <span class="text-2xl text-chalkboard/30 hidden md:block">→</span>
        <span class="text-2xl text-chalkboard/30 md:hidden rotate-90">→</span>
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-playground-green rounded-full flex items-center justify-center border-3 border-chalkboard shadow-crayon mb-2">
            <!-- Grow icon - sprout -->
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 20h10"/>
              <path d="M12 20v-8"/>
              <path d="M12 12c-2-2-5-2.5-5 0 0 3 5 3 5 0"/>
              <path d="M12 12c2-2 5-2.5 5 0 0 3-5 3-5 0"/>
              <path d="M12 8V4"/>
              <circle cx="12" cy="4" r="1" fill="currentColor"/>
            </svg>
          </div>
          <span class="font-chalk text-lg">Grow</span>
          <span class="text-xs text-chalkboard/60">Build your audience</span>
        </div>
        <span class="text-2xl text-chalkboard/30 hidden md:block">→</span>
        <span class="text-2xl text-chalkboard/30 md:hidden rotate-90">→</span>
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center border-3 border-chalkboard shadow-crayon mb-2">
            <!-- Launch icon - rocket -->
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>
          <span class="font-chalk text-lg">Launch</span>
          <span class="text-xs text-chalkboard/60">On vibe/vibe</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================== -->
  <!-- vibe/vibe vibecoin launchpad Section -->
  <!-- ============================================== -->
  <section id="launchpad" class="bg-[#0a0a0f] py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Floating cubes background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 border border-purple-500/20 rotate-12"></div>
        <div class="absolute bottom-20 right-10 w-8 h-8 border border-purple-500/30 -rotate-12"></div>
      </div>

      <div class="relative z-10 text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          vibe/vibe vibecoin launchpad
        </h2>
        <p class="text-lg text-white/50">For vibe coders, vibecoins, and degens.</p>
      </div>

      <!-- Three Paths -->
      <div class="relative z-10 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        <div class="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
          <div class="w-12 h-12 mb-4">
            <!-- Vote/Poll icon - checkmark in box -->
            <svg class="w-full h-full text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 12l2 2 4-4"/>
              <path d="M3 15h18"/>
              <path d="M7 19h2"/>
              <path d="M15 19h2"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Community Voted</h3>
          <p class="text-white/50 mb-4 text-sm">Ship an app + grow traction → community votes</p>
          <div class="text-white/30 text-sm">Open to everyone who builds</div>
        </div>

        <div class="bg-[#8B7BF7]/10 rounded-2xl p-6 border border-[#8B7BF7]/30 hover:border-[#8B7BF7]/50 transition-all">
          <div class="w-12 h-12 mb-4">
            <!-- Crown icon -->
            <svg class="w-full h-full text-[#8B7BF7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 17L12 22L22 17"/>
              <path d="M2 12L12 17L22 12"/>
              <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-[#8B7BF7] mb-2">Curated</h3>
          <p class="text-white/50 mb-4 text-sm">Strong traction → selected for higher raise</p>
          <div class="text-[#8B7BF7]/70 text-sm">+ Bonus token allocation</div>
        </div>

        <div class="bg-emerald-600/10 rounded-2xl p-6 border border-emerald-600/30 hover:border-emerald-600/50 transition-all">
          <div class="w-12 h-12 mb-4">
            <!-- Degen - lightning bolt / zap icon -->
            <svg class="w-full h-full text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-500 mb-2">Degen</h3>
          <p class="text-white/50 mb-4 text-sm">No raise needed → straight launch via bonding curve</p>
          <div class="text-emerald-500/70 text-sm">Instant liquidity</div>
        </div>
      </div>

      <!-- Creator fees note -->
      <div class="relative z-10 flex justify-center">
        <div class="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/20">
          <svg class="w-6 h-6 text-[#8B7BF7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v12"/>
            <path d="M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5 1.5 2.5 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5"/>
          </svg>
          <span class="text-white font-medium">All vibe coders earn creator fees from trading volume</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================== -->
  <!-- Earn Tokens Section (SEEDIFY STYLE) -->
  <!-- ============================================== -->
  <section class="bg-[#0a0a0f] py-20 px-4 border-t border-white/5">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Earn <span class="text-[#8B7BF7]">$???</span> Tokens
        </h2>
        <p class="text-lg text-white/50">
          Token name revealed soon. Multiple ways to earn.
        </p>
      </div>

      <!-- Earnings Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
          <div class="w-8 h-8 mb-3">
            <!-- Plug icon -->
            <svg class="w-full h-full text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22v-5"/>
              <path d="M9 8V2"/>
              <path d="M15 8V2"/>
              <path d="M18 8v5a6 6 0 0 1-6 6a6 6 0 0 1-6-6V8Z"/>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Use MCP</h3>
          <p class="text-white/40 text-sm">Use IdeaRalph as an MCP to earn a portion of tokens</p>
        </div>

        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
          <div class="w-8 h-8 mb-3">
            <!-- Build icon -->
            <svg class="w-full h-full text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Build & Ship</h3>
          <p class="text-white/40 text-sm">Vibe coders who ship apps get the biggest allocation</p>
        </div>

        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
          <div class="w-8 h-8 mb-3">
            <!-- Rocket icon -->
            <svg class="w-full h-full text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Launch</h3>
          <p class="text-white/40 text-sm">Launch on vibe/vibe for bonus allocation</p>
        </div>

        <div class="bg-[#8B7BF7]/10 rounded-xl p-6 border border-[#8B7BF7]/30">
          <div class="w-8 h-8 mb-3">
            <!-- Dollar/percentage icon -->
            <svg class="w-full h-full text-[#8B7BF7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <h3 class="text-[#8B7BF7] font-semibold mb-2">Creator Fees</h3>
          <p class="text-white/40 text-sm">Earn from trading volume on your vibecoin</p>
        </div>
      </div>

      <!-- Token Distribution -->
      <div class="mt-12 bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 class="text-white font-semibold mb-6 text-center">Token Distribution</h3>
        <!-- Bar only -->
        <div class="flex h-4 rounded-lg overflow-hidden mb-4">
          <div class="bg-[#8B7BF7]" style="width: 35%"></div>
          <div class="bg-[#8B7BF7]/60" style="width: 30%"></div>
          <div class="bg-[#8B7BF7]/40" style="width: 25%"></div>
          <div class="bg-[#8B7BF7]/20" style="width: 10%"></div>
        </div>
        <!-- Labels underneath -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div class="flex items-center gap-2 justify-center">
            <div class="w-3 h-3 rounded bg-[#8B7BF7]"></div>
            <span class="text-white/80 text-xs">SFUND Stakers 35%</span>
          </div>
          <div class="flex items-center gap-2 justify-center">
            <div class="w-3 h-3 rounded bg-[#8B7BF7]/60"></div>
            <span class="text-white/80 text-xs">X Community 30%</span>
          </div>
          <div class="flex items-center gap-2 justify-center">
            <div class="w-3 h-3 rounded bg-[#8B7BF7]/40"></div>
            <span class="text-white/80 text-xs">Vibe Coders 25%</span>
          </div>
          <div class="flex items-center gap-2 justify-center">
            <div class="w-3 h-3 rounded bg-[#8B7BF7]/20"></div>
            <span class="text-white/80 text-xs">Liq 10%</span>
          </div>
        </div>
        <p class="text-white/40 text-sm text-center mt-4">SFUND stakers must be staking for at least 3 months to qualify. More details coming soon.</p>
      </div>
    </div>
  </section>

  <!-- Get Started Section (Original Style) -->
  <section id="get-started" class="bg-gradient-to-b from-playground-green/20 to-white py-16 px-4">
    <div class="max-w-2xl mx-auto text-center">
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 bg-playground-green rounded-full flex items-center justify-center border-3 border-chalkboard shadow-crayon">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        </div>
      </div>
      <h2 class="font-chalk text-3xl md:text-4xl text-chalkboard mb-4">
        Start Building Now
      </h2>
      <p class="text-chalkboard/60 mb-8">
        Install the IdeaRalph MCP and start vibe coding
      </p>

      <!-- Install Command -->
      <div class="bg-white rounded-xl border-3 border-chalkboard shadow-crayon p-6 mb-8 text-left">
        <p class="text-sm text-chalkboard/70 mb-3">One command to install:</p>
        <div class="bg-chalkboard rounded-lg p-4 mb-4">
          <code class="text-sm text-playground-green font-mono block">
            npx github:vibeforge1111/vibeship-idearalph install --with-spawner
          </code>
        </div>
        <button
          onclick={copyCommand}
          class="btn-crayon w-full text-sm {copied ? 'bg-playground-green' : ''}"
        >
          {copied ? '✓ Copied!' : 'Copy Command'}
        </button>
      </div>

      <p class="text-chalkboard/60 text-sm mb-3">Then restart Claude:</p>
      <div class="flex items-center justify-center gap-3">
        <code class="bg-white px-3 py-1.5 rounded-lg font-bold border-3 border-chalkboard shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:rotate-1 cursor-pointer">exit</code>
        <span class="bg-white px-2 py-1 rounded-lg font-bold border-3 border-chalkboard shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:rotate-2 cursor-pointer">→</span>
        <code class="bg-white px-3 py-1.5 rounded-lg font-bold border-3 border-chalkboard shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:-rotate-1 cursor-pointer">claude</code>
      </div>
    </div>
  </section>

  <!-- FAQ Section (Original Style) -->
  <section class="bg-white py-16 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 bg-ralph-yellow rounded-full flex items-center justify-center border-3 border-chalkboard shadow-crayon">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <path d="M12 17h.01"/>
          </svg>
        </div>
      </div>
      <h2 class="font-chalk text-3xl text-chalkboard text-center mb-8">
        FAQ
      </h2>

      <div class="space-y-4">
        {#each faqs as faq, i}
          <div class="border-2 border-chalkboard/20 rounded-xl overflow-hidden">
            <button
              onclick={() => toggleFaq(i)}
              class="w-full px-6 py-4 text-left flex items-center justify-between bg-paper hover:bg-ralph-yellow/10 transition-colors"
            >
              <span class="font-bold text-chalkboard">{faq.q}</span>
              <span class="text-chalkboard/60 text-xl">{openFaq === i ? '−' : '+'}</span>
            </button>
            {#if openFaq === i}
              <div class="px-6 py-4 bg-white border-t border-chalkboard/10">
                <p class="text-chalkboard/70">{faq.a}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-paper py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Quote -->
      <div class="text-center pb-6 mb-6 border-b border-chalkboard/10">
        <p class="text-chalkboard/60 text-sm ralph-voice">
          "The future of startups is one person with Claude Code and the audacity to ship."
        </p>
      </div>

      <!-- Branding & Links -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left: vibe/vibe + Legal -->
        <div class="flex flex-col md:flex-row items-center gap-4">
          <a href="/" class="flex items-center gap-2 font-chalk text-chalkboard hover:text-chalkboard/70 transition-colors">
            <svg class="w-6 h-6" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
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
            vibe/vibe
          </a>
          <div class="flex items-center gap-2 text-xs text-chalkboard/40">
            <a href="/" class="hover:text-chalkboard/70 transition-colors">Home</a>
            <span>·</span>
            <a href="/terms" class="hover:text-chalkboard/70 transition-colors">Terms</a>
            <span>·</span>
            <a href="/privacy" class="hover:text-chalkboard/70 transition-colors">Privacy</a>
          </div>
        </div>

        <!-- Right: Tagline + Vibeship -->
        <div class="flex items-center gap-3">
          <span class="text-chalkboard/50 text-sm">Vibe coded. For vibe coders.</span>
          <a
            href="https://vibeship.co"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-1 text-chalkboard/70 hover:text-chalkboard transition-colors"
          >
            <img
              src="https://raw.githubusercontent.com/vibeforge1111/vibeship-spawner/main/web/static/logo.png"
              alt="Vibeship"
              class="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity"
              style="filter: grayscale(100%) brightness(0.3);"
            />
            <span class="font-body text-sm font-semibold tracking-tight">vibeship</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</main>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  :global(.animate-fade-in) {
    animation: fade-in 0.3s ease-out forwards;
  }

  :global(.animate-blink) {
    animation: blink 1s step-end infinite;
  }
</style>
