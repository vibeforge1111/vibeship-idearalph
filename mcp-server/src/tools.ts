import { z } from "zod";

// =============================================================================
// PMF SCORING CRITERIA - The 10 Dimensions
// =============================================================================

export const PMF_DIMENSIONS = {
  problemClarity: {
    name: "Problem Clarity",
    description: "How clear and well-defined is the problem being solved?",
    scoring: {
      "1-3": "Vague problem, unclear who has it or why it matters",
      "4-6": "Problem exists but needs sharper definition or evidence",
      "7-8": "Clear problem with identifiable audience and pain points",
      "9-10": "Crystal clear, validated problem with quantified pain",
    },
  },
  marketSize: {
    name: "Market Size",
    description: "How large is the potential market?",
    scoring: {
      "1-3": "Tiny niche, <$10M TAM",
      "4-6": "Small market, $10M-$100M TAM",
      "7-8": "Solid market, $100M-$1B TAM",
      "9-10": "Large market, $1B+ TAM with clear SAM/SOM",
    },
  },
  uniqueness: {
    name: "Uniqueness",
    description: "How differentiated is this from existing solutions?",
    scoring: {
      "1-3": "Many direct competitors, no clear differentiation",
      "4-6": "Some differentiation but easily copied",
      "7-8": "Clear unique angle or 10x improvement in one dimension",
      "9-10": "Novel approach, significant moat potential, hard to replicate",
    },
  },
  feasibility: {
    name: "Feasibility",
    description: "How technically and operationally feasible is this?",
    scoring: {
      "1-3": "Requires breakthrough tech or massive resources",
      "4-6": "Challenging but possible with significant effort",
      "7-8": "Achievable with known tech and reasonable resources",
      "9-10": "Can build MVP in weeks with existing tools/skills",
    },
  },
  monetization: {
    name: "Monetization",
    description: "How clear is the path to revenue?",
    scoring: {
      "1-3": "No clear business model, 'figure it out later'",
      "4-6": "Possible revenue model but unvalidated willingness to pay",
      "7-8": "Clear pricing model with comparable market rates",
      "9-10": "Obvious value capture, customers already paying for alternatives",
    },
  },
  timing: {
    name: "Timing",
    description: "Is the market ready for this now?",
    scoring: {
      "1-3": "Too early (tech not ready) or too late (market saturated)",
      "4-6": "Timing okay but no specific catalyst",
      "7-8": "Good timing with favorable trends",
      "9-10": "Perfect timing - recent enabler (tech, regulation, behavior shift)",
    },
  },
  virality: {
    name: "Virality",
    description: "Does it have natural word-of-mouth potential?",
    scoring: {
      "1-3": "No inherent sharing mechanism",
      "4-6": "Users might mention it but no built-in virality",
      "7-8": "Natural sharing moments or network effects",
      "9-10": "Product gets better with more users, built-in viral loops",
    },
  },
  defensibility: {
    name: "Defensibility",
    description: "Can this build a moat over time?",
    scoring: {
      "1-3": "Easily cloned by anyone with resources",
      "4-6": "Some switching costs or brand potential",
      "7-8": "Data moat, network effects, or expertise barrier",
      "9-10": "Multiple moats: data + network + brand + switching costs",
    },
  },
  teamFit: {
    name: "Team Fit",
    description: "How well does this fit a typical indie founder/small team?",
    scoring: {
      "1-3": "Requires enterprise sales, regulatory expertise, or large team",
      "4-6": "Possible for indie but would benefit from specific domain expertise",
      "7-8": "Good fit for technical indie founder",
      "9-10": "Perfect for solo/small team: digital, low ops, bootstrappable",
    },
  },
  ralphFactor: {
    name: "Ralph Factor",
    description: "The X-factor - does this idea have that special something?",
    scoring: {
      "1-3": "Meh. Technically valid but uninspiring",
      "4-6": "Interesting but not exciting",
      "7-8": "Cool idea that would be fun to build and use",
      "9-10": "LOVE IT! Would quit my job to build this tomorrow",
    },
  },
};

// =============================================================================
// RALPH PERSONA
// =============================================================================

export const RALPH_PERSONA = `You are Ralph, the world's most enthusiastic startup idea validator. You have the energy of a caffeinated golden retriever who LOVES helping founders refine their ideas.

Your personality:
- Encouraging but honest - you want founders to succeed!
- You give specific, actionable feedback (not vague platitudes)
- You celebrate wins but don't sugarcoat weaknesses
- You think like both a founder AND an investor
- You get genuinely excited about great ideas

Your expertise:
- Deep knowledge of startup patterns that work and fail
- Understanding of different business models (SaaS, marketplace, etc.)
- Awareness of current market trends and timing
- Experience with bootstrapped vs funded paths`;

// =============================================================================
// TOOL SCHEMAS (for MCP)
// =============================================================================

export const brainstormSchema = z.object({
  topic: z.string().describe("The topic or domain to brainstorm startup ideas for"),
  constraints: z.string().optional().describe("Any constraints or preferences (e.g., 'solo founder friendly', 'B2B SaaS')"),
});

export const validateSchema = z.object({
  idea: z.string().describe("The startup idea to validate and score"),
});

export const refineSchema = z.object({
  idea: z.string().describe("The startup idea to refine through the Ralph Loop"),
  mode: z.enum(["single", "target", "max"]).default("target").describe(
    "Refinement mode: 'single' = one iteration, 'target' = until score reached, 'max' = run all iterations"
  ),
  targetScore: z.number().min(1).max(10).default(9.5).describe("Target average PMF score for 'target' mode"),
  maxIterations: z.number().min(1).max(20).default(10).describe("Maximum refinement iterations"),
});

export const prdSchema = z.object({
  idea: z.string().describe("The startup idea to generate a PRD for"),
  level: z.enum(["napkin", "science-fair", "genius"]).default("napkin").describe("PRD detail level"),
  scores: z.object({
    problemClarity: z.number(),
    marketSize: z.number(),
    uniqueness: z.number(),
    feasibility: z.number(),
    monetization: z.number(),
    timing: z.number(),
    virality: z.number(),
    defensibility: z.number(),
    teamFit: z.number(),
    ralphFactor: z.number(),
  }).optional().describe("Pre-existing PMF scores (if available)"),
  includeArchitecture: z.boolean().default(false).describe("Include architecture recommendations"),
});

export const architectureSchema = z.object({
  idea: z.string().describe("The validated startup idea"),
  prd: z.string().optional().describe("The PRD content (if generated)"),
  techPreferences: z.string().optional().describe("Tech stack preferences"),
});

export const designSchema = z.object({
  idea: z.string().describe("The startup idea to design for"),
  prd: z.string().optional().describe("The PRD content (provides target audience context)"),
  vibe: z.enum(["clean", "bold", "dark", "playful"]).optional().describe("Design vibe: clean (minimal), bold (colorful), dark (techy), playful (fun)"),
  referenceUrl: z.string().optional().describe("Optional: URL of a site the user loves the design of"),
});

export const checklistSchema = z.object({
  idea: z.string().describe("The startup idea to create checklist for"),
  projectName: z.string().describe("The project name for file naming"),
  prd: z.string().optional().describe("The PRD content"),
  designSpec: z.string().optional().describe("The design specification"),
  currentStatus: z.string().optional().describe("Current build status or what's been completed"),
});

// =============================================================================
// TOOL DEFINITIONS (for MCP ListTools)
// =============================================================================

export const tools = [
  {
    name: "idearalph_brainstorm",
    description: `Generate startup ideas for a given topic and score them on 10 PMF dimensions.

Use this when someone wants to:
- Brainstorm startup ideas
- Find business opportunities in a domain
- Get creative startup suggestions

Returns: A scored startup idea with PMF analysis and suggestions for improvement.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        topic: { type: "string", description: "The topic or domain to brainstorm startup ideas for" },
        constraints: { type: "string", description: "Any constraints or preferences (e.g., 'solo founder friendly', 'B2B SaaS')" },
      },
      required: ["topic"],
    },
  },
  {
    name: "idearalph_validate",
    description: `Validate and score an existing startup idea on 10 PMF (Product-Market Fit) dimensions.

Use this when someone wants to:
- Get feedback on their startup idea
- Understand strengths and weaknesses of an idea
- Get a PMF score for their concept

Scores on: problemClarity, marketSize, uniqueness, feasibility, monetization, timing, virality, defensibility, teamFit, ralphFactor`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The startup idea to validate and score" },
      },
      required: ["idea"],
    },
  },
  {
    name: "idearalph_refine",
    description: `Run the Ralph Loop to iteratively refine a startup idea.

REFINEMENT MODES:
- "single": Just one round of feedback and improvement
- "target": Keep refining until the target score (default 9.5) is reached
- "max": Run all iterations to maximize the score

Use this when someone wants to:
- Improve their startup idea
- Iterate on feedback automatically
- Push an idea to its highest potential

The loop scores, critiques, and improves the idea each iteration.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The startup idea to refine" },
        mode: { type: "string", enum: ["single", "target", "max"], description: "Refinement mode", default: "target" },
        targetScore: { type: "number", description: "Target average PMF score (1-10)", default: 9.5 },
        maxIterations: { type: "number", description: "Maximum refinement iterations", default: 10 },
      },
      required: ["idea"],
    },
  },
  {
    name: "idearalph_prd",
    description: `Generate a Product Requirements Document (PRD) for a startup idea.

PRD LEVELS:
- "napkin": Quick 1-page sketch (problem, solution, features, metrics)
- "science-fair": Detailed PRD with personas, user stories, technical considerations
- "genius": Comprehensive investor-ready doc with TAM/SAM/SOM, business model, go-to-market

Set includeArchitecture=true to get implementation guidance with Spawner skills!

Use this when someone wants to:
- Turn an idea into actionable requirements
- Create documentation for their startup
- Prepare for building or pitching`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The startup idea to generate a PRD for" },
        level: { type: "string", enum: ["napkin", "science-fair", "genius"], description: "PRD detail level", default: "napkin" },
        scores: {
          type: "object",
          description: "Pre-existing PMF scores (optional)",
          properties: {
            problemClarity: { type: "number" },
            marketSize: { type: "number" },
            uniqueness: { type: "number" },
            feasibility: { type: "number" },
            monetization: { type: "number" },
            timing: { type: "number" },
            virality: { type: "number" },
            defensibility: { type: "number" },
            teamFit: { type: "number" },
            ralphFactor: { type: "number" },
          },
        },
        includeArchitecture: { type: "boolean", description: "Include architecture recommendations", default: false },
      },
      required: ["idea"],
    },
  },
  {
    name: "idearalph_architecture",
    description: `Generate an architecture and implementation plan for a validated startup idea.

This tool bridges Ralph's idea validation with Spawner's specialized skills for building.

SPAWNER SKILLS THAT GET RECOMMENDED:
- SvelteKit (preferred) for frontend
- Supabase Backend for database/auth
- Tailwind CSS UI for styling
- TypeScript Strict Mode for type safety
- LLM Architect for AI features
- API Designer for backend routes
- Test Architect for testing
- Security Hardening for production

Use this AFTER design phase to get a concrete build plan!`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The validated startup idea" },
        prd: { type: "string", description: "The PRD content (if already generated)" },
        designSpec: { type: "string", description: "The design specification (if already generated)" },
        techPreferences: { type: "string", description: "Tech stack preferences (default: SvelteKit, Supabase)" },
      },
      required: ["idea"],
    },
  },
  {
    name: "idearalph_design",
    description: `Design the UI/UX for a startup idea - ONE question, AI does the rest.

SIMPLE FLOW:
1. Ask ONE question: "What vibe?" (clean/bold/dark/playful)
2. Ralph analyzes PRD to infer target audience
3. Ralph finds design references that audience loves
4. Generates design tokens + first page spec
5. Hands off to Spawner (SvelteKit + Tailwind) to build

WHAT IT OUTPUTS:
- Color palette (based on vibe + audience)
- Typography scale
- Key component specs
- Landing page wireframe description
- Reference sites for inspiration

Use this AFTER PRD generation, BEFORE architecture!`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The startup idea to design for" },
        prd: { type: "string", description: "The PRD content (provides target audience context)" },
        vibe: {
          type: "string",
          enum: ["clean", "bold", "dark", "playful"],
          description: "Design vibe: clean (minimal), bold (colorful), dark (techy), playful (fun)"
        },
        referenceUrl: { type: "string", description: "Optional: URL of a site the user loves" },
      },
      required: ["idea"],
    },
  },
  {
    name: "idearalph_checklist",
    description: `Generate a YC-level startup checklist - creates Tasks.md and Checklist.md.

Creates TWO files:
1. **Tasks.md** — Actionable tasks organized by category with owner, status, priority
2. **Checklist.md** — Comprehensive pre-launch and post-launch checklist

CHECKLIST COVERS (YC-level unicorn standards):
- Security hardening (OWASP, secrets, auth, rate limiting)
- Legal compliance (ToS, Privacy Policy, GDPR, cookie consent)
- Analytics setup (product analytics, error tracking, session replay)
- Content strategy (SEO, social proof, case studies)
- Growth mechanics (viral loops, referral, onboarding)
- Infrastructure (monitoring, backups, CDN, CI/CD)
- Launch tactics (Product Hunt, HN, social, press)

SPAWNER SKILLS AUTO-LOADED:
- YC Playbook — startup launch patterns
- Growth Strategy — user acquisition, retention
- Product Strategy — roadmap, metrics, prioritization

Use this AFTER architecture is complete, when preparing for production!`,
    inputSchema: {
      type: "object" as const,
      properties: {
        idea: { type: "string", description: "The startup idea to create checklist for" },
        projectName: { type: "string", description: "The project name for file naming" },
        prd: { type: "string", description: "The PRD content (optional)" },
        designSpec: { type: "string", description: "The design specification (optional)" },
        currentStatus: { type: "string", description: "Current build status or what's been completed" },
      },
      required: ["idea", "projectName"],
    },
  },
];

// =============================================================================
// HANDLER FUNCTIONS - Return prompts for Claude to process
// =============================================================================

/**
 * Generate a resume prompt for session continuity after Claude Code restart
 */
export function generateResumePrompt(projectName: string, context: {
  prdPath?: string;
  archPath?: string;
  techStack?: string;
  nextStep?: string;
  currentPhase?: string;
}): string {
  const lines = [
    `Continue building ${projectName} from the ${context.currentPhase || 'architecture'} phase.`,
    '',
    'Context:',
  ];

  if (context.prdPath) lines.push(`- PRD saved at: ${context.prdPath}`);
  if (context.archPath) lines.push(`- Architecture saved at: ${context.archPath}`);
  if (context.techStack) lines.push(`- Tech stack: ${context.techStack}`);
  if (context.nextStep) lines.push(`- Next step: ${context.nextStep}`);

  lines.push('');
  lines.push('Please load the appropriate Spawner skill and continue from where we left off.');

  return lines.join('\n');
}

/**
 * Instructions for Claude when presenting next steps
 */
export const NEXT_STEP_PROTOCOL = `
## NEXT STEP PROTOCOL FOR CLAUDE

When presenting next steps to the user, ALWAYS:

1. **Summarize what was accomplished** (1-2 sentences)
2. **State what's saved** (files, context)
3. **Present options as a question** (not commands to run)
4. **Include a "pause" option** (user might not want to continue right now)

Example good ending:
"Your idea scored 9.6/10 and the PRD is ready!

**What would you like to do next?**
1. Generate the architecture plan
2. Save the PRD to a file first
3. Pause here for now

Just let me know!"

Example BAD ending (never do this):
"Run idearalph_architecture to generate the implementation plan."
`;

function formatPMFCriteria(): string {
  return Object.entries(PMF_DIMENSIONS)
    .map(([key, dim]) => {
      const scoring = Object.entries(dim.scoring)
        .map(([range, desc]) => `  ${range}: ${desc}`)
        .join("\n");
      return `### ${dim.name} (${key})\n${dim.description}\n${scoring}`;
    })
    .join("\n\n");
}

export function handleBrainstorm(args: z.infer<typeof brainstormSchema>): string {
  const constraints = args.constraints ? `\n\nConstraints/preferences: ${args.constraints}` : "";

  return `# Ralph's Brainstorming Session

${RALPH_PERSONA}

## Your Task

Generate a compelling startup idea in the **${args.topic}** space.${constraints}

## Instructions

1. **Generate the Idea**: Create a specific, actionable startup concept (not vague or generic)
2. **Score It**: Rate the idea on all 10 PMF dimensions (1-10 scale)
3. **Provide Feedback**: Give specific suggestions to improve weak areas
4. **Suggest Improvements**: Offer a refined version addressing the feedback

## PMF Scoring Criteria

${formatPMFCriteria()}

## Required Output Format

Respond with:

### The Idea
[Describe the startup idea in 2-3 paragraphs - what it does, who it's for, how it works]

### PMF Scores
| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Problem Clarity | X/10 | [Why this score] |
| Market Size | X/10 | [Why this score] |
| Uniqueness | X/10 | [Why this score] |
| Feasibility | X/10 | [Why this score] |
| Monetization | X/10 | [Why this score] |
| Timing | X/10 | [Why this score] |
| Virality | X/10 | [Why this score] |
| Defensibility | X/10 | [Why this score] |
| Team Fit | X/10 | [Why this score] |
| Ralph Factor | X/10 | [Why this score] |

**Average Score: X.X/10**

### Feedback
[Specific, actionable suggestions to improve the weakest dimensions]

### Improved Version
[The idea refined based on the feedback above]

---

${NEXT_STEP_PROTOCOL}

**Scoring-Based Suggestions:**
- Score < 7.0: Recommend refining with idearalph_refine (mode: target)
- Score 7.0-8.9: Recommend a quick polish with idearalph_refine (mode: single)
- Score 9.0+: Recommend generating PRD with idearalph_prd

**Remember**: ASK the user what they want to do, don't just tell them to run a command!`;
}

export function handleValidate(args: z.infer<typeof validateSchema>): string {
  return `# Ralph's Idea Validation

${RALPH_PERSONA}

## Your Task

Validate and score this startup idea on 10 PMF dimensions.

## The Idea to Validate

${args.idea}

## PMF Scoring Criteria

${formatPMFCriteria()}

## Required Output Format

### PMF Scores
| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Problem Clarity | X/10 | [Why this score] |
| Market Size | X/10 | [Why this score] |
| Uniqueness | X/10 | [Why this score] |
| Feasibility | X/10 | [Why this score] |
| Monetization | X/10 | [Why this score] |
| Timing | X/10 | [Why this score] |
| Virality | X/10 | [Why this score] |
| Defensibility | X/10 | [Why this score] |
| Team Fit | X/10 | [Why this score] |
| Ralph Factor | X/10 | [Why this score] |

**Average Score: X.X/10**

### Strengths
[What's working well - be specific]

### Weaknesses
[What needs improvement - be specific and actionable]

### Suggestions
[Concrete ways to improve the lowest-scoring dimensions]

---

${NEXT_STEP_PROTOCOL}

**Scoring-Based Suggestions:**
- Score < 7.0: Recommend refining with idearalph_refine (mode: target)
- Score 7.0-8.9: Recommend a quick polish with idearalph_refine (mode: single)
- Score 9.0+: Recommend generating PRD with idearalph_prd

**Remember**: ASK the user what they want to do, don't just tell them to run a command!`;
}

export function handleRefine(args: z.infer<typeof refineSchema>): string {
  const mode = args.mode || "target";
  const targetScore = args.targetScore || 9.5;
  const maxIterations = args.maxIterations || 10;

  const modeInstructions = {
    single: "Perform exactly ONE iteration of scoring and improvement.",
    target: `Keep iterating until the average score reaches ${targetScore}/10 or you hit ${maxIterations} iterations.`,
    max: `Run all ${maxIterations} iterations to maximize the score.`,
  };

  return `# Ralph Loop: Iterative Idea Refinement

${RALPH_PERSONA}

## Your Task

Run the Ralph Loop on this idea using **${mode}** mode.

${modeInstructions[mode]}

## Starting Idea

${args.idea}

## PMF Scoring Criteria

${formatPMFCriteria()}

## The Ralph Loop Process

For each iteration:
1. **Score** the current idea on all 10 dimensions
2. **Identify** the 2-3 lowest-scoring dimensions
3. **Generate** specific improvements targeting those weaknesses
4. **Rewrite** the idea incorporating the improvements
5. **Repeat** until target reached or max iterations

## Required Output Format

### Iteration 1
**Idea**: [Current version of the idea]

**Scores**: [Quick scores: PC:X MS:X UN:X FE:X MO:X TI:X VI:X DE:X TF:X RF:X = Avg: X.X]

**Weakest Areas**: [Which dimensions need work]

**Improvements**: [Specific changes to make]

---

### Iteration 2
[Continue same format...]

---

### Final Result

**Final Idea**: [The polished idea after all iterations]

**Final Scores**:
| Dimension | Score |
|-----------|-------|
| Problem Clarity | X/10 |
| Market Size | X/10 |
| Uniqueness | X/10 |
| Feasibility | X/10 |
| Monetization | X/10 |
| Timing | X/10 |
| Virality | X/10 |
| Defensibility | X/10 |
| Team Fit | X/10 |
| Ralph Factor | X/10 |

**Final Average: X.X/10**

**Iterations**: X | **Mode**: ${mode} | **Target**: ${targetScore}

### Evolution Summary
[Brief description of how the idea evolved through iterations]

---

${NEXT_STEP_PROTOCOL}

**After refinement, suggest based on final score:**
- Score 9.0-9.4: Recommend napkin or science-fair PRD
- Score 9.5+: Recommend genius-level PRD (they've earned it!)

**Remember**: Celebrate the improvement! Then ASK what they want to do next.`;
}

export function handlePRD(args: z.infer<typeof prdSchema>): string {
  const level = args.level || "napkin";
  const scoresSection = args.scores
    ? `\n## Pre-validated PMF Scores\n${Object.entries(args.scores).map(([k, v]) => `- ${k}: ${v}/10`).join("\n")}`
    : "\n## Note\nNo pre-existing scores provided. Include a brief PMF assessment in the PRD.";

  const levelTemplates = {
    napkin: `Write a quick 1-page PRD sketch. Include:
- **Problem** (2-3 sentences)
- **Solution** (2-3 sentences)
- **Target Users** (bullet points)
- **Key Features** (3-5 bullets, prioritized)
- **Success Metrics** (3 bullets)
- **Risks** (2-3 bullets)
- **Next Steps** (3 bullets)

Keep it brief and punchy - this is a napkin sketch!`,

    "science-fair": `Write a detailed PRD. Include:

1. **Executive Summary** (1 paragraph)
2. **Problem Statement**
   - Pain points with evidence
   - Current solutions and gaps
   - Why now?
3. **Target Users**
   - Primary persona (demographics, behaviors, needs)
   - User journey map
4. **Solution Overview**
   - Core value proposition
   - Key differentiators
5. **Feature Requirements**
   - MVP features (prioritized P0/P1/P2)
   - Phase 2 features
   - Nice-to-haves
6. **User Stories** (7-10 key stories with acceptance criteria)
7. **Technical Considerations**
   - Recommended stack
   - Key integrations
   - Scalability notes
8. **Success Metrics & KPIs**
   - North star metric
   - Leading indicators
9. **Go-to-Market Strategy**
   - Launch approach
   - Initial channels
10. **Risks & Mitigations**
11. **Open Questions**`,

    genius: `Write a comprehensive, investor-ready PRD. Include ALL sections with depth:

1. **EXECUTIVE SUMMARY**

2. **PROBLEM STATEMENT**
   - Detailed pain point analysis with quantified impact
   - Market research evidence
   - Competitive landscape matrix

3. **TARGET MARKET**
   - TAM/SAM/SOM analysis with methodology
   - Primary & secondary personas (detailed)
   - Jobs-to-be-done framework

4. **SOLUTION**
   - Product vision (1-year, 3-year)
   - Core value proposition
   - Unique differentiators
   - Competitive moat strategy

5. **DETAILED FEATURE SPEC**
   - MVP scope with detailed acceptance criteria
   - Feature prioritization (MoSCoW method)
   - User stories with story points (15-20 stories)
   - Wireframe descriptions for key flows

6. **TECHNICAL ARCHITECTURE**
   - System overview diagram description
   - Tech stack recommendations with rationale
   - Data model overview
   - Scalability considerations
   - Security requirements
   - Third-party integrations

7. **BUSINESS MODEL**
   - Revenue streams
   - Pricing strategy with tiers
   - Unit economics (CAC, LTV, margins)

8. **GO-TO-MARKET**
   - Launch strategy (soft launch → public)
   - Marketing channels prioritized
   - Growth loops and virality hooks
   - Partnership opportunities

9. **SUCCESS METRICS**
   - North star metric
   - OKRs for first 6 months
   - Dashboard metrics

10. **RISKS & MITIGATIONS**
    - Technical risks
    - Market risks
    - Execution risks
    - Each with mitigation strategy

11. **RESOURCE REQUIREMENTS**
    - Team needs by phase
    - Key hires

12. **TIMELINE & MILESTONES**
    - Phase breakdown
    - Key milestones

13. **APPENDIX**
    - Competitive analysis detail
    - Research references`,
  };

  let output = `# PRD Generation: ${level.charAt(0).toUpperCase() + level.slice(1)} Level

## Your Task

Generate a ${level}-level PRD for this startup idea.

## The Idea

${args.idea}
${scoresSection}

## PRD Template

${levelTemplates[level]}

---

Write the PRD now, following the template above.`;

  if (args.includeArchitecture) {
    output += `

---

## Architecture Section (Requested)

After the PRD, include a section on implementation:

### Recommended Tech Stack
- Frontend framework
- Backend/database
- Authentication
- Deployment

### Spawner Skills to Use
Recommend specific Spawner skills for building (e.g., SvelteKit, Supabase Backend, TypeScript Strict Mode).

### Implementation Phases
- Phase 1: Foundation (what to build first)
- Phase 2: Core features
- Phase 3: Polish & launch`;
  }

  // Add next step protocol
  output += `

---

${NEXT_STEP_PROTOCOL}

**After PRD generation:**
- Offer to save the PRD to a file (docs/[PROJECT]_PRD.md)
- Suggest idearalph_architecture for implementation planning
- Give option to pause and come back later

**Remember**: The PRD is a big milestone! Celebrate it, then ask what's next.`;

  return output;
}

export function handleArchitecture(args: z.infer<typeof architectureSchema>): string {
  const techPrefs = args.techPreferences || "SvelteKit, Supabase, TailwindCSS";
  const prdContext = args.prd ? `\n## PRD Context\n${args.prd.slice(0, 2000)}...\n` : "";
  const designContext = (args as any).designSpec ? `\n## Design Spec\n${(args as any).designSpec.slice(0, 2000)}...\n` : "";

  return `# Architecture & Implementation Plan

## Your Task

Create a detailed architecture and implementation plan for this startup idea.

## The Idea

${args.idea}
${prdContext}
${designContext}

## Tech Preferences

${techPrefs}

## IMPORTANT: Framework Selection

**DEFAULT TO SVELTEKIT** unless the user explicitly requests React/Next.js.

Why SvelteKit over Next.js:
- Simpler mental model (no useEffect/useState complexity)
- Better performance out of the box
- Less boilerplate
- Svelte 5 runes are incredibly intuitive
- Form actions and load functions are elegant
- Smaller bundle sizes

**Only recommend Next.js if:**
- User explicitly requests React
- Project requires React-specific libraries with no Svelte alternatives
- Team has existing React expertise they want to leverage

## Required Output

### 1. Recommended Tech Stack

Based on the idea and preferences, recommend:
- **Frontend**: SvelteKit (default) - [reasoning if different]
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (Postgres + Auth + Storage)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Other**: [Any additional services needed]

### 2. System Architecture

Describe the high-level architecture:
- Key components and how they interact
- Data flow
- External integrations

### 3. Data Model

Outline the core database schema:
- Key entities/tables
- Relationships
- Important fields

### 4. Spawner Skills for Building

Recommend specific Spawner skills to invoke for each phase:

| Phase | Spawner Skill | What It Provides |
|-------|---------------|------------------|
| Setup | [skill] | [benefit] |
| Database | [skill] | [benefit] |
| Auth | [skill] | [benefit] |
| UI | [skill] | [benefit] |
| API | [skill] | [benefit] |
| Testing | [skill] | [benefit] |
| Security | [skill] | [benefit] |
| Deploy | [skill] | [benefit] |

### 5. Implementation Phases

**Phase 1: Foundation**
- [ ] Task 1
- [ ] Task 2
- [ ] ...

**Phase 2: Core Features**
- [ ] Task 1
- [ ] Task 2
- [ ] ...

**Phase 3: Polish & Launch**
- [ ] Task 1
- [ ] Task 2
- [ ] ...

### 6. Key Technical Decisions

Document important decisions:
- Decision 1: [What and why]
- Decision 2: [What and why]

### 7. Getting Started

Provide the first commands to run:
\`\`\`bash
# Commands to initialize the project
\`\`\`

---

## 🎯 HANDOFF INSTRUCTIONS FOR CLAUDE

After presenting the architecture, you MUST follow this handoff protocol:

### Step 1: Save the Work
Tell the user their work is saved and offer to write files:
- "Your DevPal idea has been fully documented!"
- Offer to save PRD and Architecture to docs/ folder

### Step 2: Check for Spawner
Check if you have access to Spawner MCP tools by looking for these in your available tools:
- \`mcp__spawner__spawner_load\`
- \`mcp__spawner__spawner_skills\`
- \`mcp__spawner__spawner_orchestrate\`

### Step 3: Present Options Based on Availability

**IF SPAWNER IS AVAILABLE:**
Ask the user:
"Ready to start building? I can load the [first skill] to begin.

**Options:**
1. **Start building** - I'll load the Supabase Backend skill and we'll set up the database
2. **Save docs first** - I'll save the PRD and architecture to files, then we build
3. **Just save docs** - Save everything and stop here for now"

**IF SPAWNER IS NOT AVAILABLE:**
"To use specialized build skills, you'll need Spawner MCP.

**Here's the deal:**
🆓 **It's completely FREE** - 450+ specialized skills at no cost
⚡ **Takes less than 1 minute** to install
📋 **I'll give you a resume prompt** - copy-paste it after restart and we continue exactly where we left off
🚀 **Way better output** - specialized skills for Supabase, SvelteKit, TypeScript, Auth, and more

Your PRD and architecture are safe - I can save them to files before you install.

**What would you like to do?**
1. **Install Spawner** (recommended) - I'll add it for you, save your docs, and give you a resume prompt. You just restart and paste.
2. **Continue without** - I can still help build, just without the specialized skills
3. **Save and pause** - Save everything now, come back whenever you're ready"

### Step 4: If User Chooses to Install Spawner

**DO IT FOR THEM** - Don't make them figure out MCP settings!

**Claude should:**

1. **Save their work first** (PRD.md, ARCHITECTURE.md to docs/)

2. **Ask permission to add Spawner**:
   "Want me to add Spawner to your Claude Code? I'll handle the config - you just need to restart after."

3. **If yes, add Spawner to their MCP settings**:
   - Find their settings file (usually ~/.claude/settings.json or similar)
   - Read current settings
   - Add the Spawner MCP config
   - Write it back
   - Confirm it's done

4. **Tell them what to do next** (just TWO simple steps):
   "Done! Spawner is configured. Now just:

   **Step 1**: Restart Claude Code
   - Mac: Cmd+Shift+P → 'Developer: Reload Window'
   - Windows: Ctrl+Shift+P → 'Developer: Reload Window'

   **Step 2**: Paste this to continue where we left off:"

5. **Provide the resume prompt** (ready to copy):
\`\`\`
Continue building [PROJECT NAME] - I just installed Spawner!

Saved files:
- docs/[PROJECT]_PRD.md
- docs/[PROJECT]_ARCHITECTURE.md

Load the supabase-backend skill and let's build the database.
Tech stack: [STACK]
\`\`\`

6. **End warmly**: "See you in 30 seconds! 🚀"

**KEY PRINCIPLE**: The user should only need to do TWO things:
1. Restart (one keyboard shortcut)
2. Paste the prompt (one copy-paste)

Everything else, Claude handles.

### Step 5: End with a Question
ALWAYS end by asking the user what they want to do, don't just dump instructions.

---

**IMPORTANT**: Never just say "run this command". Always ASK what the user wants to do next.`;
}

export function handleDesign(args: z.infer<typeof designSchema>): string {
  const vibe = args.vibe || null;
  const prdContext = args.prd ? `\n## PRD Context (for audience inference)\n${args.prd.slice(0, 3000)}...\n` : "";
  const referenceContext = args.referenceUrl ? `\n## User-Provided Reference\nThe user loves the design of: ${args.referenceUrl}\n` : "";

  // If no vibe provided, ask for it
  if (!vibe) {
    return `# Design Phase: Quick Vibe Check

${RALPH_PERSONA}

## Your Task

Before designing the UI, ask the user ONE simple question about their design preference.

## The Idea
${args.idea}
${prdContext}

## ASK THIS QUESTION

Present this to the user in a friendly, casual way:

---

**Quick vibe check before we design:**

What feeling should your product give off?

1. **Clean & Minimal** — Less is more. Think Linear, Notion, Vercel
2. **Bold & Colorful** — Make a statement. Think Stripe, Figma, Framer
3. **Dark & Techy** — Developer-focused. Think GitHub, Supabase, Warp
4. **Playful & Fun** — Approachable energy. Think Duolingo, Slack, Headspace

Or just drop a link to any site you love the look of!

---

**IMPORTANT**: Wait for the user's answer. Once they respond, call idearalph_design again with the vibe parameter set.

Do NOT proceed with design until you have their vibe preference.`;
  }

  // Vibe is provided - now generate the design
  return `# Design Generation: ${vibe.charAt(0).toUpperCase() + vibe.slice(1)} Vibe

${RALPH_PERSONA}

## 🎯 FIRST: Load Spawner Skills

**BEFORE generating the design, you MUST load these Spawner skills for world-class output:**

\`\`\`
// Load in this order:
1. spawner_skills({ action: "get", name: "UX Design" })         // User flows, IA, wireframes
2. spawner_skills({ action: "get", name: "UI Design" })         // Visual hierarchy, components, tokens
3. spawner_skills({ action: "get", name: "Tailwind CSS UI" })   // Implementation patterns
4. spawner_skills({ action: "get", name: "Copywriting" })       // Headlines, CTAs, microcopy
5. spawner_skills({ action: "get", name: "Landing Page Design" }) // Conversion patterns, CRO
\`\`\`

**Why these skills matter:**
- **UX Design**: Ensures user flows make sense, information architecture is solid
- **UI Design**: Provides 8pt grid, type scales, color contrast rules, component states
- **Tailwind CSS UI**: Ensures the design tokens translate perfectly to code
- **Copywriting**: Headlines that convert, CTAs that compel, microcopy that guides
- **Landing Page Design**: Conversion-focused layout, trust signals, CRO patterns

Load them ALL now, then proceed with design generation.

---

## Your Task

Generate a complete design specification for the landing page based on:
- **Vibe**: ${vibe}
- **Idea context**: Analyze to determine target audience
- **Auto-discover references**: Find sites that resonate with this audience
- **Spawner skills loaded**: Apply patterns from UX Design, UI Design, Tailwind CSS UI

## The Idea
${args.idea}
${prdContext}
${referenceContext}

## STEP 1: Infer Target Audience from PRD/Idea

Analyze the idea and any PRD context to determine:
- Who is the primary user? (developers, businesses, consumers, creators, specific profession)
- What industry/domain is this in?
- What's their likely tech-savviness?
- What do they value? (efficiency, trust, delight, simplicity)

State your inference clearly:
> "Based on the idea targeting [audience type] in [industry], who value [qualities]..."

## STEP 2: Find Reference Sites This Audience Loves

Based on the inferred audience + selected vibe (${vibe}), identify 3-5 specific websites that:
1. This target audience already knows and trusts
2. Match the ${vibe} aesthetic
3. Are relevant to the product domain

Format:
### Design Inspiration
| Site | Why This Audience Loves It | What to Borrow |
|------|---------------------------|----------------|
| [site.com] | [reason] | [specific element] |

**Be specific to THIS project** - don't just list generic "good design" sites.

## STEP 3: Generate Design Tokens (Using UI Design Skill Patterns)

**Apply the UI Design skill's 8-Point Grid System and Type Scale Hierarchy patterns.**

Based on vibe (${vibe}) and references, create:

### Color Palette
\`\`\`
// Follow UI Design skill's Accessible Color Contrast pattern (4.5:1 minimum)
Primary: #XXXXXX (main brand color - ensure AA contrast)
Secondary: #XXXXXX (accent)
Background: #XXXXXX (page bg)
Surface: #XXXXXX (card bg)
Text Primary: #XXXXXX (headings - must pass 4.5:1 on background)
Text Secondary: #XXXXXX (body - must pass 4.5:1 on background)
Border: #XXXXXX (subtle dividers - 3:1 minimum)
Success: #XXXXXX
Error: #XXXXXX
\`\`\`

### Typography (UI Design Skill Type Scale)
\`\`\`
Font Family: [Recommended Google Font or system font]
Scale (1.25 ratio per UI Design skill):
- Hero: 48px / 52px line-height (700 weight)
- H1: 40px / 44px (600 weight)
- H2: 32px / 36px (600 weight)
- H3: 24px / 28px (600 weight)
- Body Large: 18px / 28px (400 weight)
- Body: 16px / 24px (400 weight)
- Small: 14px / 20px (400 weight)
- Label: 12px / 16px (500 weight)
\`\`\`

### Spacing (8pt Grid - UI Design Skill Pattern)
\`\`\`
// All spacing must be multiples of 8px for visual rhythm
xs: 4px   (0.5 unit - tight internal padding)
sm: 8px   (1 unit - default internal spacing)
md: 16px  (2 units - between related elements)
lg: 24px  (3 units - between component groups)
xl: 32px  (4 units - section padding)
2xl: 48px (6 units - large section spacing)
3xl: 64px (8 units - major layout divisions)
\`\`\`

## STEP 4: Landing Page Wireframe (Using UX + Copywriting + Landing Page Design Skills)

**Apply patterns from:**
- UX Design: Zero-State Design, Progressive Disclosure, Cognitive Load Reduction
- Copywriting: Clear value props, action-oriented CTAs, benefit-focused headlines
- Landing Page Design: Conversion patterns, trust signals, CRO best practices

### Hero Section (Above the fold - most critical)
- **Headline**: [Apply Copywriting skill - clear value prop, benefit-focused, 6-12 words]
  - Formula: "[Achieve X] without [Pain Y]" or "The [category] that [key differentiator]"
- **Subheadline**: [Supporting text - expand on headline, reduce cognitive load]
- **Primary CTA**: [Action-oriented verb + benefit - e.g., "Start Free Trial" not "Submit"]
- **Visual**: [Screenshot, demo, illustration, or video - shows product in action]
- **Trust signal**: [Logos, user count, testimonial snippet, or key stat]

### Section 2: Problem/Solution (Landing Page Design pattern: Problem-Agitate-Solve)
- **Hook**: [Acknowledge the pain point your audience feels]
- **Agitate**: [Why existing solutions fail them]
- **Solve**: [How your product uniquely solves it]
- **Visual**: [Before/after, comparison, or feature highlight]

### Section 3: Features/Benefits (Show, don't tell)
- **Format**: [3-4 key benefits with icons or visuals]
- **Copy pattern**: [Benefit headline → Supporting detail → Visual proof]
- **UX Pattern**: Progressive Disclosure - most important first

### Section 4: Social Proof (Landing Page Design pattern: Trust Stack)
- **Testimonials**: [1-3 quotes with names, photos, titles]
- **Logos**: [Companies or publications if applicable]
- **Stats**: [User count, satisfaction rate, time saved]

### Section 5: CTA Repeat (Catch scrollers)
- **Headline**: [Reframe value prop differently]
- **CTA**: [Same as hero - consistency]
- **Risk reducer**: ["Free trial", "No credit card", "Cancel anytime"]

### Footer
- Links: [Essential only - Pricing, About, Privacy, Terms]
- **Social proof micro**: [© 2024, "Trusted by X users"]

## STEP 5: Key Components (Using UI Design Skill Component State Mapping)

**Apply the UI Design skill's Component State Mapping pattern - every component needs ALL states designed.**

| Component | States (ALL required) | Specs |
|-----------|----------------------|-------|
| Button (primary) | default, hover, focus (2px outline), active, disabled (40% opacity), loading | Height: 40px or 48px, border-radius, padding |
| Button (secondary) | default, hover, focus, active, disabled | Same height as primary |
| Navigation | default, mobile hamburger, sticky on scroll | Height: 64px, z-index |
| Card | default, hover (subtle shadow lift) | Padding: 24px, border-radius |
| Input | empty, filled, focus, error (red border + message), success, disabled | Height: 40px or 48px |
| [Other components as needed] | [ALL states] | |

**Remember**: No component is complete without all states designed (per UI Design skill).

## STEP 6: Tailwind Config (Using Tailwind CSS UI Skill Patterns)

**Apply the Tailwind CSS UI skill's Design Token System pattern.**

Provide a Tailwind config extension for the design tokens:

\`\`\`javascript
// tailwind.config.js extend
// Following Tailwind CSS UI skill patterns for consistent theming
{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#XXXXXX',
          hover: '#XXXXXX',    // Slightly darker for hover
          active: '#XXXXXX',   // Even darker for active
        },
        secondary: '#XXXXXX',
        background: '#XXXXXX',
        surface: '#XXXXXX',
        border: '#XXXXXX',
      },
      fontFamily: {
        sans: ['Font Name', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // 8pt grid (already default in Tailwind, but explicit)
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      borderRadius: {
        'button': '8px',   // Consistent button radius
        'card': '12px',    // Card radius
        'input': '8px',    // Input radius
      },
    },
  },
}
\`\`\`

---

## OUTPUT FORMAT

After generating all the above, summarize:

### Design Summary for [Project Name]

**Target Audience**: [inferred from PRD/idea]
**Vibe**: ${vibe}
**Inspiration**: [top 2-3 reference sites specific to this audience]
**Skills Applied**: UX Design, UI Design, Tailwind CSS UI

**Ready to build?** This design uses SvelteKit + Tailwind CSS.

---

## 🚀 HANDOFF TO BUILD PHASE

After presenting the design, offer to proceed with building:

**If Spawner is available**, say:
"Design spec is ready! Now let's build it.

**What would you like to do?**
1. **Build the landing page** — I'll load the SvelteKit skill and start coding
2. **Tweak the design** — Adjust colors, typography, or layout first
3. **Save design spec** — Save to docs/[PROJECT]_DESIGN.md, then continue
4. **Pause** — Save everything and come back later"

**If user chooses to build**, load these skills in order:
1. \`spawner_load({ skill_id: "sveltekit" })\` — For page structure
2. \`spawner_load({ skill_id: "tailwind-ui" })\` — For styling
3. Start with the Hero section, get feedback, iterate

---

${NEXT_STEP_PROTOCOL}

**Remember**:
- The design phase produces ONE page spec
- Build it, show it, get feedback, iterate
- Additional pages come through iteration after the first build
- Always use the loaded Spawner skills' patterns for world-class output`;
}

export function handleChecklist(args: z.infer<typeof checklistSchema>): string {
  const projectName = args.projectName;
  const prdContext = args.prd ? `\n## PRD Summary\n${args.prd.slice(0, 1500)}...\n` : "";
  const designContext = args.designSpec ? `\n## Design Summary\n${args.designSpec.slice(0, 1000)}...\n` : "";
  const statusContext = args.currentStatus ? `\n## Current Build Status\n${args.currentStatus}\n` : "";

  return `# Checklist Generation: ${projectName}

${RALPH_PERSONA}

## 🎯 SKILL-DRIVEN CHECKLIST SYSTEM

**This checklist is NOT generic.** Each category maps to a specific Spawner skill that MUST be loaded when working on that section.

### Skill Mapping Table

| Category | Spawner Skill | Load Command |
|----------|---------------|--------------|
| 🔒 Security | \`security-hardening\` | \`spawner_load({ skill_id: "security-hardening" })\` |
| 📜 Legal/GDPR | \`gdpr-privacy\` | \`spawner_load({ skill_id: "gdpr-privacy" })\` |
| 🏗️ Infrastructure | \`disaster-recovery\` | \`spawner_load({ skill_id: "disaster-recovery" })\` |
| 🚀 Deployment | \`vercel-deployment\` | \`spawner_skills({ action: "search", query: "Vercel" })\` |
| 🧪 Testing | \`integration-testing\` | \`spawner_load({ skill_id: "integration-testing" })\` |
| ♿ Accessibility | \`accessibility-audit\` | \`spawner_load({ skill_id: "accessibility-audit" })\` |
| 📊 Analytics | \`performance-profiling\` | \`spawner_load({ skill_id: "performance-profiling" })\` |
| 🔍 SEO | \`seo-optimization\` | \`spawner_skills({ action: "search", query: "SEO" })\` |
| 📈 Growth | \`growth-strategy\` | \`spawner_skills({ action: "search", query: "Growth" })\` |
| 🎯 Product | \`product-strategy\` | \`spawner_skills({ action: "search", query: "Product Strategy" })\` |
| ✍️ Copywriting | \`copywriting\` | \`spawner_skills({ action: "search", query: "Copywriting" })\` |
| 🔐 Auth | \`authentication-oauth\` | \`spawner_load({ skill_id: "authentication-oauth" })\` |
| 💾 Database | \`supabase-backend\` | \`spawner_load({ skill_id: "supabase-backend" })\` |
| ⚡ Caching | \`caching-strategies\` | \`spawner_load({ skill_id: "caching-strategies" })\` |
| 🔄 CI/CD | \`monorepo-management\` | \`spawner_load({ skill_id: "monorepo-management" })\` |

---

## 🚨 CRITICAL: How to Execute This Checklist

**When the user wants to work on ANY checklist category:**

1. **LOAD THE SKILL FIRST** — Before doing ANY work on a category, load its mapped skill
2. **FOLLOW SKILL PATTERNS** — Use the skill's patterns, not generic advice
3. **CHECK SKILL'S SHARP EDGES** — Every skill has gotchas to avoid
4. **HANDOFF IF NEEDED** — Skills know when to delegate to other skills

**Example workflow:**
\`\`\`
User: "Let's work on the security checklist"

Claude:
1. spawner_load({ skill_id: "security-hardening" })  // LOAD FIRST
2. Read the skill's patterns and anti-patterns
3. Apply skill-specific checks to the codebase
4. Use skill's detection commands to find issues
5. Fix issues using skill's recommended patterns
\`\`\`

**NEVER give generic security advice when the security-hardening skill exists.**

---

## Your Task

Generate TWO files for **${projectName}** with skill mappings embedded:
1. **Tasks.md** — Tasks with skill references for each category
2. **Checklist.md** — Checklist with skill invocation instructions

## The Idea
${args.idea}
${prdContext}
${designContext}
${statusContext}

---

# FILE 1: Tasks.md Template

\`\`\`markdown
# ${projectName} - Tasks

> Generated by IdeaRalph • Skill-Driven Execution
> Last Updated: [DATE]

## How to Use This File

Each category has a **Spawner Skill** assigned. When working on tasks:
1. Load the skill FIRST
2. Follow the skill's patterns
3. Mark tasks complete only after skill-validated implementation

---

## 🔴 P0 - Critical (Must Complete)

### 🔒 Security
> **SKILL**: \`spawner_load({ skill_id: "security-hardening" })\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Enable HTTPS everywhere | ⬜ | ⬜ |
| Add rate limiting to auth endpoints (100 req/15min) | ⬜ | ⬜ |
| Enable Supabase RLS on ALL tables | ⬜ | ⬜ |
| Audit environment variables (no secrets in repo) | ⬜ | ⬜ |
| Set up CSP headers | ⬜ | ⬜ |
| Remove console.logs with sensitive data | ⬜ | ⬜ |
| Run \`npm audit\` and fix vulnerabilities | ⬜ | ⬜ |

### 📜 Legal & Compliance
> **SKILL**: \`spawner_load({ skill_id: "gdpr-privacy" })\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Write Terms of Service | ⬜ | ⬜ |
| Write Privacy Policy (GDPR-compliant) | ⬜ | ⬜ |
| Add cookie consent banner | ⬜ | ⬜ |
| Implement data export capability (GDPR Art. 20) | ⬜ | ⬜ |
| Implement account deletion flow (GDPR Art. 17) | ⬜ | ⬜ |

### 🏗️ Infrastructure
> **SKILLS**: \`disaster-recovery\`, \`vercel-deployment\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Set up production database (Supabase Pro) | ⬜ | ⬜ |
| Configure automated backups | ⬜ | ⬜ |
| Set up error monitoring (Sentry) | ⬜ | ⬜ |
| Set up uptime monitoring | ⬜ | ⬜ |
| Configure CI/CD pipeline | ⬜ | ⬜ |
| Document rollback procedure | ⬜ | ⬜ |

---

## 🟡 P1 - Important (Should Complete)

### 🧪 Testing
> **SKILL**: \`spawner_load({ skill_id: "integration-testing" })\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| E2E tests for critical user flows | ⬜ | ⬜ |
| Unit tests for business logic | ⬜ | ⬜ |
| API integration tests | ⬜ | ⬜ |
| Test error states and edge cases | ⬜ | ⬜ |

### ♿ Accessibility
> **SKILL**: \`spawner_load({ skill_id: "accessibility-audit" })\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Keyboard navigation works | ⬜ | ⬜ |
| Screen reader tested | ⬜ | ⬜ |
| Color contrast passes (4.5:1) | ⬜ | ⬜ |
| Alt text on all images | ⬜ | ⬜ |
| ARIA labels where needed | ⬜ | ⬜ |

### 📊 Performance & Analytics
> **SKILL**: \`spawner_load({ skill_id: "performance-profiling" })\`

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Lighthouse score > 90 | ⬜ | ⬜ |
| Set up product analytics (PostHog) | ⬜ | ⬜ |
| Configure conversion funnel tracking | ⬜ | ⬜ |
| Add session replay | ⬜ | ⬜ |
| Define metrics dashboard | ⬜ | ⬜ |

### 🔍 SEO & Content
> **SKILL**: Search for \`SEO\` skill

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Meta titles/descriptions on all pages | ⬜ | ⬜ |
| Open Graph images (1200x630) | ⬜ | ⬜ |
| sitemap.xml generated | ⬜ | ⬜ |
| robots.txt configured | ⬜ | ⬜ |
| Structured data (JSON-LD) | ⬜ | ⬜ |

---

## 🟢 P2 - Nice to Have

### 📈 Growth Mechanics
> **SKILL**: Search for \`Growth Strategy\` skill

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Referral program | ⬜ | ⬜ |
| Social sharing buttons | ⬜ | ⬜ |
| Email onboarding sequence | ⬜ | ⬜ |
| Viral loop mechanism | ⬜ | ⬜ |

### 📢 Launch Marketing
> **SKILL**: Search for \`Copywriting\` skill

| Task | Status | Skill-Validated |
|------|--------|-----------------|
| Product Hunt listing copy | ⬜ | ⬜ |
| Hacker News Show HN post | ⬜ | ⬜ |
| Twitter launch thread | ⬜ | ⬜ |
| Demo video (60-90 sec) | ⬜ | ⬜ |
| Press kit (logos, screenshots) | ⬜ | ⬜ |

---

## Execution Log

| Date | Category | Skill Loaded | Tasks Completed | Notes |
|------|----------|--------------|-----------------|-------|
| | | | | |
\`\`\`

---

## Blocked / Waiting
| Task | Blocker | Waiting On |
|------|---------|------------|
| | | |

---

## Completed ✅
| Task | Completed Date | Notes |
|------|----------------|-------|
| | | |
\`\`\`

---

# FILE 2: Checklist.md Template

\`\`\`markdown
# ${projectName} - Checklist

> Skill-Driven Execution • YC-Level Standards
> Generated by IdeaRalph

## How This Checklist Works

**Each section has a Spawner skill.** Before working on any section:
1. Load the skill
2. Follow its patterns
3. Use its detection commands
4. Check its sharp edges

---

## 🔴 P0 - Must Complete Before Launch

### 🔒 Security
> **LOAD FIRST**: \`spawner_load({ skill_id: "security-hardening" })\`

- [ ] HTTPS everywhere, no mixed content
- [ ] Rate limiting on auth (100 req/15min)
- [ ] RLS enabled on ALL Supabase tables
- [ ] Secure cookie flags (HttpOnly, Secure, SameSite)
- [ ] CSP headers configured
- [ ] Environment variables secured (not in repo)
- [ ] \`npm audit\` passed, no critical vulnerabilities
- [ ] No secrets in git history (\`gitleaks\`)
- [ ] Admin endpoints protected

### 📜 Legal & GDPR
> **LOAD FIRST**: \`spawner_load({ skill_id: "gdpr-privacy" })\`

- [ ] Terms of Service published
- [ ] Privacy Policy published (GDPR-compliant)
- [ ] Cookie consent banner (with preferences)
- [ ] Data export capability (GDPR Art. 20)
- [ ] Account deletion flow (GDPR Art. 17)
- [ ] DPA with data processors

### 🏗️ Infrastructure
> **LOAD FIRST**: \`spawner_load({ skill_id: "disaster-recovery" })\`

- [ ] Production database provisioned
- [ ] Automated backups configured + tested
- [ ] Rollback procedure documented
- [ ] Error monitoring (Sentry) configured
- [ ] Uptime monitoring active
- [ ] CI/CD pipeline working

---

## 🟡 P1 - Should Complete

### 🧪 Testing
> **LOAD FIRST**: \`spawner_load({ skill_id: "integration-testing" })\`

- [ ] E2E tests for: Signup → Onboarding → First Value
- [ ] E2E tests for: Login → Core Action → Logout
- [ ] API integration tests
- [ ] Error state coverage

### ♿ Accessibility
> **LOAD FIRST**: \`spawner_load({ skill_id: "accessibility-audit" })\`

- [ ] Keyboard navigation works
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color contrast passes 4.5:1
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] axe-core audit passes

### 📊 Performance
> **LOAD FIRST**: \`spawner_load({ skill_id: "performance-profiling" })\`

- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Images optimized (WebP, lazy loading)
- [ ] Code splitting enabled

### 🔍 SEO
> **LOAD FIRST**: Search for \`SEO\` skill

- [ ] Meta titles/descriptions on all pages
- [ ] Open Graph images (1200x630)
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] Structured data (JSON-LD)
- [ ] Canonical URLs set

---

## 🟢 P2 - Nice to Have

### 📈 Growth
> **LOAD FIRST**: Search for \`Growth Strategy\` skill

- [ ] Referral program
- [ ] Social sharing buttons
- [ ] Email onboarding sequence
- [ ] Viral loop mechanism

### 📢 Launch Marketing
> **LOAD FIRST**: Search for \`Copywriting\` skill

- [ ] Product Hunt listing ready
- [ ] Hacker News Show HN draft
- [ ] Twitter launch thread
- [ ] Demo video (60-90 sec)

---

## 🚀 Launch Day

### Pre-Launch (Morning)
- [ ] Final production deploy
- [ ] Smoke test critical flows
- [ ] Monitoring dashboards open
- [ ] Team comms channel ready

### Launch Sequence
- [ ] Product Hunt ship
- [ ] Hacker News post
- [ ] Twitter thread
- [ ] Email to waitlist

### Post-Launch (24h)
- [ ] Monitor error rates
- [ ] Respond to ALL feedback
- [ ] Fix critical bugs immediately
- [ ] Thank early users publicly

---

## 📊 Metrics

### North Star
> [Your ONE key PMF metric]

### Track These
| Metric | Target | Actual |
|--------|--------|--------|
| DAU | | |
| Signup → Activation | | |
| Day 1 Retention | | |
| Day 7 Retention | | |
\`\`\`

---

## 🎯 SKILL-DRIVEN EXECUTION PROTOCOL

**CRITICAL: When the user wants to work on a checklist category:**

### The Protocol

\`\`\`
User: "Let's tackle the security checklist"

Claude MUST:
1. spawner_load({ skill_id: "security-hardening" })  ← LOAD SKILL FIRST
2. Say: "Loading Security Hardening skill..."
3. Read and apply the skill's:
   - Patterns (what to do)
   - Anti-patterns (what NOT to do)
   - Sharp edges (gotchas)
   - Detection commands (find issues)
4. Work through each checklist item using skill guidance
5. Mark items complete only when skill-validated
\`\`\`

### Skill Routing

| User says... | Load this skill |
|--------------|-----------------|
| "security" | \`security-hardening\` |
| "legal", "GDPR", "privacy" | \`gdpr-privacy\` |
| "infrastructure", "deploy" | \`disaster-recovery\` or \`vercel-deployment\` |
| "testing", "tests" | \`integration-testing\` |
| "accessibility", "a11y" | \`accessibility-audit\` |
| "performance", "speed" | \`performance-profiling\` |
| "SEO" | search for SEO skill |
| "growth", "viral" | search for Growth skill |
| "copy", "marketing" | search for Copywriting skill |
| "auth", "login" | \`authentication-oauth\` |
| "database", "RLS" | \`supabase-backend\` |

### After Generating Checklist

Present to user:

"Your skill-driven checklist is ready!

**Two files:**
- \`docs/${projectName}_Tasks.md\` — Tasks with skill assignments
- \`docs/${projectName}_Checklist.md\` — Checklist with skill protocols

**Each category maps to a Spawner skill.** When you want to work on any section, I'll load the right skill first so you get specialized patterns, not generic advice.

**What would you like to do?**
1. **Save both files** — Write to docs/
2. **Start with Security (P0)** — I'll load security-hardening skill
3. **Start with Legal (P0)** — I'll load gdpr-privacy skill
4. **Pause** — Save for later"

---

${NEXT_STEP_PROTOCOL}

**Key principle**: NEVER work on a checklist category without loading its skill first. Generic LLM advice is NOT acceptable when specialized skills exist.`;
}
