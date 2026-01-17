<script lang="ts">
  import { HeroVideo, DopeMeter, RalphAvatar } from '$lib/components';

  // UI State
  let step = $state<'bell' | 'prompt' | 'paste' | 'result'>('bell');
  let userHint = $state('');
  let pastedResult = $state('');
  let currentIdea = $state<{name: string; idea: string; dopeLevel: number; ralphQuote: string} | null>(null);
  let error = $state<string | null>(null);
  let copied = $state(false);

  // The Ralph prompt template for Claude Code
  const getRalphPrompt = (hint?: string) => `You are Ralph Wiggum from The Simpsons, but you're secretly a genius at generating startup ideas. Your ideas sound dumb at first but are actually brilliant.

${hint ? `The user wants ideas about: ${hint}` : 'Generate a random startup idea.'}

Generate ONE startup idea and respond in this EXACT JSON format:
{
  "name": "Catchy Startup Name",
  "idea": "2-3 sentence description of the idea that sounds dumb but is actually genius",
  "dopeLevel": 4,
  "ralphQuote": "A funny Ralph Wiggum quote about this idea"
}

dopeLevel is 1-5 (5 = genius). Make it weird, surprising, and secretly brilliant. Keep Ralph's innocent, slightly confused voice.`;

  function ringTheBell() {
    step = 'prompt';
  }

  function copyPrompt() {
    navigator.clipboard.writeText(getRalphPrompt(userHint));
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function parseResult() {
    error = null;
    try {
      // Try to extract JSON from the pasted text
      const jsonMatch = pastedResult.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');

      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.name || !parsed.idea) throw new Error('Invalid format');

      currentIdea = {
        name: parsed.name,
        idea: parsed.idea,
        dopeLevel: parsed.dopeLevel || 3,
        ralphQuote: parsed.ralphQuote || "I made a idea!"
      };
      step = 'result';
    } catch (err) {
      error = "Couldn't parse that. Make sure you copied the full JSON response!";
    }
  }

  function startOver() {
    step = 'bell';
    userHint = '';
    pastedResult = '';
    currentIdea = null;
    error = null;
  }

  function generateAnother() {
    step = 'prompt';
    pastedResult = '';
    currentIdea = null;
  }
</script>

<main class="bg-playground-sunset overflow-hidden">
  <!-- Hero Section - Half-screen Video Background -->
  <HeroVideo size="half">
    <div class="text-center w-full max-w-2xl mx-auto px-4">

      {#if step === 'bell'}
        <!-- Initial State: Ring the Bell -->
        <button
          onclick={ringTheBell}
          class="btn-crayon text-xl md:text-2xl px-10 py-5 flex items-center gap-4 mx-auto
                 transform hover:scale-105 transition-transform"
        >
          <span class="text-3xl md:text-4xl">🔔</span>
          <span>Ring the Bell</span>
        </button>
        <div class="mt-3 inline-block bg-white/60 px-3 py-1 rounded-xl border border-chalkboard/20">
          <span class="text-chalkboard text-xs">Powered by your Claude Code • No API costs</span>
        </div>

      {:else if step === 'prompt'}
        <!-- Step 1: Show prompt to copy -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg">
          <h2 class="font-chalk text-2xl text-chalkboard mb-4">
            1. Copy this prompt to Claude Code
          </h2>

          <input
            bind:value={userHint}
            placeholder="Optional: Give Ralph a hint (e.g., 'fitness apps', 'AI for pets')"
            class="w-full px-4 py-3 rounded-lg border-2 border-chalkboard bg-white
                   focus:outline-none focus:ring-2 focus:ring-sky-blue mb-4"
          />

          <div class="bg-chalkboard/5 rounded-lg p-4 mb-4 text-left max-h-32 overflow-y-auto">
            <pre class="text-xs text-chalkboard/80 whitespace-pre-wrap font-mono">{getRalphPrompt(userHint).slice(0, 200)}...</pre>
          </div>

          <button
            onclick={copyPrompt}
            class="btn-crayon w-full text-lg mb-3"
          >
            {copied ? '✅ Copied!' : '📋 Copy Prompt'}
          </button>

          <button
            onclick={() => step = 'paste'}
            class="w-full text-chalkboard/70 hover:text-chalkboard py-2 transition-colors"
          >
            I've run it in Claude Code →
          </button>
        </div>

      {:else if step === 'paste'}
        <!-- Step 2: Paste the result -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg">
          <h2 class="font-chalk text-2xl text-chalkboard mb-4">
            2. Paste Claude's response
          </h2>

          <textarea
            bind:value={pastedResult}
            placeholder="Paste the JSON response from Claude Code here..."
            class="w-full px-4 py-3 rounded-lg border-2 border-chalkboard bg-white
                   focus:outline-none focus:ring-2 focus:ring-sky-blue resize-none mb-4 font-mono text-sm"
            rows="6"
          ></textarea>

          {#if error}
            <p class="text-playground-red text-sm mb-3">{error}</p>
          {/if}

          <div class="flex gap-3">
            <button onclick={() => step = 'prompt'} class="btn-crayon flex-1 bg-gray-100">
              ← Back
            </button>
            <button onclick={parseResult} class="btn-crayon flex-1">
              🚀 Show My Idea
            </button>
          </div>
        </div>

      {:else if step === 'result' && currentIdea}
        <!-- Step 3: Display the result -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg">
          <div class="text-left">
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-chalk text-2xl text-chalkboard">{currentIdea.name}</h3>
              <DopeMeter level={currentIdea.dopeLevel} size="sm" />
            </div>

            <p class="text-chalkboard text-lg mb-4">{currentIdea.idea}</p>

            <div class="bg-ralph-yellow/20 rounded-lg p-3 mb-6">
              <p class="ralph-voice text-chalkboard italic">"{currentIdea.ralphQuote}"</p>
            </div>

            <div class="flex gap-3">
              <button onclick={startOver} class="btn-crayon flex-1 bg-gray-100">
                🏠 Start Over
              </button>
              <button onclick={generateAnother} class="btn-crayon flex-1">
                🎲 Another One
              </button>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </HeroVideo>

  <!-- Tagline Section -->
  <section class="bg-chalkboard py-10 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <p class="text-4xl md:text-5xl lg:text-6xl font-chalk tracking-wide">
        <span class="text-white">Stupid</span> <span class="text-ralph-yellow">Smart.</span>
      </p>
    </div>
  </section>

  <!-- Features Section -->
  <section class="bg-paper py-14 md:py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Title in thought bubble style -->
      <div class="flex justify-center mb-10">
        <div class="thought-bubble bg-white px-8 py-4">
          <h2 class="ralph-voice text-2xl md:text-3xl text-chalkboard text-center">
            How It Works
          </h2>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <!-- Step 1 -->
        <div class="flex flex-col items-center text-center group">
          <div
            class="w-20 h-20 bg-ralph-yellow rounded-full flex items-center justify-center
                   border-4 border-chalkboard shadow-crayon
                   transition-transform group-hover:scale-110 group-hover:rotate-3"
          >
            <span class="text-3xl">🔔</span>
          </div>
          <h3 class="font-chalk text-xl mt-3">1. Ring the Bell</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"Wake up Ralph!"</p>
        </div>

        <!-- Arrow -->
        <span class="text-3xl text-chalkboard/30 hidden md:block">→</span>
        <span class="text-3xl text-chalkboard/30 md:hidden rotate-90">→</span>

        <!-- Step 2 -->
        <div class="flex flex-col items-center text-center group">
          <div
            class="w-20 h-20 bg-playground-green rounded-full flex items-center justify-center
                   border-4 border-chalkboard shadow-crayon
                   transition-transform group-hover:scale-110 group-hover:-rotate-3"
          >
            <span class="text-3xl">💻</span>
          </div>
          <h3 class="font-chalk text-xl mt-3">2. Run in Claude</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"Copy the magic!"</p>
        </div>

        <!-- Arrow -->
        <span class="text-3xl text-chalkboard/30 hidden md:block">→</span>
        <span class="text-3xl text-chalkboard/30 md:hidden rotate-90">→</span>

        <!-- Step 3 -->
        <div class="flex flex-col items-center text-center group">
          <div
            class="w-20 h-20 bg-sky-blue rounded-full flex items-center justify-center
                   border-4 border-chalkboard shadow-crayon
                   transition-transform group-hover:scale-110 group-hover:rotate-3"
          >
            <span class="text-3xl">💡</span>
          </div>
          <h3 class="font-chalk text-xl mt-3">3. Get Your Idea</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"Genius comes out!"</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Dope Ideas Section -->
  <section class="bg-gradient-to-b from-chalkboard to-chalkboard/90 py-16 md:py-24 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-chalk text-ralph-yellow mb-4">
        Ideas So Dumb They're Genius
      </h2>
      <p class="text-white/60 mb-12">Real examples from Ralph's beautiful brain</p>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          class="thought-bubble bg-paper text-left hover:scale-[1.02] transition-transform cursor-default"
        >
          <p class="ralph-voice text-lg">
            "What if dogs had their own social media? My dog would post about
            butts a lot."
          </p>
          <div class="flex items-center justify-between mt-4">
            <p class="text-sm text-chalkboard/60">— Actual Ralph idea</p>
            <div class="flex gap-1">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span class="opacity-30">⭐</span>
            </div>
          </div>
        </div>

        <div
          class="thought-bubble bg-paper text-left hover:scale-[1.02] transition-transform cursor-default"
        >
          <p class="ralph-voice text-lg">
            "Uber but the cars are boats and the roads are rivers. Wait, that's just boats."
          </p>
          <div class="flex items-center justify-between mt-4">
            <p class="text-sm text-chalkboard/60">— Dope level: 3/5</p>
            <div class="flex gap-1">
              <span>⭐</span><span>⭐</span><span>⭐</span><span class="opacity-30">⭐</span><span class="opacity-30">⭐</span>
            </div>
          </div>
        </div>

        <div
          class="thought-bubble bg-paper text-left hover:scale-[1.02] transition-transform cursor-default"
        >
          <p class="ralph-voice text-lg">
            "AI that writes your excuses for being late. It learns your boss's personality!"
          </p>
          <div class="flex items-center justify-between mt-4">
            <p class="text-sm text-chalkboard/60">— Gold star material</p>
            <div class="flex gap-1">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            </div>
          </div>
        </div>

        <div
          class="thought-bubble bg-paper text-left hover:scale-[1.02] transition-transform cursor-default"
        >
          <p class="ralph-voice text-lg">
            "This idea tastes like purple and also like money!"
          </p>
          <div class="flex items-center justify-between mt-4">
            <p class="text-sm text-chalkboard/60">— Classic Ralph</p>
            <div class="flex gap-1">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 p-6 bg-white/5 rounded-lg border border-white/10">
        <p class="text-white/80 ralph-voice text-lg">
          Airbnb sounded dumb. Uber sounded dumb. Twitter sounded dumb.
        </p>
        <p class="text-ralph-yellow font-chalk text-2xl mt-2">
          All of them worked.
        </p>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-playground-sunset py-16 md:py-24 px-4">
    <div class="max-w-2xl mx-auto text-center">
      <RalphAvatar size="lg" mood="excited" />
      <h2 class="font-chalk text-3xl md:text-4xl text-chalkboard mt-6 mb-4">
        Ready to Generate Some Genius?
      </h2>
      <p class="ralph-voice text-chalkboard/80 mb-8">
        "My brain has so many ideas it hurts! Let me share them with you!"
      </p>
      <button
        onclick={() => { step = 'prompt'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        class="btn-crayon text-xl md:text-2xl"
      >
        🔔 Ring the Bell
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-paper py-8 px-4">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-ralph-yellow rounded-full border-2 border-chalkboard overflow-hidden">
          <img src="/images/ralph-logo.png" alt="Ralph" class="w-full h-full object-cover" />
        </div>
        <span class="font-chalk text-chalkboard">IdeaRalph</span>
      </div>

      <p class="text-chalkboard/60 text-sm">
        Built with 🖍️ by
        <a href="https://vibeship.com" class="text-sky-blue hover:underline">
          Vibeship
        </a>
      </p>

      <p class="text-chalkboard/40 text-sm ralph-voice">
        "I'm helping!" — Ralph Wiggum
      </p>
    </div>
  </footer>
</main>
