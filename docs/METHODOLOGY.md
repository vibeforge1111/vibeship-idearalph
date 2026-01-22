# The PIV Loop Methodology

> Solving AI hallucination through context engineering

---

## The Problem

When AI builds code, it hallucinates. Why?

- **Too much context** → AI gets confused, mixes up files, forgets what it read
- **No validation** → Errors compound, one mistake cascades into many
- **No structure** → Random walks through the codebase, hoping something works

Vibe coders throw their whole codebase at Claude and pray. Sometimes it works. Often it doesn't.

The result? Hours debugging AI-generated code that looked right but was subtly wrong. Functions that call methods that don't exist. Imports from files that were never created. Confident-sounding code that completely misses the point.

---

## The Solution: Context Engineering

**Context engineering** = giving AI exactly what it needs for each task, nothing more.

Instead of "here's everything, figure it out," you give AI:
- The specific task to complete
- Only the files relevant to that task
- Patterns to follow (with real code examples)
- How to verify success

This is the **PIV Loop**:

1. **Plan** - Define what to build (PRD) and how to build it (PRPs)
2. **Implement** - Execute one task at a time with fresh context
3. **Validate** - Verify each task before moving on
4. **Iterate** - If validation fails, fix and retry

---

## Key Concepts

### PRD vs PRP

| | PRD (Product Requirements Doc) | PRP (Product Requirement Prompt) |
|---|-------------------------------|----------------------------------|
| **Purpose** | WHAT to build | HOW to build it |
| **Scope** | Entire product vision | Single phase or feature |
| **Content** | User stories, architecture, metrics | File paths, code patterns, atomic tasks |
| **Lifetime** | Created once, referenced throughout | Created per phase, consumed during execution |

**PRD** = The grand vision. Stays clean and high-level. "Build a fitness app with workout tracking, social features, and gamification."

**PRP** = The execution unit. Gets dirty with implementation details. "Create `src/lib/workout.ts` following the pattern in `src/lib/user.ts`, add these specific functions, run these validation commands."

### Fresh Context Per Task

Each task runs with ONLY what it needs:

- Task description and acceptance criteria
- Target file contents (if modifying existing file)
- Pattern reference files (real code to follow)
- Validation commands

**NOT** the entire codebase. **NOT** the full conversation history. **NOT** unrelated files. Fresh.

This prevents:
- **Context bloat** - AI doesn't get overwhelmed
- **Hallucination** - AI sees real code, not imagined code
- **Cascading errors** - One task's mistake doesn't poison the next

### Validation Pyramid

After each task, validate:

| Level | Check | Catches |
|-------|-------|---------|
| 1 | Lint | Style issues, syntax errors |
| 2 | Type check | Type mismatches, missing imports |
| 3 | Tests | Behavioral bugs, regressions |
| 4 | Build | Integration issues, bundling problems |

Catch errors immediately, not at the end when you've built 500 lines on a broken foundation.

---

## The Flow

```
Idea
  │
  ▼
┌─────────────────────────────────────────────────────┐
│  IDEATION (existing IdeaRalph)                      │
│  Brainstorm → Score → Refine → PRD (grand vision)   │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  PLANNING (PRD → PRPs)                              │
│  Split PRD phases into focused PRPs                 │
│  Each PRP has: context, patterns, tasks, validation │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  EXECUTION (Fresh Context Per Task)                 │
│                                                     │
│  For each PRP:                                      │
│    For each task:                                   │
│      Load fresh context → Execute → Validate        │
│      If fail: fix and retry                         │
│      If pass: next task                             │
│                                                     │
│  Phase complete → User approval → Next PRP          │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
              Working Code
         (not hallucinated code)
```

---

## Why This Works

### 1. Grounded in Reality
Each task sees actual code from your codebase - real patterns, real file structures, real conventions. AI can't hallucinate imports that don't exist when you show it exactly what does exist.

### 2. Validated Incrementally
Errors are caught after each task, not at the end. A type error in task 3 gets fixed before task 4 builds on it. No more "the whole thing is broken and I don't know where to start."

### 3. Focused Context
Small context = clear thinking. When AI only sees what's relevant to the current task, it doesn't get confused by unrelated code or lose track of what it's doing.

### 4. Resumable
State persists between sessions. Stop mid-project, come back tomorrow, pick up exactly where you left off. The system knows which tasks are done and which are next.

---

## From Vibe Coder to Context Engineer

**Vibe coding:**
> "Here's my codebase and a vague idea. Make it work."

**Context engineering:**
> "Here's exactly what you need for this specific task. Here's how to verify you did it right. Here's what success looks like."

The PIV Loop methodology upgrades you from **hoping** AI gets it right to **engineering contexts** where it can't get it wrong.

---

## Quick Start

1. **Generate a PRD** with IdeaRalph (`idearalph_prd`)
2. **Convert to PRPs** (`idearalph_plan`) - splits your vision into executable chunks
3. **Execute with fresh context** (`idearalph_execute`) - one task at a time, validated
4. **Check progress** (`idearalph_status`) - see what's done, what's next

Each tool is designed around the core principle: **give AI exactly what it needs, validate before moving on, never hallucinate.**

---

## Learn More

- [EXECUTION_UPGRADE_PRD.md](./EXECUTION_UPGRADE_PRD.md) - Full implementation details and architecture
- [IdeaRalph README](../README.md) - Tool usage and examples
