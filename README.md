# IdeaRalph

**Your AI co-founder for startup ideas.** Ralph takes your rough concepts and refines them until they're PMF-ready, growth-ready, and revenue-ready.

## What Does Ralph Do?

1. **Scores your ideas** on 10 Product-Market Fit dimensions
2. **Refines them** using the "Ralph Loop" until they hit 9.5+
3. **Generates PRDs** (napkin sketch → full spec → investor-ready)
4. **Suggests how to build** with specific tech stacks

## Install (One Command)

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
```
claude
```

That's it! Start brainstorming.

## The Ralph Loop

```
Your Idea → Score → Feedback → Improve → Score → ... → 9.5+ Idea!
```

Ralph keeps iterating until your idea is ready. Each round:
- Scores on 10 dimensions (1-10 scale)
- Gives specific, actionable feedback
- Generates an improved version

## PMF Scoring

| Dimension | What It Measures |
|-----------|------------------|
| Problem Clarity | How clear is the problem? |
| Market Size | How big is the opportunity? |
| Uniqueness | How different from competitors? |
| Feasibility | Can you actually build this? |
| Monetization | How will you make money? |
| Timing | Is the market ready now? |
| Virality | Will people share it? |
| Defensibility | Can you build a moat? |
| Team Fit | Good for an indie founder? |
| Ralph Factor | Does this make Ralph excited? |

## MCP Tools

Once installed, Claude can use these automatically:

| Tool | What It Does |
|------|--------------|
| `idearalph_brainstorm` | Generate ideas for a topic |
| `idearalph_validate` | Score an idea on 10 dimensions |
| `idearalph_refine` | Run the Ralph Loop |
| `idearalph_prd` | Generate a PRD |
| `idearalph_design` | Design the UI/UX |
| `idearalph_architecture` | Get implementation plan |
| `idearalph_checklist` | YC-level launch checklist |

## PRD Levels

| Level | What You Get |
|-------|--------------|
| `napkin` | Quick 1-page sketch |
| `science-fair` | Full PRD with user stories |
| `genius` | Investor-ready + JSON export |

## Example

```
Input: "A fishing game that teaches mindfulness"

After 10 iterations → Score: 9.9/10

Final: "FishFeels - A meditative mobile fishing game combining
realistic casting mechanics with guided breathing exercises.
Each catch triggers a micro-meditation. Monetizes through
premium biomes ($2.99) and meditation coach subs ($4.99/mo)."
```

## The Flow

```
Brainstorm → Validate → Refine → PRD → Design → Architecture → Build!
```

1. **Brainstorm** — Give Ralph a topic, get startup ideas with initial scores
2. **Validate** — Score your idea on 10 PMF dimensions (problem clarity, market size, etc.)
3. **Refine** — Ralph Loop iterates until your idea hits 9.5+ (or run single/max mode)
4. **PRD** — Generate a Product Requirements Doc (napkin, science-fair, or genius level)
5. **Design** — One question: "What vibe?" Ralph infers audience and creates design specs
6. **Architecture** — Get implementation plan with recommended tech stack
7. **Build!** — Start shipping with Spawner skills or your own setup

## /spwn VIBECOINS

Building something cool? Launch it on the **vibe/vibe vibecoin launchpad**.

Check out [idearalph.com/hackathon](https://idearalph.com/hackathon) for:
- Three launch paths (Community Voted, Curated, Degen)
- Creator fees from trading volume
- Token allocation for vibe coders

## Tech Stack

- **Frontend**: SvelteKit + Svelte 5
- **Styling**: TailwindCSS
- **Database**: Supabase
- **AI**: Claude (Anthropic)
- **MCP**: Model Context Protocol

## Links

- [Website](https://idearalph.com)
- [Hackathon](https://idearalph.com/hackathon)
- [Vibeship](https://vibeship.co)

---

Built with love by [Vibeship](https://github.com/vibeforge1111)

Powered by Claude and MCP.
