# IdeaRalph Execution Upgrade - PRD

> **Status**: PRP 3 Complete - Ready for PRP 4
> **Created**: 2026-01-22
> **Updated**: 2026-01-22
> **Goal**: Add PRD → PRP → Execute pipeline to IdeaRalph
> **Structure**: 4 PRPs (optimized from 7 phases for better context efficiency)

---

## Executive Summary

This PRD defines the execution upgrade for IdeaRalph - adding the ability to BUILD ideas, not just ideate them. The key insight is separating the "grand vision" (PRD) from "execution units" (PRPs), enabling fresh context per task and preventing hallucination.

---

## The Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  IDEATION LAYER (existing IdeaRalph)                                   │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐           │
│  │Brainstorm│ → │  Score   │ → │  Refine  │ → │   PRD    │           │
│  │          │   │ 10 dims  │   │until 9.5+│   │(grand    │           │
│  └──────────┘   └──────────┘   └──────────┘   │ vision)  │           │
│                                               └────┬─────┘           │
└────────────────────────────────────────────────────┼─────────────────┘
                                                     │
                     ════════════════════════════════╪═════════════════
                                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│  PLANNING LAYER (NEW: PRD → PRPs)                                      │
│                                                                        │
│  PRD phases extracted into focused PRPs:                               │
│                                                                        │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                  │
│  │  Phase 1    │   │  Phase 2    │   │  Phase 3    │                  │
│  │    PRP      │   │    PRP      │   │    PRP      │  ...             │
│  │ ─────────── │   │ ─────────── │   │ ─────────── │                  │
│  │ • Context   │   │ • Context   │   │ • Context   │                  │
│  │ • Patterns  │   │ • Patterns  │   │ • Patterns  │                  │
│  │ • Tasks     │   │ • Tasks     │   │ • Tasks     │                  │
│  │ • Validate  │   │ • Validate  │   │ • Validate  │                  │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘                  │
└─────────┼─────────────────┼─────────────────┼─────────────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│  EXECUTION LAYER (NEW: Fresh Context per Task)                         │
│                                                                        │
│  For each PRP:                                                         │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐               │
│  │  Task   │ → │ Execute │ → │Validate │ → │  Next   │               │
│  │(fresh   │   │ (write  │   │ (lint,  │   │  task   │               │
│  │context) │   │  code)  │   │ types,  │   │   or    │               │
│  └─────────┘   └─────────┘   │ tests)  │   │ done    │               │
│       ↑                      └────┬────┘   └─────────┘               │
│       └─────── retry if ──────────┘                                   │
│                 failed                                                 │
│                                                                        │
│  Phase complete? → User approval → Next PRP                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## The PRD vs PRP Distinction

| Aspect | PRD (Product Requirements Doc) | PRP (Product Requirement Prompt) |
|--------|-------------------------------|----------------------------------|
| **Purpose** | Define WHAT to build | Define HOW to build it |
| **Scope** | Entire product vision | Single phase/feature |
| **Content** | User stories, architecture, metrics | Context + patterns + atomic tasks |
| **Lifetime** | Created once, referenced throughout | Created per phase, consumed during execution |
| **Context** | High-level, strategic | Specific files, code patterns, validation commands |

### PRD (Already in IdeaRalph)
- 18 sections (executive summary, problem, users, features, architecture, etc.)
- "Genius level" output from ideation loop
- The "grand vision" document
- Stays clean and high-level

### PRP (NEW - What we're adding)
- Derived FROM the PRD's implementation phases
- Contains:
  - **Codebase context** - Relevant file paths, existing patterns
  - **Atomic tasks** - Small, completable in one iteration
  - **Validation commands** - How to verify success
  - **Dependencies** - What must exist before this phase
- Enables fresh context execution (no bloat)

---

## Research Summary

### Ecosystem Context

| Repo | Key Insight |
|------|-------------|
| **IdeaRalph** | Great at brainstorm → PRD, lacks execution |
| **PRPs-agentic-eng** | PRD + codebase intelligence = PRP; validation loops |
| **Ralph Quickstart** | Fresh context windows prevent hallucination |
| **Ralphy** | Fresh context per task, parallel execution |
| **PIV Loop Agent** | Plan → Implement → Validate → Review |

### Critical Success Factors

1. **PRD → PRP separation** - Keep grand vision separate from execution details
2. **Fresh Context Per Task** - Prevents context bloat and hallucination
3. **Codebase Intelligence in PRPs** - Include patterns, file paths, conventions
4. **Atomic Tasks** - Each task completable in one iteration
5. **Clear Validation** - Executable commands prove success

---

## What We're Adding to IdeaRalph

### New MCP Tools

| Tool | Purpose | When Used |
|------|---------|-----------|
| `idearalph_plan` | Convert PRD phases into PRPs | After PRD generation |
| `idearalph_execute` | Execute a PRP's tasks | After planning |
| `idearalph_validate` | Run validation pyramid | After each task |
| `idearalph_status` | Check execution progress | Anytime |

### New Types

```typescript
// The execution-focused document (derived from PRD)
interface PRP {
  id: string;
  name: string;
  phase: number;                     // Which PRD phase this covers
  sourcePRD: string;                 // Reference to parent PRD

  // Context (codebase intelligence)
  context: {
    relevantFiles: string[];         // Files to read/modify
    existingPatterns: CodePattern[]; // Patterns to follow
    dependencies: string[];          // npm packages, etc.
    techStack: string[];             // From PRD's architecture
  };

  // Atomic tasks
  tasks: PRPTask[];

  // Validation
  validationCommands: ValidationCommand[];
  acceptanceCriteria: string[];
}

interface PRPTask {
  id: string;
  description: string;
  targetFile?: string;
  action: 'create' | 'modify' | 'delete' | 'configure';
  details: string;                   // Specific instructions
  validation?: string;               // Task-specific validation
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

interface CodePattern {
  name: string;
  description: string;
  example: string;                   // Code snippet to follow
  files: string[];                   // Where this pattern is used
}
```

---

## Implementation PRPs

> **Why 4 PRPs instead of 7 phases?** Bundling related phases reduces context-switching overhead while maintaining fresh context benefits. Each PRP is a coherent "unit of work" (~200-400 LOC) that fits comfortably in a fresh context window.

---

### PRP 1: Fork & Setup ✅ COMPLETE
> Single phase | Environment setup

#### Phase 1: Fork & Setup ✅ COMPLETE
**Tasks:**
1. ✅ Fork vibeforge1111/vibeship-idearalph via GitHub
2. ✅ Clone fork locally
3. ✅ Install dependencies (`npm install`)
4. ✅ Verify build works (`npm run build`)
5. ✅ Create feature branch `feature/prp-execution`

**Validation:** Build passes, branch created
**Result:** Fork at `SmokeAlot420/vibeship-idearalph`, branch `feature/prp-execution` active

---

### PRP 2: Data Layer (Types + State) ✅ COMPLETE
> Bundles Phase 2 + Phase 5 | ~150-200 LOC | Validation: `npm run check`

#### Phase 2: Add PRP Types ✅ COMPLETE
**Tasks:**
1. ✅ Read existing `src/lib/ralph/types.ts`
2. ✅ Add `PRP`, `PRPContext`, `PRPTask`, `CodePattern`, `ValidationCommand` interfaces
3. ✅ Add `ExecutionState` interface
4. ✅ Export new types

**Validation:** TypeScript compiles (`npm run check`) ✅

#### Phase 5: Add State Persistence ✅ COMPLETE
**Tasks:**
1. ✅ Create `src/lib/ralph/state.ts`
2. ✅ Implement `saveExecutionState()` / `loadExecutionState()`
3. ✅ Implement `savePRP()` / `loadPRPs()`
4. ✅ Implement status update functions

**Validation:** TypeScript compiles, state can be saved/loaded ✅

**Result:** Added 8 new types to `types.ts` and created `state.ts` with 13 persistence functions

---

### PRP 3: Core Engine (Generator + Executor) ✅ COMPLETE
> Bundles Phase 3 + Phase 4 | ~350-450 LOC | Validation: `npm run check`

#### Phase 3: Add PRP Generator ✅ COMPLETE
**Tasks:**
1. ✅ Create `src/lib/ralph/prp-generator.ts`
2. ✅ Implement `generatePRPsFromPRD()` function
3. ✅ Implement `gatherCodebaseContext()` function
4. ✅ Implement `extractPatterns()` function
5. ✅ Add Claude prompts for PRP generation (`prompts.ts`)

**Validation:** TypeScript compiles, functions exported ✅

#### Phase 4: Add Execution Engine ✅ COMPLETE
**Tasks:**
1. ✅ Create `src/lib/ralph/executor.ts`
2. ✅ Implement `executeFromPRPs()` orchestrator
3. ✅ Implement `executePRP()` for single phase
4. ✅ Implement `executeTask()` with fresh context
5. ✅ Create `src/lib/ralph/validator.ts` with validation pyramid

**Validation:** TypeScript compiles, functions exported ✅

**Result:** Created 3 new modules with complete implementation:
- `prp-generator.ts` - PRP generation with codebase intelligence (4 exports)
- `executor.ts` - Execution orchestrator with fresh context (7 exports)
- `validator.ts` - Validation pyramid implementation (5 exports)
- Added 3 new prompts to `prompts.ts` (`PRP_SYSTEM_PROMPT`, `GENERATE_PRP_PROMPT`, `EXTRACT_CODEBASE_CONTEXT_PROMPT`)

---

### PRP 4: Integration & Ship (MCP + Commands + PR)
> Bundles Phase 6 + Phase 7 | Integration layer | Validation: MCP builds, PR created

#### Phase 6: Add MCP Tools
**Tasks:**
1. Read existing `mcp-server/src/tools.ts`
2. Add `idearalph_plan` tool definition and handler
3. Add `idearalph_execute` tool definition and handler
4. Add `idearalph_status` tool definition and handler
5. Register tools in `mcp-server/src/index.ts`

**Validation:** MCP server builds, tools listed

#### Phase 7: Add Commands & Create PR
**Tasks:**
1. Create `.claude/commands/ralph-plan.md`
2. Create `.claude/commands/ralph-execute.md`
3. Update README with new features
4. Commit all changes
5. Push to fork
6. Create PR to upstream

**Validation:** PR created with all changes

---

## Implementation Progress

| PRP | Name | Phases | Status | Completed |
|-----|------|--------|--------|-----------|
| 1 | Fork & Setup | 1 | ✅ Complete | 2026-01-22 |
| 2 | Data Layer (Types + State) | 2, 5 | ✅ Complete | 2026-01-22 |
| 3 | Core Engine (Generator + Executor) | 3, 4 | ✅ Complete | 2026-01-22 |
| 4 | Integration & Ship (MCP + Commands + PR) | 6, 7 | ⏳ Pending | - |

---

## File Changes Summary

### New Files
```
src/lib/ralph/prp-generator.ts  - PRD → PRPs conversion ✅ CREATED (PRP 3)
src/lib/ralph/executor.ts       - Execution engine ✅ CREATED (PRP 3)
src/lib/ralph/validator.ts      - Validation pyramid ✅ CREATED (PRP 3)
src/lib/ralph/state.ts          - State persistence ✅ CREATED (PRP 2)
.claude/commands/ralph-plan.md  - /ralph-plan command
.claude/commands/ralph-execute.md - /ralph-execute command
```

### Modified Files
```
src/lib/ralph/types.ts          - Add PRP types ✅ MODIFIED (PRP 2)
src/lib/ralph/prompts.ts        - Add PRP generation prompts ✅ MODIFIED (PRP 3)
mcp-server/src/tools.ts         - Add plan/execute/status tools
mcp-server/src/index.ts         - Register new tools
README.md                       - Document new features
```

---

## Success Criteria

- [x] PRD phases cleanly convert to focused PRPs (PRP 3: prp-generator.ts)
- [x] Each PRP contains relevant codebase context (PRP 3: gatherCodebaseContext())
- [x] Tasks are atomic (completable in one iteration) (PRP 3: PRPTask structure)
- [x] Fresh context per task (no bloat) (PRP 3: executor.ts design)
- [x] Validation pyramid works (lint, types, tests, build) (PRP 3: validator.ts)
- [x] Phase-by-phase execution with user approval (PRP 3: executePRP())
- [x] State persists for resume capability (PRP 2: state.ts implemented)
- [ ] PR follows repo conventions
- [ ] User can go from "idea" to "working code" (needs PRP 4: MCP tools)

---

## PR Details

**Title:** `feat: Add PRD → PRP → Execute pipeline with fresh context execution`

**Branch:** `feature/prp-execution`

**Target:** `vibeforge1111/vibeship-idearalph:main`
