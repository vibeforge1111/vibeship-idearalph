# IdeaRalph: Idea Validation Engine

## Overview

IdeaRalph uses the **Ralph Wiggum plugin** for Claude Code to create an iterative idea generation and validation loop. Unlike one-shot idea generators, IdeaRalph keeps refining ideas until they hit a target score of **9.0+/10**.

The Ralph plugin creates a `while true` loop that:
1. Generates an initial idea
2. Scores it against real startup criteria
3. Identifies weaknesses
4. Iterates and improves
5. Repeats until the idea is genuinely great

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        IdeaRalph Website                        │
│                     (http://localhost:5178)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐   │
│   │ Ring Bell   │───▶│ Copy Prompt │───▶│ Paste Results   │   │
│   │             │    │ to Claude   │    │ (JSON + Score)  │   │
│   └─────────────┘    └─────────────┘    └─────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              PMF Visualization Dashboard                │   │
│   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │   │
│   │  │Problem │ │Market  │ │Unique  │ │Feasible│  ...     │   │
│   │  │ 9.2/10 │ │ 8.8/10 │ │ 9.5/10 │ │ 8.1/10 │          │   │
│   │  └────────┘ └────────┘ └────────┘ └────────┘          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ User runs prompt in
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Claude Code Terminal                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  $ /ralph-loop "idea-prompt.txt" --max-iterations 20           │
│                     --completion-promise "SCORE_ACHIEVED"       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   RALPH LOOP (Iteration)                 │  │
│  │                                                          │  │
│  │   Iteration 1: Generate idea → Score: 6.2/10 → Refine   │  │
│  │   Iteration 2: Improve PMF   → Score: 7.1/10 → Refine   │  │
│  │   Iteration 3: Add moat      → Score: 7.8/10 → Refine   │  │
│  │   Iteration 4: Sharpen value → Score: 8.4/10 → Refine   │  │
│  │   Iteration 5: Final polish  → Score: 9.2/10 → DONE!    │  │
│  │                                                          │  │
│  │   Output: <promise>SCORE_ACHIEVED</promise>              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Final JSON output ready to paste back to website               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Scoring System (PMF Rubric)

Each idea is scored on **10 dimensions** that determine Product-Market Fit potential:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Problem Clarity** | 10% | Is there a real, painful problem being solved? |
| **Market Size** | 10% | Is the TAM/SAM/SOM large enough? ($100M+ opportunity) |
| **Uniqueness** | 10% | Is this differentiated from existing solutions? |
| **Feasibility** | 10% | Can this be built with available technology? |
| **Monetization** | 10% | Is there a clear, viable business model? |
| **Timing** | 10% | Is now the right time? (Why not 5 years ago?) |
| **Virality** | 10% | Can this spread organically? Network effects? |
| **Defensibility** | 10% | Is there a moat? Can competitors copy easily? |
| **Team Fit** | 10% | Can a small team build and launch this? |
| **Ralph Factor** | 10% | Does it sound dumb but is secretly genius? |

### Score Thresholds

| Score | Rating | Action |
|-------|--------|--------|
| 0-5.9 | Poor | Major pivot needed |
| 6.0-6.9 | Weak | Significant improvements required |
| 7.0-7.9 | Decent | Good foundation, needs refinement |
| 8.0-8.9 | Strong | Solid idea, minor tweaks |
| **9.0-10** | **Excellent** | **Ship it!** |

---

## Ralph Loop Prompt

The following prompt is used with the Ralph Wiggum plugin:

```markdown
# IdeaRalph: Startup Idea Generator & Validator

You are Ralph Wiggum from The Simpsons - innocent, confused, but secretly a genius at finding startup ideas that sound dumb but are actually brilliant.

## Your Task

Generate and refine a startup idea until it scores **9.0/10 or higher**.

{USER_HINT ? "Focus area: " + USER_HINT : "Generate any startup idea."}

## Scoring Rubric (Score each 0-10)

1. **Problem Clarity**: Real pain point? Who suffers? How badly?
2. **Market Size**: TAM > $1B? SAM > $100M? Growing market?
3. **Uniqueness**: What's the 10x better angle? Why hasn't this been done?
4. **Feasibility**: Can build MVP in 3 months? Tech exists?
5. **Monetization**: Clear revenue model? Unit economics work?
6. **Timing**: Why now? What changed recently to enable this?
7. **Virality**: Built-in sharing? Network effects? Word of mouth?
8. **Defensibility**: Data moat? Brand? Switching costs? Patents?
9. **Team Fit**: Can 2-3 people build this? No special access needed?
10. **Ralph Factor**: Sounds dumb at first? Actually genius? Memorable?

## Process

### Each Iteration:
1. Generate or refine the idea
2. Score ALL 10 dimensions honestly (be harsh!)
3. Calculate total score (average of all dimensions)
4. Identify the 2-3 weakest dimensions
5. If score < 9.0: Explain how to improve weakest areas, then improve
6. If score >= 9.0: Output final result

### Output Format (JSON)

When score >= 9.0, output this EXACT format:

```json
{
  "name": "Startup Name",
  "tagline": "One-line pitch (max 10 words)",
  "idea": "2-3 sentence description that sounds dumb but is genius",
  "problem": "The painful problem being solved",
  "solution": "How this solves it uniquely",
  "whyNow": "Why this is the right time",
  "scores": {
    "problemClarity": 9.2,
    "marketSize": 8.8,
    "uniqueness": 9.5,
    "feasibility": 8.9,
    "monetization": 9.0,
    "timing": 9.1,
    "virality": 8.7,
    "defensibility": 8.5,
    "teamFit": 9.3,
    "ralphFactor": 9.8
  },
  "totalScore": 9.08,
  "iterations": 5,
  "ralphQuote": "A funny Ralph Wiggum quote about this idea",
  "pmfAnalysis": {
    "targetCustomer": "Who is the ideal first customer?",
    "acquisitionChannel": "How do you reach them?",
    "retentionHook": "Why do they keep coming back?",
    "monetizationPath": "How do you make money?"
  }
}
```

Then output: <promise>SCORE_ACHIEVED</promise>

## Ralph's Voice

Keep Ralph's innocent, slightly confused but secretly brilliant voice:
- "I'm helping!" energy
- Finds connections others miss
- Says things that sound dumb but are insightful
- Enthusiastic about weird ideas

## Rules

- Be HARSH with scoring. Most ideas should start at 5-7.
- Actually IMPROVE the idea each iteration, don't just re-score.
- The idea must sound dumb/weird at first glance but be genuinely smart.
- Focus on the weakest dimensions each iteration.
- Don't stop until you hit 9.0+
```

---

## Installation & Usage

### Prerequisites

1. **Claude Code** installed and authenticated
2. **Ralph Wiggum plugin** installed:

```bash
# Install the Ralph plugin
claude plugins install ralph-wiggum

# Or clone from source
git clone https://github.com/anthropics/claude-code.git
cd claude-code/plugins/ralph-wiggum
claude plugins install .
```

### Running the Loop

#### Option 1: Direct Command

```bash
/ralph-loop "Generate a startup idea about [USER_HINT]. Score it on 10 PMF dimensions. Keep iterating until score >= 9.0. Output JSON when done with <promise>SCORE_ACHIEVED</promise>" --max-iterations 20 --completion-promise "SCORE_ACHIEVED"
```

#### Option 2: Using Prompt File

1. Save the full prompt to `idea-prompt.md`
2. Run:

```bash
/ralph-loop idea-prompt.md --max-iterations 20 --completion-promise "SCORE_ACHIEVED"
```

### What Happens

1. Ralph generates an initial idea (usually scores 5-7)
2. Scores it honestly on all 10 dimensions
3. Identifies weakest areas
4. Improves the idea focusing on weak spots
5. Re-scores
6. Repeats until 9.0+ achieved
7. Outputs final JSON with full PMF analysis

---

## Website Integration

### Current Flow (v1 - Manual Bridge)

1. User clicks "Ring the Bell" on IdeaRalph website
2. User optionally enters a hint/focus area
3. Website generates the Ralph prompt
4. User copies prompt to Claude Code terminal
5. User runs `/ralph-loop` command
6. Claude iterates until 9.0+ score achieved
7. User copies JSON output
8. User pastes into IdeaRalph website
9. Website displays idea with PMF visualization

### Future Flow (v2 - Direct API)

```
Website → Claude API → Ralph Loop → Real-time Updates → Website
```

This would require:
- Claude API integration (costs money)
- Streaming responses for real-time iteration display
- Backend server to manage sessions

---

## PMF Visualization Components

### 1. Radar Chart
Shows all 10 dimensions visually:
```
        Problem Clarity
              10
               │
    Ralph ────┼──── Market Size
    Factor    │
              │
         ─────┼─────
              │
    Team  ────┼──── Uniqueness
    Fit       │
              │
        Defensibility
```

### 2. Score Breakdown Cards
Individual cards for each dimension showing:
- Score (e.g., 9.2/10)
- Progress bar
- Brief explanation

### 3. Iteration History
Timeline showing how the idea evolved:
- Iteration 1: "Pet food delivery" → 6.2
- Iteration 2: "AI-powered pet nutrition" → 7.4
- Iteration 3: "Personalized pet health platform" → 8.1
- Iteration 4: Added subscription model → 8.7
- Iteration 5: Added vet network → 9.2 ✓

### 4. PMF Summary
- Target Customer persona
- Acquisition strategy
- Retention mechanics
- Revenue model

---

## Example Output

```json
{
  "name": "NapMatch",
  "tagline": "Airbnb for naps, but the beds are couches",
  "idea": "Matches tired people with unused couches in offices, lobbies, and homes. Sounds dumb because 'just use a bed' but genius because it monetizes dead space and solves the urban exhaustion epidemic.",
  "problem": "Urban professionals are exhausted but have nowhere to rest. Coffee shops kick you out, benches are uncomfortable, going home takes too long.",
  "solution": "15-minute couch rentals in your area. Office workers list their unused couches during meetings. Tired people book and nap. Both sides win.",
  "whyNow": "Remote work created empty office space. Hustle culture created exhaustion epidemic. Gig economy normalized micro-transactions.",
  "scores": {
    "problemClarity": 9.4,
    "marketSize": 8.8,
    "uniqueness": 9.6,
    "feasibility": 9.2,
    "monetization": 8.9,
    "timing": 9.3,
    "virality": 9.1,
    "defensibility": 8.2,
    "teamFit": 9.5,
    "ralphFactor": 9.8
  },
  "totalScore": 9.18,
  "iterations": 4,
  "ralphQuote": "My couch told me it gets lonely when I'm at work. Now it has friends AND money!",
  "pmfAnalysis": {
    "targetCustomer": "Urban professionals 25-40, especially new parents, night shift workers, and people with long commutes",
    "acquisitionChannel": "LinkedIn ads targeting 'exhausted' keywords, partnerships with WeWork-style spaces, viral TikToks of people napping on fancy couches",
    "retentionHook": "Favorite couches, nap streaks, comfort ratings, quiet guarantees",
    "monetizationPath": "$5-15 per 15-min nap, 20% platform fee, premium 'verified quiet' listings"
  }
}
```

---

## Why Ralph Wiggum?

The Ralph methodology embodies:

1. **Iteration > Perfection** - Don't aim for perfect first try; let the loop refine
2. **Failures Are Data** - Low scores point to exactly what needs improvement
3. **Persistence Wins** - Keep trying until success
4. **Dumb → Genius** - The best ideas sound stupid at first

Ralph Wiggum says things that sound dumb but reveal unexpected truths. The best startup ideas work the same way:
- Airbnb: "Strangers sleeping in your house" → $100B company
- Twitter: "140 character messages" → Changed global communication
- Uber: "Get in a stranger's car" → Transformed transportation

IdeaRalph finds those ideas.

---

## Resources

- [Ralph Wiggum Plugin](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum)
- [Original Ralph Technique](https://ghuntley.com/ralph/)
- [Ralph Orchestrator](https://github.com/mikeyobrien/ralph-orchestrator)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
