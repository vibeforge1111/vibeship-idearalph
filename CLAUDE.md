# CLAUDE.md - IdeaRalph Project Instructions

## Auto-Save to Mind v5

**IMPORTANT:** Automatically save important conversations to Mind v5 without being asked.

### What to Save:
- **Decisions** (temporal_level: 4, salience: 0.9+) — Strategic choices, positioning, token mechanics
- **Events** (temporal_level: 3, salience: 0.8+) — Launch dates, milestones, announcements
- **Observations** (temporal_level: 3, salience: 0.7+) — Technical changes, website updates, insights

### How to Save:
```bash
curl -s -X POST http://localhost:8080/v1/memories/ \
  -H "Content-Type: application/json" \
  -d '{"content": "...", "temporal_level": 3, "salience": 0.8, "content_type": "decision"}'
```

### When to Save:
- After major decisions are made
- After strategic conversations (like the vibecoin mission)
- After significant code/website changes
- After launch planning or milestone setting
- When the user shares important context about the project

If Mind v5 isn't running (connection refused), start it first:
```bash
cd C:/Users/USER/Desktop/the-mind/vibeship-mind && python src/mind/lite_tier.py &
```

---

## H70+ Skill-Driven Development Protocol

**CRITICAL:** This project uses H70+ skills for specialized, production-grade output. Always spawn the right skill before starting any task.

### Skill Spawning Rule

> **Before writing ANY code, ALWAYS spawn the relevant H70+ skill using `spawner_load` or `spawner_skills`.**
>
> Skills provide: battle-tested patterns, anti-patterns to avoid, disaster stories with $ amounts, detection commands, and emotional anchors that produce 24.2 points better output than vanilla Claude.

---

## IdeaRalph Skill Map

### Core Skills for This Project

| Task Domain | Primary Skill | Handoff Skills |
|-------------|---------------|----------------|
| **SvelteKit Pages/Routes** | `SvelteKit` | Tailwind CSS UI, TypeScript Strict |
| **Database/Auth** | `Supabase Backend` | PostgreSQL Wizard, Auth Specialist |
| **AI/LLM Integration** | `LLM Architect` | Agent Tool Builder, Prompt Engineer |
| **Styling/UI** | `Tailwind CSS UI` | Branding, Motion Graphics |
| **TypeScript Types** | `TypeScript Strict Mode` | API Designer |
| **API Routes** | `API Designer` | Backend Engineering |
| **Testing** | `Test Architect` | QA Engineering |
| **Security** | `Security Hardening` | Cybersecurity |
| **Realtime Features** | `Realtime Engineer` | Supabase Backend |

### How to Spawn Skills

```
// Via MCP tool:
spawner_skills({ action: "get", name: "SvelteKit" })
spawner_load({ skill_id: "sveltekit" })

// For handoffs:
spawner_load({
  skill_id: "supabase-backend",
  context: "Building ideas table with RLS for user ownership"
})
```

---

## Task → Skill Mapping

### When Building SvelteKit Components
```
SPAWN: SvelteKit
HANDOFF TO: Tailwind CSS UI (for styling)
HANDOFF TO: TypeScript Strict Mode (for types)
```

**SvelteKit skill owns:**
- +page.svelte, +page.server.ts files
- Load functions and form actions
- Svelte 5 runes ($state, $derived, $effect)
- Hooks and middleware
- SSR/hydration patterns

### When Building Database Schema
```
SPAWN: Supabase Backend
HANDOFF TO: PostgreSQL Wizard (for complex queries)
HANDOFF TO: Auth Specialist (for auth tables)
```

**Supabase Backend skill owns:**
- Table schema design
- RLS policies (ALWAYS enable!)
- Migrations
- Realtime subscriptions
- Storage buckets

### When Building AI Features (Ralph Loop)
```
SPAWN: LLM Architect
HANDOFF TO: Agent Tool Builder (for function calling)
HANDOFF TO: Prompt Engineer (for prompt templates)
```

**LLM Architect skill owns:**
- Prompt engineering
- Structured output
- Streaming responses
- Token optimization
- Hallucination mitigation

### When Building UI Components
```
SPAWN: Tailwind CSS UI
HANDOFF TO: Motion Graphics (for animations)
HANDOFF TO: Branding (for design system)
```

**Tailwind CSS UI skill owns:**
- Utility class patterns
- Responsive design
- Dark mode
- Component extraction
- Animation classes

### When Writing TypeScript
```
SPAWN: TypeScript Strict Mode
HANDOFF TO: API Designer (for API types)
```

**TypeScript Strict skill owns:**
- Type definitions
- Generics
- Zod schemas
- Type guards
- No `any` allowed

---

## Handoff Protocol

When a skill detects work outside its domain:

1. **Acknowledge**: "This involves [topic]. Handing off to [Specialist]."
2. **Summarize Context**: What's built, current file, user goal
3. **Execute**: `spawner_load({ skill_id: "target-skill", context: "..." })`
4. **Stop**: Let the new skill take over

### Handoff Triggers

| If you see... | Handoff to... |
|---------------|---------------|
| Database, tables, RLS, Supabase | `Supabase Backend` |
| Styling, CSS, Tailwind, responsive | `Tailwind CSS UI` |
| Types, TypeScript, generics, Zod | `TypeScript Strict Mode` |
| LLM, prompts, Claude, streaming | `LLM Architect` |
| Auth, login, session, JWT | `Auth Specialist` |
| API routes, endpoints, REST | `API Designer` |
| Tests, testing, vitest, playwright | `Test Architect` |
| Security, XSS, injection, secrets | `Security Hardening` |
| Deploy, Vercel, production | `Vercel Deployment` |

---

## Project-Specific Commands

### Start Development
```bash
npm run dev
```

### Database Operations
```bash
# Generate types from Supabase
npx supabase gen types typescript --project-id <id> > src/lib/types/database.ts

# Run migrations
npx supabase db push
```

### Mind v5 Integration
```bash
# API running at http://localhost:8080
# Dashboard at http://localhost:8501

# Save memory
curl -X POST http://localhost:8080/v1/memories/ \
  -H "Content-Type: application/json" \
  -d '{"content": "...", "temporal_level": 3, "salience": 0.8}'
```

---

## Architecture Overview

```
IdeaRalph/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components (Tailwind CSS UI skill)
│   │   ├── ralph/          # AI loop engine (LLM Architect skill)
│   │   ├── server/         # Server utilities (Supabase Backend skill)
│   │   ├── stores/         # Svelte stores (SvelteKit skill)
│   │   └── types/          # TypeScript types (TypeScript Strict skill)
│   └── routes/
│       ├── api/            # API routes (API Designer skill)
│       └── [pages]/        # Page routes (SvelteKit skill)
├── supabase/
│   └── migrations/         # DB migrations (Supabase Backend skill)
└── docs/
    ├── ARCHITECTURE.md     # System design
    └── IMPLEMENTATION_PLAN.md
```

---

## Quality Gates

Before completing any task, the relevant skill should verify:

1. **Patterns Used**: Are production-ready patterns from the skill applied?
2. **Anti-Patterns Avoided**: Check against skill's anti-pattern list
3. **Sharp Edges Handled**: Review skill's gotchas section
4. **Detection Commands Run**: Use skill's grep/detection commands
5. **Types Complete**: No `any`, proper Zod validation at boundaries

---

## Tech Stack

| Layer | Technology | Skill |
|-------|------------|-------|
| Frontend | Svelte 5 + SvelteKit | SvelteKit |
| Styling | TailwindCSS | Tailwind CSS UI |
| Database | Supabase (Postgres) | Supabase Backend |
| Auth | Supabase Auth | Auth Specialist |
| AI | Anthropic Claude | LLM Architect |
| Types | TypeScript + Zod | TypeScript Strict Mode |
| Testing | Vitest + Playwright | Test Architect |
| Deploy | Vercel | Vercel Deployment |

---

## Environment Variables

```env
# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# App
PUBLIC_APP_URL=http://localhost:5173
```

---

## Remember

1. **Always spawn skills** - Don't write code without loading the relevant H70+ skill
2. **Handoff correctly** - When crossing domains, explicitly hand off to the specialist
3. **Use skill patterns** - Each skill has battle-tested code patterns
4. **Avoid anti-patterns** - Each skill lists what NOT to do
5. **Run detection commands** - Find issues before they become disasters
6. **RLS on everything** - Supabase tables MUST have RLS enabled
7. **No `any` types** - TypeScript strict mode, always
8. **Server-first** - Use +page.server.ts for sensitive operations

---

## PRD Generation Levels

IdeaRalph supports three PRD (Product Requirements Document) levels:

### Level: `napkin` (Default)
- ~10 sections
- Quick sketch PRD
- Good for initial idea assessment
- ~1-2 pages

### Level: `science-fair`
- 18 comprehensive sections
- 15-20 user stories
- Full technical architecture
- Competitive analysis
- Budget estimates
- Timeline with phases
- Risk assessment
- ~10-15 pages

### Level: `genius`
- Everything in `science-fair`
- Returns both Markdown AND structured JSON
- JSON is typed with full TypeScript interfaces
- Ready for database storage or programmatic use
- For builders who want the complete package

### API Usage

```typescript
// Napkin PRD (quick sketch)
POST /api/prd/generate
{ idea, name, pmfScores, level: "napkin" }

// Science Fair PRD (full project)
POST /api/prd/generate
{ idea, name, pmfScores, level: "science-fair" }

// Genius PRD (returns markdown + JSON)
POST /api/prd/generate
{ idea, name, pmfScores, level: "genius" }
```

### PRD Types (TypeScript)

Key interfaces in `src/lib/ralph/types.ts`:
- `PRDLevel`: 'napkin' | 'science-fair' | 'genius'
- `DetailedPRD`: Full structured PRD
- `UserPersona`: Target user definition
- `UserStory`: User story with acceptance criteria
- `FeatureSpec`: Feature specifications
- `Competitor`: Competitive analysis entry
- `Risk`: Risk assessment entry

---

## Claude Code Plugin

IdeaRalph can be used as a Claude Code plugin for idea generation directly in your IDE.

### Plugin Commands

```bash
# Generate idea with Ralph Loop (iterates until dope level 9.9+)
/ralph-loop "Your idea prompt" --max-iterations 30

# Generate detailed PRD for an existing idea
/ralph-prd --level detailed

# Quick idea validation
/ralph-validate "Your idea description"
```

### Plugin Installation

The plugin lives in `.claude/commands/` and can be installed via:

```bash
# Copy to your Claude Code commands directory
cp -r plugins/idearalph ~/.claude/commands/
```

### Plugin Features

1. **Ralph Loop**: Iterative idea refinement until score threshold
2. **PMF Scoring**: 10-dimension scoring (now includes problem clarity, uniqueness, feasibility, timing, Ralph Factor)
3. **PRD Generation**: Napkin, Science-Fair, or Genius level
4. **JSON Output**: Structured data for further processing
5. **Iteration History**: Track how ideas evolved

---

## MCP Server v2.2

IdeaRalph works as an MCP (Model Context Protocol) server, enabling Claude to automatically invoke Ralph tools during brainstorming sessions.

**No API key required!** The MCP is a prompt provider - it returns structured prompts that Claude Code processes directly.

> **UX Documentation**: See `docs/MCP_UX_PATTERNS.md` for detailed UX guidelines, Spawner integration flow, and session continuity patterns.

### How It Works

```
Old way:  User → Claude Code → MCP → Anthropic API → Response (needed API key!)
New way:  User → Claude Code → MCP → Returns prompt → Claude processes directly
```

### MCP Tools Available

| Tool | Description |
|------|-------------|
| `idearalph_brainstorm` | Generate and score startup ideas for a topic |
| `idearalph_validate` | Validate an idea on 10 PMF dimensions |
| `idearalph_refine` | Iteratively improve idea with modes: single, target, max |
| `idearalph_prd` | Generate PRD at napkin/science-fair/genius level |
| `idearalph_design` | Design UI with ONE question - infers audience, finds references |
| `idearalph_architecture` | Get implementation plan (defaults to SvelteKit) |
| `idearalph_checklist` | **NEW!** Generate YC-level checklist (Tasks.md + Checklist.md) |

### MCP Installation

1. **Build the server**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

2. **Configure Claude Code** (add to MCP settings):
   ```json
   {
     "mcpServers": {
       "idearalph": {
         "command": "node",
         "args": ["<path>/mcp-server/dist/index.js"]
       }
     }
   }
   ```

   That's it - no API key needed!

3. **Use naturally**: Just ask Claude to brainstorm ideas - it will invoke the tools automatically!

### The Flow (v2.2)

```
Brainstorm → Validate → Refine → PRD → Design → Architecture → Checklist → Build!
                                         ↑                        ↑
                                   ONE question:            YC-level checklist:
                                   "What vibe?"             Tasks.md + Checklist.md
                                         ↓                        ↓
                                   AI infers audience        Security, Legal,
                                   from PRD, finds refs      Analytics, Growth
```

Each tool suggests the next step. The **Design** phase:
1. Asks ONE question: "What vibe?" (clean/bold/dark/playful)
2. **Loads Spawner skills**: UX Design, UI Design, Tailwind CSS UI
3. Analyzes PRD to infer target audience automatically
4. Finds reference sites that audience loves (project-specific)
5. Generates design using skill patterns:
   - Color palette (UI Design's contrast rules)
   - Typography (UI Design's type scale)
   - Spacing (UI Design's 8pt grid)
   - Landing page wireframe (UX Design's patterns)
   - Component specs with ALL states (UI Design's component mapping)
   - Tailwind config (Tailwind CSS UI's token system)
6. Builds ONE page first with SvelteKit, iterates from there (KISS principle)

The **Checklist** phase (NEW in v2.2):
1. **Loads Spawner skills**: YC Playbook, Growth Strategy, Product Strategy
2. Generates TWO files with YC-level launch standards:
   - **Tasks.md**: Actionable tasks by P0/P1/P2 priority with owners and status
   - **Checklist.md**: Comprehensive pre-launch and post-launch checklist
3. Covers all critical areas:
   - 🔴 Security (OWASP, auth, RLS, rate limiting)
   - 📜 Legal (ToS, Privacy Policy, GDPR)
   - 📊 Analytics (product analytics, error tracking, session replay)
   - 📝 Content & SEO (meta tags, OG images, sitemap)
   - 🚀 Growth (viral loops, referral, onboarding)
   - 🏗️ Infrastructure (monitoring, backups, CI/CD)
   - 📢 Launch tactics (Product Hunt, HN, social)
4. Prioritizes ruthlessly: P0 items (security, legal) are non-negotiable; rest can iterate post-launch

### Refinement Modes

- **single**: One round of feedback
- **target**: Keep refining until target score (default 9.5)
- **max**: Run all iterations for maximum polish

See `mcp-server/README.md` for full documentation.

### Spawner Integration

After architecture generation, IdeaRalph checks for Spawner and handles the handoff:

**Default Stack** (SvelteKit-first, not Next.js):
- **Frontend**: SvelteKit (simpler, faster, less boilerplate)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Postgres + Auth + Storage)
- **Deploy**: Vercel

**If Spawner is available:**
- Offers to start building immediately
- Loads appropriate skills (SvelteKit, supabase-backend, tailwind-ui, etc.)

**If Spawner is NOT available:**
- Explains benefits: FREE, 450+ skills, better output
- Offers to install automatically (Claude handles MCP config)
- Saves work to files first
- Provides resume prompt for after restart

**Key UX Principles:**
1. Never dump commands - always ASK what user wants
2. Offer to do things FOR them (don't explain how)
3. Always include a "pause" option
4. Session continuity via resume prompts

See `docs/MCP_UX_PATTERNS.md` for the complete UX specification.
