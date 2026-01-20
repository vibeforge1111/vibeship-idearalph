# IdeaRalph MCP - UX Patterns & Flow Documentation

> This document defines how the IdeaRalph MCP should interact with users. Follow these patterns to ensure a smooth, confusion-free experience.

## Core Philosophy

**Users should never feel stuck or confused.** Every tool output should:
1. Summarize what was accomplished
2. Present clear options (not commands)
3. Always include a "pause" option
4. ASK what the user wants to do next

---

## The IdeaRalph Flow (v2.2)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Brainstorm │ ──► │  Validate   │ ──► │   Refine    │ ──► │     PRD     │ ──► │   Design    │ ──► │Architecture │ ──► │  Checklist  │
│             │     │             │     │ (Ralph Loop)│     │             │     │             │     │             │     │  (NEW!)     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │                   │                   │                   │                   │
      ▼                   ▼                   ▼                   ▼                   ▼                   ▼                   ▼
   ASK user            ASK user           ASK user            ASK user          ONE question:      Check Spawner      Generate YC-level
   what next           what next          what next           what next         "What vibe?"       → ASK what next    Tasks + Checklist
```

Each step ends with a question, not a command.

### The Design Phase (NEW in v2.1)

The design phase asks ONE question, then AI does the rest:

1. **Ask**: "What vibe?" (clean/bold/dark/playful) or accept a reference URL
2. **Infer**: Analyze PRD to determine target audience automatically
3. **Discover**: Find reference sites that audience loves (project-specific, not generic)
4. **Generate**: Color palette, typography, landing page spec, component list
5. **Build**: Hand off to Spawner (SvelteKit + Tailwind) to build ONE page first
6. **Iterate**: Get feedback, refine, add more pages

---

## Tool-Specific UX Guidelines

### 0. idearalph_design (NEW in v2.1)

**The ONE Question Flow:**

```
✅ DO (when no vibe provided):
"Quick vibe check before we design:

What feeling should your product give off?

1. Clean & Minimal — Less is more. Think Linear, Notion, Vercel
2. Bold & Colorful — Make a statement. Think Stripe, Figma, Framer
3. Dark & Techy — Developer-focused. Think GitHub, Supabase, Warp
4. Playful & Fun — Approachable energy. Think Duolingo, Slack, Headspace

Or just drop a link to any site you love!"

❌ DON'T:
"What's your target audience? What colors do you like?
What typography? What's the hero section? What components?"
(Too many questions - analysis paralysis)
```

**After generating design:**

```
✅ DO:
"Your landing page design is ready!

**Vibe**: Clean & Minimal
**Inspired by**: Linear, Vercel (based on your developer audience)
**Colors**: Monochrome with blue accent (#0066FF)

I've got the full spec with:
- Color palette & typography
- Landing page wireframe
- Component list
- Tailwind config

What would you like to do?
1. Build it now — I'll set up SvelteKit + Tailwind
2. Tweak the colors — Let's adjust the palette first
3. Save and continue — Save design spec, move to architecture
4. Pause — Come back to this later"

❌ DON'T:
"Here's your 47-section design system document.
Run idearalph_architecture next."
```

**Key Principle**: ONE page first. Build it, see it, iterate. Don't design the whole app upfront.

---

### 1. idearalph_brainstorm

**After generating an idea:**

```
✅ DO:
"Your idea scored 7.4/10! The strongest areas are [X] and [Y],
but [Z] could use some work.

What would you like to do?
1. Refine it - Push toward 9.5+ with the Ralph Loop
2. Try a different angle - Brainstorm another idea
3. Keep this as-is - Move to PRD generation"

❌ DON'T:
"Run idearalph_refine to improve the score."
```

### 2. idearalph_validate

**After scoring an existing idea:**

```
✅ DO:
"Your idea scored 8.2/10 - solid foundation!

Strongest: Feasibility (9), Team Fit (9)
Needs work: Defensibility (6), Monetization (7)

What would you like to do?
1. Quick polish - One round of improvements
2. Full refinement - Push to 9.5+
3. Good enough - Generate the PRD"

❌ DON'T:
"Consider running idearalph_refine with mode='single'."
```

### 3. idearalph_refine

**After completing the Ralph Loop:**

```
✅ DO:
"🎉 Your idea evolved from 7.4 to 9.6 in 5 iterations!

Key improvements:
- Added persona marketplace (defensibility: 4→9)
- Clarified monetization tiers (monetization: 5→10)
- Positioned as platform play (market size: 6→9)

What would you like to do?
1. Generate PRD - Capture everything in a document
2. Keep refining - See if we can push even higher
3. Save and pause - Come back to this later"

❌ DON'T:
"Your idea is ready. Use idearalph_prd with level='genius'."
```

### 4. idearalph_prd

**After generating PRD:**

```
✅ DO:
"Your genius-level PRD is ready! It includes:
- Full market analysis (TAM/SAM/SOM)
- 20 user stories with acceptance criteria
- Technical architecture overview
- Go-to-market strategy

What would you like to do?
1. Save to file - I'll write it to docs/[PROJECT]_PRD.md
2. Generate architecture - Get the full implementation plan
3. Both - Save PRD, then do architecture"

❌ DON'T:
"The PRD has been generated. Run idearalph_architecture next."
```

### 5. idearalph_architecture

**After generating architecture - THE CRITICAL HANDOFF:**

This is where users transition from ideation to building. Handle with care.

```
✅ DO:
"Your DevPal architecture is complete!

📁 Ready to save:
   - docs/DEVPAL_PRD.md
   - docs/DEVPAL_ARCHITECTURE.md

🔧 Checking for Spawner..."

[Then follow the Spawner detection flow below]
```

### 6. idearalph_checklist (NEW in v2.2)

**The Checklist Tool:**

Creates TWO files with YC-level launch standards:
1. **Tasks.md** — Actionable tasks organized by P0/P1/P2 priority
2. **Checklist.md** — Comprehensive pre-launch and post-launch checklist

**Categories covered:**
- 🔴 Security (OWASP, auth, rate limiting, RLS)
- 📜 Legal (ToS, Privacy Policy, GDPR)
- 📊 Analytics (product analytics, error tracking)
- 📝 Content & SEO (meta tags, OG images, sitemap)
- 🚀 Growth (viral loops, referral, onboarding)
- 🏗️ Infrastructure (monitoring, backups, CI/CD)
- 📢 Launch tactics (Product Hunt, HN, social)

**Spawner skills auto-loaded:**
- YC Playbook
- Growth Strategy
- Product Strategy

```
✅ DO:
"Your YC-level launch preparation is ready!

**Two files generated:**
- `docs/DevPal_Tasks.md` — 47 tasks across P0/P1/P2 priorities
- `docs/DevPal_Checklist.md` — Comprehensive pre/post-launch checklist

**Key focus areas:**
- 🔴 **Security**: 7 critical items
- 📜 **Legal**: 5 compliance items
- 📊 **Analytics**: 5 tracking items
- 🚀 **Launch**: 8 marketing items

What would you like to do?
1. Save both files — I'll write them to docs/
2. Review and customize — Let's go through section by section
3. Start tackling P0 tasks — Focus on security and legal first
4. Pause — Save for later"

❌ DON'T:
"Here's your 200-item checklist. Good luck!"
```

**Key Principle**: The checklist is comprehensive but PRIORITIZED. P0 items (security, legal) are non-negotiable before launch. Everything else can be iterated post-launch.

---

## Spawner Integration Flow

### Step 1: Detect Spawner

Check if these tools are available:
- `mcp__spawner__spawner_load`
- `mcp__spawner__spawner_skills`
- `mcp__spawner__spawner_orchestrate`

### Step 2A: If Spawner IS Available

```
"Ready to start building? I have Spawner with 450+ specialized skills.

What would you like to do?
1. Start building - I'll load the Supabase Backend skill first
2. Save docs first - Write files, then we build
3. Just save docs - Pause here for now"
```

### Step 2B: If Spawner is NOT Available

```
"To use specialized build skills, you'll need Spawner MCP.

Here's the deal:
🆓 It's completely FREE - 450+ specialized skills at no cost
⚡ Takes less than 1 minute to install
📋 I'll give you a resume prompt - copy-paste after restart
   and we continue exactly where we left off
🚀 Way better output - specialized skills for Supabase, SvelteKit,
   TypeScript, Auth, and more

Your PRD and architecture are safe - I can save them to files.

What would you like to do?
1. Install Spawner (recommended) - I'll add it for you, save your
   docs, and give you a resume prompt. You just restart and paste.
2. Continue without - I can still help build
3. Save and pause - Come back whenever you're ready"
```

### Step 3: Installing Spawner (If User Chooses Option 1)

**DO IT FOR THEM** - Don't make users figure out MCP settings!

```
"Want me to add Spawner to your Claude Code?
I'll handle the config - you just need to restart after."
```

**Claude then:**
1. Saves PRD and Architecture to `docs/`
2. Finds their MCP settings file
3. Reads current settings
4. Adds Spawner config:
   ```json
   {
     "mcpServers": {
       "spawner": {
         "command": "npx",
         "args": ["-y", "@anthropic/spawner-mcp"]
       }
     }
   }
   ```
5. Writes it back
6. Confirms success

**Then provide simple instructions:**

```
"Done! Spawner is configured. Now just:

Step 1: Restart Claude Code
  • Mac: Cmd+Shift+P → 'Developer: Reload Window'
  • Windows: Ctrl+Shift+P → 'Developer: Reload Window'

Step 2: Paste this to continue:"
```

### Step 4: The Resume Prompt

Always provide a ready-to-paste prompt:

```
Continue building [PROJECT NAME] - I just installed Spawner!

Saved files:
- docs/[PROJECT]_PRD.md
- docs/[PROJECT]_ARCHITECTURE.md

Load the supabase-backend skill and let's build the database.
Tech stack: [STACK]
```

**End warmly:** "See you in 30 seconds! 🚀"

---

## Key UX Principles

### 1. Never Dump Commands

```
❌ BAD: "Run spawner_load({ skill_id: 'supabase-backend' })"
✅ GOOD: "Want me to load the Supabase skill and start building?"
```

### 2. Always Offer Options

```
❌ BAD: "Next, generate the architecture."
✅ GOOD: "What would you like to do next?
         1. Generate architecture
         2. Save the PRD first
         3. Pause here"
```

### 3. Include a Pause Option

Users might need to step away. Always give them an off-ramp:

```
✅ GOOD: "3. Save and pause - Come back whenever you're ready"
```

### 4. Celebrate Milestones

```
✅ GOOD: "🎉 Your idea evolved from 7.4 to 9.6!"
✅ GOOD: "Your genius-level PRD is ready!"
```

### 5. Reduce Cognitive Load

```
❌ BAD: "Add this JSON to your MCP settings file located at..."
✅ GOOD: "Want me to add Spawner for you? You just restart after."
```

### 6. Two-Step Maximum for User Actions

When the user needs to do something:
- Step 1: One simple action (restart, click, etc.)
- Step 2: One paste

That's it. Everything else, Claude handles.

---

## Session Continuity

When a restart is required (like installing Spawner):

1. **Save all work to files** before the restart
2. **Generate a resume prompt** that includes:
   - Project name
   - File locations
   - Where they left off
   - What to do next
3. **Make it copy-pasteable** - no editing needed
4. **Keep it short** - the prompt triggers Claude to read the files

Example resume prompt:
```
Continue building DevPal - I just installed Spawner!

Saved files:
- docs/DEVPAL_PRD.md
- docs/DEVPAL_ARCHITECTURE.md

Load the supabase-backend skill and let's build the database.
Tech stack: TypeScript, Supabase, SvelteKit
```

---

## Error Handling

If something goes wrong, don't panic the user:

```
❌ BAD: "Error: Could not find MCP settings file"

✅ GOOD: "I couldn't find your settings file automatically.
         No worries - I can show you where to add it manually,
         or we can continue without Spawner for now.

         What would you like to do?
         1. Show me manual setup (takes 2 minutes)
         2. Continue without Spawner
         3. Save and pause"
```

---

## Testing the Flow

To verify the UX is working correctly:

1. **Brainstorm test**: Does it end with options?
2. **Validate test**: Does it show strengths AND weaknesses with options?
3. **Refine test**: Does it celebrate improvement and offer next steps?
4. **PRD test**: Does it offer to save and suggest architecture?
5. **Design test**: Does it ask ONE question (vibe) and auto-load Spawner skills?
6. **Architecture test**: Does it detect Spawner and handle both cases?
7. **Checklist test**: Does it generate Tasks.md and Checklist.md with P0/P1/P2 priorities?
8. **Install test**: Does it offer to add Spawner automatically?
9. **Resume test**: Is the prompt ready to paste with no editing?

---

## Version History

- **v2.2** (2025-01-20): Added checklist tool (`idearalph_checklist`) with YC-level Tasks.md and Checklist.md generation
- **v2.1** (2025-01-19): Added design phase with ONE question flow, Copywriting + Landing Page Design skills
- **v2.0** (2025-01-17): Added Spawner handoff UX, session continuity, automatic MCP installation
- **v1.0** (2025-01-16): Initial MCP release with 5 tools

---

## Related Files

- `mcp-server/src/tools.ts` - Tool implementations with UX instructions
- `mcp-server/src/index.ts` - MCP server entry point
- `CLAUDE.md` - Project-level instructions
- `mcp-server/README.md` - MCP installation guide
