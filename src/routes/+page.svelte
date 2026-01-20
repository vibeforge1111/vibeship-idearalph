<script lang="ts">
  import { HeroVideo, DopeMeter, RalphAvatar } from '$lib/components';

  // Types
  interface PMFScores {
    problemClarity: number;
    marketSize: number;
    uniqueness: number;
    feasibility: number;
    monetization: number;
    timing: number;
    virality: number;
    defensibility: number;
    teamFit: number;
    ralphFactor: number;
  }

  interface PMFAnalysis {
    targetCustomer: string;
    acquisitionChannel: string;
    retentionHook: string;
    monetizationPath: string;
  }

  interface IdeaResult {
    name: string;
    tagline?: string;
    idea: string;
    problem?: string;
    solution?: string;
    whyNow?: string;
    scores?: PMFScores;
    totalScore: number;
    iterations?: number;
    ralphQuote: string;
    pmfAnalysis?: PMFAnalysis;
    savedAt?: string;
  }

  // UI State
  let step = $state<'bell' | 'setup' | 'install' | 'run' | 'paste' | 'result' | 'prd'>('bell');
  let hasInstalledPlugin = $state(false);

  // Check if user has done setup before (persisted)
  $effect(() => {
    if (typeof window !== 'undefined') {
      hasInstalledPlugin = localStorage.getItem('idearalph-plugin-installed') === 'true';
    }
  });

  function markPluginInstalled() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('idearalph-plugin-installed', 'true');
      hasInstalledPlugin = true;
    }
  }
  let userHint = $state('');
  let pastedResult = $state('');
  let currentIdea = $state<IdeaResult | null>(null);
  let error = $state<string | null>(null);
  let copied = $state(false);
  let savedIdeas = $state<IdeaResult[]>([]);
  let showSavedIdeas = $state(false);
  let prdContent = $state('');
  let prdCopied = $state(false);

  // Load saved ideas from localStorage on mount
  $effect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('idearalph-ideas');
      if (saved) {
        try {
          savedIdeas = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load saved ideas');
        }
      }
    }
  });

  // Save ideas to localStorage
  function saveToLocalStorage(ideas: IdeaResult[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('idearalph-ideas', JSON.stringify(ideas));
    }
  }

  function saveIdea() {
    if (currentIdea) {
      // Add timestamp
      const ideaWithTimestamp = { ...currentIdea, savedAt: new Date().toISOString() };
      savedIdeas = [ideaWithTimestamp, ...savedIdeas];
      saveToLocalStorage(savedIdeas);
    }
  }

  function deleteIdea(index: number) {
    savedIdeas = savedIdeas.filter((_, i) => i !== index);
    saveToLocalStorage(savedIdeas);
  }

  function loadIdea(idea: IdeaResult) {
    currentIdea = idea;
    step = 'result';
    showSavedIdeas = false;
  }

  // Generate PRD from idea
  function generatePRD() {
    if (!currentIdea) return;

    const prd = `# Product Requirements Document
## ${currentIdea.name}
${currentIdea.tagline ? `*${currentIdea.tagline}*` : ''}

---

## Executive Summary

${currentIdea.idea}

**Validation Score:** ${currentIdea.totalScore}/10 (across ${currentIdea.iterations || 1} iterations)

---

## Problem Statement

${currentIdea.problem || 'To be defined based on market research.'}

### Why This Matters Now

${currentIdea.whyNow || 'Market timing analysis pending.'}

---

## Proposed Solution

${currentIdea.solution || currentIdea.idea}

---

## Product-Market Fit Analysis

### Target Customer
${currentIdea.pmfAnalysis?.targetCustomer || 'To be defined'}

### Customer Acquisition
${currentIdea.pmfAnalysis?.acquisitionChannel || 'To be defined'}

### Retention Strategy
${currentIdea.pmfAnalysis?.retentionHook || 'To be defined'}

### Monetization
${currentIdea.pmfAnalysis?.monetizationPath || 'To be defined'}

---

## Validation Scores

| Dimension | Score |
|-----------|-------|
${currentIdea.scores ? Object.entries(currentIdea.scores).map(([key, score]) => `| ${formatScoreLabel(key)} | ${score}/10 |`).join('\n') : '| Overall | ' + currentIdea.totalScore + '/10 |'}

---

## MVP Scope (Phase 1)

### Must Have
- [ ] Core value proposition implementation
- [ ] Basic user authentication
- [ ] Primary user flow
- [ ] Essential data storage

### Should Have
- [ ] User onboarding flow
- [ ] Basic analytics
- [ ] Email notifications

### Could Have
- [ ] Social sharing
- [ ] Advanced features
- [ ] Integrations

---

## Success Metrics

1. **Activation Rate:** % of signups completing core action
2. **Retention (D7):** % of users returning after 7 days
3. **NPS Score:** Target > 50
4. **Revenue:** First paying customer within 90 days

---

## Technical Requirements

### Platform
- Web application (responsive)
- Consider mobile app for Phase 2

### Stack Recommendations
- Frontend: React/Next.js or SvelteKit
- Backend: Node.js or Python
- Database: PostgreSQL or Supabase
- Hosting: Vercel/Railway

---

## Timeline Estimate

| Phase | Scope | Duration |
|-------|-------|----------|
| Discovery | User research, competitive analysis | 1-2 weeks |
| Design | Wireframes, UI design | 1-2 weeks |
| MVP Build | Core features | 4-6 weeks |
| Beta Launch | Limited release, feedback | 2-4 weeks |
| Iterate | Based on feedback | Ongoing |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Low adoption | Medium | High | Validate with 10 users before building |
| Technical complexity | Low | Medium | Start with no-code/low-code MVP |
| Competition | Medium | Medium | Focus on unique angle |

---

## Next Steps

1. [ ] Validate problem with 10 potential users
2. [ ] Create landing page to test demand
3. [ ] Build MVP prototype
4. [ ] Launch to beta users
5. [ ] Iterate based on feedback

---

*Generated by IdeaRalph - "Stupid Smart" idea validation*
*Ralph says: "${currentIdea.ralphQuote}"*
`;

    prdContent = prd;
    step = 'prd';
  }

  function copyPRD() {
    navigator.clipboard.writeText(prdContent);
    prdCopied = true;
    setTimeout(() => prdCopied = false, 2000);
  }

  function downloadPRD() {
    if (!currentIdea) return;
    const blob = new Blob([prdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PRD-${currentIdea.name.replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // The Ralph prompt template for Claude Code - targets 9.9/10 score
  const getRalphPrompt = (hint?: string) => `You are Ralph Wiggum from The Simpsons - innocent, confused, but secretly a genius at finding startup ideas that sound dumb but are actually brilliant.

## Your Task
Generate and refine a startup idea until it scores **9.9/10 or higher**.
${hint ? `\nFocus area: ${hint}` : ''}

## Scoring Rubric (Score each 0-10, be HARSH)
1. **Problem Clarity**: Real pain point? Who suffers? How badly?
2. **Market Size**: TAM > $1B? SAM > $100M? Growing market?
3. **Uniqueness**: What's the 10x better angle? Why hasn't this been done?
4. **Feasibility**: Can build MVP in 3 months? Tech exists?
5. **Monetization**: Clear revenue model? Unit economics work?
6. **Timing**: Why now? What changed recently to enable this?
7. **Virality**: Built-in sharing? Network effects? Word of mouth?
8. **Defensibility**: Data moat? Brand? Switching costs?
9. **Team Fit**: Can 2-3 people build this? No special access needed?
10. **Ralph Factor**: Sounds dumb at first? Actually genius? Memorable?

## Process
1. Generate/refine the idea
2. Score ALL 10 dimensions (most start at 5-7!)
3. If score < 9.9: Improve weakest 2-3 areas and iterate
4. If score >= 9.9: Output final JSON

## Output Format (when score >= 9.9)
\`\`\`json
{
  "name": "Startup Name",
  "tagline": "One-line pitch (max 10 words)",
  "idea": "2-3 sentence description that sounds dumb but is genius",
  "problem": "The painful problem being solved",
  "solution": "How this solves it uniquely",
  "whyNow": "Why this is the right time",
  "scores": {
    "problemClarity": 9.9,
    "marketSize": 9.9,
    "uniqueness": 9.9,
    "feasibility": 9.9,
    "monetization": 9.9,
    "timing": 9.9,
    "virality": 9.9,
    "defensibility": 9.9,
    "teamFit": 9.9,
    "ralphFactor": 9.9
  },
  "totalScore": 9.9,
  "iterations": 1,
  "ralphQuote": "A funny Ralph Wiggum quote about this idea",
  "pmfAnalysis": {
    "targetCustomer": "Who is the ideal first customer?",
    "acquisitionChannel": "How do you reach them?",
    "retentionHook": "Why do they keep coming back?",
    "monetizationPath": "How do you make money?"
  }
}
\`\`\`

Keep Ralph's voice: "I'm helping!" energy, finds weird connections, says dumb things that are secretly smart.
Don't stop until 9.9+ achieved. This may take many iterations.`;

  function ringTheBell() {
    // If they've already installed the plugin, skip to the run step
    step = hasInstalledPlugin ? 'run' : 'setup';
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
        tagline: parsed.tagline,
        idea: parsed.idea,
        problem: parsed.problem,
        solution: parsed.solution,
        whyNow: parsed.whyNow,
        scores: parsed.scores,
        totalScore: parsed.totalScore || parsed.dopeLevel || 5,
        iterations: parsed.iterations,
        ralphQuote: parsed.ralphQuote || "I made a idea!",
        pmfAnalysis: parsed.pmfAnalysis
      };
      step = 'result';
    } catch (err) {
      error = "Couldn't parse that. Make sure you copied the full JSON response!";
    }
  }

  // Helper to get score color
  function getScoreColor(score: number): string {
    if (score >= 9.5) return 'text-playground-green';
    if (score >= 9.0) return 'text-sky-blue';
    if (score >= 8.0) return 'text-ralph-yellow';
    return 'text-playground-red';
  }

  // Helper to format score label
  function formatScoreLabel(key: string): string {
    const labels: Record<string, string> = {
      problemClarity: 'Problem',
      marketSize: 'Market',
      uniqueness: 'Unique',
      feasibility: 'Feasible',
      monetization: 'Revenue',
      timing: 'Timing',
      virality: 'Viral',
      defensibility: 'Moat',
      teamFit: 'Team Fit',
      ralphFactor: 'Ralph Factor'
    };
    return labels[key] || key;
  }

  function startOver() {
    step = 'bell';
    userHint = '';
    pastedResult = '';
    currentIdea = null;
    error = null;
  }

  function generateAnother() {
    step = 'run';
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
          class="btn-crayon text-xl md:text-2xl px-10 py-5 flex items-center gap-4 mx-auto"
        >
          <!-- Ralph sun icon - his head with idea rays! -->
          <svg class="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
            <!-- Idea rays (shorter, behind head) -->
            <line x1="128" y1="48" x2="128" y2="16"/>
            <line x1="128" y1="208" x2="128" y2="240"/>
            <line x1="48" y1="128" x2="16" y2="128"/>
            <line x1="208" y1="128" x2="240" y2="128"/>
            <line x1="68" y1="68" x2="44" y2="44"/>
            <line x1="188" y1="68" x2="212" y2="44"/>
            <line x1="68" y1="188" x2="44" y2="212"/>
            <line x1="188" y1="188" x2="212" y2="212"/>
            <!-- Big Ralph head -->
            <circle cx="128" cy="128" r="72"/>
            <!-- Spiky hair bumps -->
            <path d="M80,72 Q90,56 100,72" fill="none"/>
            <path d="M116,64 Q128,48 140,64" fill="none"/>
            <path d="M156,72 Q166,56 176,72" fill="none"/>
            <!-- Ralph eyes - big and derpy -->
            <circle cx="104" cy="118" r="12" fill="currentColor"/>
            <circle cx="152" cy="122" r="12" fill="currentColor"/>
            <!-- Cute nose -->
            <circle cx="128" cy="140" r="4" fill="currentColor"/>
            <!-- Happy derpy smile -->
            <path d="M100,160 Q128,184 156,160" fill="none"/>
          </svg>
          <span>Unleash Ralph</span>
        </button>
        <div class="mt-3 inline-block bg-white/60 px-3 py-1 rounded-xl border border-chalkboard/20">
          <span class="text-chalkboard text-xs">Powered by your Claude Code • No API costs</span>
        </div>

        {#if savedIdeas.length > 0}
          <button
            onclick={() => showSavedIdeas = !showSavedIdeas}
            class="mt-3 ml-2 inline-block bg-ralph-yellow/80 px-3 py-1 rounded-xl border border-chalkboard/30 hover:bg-ralph-yellow transition-colors"
          >
            <span class="text-chalkboard text-xs">💾 {savedIdeas.length} Saved</span>
          </button>
        {/if}

      {:else if step === 'setup'}
        <!-- Setup: First time user - explain the process -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-lg relative">
          <button onclick={() => step = 'bell'} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <h2 class="font-chalk text-2xl text-chalkboard mb-2">Welcome to IdeaRalph!</h2>
          <p class="text-chalkboard/70 text-sm mb-4">First time? Let's set you up in 1 minute.</p>

          <div class="space-y-3 text-left mb-6">
            <div class="flex items-start gap-3 p-3 bg-ralph-yellow/10 rounded-lg">
              <span class="text-xl">1️⃣</span>
              <div>
                <div class="font-bold text-chalkboard">Add the MCP</div>
                <div class="text-sm text-chalkboard/70">One command, then restart Claude</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-chalkboard/5 rounded-lg">
              <span class="text-xl">2️⃣</span>
              <div>
                <div class="font-bold text-chalkboard/60">Just Talk!</div>
                <div class="text-sm text-chalkboard/50">"Brainstorm ideas about X" — that's it</div>
              </div>
            </div>
          </div>

          <button onclick={() => step = 'install'} class="btn-crayon w-full text-lg">
            Let's Go! →
          </button>

          <button
            onclick={() => { markPluginInstalled(); step = 'run'; }}
            class="w-full text-chalkboard/50 hover:text-chalkboard text-sm py-2 mt-2"
          >
            I already have the MCP installed →
          </button>
        </div>

      {:else if step === 'install'}
        <!-- Step 1: Install the MCP -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-lg relative">
          <button onclick={() => step = 'bell'} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-ralph-yellow text-chalkboard font-bold rounded-full w-8 h-8 flex items-center justify-center">1</span>
            <h2 class="font-chalk text-xl text-chalkboard">Add the IdeaRalph MCP</h2>
          </div>

          <p class="text-chalkboard/70 text-sm mb-3">One command to install:</p>

          <div class="bg-chalkboard rounded-lg p-3 mb-3">
            <code class="block text-xs text-playground-green font-mono break-all leading-relaxed">git clone https://github.com/vibeforge1111/vibeship-idearalph.git ~/idearalph && cd ~/idearalph/mcp-server && npm i && npm run build && claude mcp add idearalph -- node ~/idearalph/mcp-server/dist/index.js</code>
          </div>

          <button
            onclick={() => {
              navigator.clipboard.writeText('git clone https://github.com/vibeforge1111/vibeship-idearalph.git ~/idearalph && cd ~/idearalph/mcp-server && npm i && npm run build && claude mcp add idearalph -- node ~/idearalph/mcp-server/dist/index.js');
              copied = true;
              setTimeout(() => copied = false, 2000);
            }}
            class="btn-crayon w-full text-sm mb-3"
          >
            {copied ? 'Copied!' : 'Copy Command'}
          </button>

          <div class="bg-ralph-yellow border-2 border-chalkboard rounded-lg p-4 mb-4">
            <p class="text-base text-chalkboard font-bold mb-2">After running, restart Claude Code:</p>
            <div class="flex items-center justify-center gap-3 text-base text-chalkboard">
              <code class="bg-white/50 px-2 py-1 rounded font-bold">/exit</code>
              <span>→</span>
              <code class="bg-white/50 px-2 py-1 rounded font-bold">claude</code>
            </div>
          </div>

          <p class="text-xs text-chalkboard/60 mb-4">
            MCP = superpowers for Claude. Runs locally, no API key needed.
          </p>

          <div class="flex gap-2">
            <button onclick={() => step = 'setup'} class="btn-crayon flex-1 bg-gray-100 text-sm">
              ← Back
            </button>
            <button onclick={() => { markPluginInstalled(); step = 'run'; }} class="btn-crayon flex-1 text-sm">
              Done, Next →
            </button>
          </div>
        </div>

      {:else if step === 'run'}
        <!-- Step 2: How to Use -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-lg relative">
          <button onclick={() => step = 'bell'} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-playground-green text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">2</span>
            <h2 class="font-chalk text-xl text-chalkboard">Just Talk to Claude!</h2>
          </div>

          <p class="text-chalkboard/70 text-sm mb-4">The MCP gives Claude these superpowers. Just ask naturally:</p>

          <div class="space-y-2 mb-4">
            <div class="bg-chalkboard/5 rounded-lg p-3 border-l-4 border-ralph-yellow">
              <p class="text-sm font-mono text-chalkboard">"Brainstorm startup ideas about AI for pets"</p>
              <p class="text-xs text-chalkboard/60 mt-1">→ Generates & scores ideas on 10 PMF dimensions</p>
            </div>
            <div class="bg-chalkboard/5 rounded-lg p-3 border-l-4 border-playground-green">
              <p class="text-sm font-mono text-chalkboard">"Refine this idea until it scores 9.5+"</p>
              <p class="text-xs text-chalkboard/60 mt-1">→ Ralph Loop iterates until it's dope</p>
            </div>
            <div class="bg-chalkboard/5 rounded-lg p-3 border-l-4 border-sky-blue">
              <p class="text-sm font-mono text-chalkboard">"Generate a PRD for this idea"</p>
              <p class="text-xs text-chalkboard/60 mt-1">→ Full product requirements doc</p>
            </div>
          </div>

          <div class="bg-ralph-yellow/20 rounded-lg p-3 mb-4">
            <p class="text-sm text-chalkboard">
              <span class="font-bold">5 MCP Tools:</span> brainstorm • validate • refine • prd • architecture
            </p>
          </div>

          <button onclick={() => { markPluginInstalled(); step = 'bell'; }} class="btn-crayon w-full text-lg mb-3">
            Got it!
          </button>

          <div class="flex gap-2">
            <button onclick={() => step = 'install'} class="btn-crayon flex-1 bg-gray-100 text-sm">
              ← Back
            </button>
          </div>
        </div>

      {:else if step === 'paste'}
        <!-- Step 3: Paste the result -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-lg relative">
          <button onclick={() => step = 'bell'} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-sky-blue text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">3</span>
            <h2 class="font-chalk text-xl text-chalkboard">Paste the Result</h2>
          </div>

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

          <div class="flex gap-2">
            <button onclick={() => step = 'run'} class="btn-crayon flex-1 bg-gray-100 text-sm">
              ← Back
            </button>
            <button onclick={parseResult} class="btn-crayon flex-1 text-sm">
              🚀 Show My Idea
            </button>
          </div>
        </div>

      {:else if step === 'result' && currentIdea}
        <!-- Step 3: Display the result with PMF Analysis -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-2xl mx-auto relative">
          <button onclick={startOver} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <div class="text-left">
            <!-- Header with name and total score -->
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-chalk text-2xl text-chalkboard">{currentIdea.name}</h3>
                {#if currentIdea.tagline}
                  <p class="text-chalkboard/60 text-sm">{currentIdea.tagline}</p>
                {/if}
              </div>
              <div class="text-right">
                <div class="font-chalk text-3xl {getScoreColor(currentIdea.totalScore)}">
                  {currentIdea.totalScore.toFixed(1)}
                </div>
                <div class="text-xs text-chalkboard/60">/ 10</div>
              </div>
            </div>

            <!-- Idea description -->
            <p class="text-chalkboard text-base mb-4">{currentIdea.idea}</p>

            <!-- PMF Scores Grid -->
            {#if currentIdea.scores}
              <div class="grid grid-cols-5 gap-2 mb-4">
                {#each Object.entries(currentIdea.scores) as [key, score]}
                  <div class="text-center p-2 bg-chalkboard/5 rounded-lg">
                    <div class="font-bold text-sm {getScoreColor(score)}">{score.toFixed(1)}</div>
                    <div class="text-[10px] text-chalkboard/60 leading-tight">{formatScoreLabel(key)}</div>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- PMF Analysis -->
            {#if currentIdea.pmfAnalysis}
              <div class="bg-chalkboard/5 rounded-lg p-3 mb-4 text-sm">
                <div class="font-chalk text-base mb-2 text-chalkboard">PMF Analysis</div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div><span class="text-chalkboard/60">Customer:</span> <span class="text-chalkboard">{currentIdea.pmfAnalysis.targetCustomer}</span></div>
                  <div><span class="text-chalkboard/60">Acquire:</span> <span class="text-chalkboard">{currentIdea.pmfAnalysis.acquisitionChannel}</span></div>
                  <div><span class="text-chalkboard/60">Retain:</span> <span class="text-chalkboard">{currentIdea.pmfAnalysis.retentionHook}</span></div>
                  <div><span class="text-chalkboard/60">Revenue:</span> <span class="text-chalkboard">{currentIdea.pmfAnalysis.monetizationPath}</span></div>
                </div>
              </div>
            {/if}

            <!-- Ralph Quote -->
            <div class="bg-ralph-yellow/20 rounded-lg p-3 mb-4">
              <p class="ralph-voice text-chalkboard italic text-sm">"{currentIdea.ralphQuote}"</p>
              {#if currentIdea.iterations}
                <p class="text-xs text-chalkboard/50 mt-1">Refined over {currentIdea.iterations} iterations</p>
              {/if}
            </div>

            <!-- Actions -->
            <div class="flex gap-2 mb-3">
              <button onclick={saveIdea} class="btn-crayon flex-1 bg-playground-green/20 text-sm py-2">
                💾 Save Idea
              </button>
              <button onclick={generatePRD} class="btn-crayon flex-1 bg-sky-blue/20 text-sm py-2">
                📄 Generate PRD
              </button>
            </div>
            <div class="flex gap-2">
              <button onclick={startOver} class="btn-crayon flex-1 bg-gray-100 text-sm py-2">
                🏠 Start Over
              </button>
              <button onclick={generateAnother} class="btn-crayon flex-1 text-sm py-2">
                🎲 Another One
              </button>
            </div>
          </div>
        </div>

      {:else if step === 'prd' && currentIdea}
        <!-- PRD View -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-2xl mx-auto relative">
          <button onclick={startOver} class="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border-4 border-chalkboard bg-white text-chalkboard text-2xl font-bold shadow-crayon transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none z-10">
            <span class="-mt-0.5">&times;</span>
          </button>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-chalk text-2xl text-chalkboard">PRD: {currentIdea.name}</h2>
            <div class="font-chalk text-xl {getScoreColor(currentIdea.totalScore)}">
              {currentIdea.totalScore.toFixed(1)}/10
            </div>
          </div>

          <div class="bg-chalkboard/5 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
            <pre class="text-xs text-chalkboard whitespace-pre-wrap font-mono">{prdContent.slice(0, 1500)}...</pre>
          </div>

          <div class="flex gap-2 mb-3">
            <button onclick={copyPRD} class="btn-crayon flex-1 text-sm py-2">
              {prdCopied ? '✅ Copied!' : '📋 Copy PRD'}
            </button>
            <button onclick={downloadPRD} class="btn-crayon flex-1 bg-playground-green/20 text-sm py-2">
              ⬇️ Download .md
            </button>
          </div>

          <div class="flex gap-2">
            <button onclick={() => step = 'result'} class="btn-crayon flex-1 bg-gray-100 text-sm py-2">
              ← Back to Idea
            </button>
            <button onclick={startOver} class="btn-crayon flex-1 text-sm py-2">
              🏠 Start Over
            </button>
          </div>
        </div>
      {/if}

    </div>

    <!-- Saved Ideas Panel -->
    {#if showSavedIdeas && savedIdeas.length > 0}
      <div class="absolute inset-0 z-30 bg-chalkboard/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-6 border-4 border-chalkboard shadow-crayon-lg max-w-lg w-full max-h-[70vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-chalk text-2xl text-chalkboard">Saved Ideas</h2>
            <button onclick={() => showSavedIdeas = false} class="text-chalkboard/60 hover:text-chalkboard text-2xl">
              &times;
            </button>
          </div>

          <div class="space-y-3">
            {#each savedIdeas as idea, index}
              <div class="bg-chalkboard/5 rounded-lg p-3 flex items-start justify-between gap-3">
                <button onclick={() => loadIdea(idea)} class="flex-1 text-left hover:bg-chalkboard/10 rounded p-1 -m-1 transition-colors">
                  <div class="font-chalk text-lg text-chalkboard">{idea.name}</div>
                  <div class="text-xs text-chalkboard/60 line-clamp-2">{idea.idea}</div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs font-bold {getScoreColor(idea.totalScore)}">{idea.totalScore.toFixed(1)}/10</span>
                    {#if idea.savedAt}
                      <span class="text-xs text-chalkboard/40">{new Date(idea.savedAt).toLocaleDateString()}</span>
                    {/if}
                  </div>
                </button>
                <button onclick={() => deleteIdea(index)} class="text-playground-red/60 hover:text-playground-red text-sm p-1">
                  🗑️
                </button>
              </div>
            {/each}
          </div>

          <button onclick={() => showSavedIdeas = false} class="btn-crayon w-full mt-4 text-sm">
            Close
          </button>
        </div>
      </div>
    {/if}
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
            <!-- Terminal icon - outline style -->
            <svg class="w-10 h-10" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <rect x="32" y="48" width="192" height="160" rx="8"/>
              <line x1="32" y1="96" x2="224" y2="96"/>
              <polyline points="80,128 112,152 80,176"/>
              <line x1="128" y1="176" x2="176" y2="176"/>
            </svg>
          </div>
          <h3 class="font-chalk text-xl mt-3">1. Add the MCP</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"One command!"</p>
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
            <!-- Power/restart icon - outline style -->
            <svg class="w-10 h-10" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <line x1="128" y1="48" x2="128" y2="124"/>
              <path d="M176,56a88,88,0,1,1-96,0"/>
            </svg>
          </div>
          <h3 class="font-chalk text-xl mt-3">2. Restart Claude</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"/exit then claude"</p>
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
            <!-- Chat icon - outline style with dots -->
            <svg class="w-10 h-10" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <path d="M216,48H40a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H80l32,32,32-32h72a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Z"/>
              <circle cx="88" cy="120" r="8" fill="currentColor"/>
              <circle cx="128" cy="120" r="8" fill="currentColor"/>
              <circle cx="168" cy="120" r="8" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="font-chalk text-xl mt-3">3. Just Talk!</h3>
          <p class="ralph-voice text-chalkboard text-base whitespace-nowrap">"Brainstorm ideas..."</p>
        </div>
      </div>
    </div>
  </section>

  <!-- MCP Tools Section -->
  <section class="bg-white py-14 md:py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-center mb-10">
        <div class="thought-bubble bg-ralph-yellow/20 px-8 py-4">
          <h2 class="ralph-voice text-2xl md:text-3xl text-chalkboard text-center">
            What Ralph Can Do
          </h2>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Lightbulb icon - brainstorm -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <path d="M128,16A80,80,0,0,0,72,184v24a16,16,0,0,0,16,16h80a16,16,0,0,0,16-16V184A80,80,0,0,0,128,16Z"/>
              <line x1="96" y1="240" x2="160" y2="240"/>
              <line x1="128" y1="136" x2="128" y2="88"/>
              <line x1="104" y1="112" x2="152" y2="112"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">Brainstorm</h3>
          <p class="text-sm text-chalkboard/70">"Generate startup ideas about fitness"</p>
          <p class="text-xs text-chalkboard/50 mt-2">Scores on 10 PMF dimensions</p>
        </div>

        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Target icon - validate -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="128" cy="128" r="96"/>
              <circle cx="128" cy="128" r="64"/>
              <circle cx="128" cy="128" r="32"/>
              <circle cx="128" cy="128" r="8" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">Validate</h3>
          <p class="text-sm text-chalkboard/70">"Score this idea: AI for pets"</p>
          <p class="text-xs text-chalkboard/50 mt-2">Deep dive on each dimension</p>
        </div>

        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Triangle recycle with arrows on edges -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <!-- Triangle -->
              <path d="M128,48 L200,176 L56,176 Z"/>
              <!-- Arrow on right edge (top to bottom-right) -->
              <polyline points="148,136 164,112 180,136"/>
              <!-- Arrow on bottom edge (right to left) -->
              <polyline points="104,192 128,176 104,160"/>
              <!-- Arrow on left edge (bottom-left to top) -->
              <polyline points="76,136 92,112 108,136"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">Refine</h3>
          <p class="text-sm text-chalkboard/70">"Make this idea score 9.5+"</p>
          <p class="text-xs text-chalkboard/50 mt-2">Ralph Loop until it's dope</p>
        </div>

        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Document/clipboard icon - PRD -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <rect x="40" y="40" width="176" height="176" rx="8"/>
              <line x1="80" y1="96" x2="176" y2="96"/>
              <line x1="80" y1="128" x2="176" y2="128"/>
              <line x1="80" y1="160" x2="144" y2="160"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">PRD</h3>
          <p class="text-sm text-chalkboard/70">"Generate a PRD for this"</p>
          <p class="text-xs text-chalkboard/50 mt-2">Napkin → Science-Fair → Genius</p>
        </div>

        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Database/stack icon - architecture -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="128" cy="64" rx="80" ry="32"/>
              <path d="M48,64 v128 c0,17.67,35.82,32,80,32 s80-14.33,80-32 V64"/>
              <path d="M48,128 c0,17.67,35.82,32,80,32 s80-14.33,80-32"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">Architecture</h3>
          <p class="text-sm text-chalkboard/70">"Plan how to build this"</p>
          <p class="text-xs text-chalkboard/50 mt-2">Tech stack + implementation</p>
        </div>

        <div class="bg-paper rounded-xl p-5 border-2 border-chalkboard/20 shadow-crayon bg-ralph-yellow/10">
          <div class="w-10 h-10 text-chalkboard mb-2">
            <!-- Connected nodes flow icon -->
            <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="48" cy="128" r="24"/>
              <circle cx="128" cy="72" r="24"/>
              <circle cx="128" cy="184" r="24"/>
              <circle cx="208" cy="128" r="24"/>
              <line x1="72" y1="116" x2="104" y2="84"/>
              <line x1="72" y1="140" x2="104" y2="172"/>
              <line x1="152" y1="84" x2="184" y2="116"/>
              <line x1="152" y1="172" x2="184" y2="140"/>
            </svg>
          </div>
          <h3 class="font-chalk text-lg text-chalkboard mb-1">The Flow</h3>
          <p class="text-sm text-chalkboard/70">Brainstorm → Validate → Refine → PRD → Build!</p>
          <p class="text-xs text-chalkboard/50 mt-2">All in one conversation</p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-chalkboard/60 text-sm">
          No API key needed • Runs locally • Works with Claude Code
        </p>
      </div>
    </div>
  </section>

  <!-- Dope Ideas Section -->
  <section class="bg-gradient-to-b from-chalkboard to-chalkboard/90 py-16 md:py-24 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-chalk text-ralph-yellow mb-4">
        Straight From Ralph's Brain
      </h2>
      <p class="text-white/60 mb-12">The best ideas sound crazy at first</p>

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
            "I asked the AI to make me rich so it put my face on a coin! Wait, I am the AI!"
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
          "Strangers sleeping in your house? Strangers driving you around? 140 characters?"
        </p>
        <p class="text-ralph-yellow font-chalk text-2xl mt-2">
          Airbnb. Uber. Twitter. All billion-dollar ideas.
        </p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-paper py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Layer 1: Ralph Quote -->
      <div class="text-center pb-6 mb-6 border-b border-chalkboard/10">
        <p class="text-chalkboard/60 text-sm ralph-voice">
          "I made this." — Ralph
        </p>
      </div>

      <!-- Layer 2: Branding & Links -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left: IdeaRalph + Legal -->
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-ralph-yellow rounded-full border-2 border-chalkboard overflow-hidden">
              <img src="/images/ralph-logo.png" alt="Ralph" class="w-full h-full object-cover" />
            </div>
            <span class="font-chalk text-chalkboard">IdeaRalph</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-chalkboard/40">
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

      <!-- Layer 3: Privacy Notice -->
      <div class="mt-6 pt-4 border-t border-chalkboard/10 text-center">
        <p class="text-chalkboard/40 text-xs max-w-2xl mx-auto">
          Your ideas stay yours. IdeaRalph runs locally in Claude Code. No databases, no tracking, no data collection.
          The MCP doesn't send your projects or ideas anywhere.
        </p>
      </div>
    </div>
  </footer>
</main>
