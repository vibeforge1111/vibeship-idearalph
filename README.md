# IdeaRalph

**Your AI co-founder for startup ideas.** Ralph takes your rough concepts and refines them until they're PMF-ready, growth-ready, and revenue-ready.

## What Does Ralph Do?

1. **Scores your ideas** on 10 Product-Market Fit dimensions
2. **Refines them** using the "Ralph Loop" until they hit 9.5+
3. **Generates PRDs** (napkin sketch → full spec → investor-ready)
4. **Designs UI/UX** with one question: "What vibe?"
5. **Plans architecture** with specific tech stacks and skills

## Install

### Claude Code (CLI) — One Command

**With Spawner skills (recommended):**
```bash
npx github:vibeforge1111/vibeship-idearalph install --with-spawner
```

**IdeaRalph only:**
```bash
npx github:vibeforge1111/vibeship-idearalph install
```

Then restart Claude Code:
```
/exit
```
Then type `claude` to start a new session.

### Claude Desktop

**Step 1:** Clone and build
```bash
git clone https://github.com/vibeforge1111/vibeship-idearalph.git
cd vibeship-idearalph/mcp-server
npm install && npm run build
```

**Step 2:** Add to your Claude Desktop config file:

| Platform | Config Location |
|----------|-----------------|
| Mac | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

```json
{
  "mcpServers": {
    "idearalph": {
      "command": "node",
      "args": ["/path/to/vibeship-idearalph/mcp-server/dist/index.js"]
    }
  }
}
```

**Step 3:** Restart Claude Desktop

---

## Just Talk to Ralph

No special prompts needed. No commands to memorize. Just describe your idea:

```
"Hey Ralph, I have this idea for a fitness app..."
"What do you think about a marketplace for vintage sneakers?"
"Help me brainstorm something in the AI space"
```

## Usage Examples

### Starting from scratch
```
"Brainstorm startup ideas in the productivity space"
"Give me 5 ideas that combine AI with fitness"
"What's a weird startup idea that might actually work?"
```

### Validating your idea
```
"Score this idea: An app that matches people with similar sleep schedules for dating"
"Validate my concept for a subscription box for houseplants"
"What are the weaknesses in my idea for a freelancer insurance platform?"
```

### Pushing for higher scores
```
"Iterate on this until it scores 9.5+"
"Make this idea more defensible"
"How can I improve the virality of this concept?"
```

### Going deeper
```
"Generate a PRD for this"
"Design the UI — I want a clean, minimal vibe"
"Plan the architecture using SvelteKit and Supabase"
"Create a launch checklist"
```

### The full journey
```
"Let's go through the whole flow — brainstorm, validate, refine, PRD, design, architecture"
```

---

## The Flow

```
Brainstorm → Validate → Refine → PRD → Design → Architecture → Checklist → Build!
```

| Stage | What Happens | Example Prompt |
|-------|--------------|----------------|
| **Brainstorm** | Generate ideas with initial scores | "Ideas for busy parents" |
| **Validate** | Deep-dive scoring on 10 dimensions | "Score this idea..." |
| **Refine** | Ralph Loop until 9.5+ | "Iterate until it's great" |
| **PRD** | Product requirements doc | "Generate a PRD" |
| **Design** | UI/UX with one vibe question | "Design it — bold vibe" |
| **Architecture** | Tech stack + implementation | "Plan how to build this" |
| **Checklist** | YC-level launch prep | "Create launch checklist" |
| **Build!** | Start shipping | Use Spawner skills or DIY |

### The Ralph Loop

```
Your Idea → Score → Feedback → Improve → Score → ... → 9.5+ Idea!
```

Ralph keeps iterating until your idea is ready. Each round:
- Scores on 10 dimensions (1-10 scale)
- Gives specific, actionable feedback
- Generates an improved version

---

## PMF Scoring (10 Dimensions)

| Dimension | What It Measures |
|-----------|------------------|
| Problem Clarity | How clear and painful is the problem? |
| Market Size | TAM/SAM — how big is the opportunity? |
| Uniqueness | What's the 10x better angle? |
| Feasibility | Can you build MVP in 3 months? |
| Monetization | Clear path to revenue? |
| Timing | Why now? What changed? |
| Virality | Built-in sharing? Network effects? |
| Defensibility | Data moat? Switching costs? |
| Team Fit | Good for 2-3 person team? |
| Ralph Factor | Sounds dumb but actually genius? |

---

## MCP Tools

Once installed, Claude uses these automatically:

| Tool | What It Does |
|------|--------------|
| `idearalph_brainstorm` | Generate ideas for a topic |
| `idearalph_validate` | Score an idea on 10 dimensions |
| `idearalph_refine` | Run the Ralph Loop (single/target/max) |
| `idearalph_prd` | Generate PRD (napkin/science-fair/genius) |
| `idearalph_design` | Design UI/UX with vibe selection |
| `idearalph_architecture` | Get implementation plan |
| `idearalph_checklist` | YC-level launch checklist |

---

## PRD Levels

| Level | What You Get |
|-------|--------------|
| `napkin` | Quick 1-page sketch (~5 min read) |
| `science-fair` | Full PRD with user stories, competitive analysis (~15 min) |
| `genius` | Investor-ready + structured JSON export (~30 min) |

---

## Example

```
Input: "A fishing game that teaches mindfulness"

After 10 iterations → Score: 9.9/10

Final: "FishFeels - A meditative mobile fishing game combining
realistic casting mechanics with guided breathing exercises.
Each catch triggers a micro-meditation. Monetizes through
premium biomes ($2.99) and meditation coach subs ($4.99/mo)."
```

---

## /spwn VIBECOINS

Building something cool? Launch it on the **vibe/vibe vibecoin launchpad**.

Check out [idearalph.com/hackathon](https://idearalph.com/hackathon) for:
- Three launch paths (Community Voted, Curated, Degen)
- Creator fees from trading volume
- Token allocation for vibe coders

---

## Tech Stack

- **Frontend**: SvelteKit + Svelte 5
- **Styling**: TailwindCSS
- **Database**: Supabase
- **AI**: Claude (Anthropic)
- **MCP**: Model Context Protocol

## Links

- [Website](https://idearalph.com)
- [Hackathon](https://idearalph.com/hackathon)
- [X / Twitter](https://x.com/meta_alchemist)
- [Vibeship](https://vibeship.co)

---

Built with love by [@meta_alchemist](https://x.com/meta_alchemist)

IdeaRalph is an ecosystem tool by [Vibeship](https://vibeship.co) — Powered by Claude and MCP.

**Vibe coded for vibe coders.**
