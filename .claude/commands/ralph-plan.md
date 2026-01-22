# Ralph Plan: PRD to PRP Conversion

Convert your PRD into executable PRPs (Product Requirement Prompts).

## Your Task

$ARGUMENTS

## What This Does

1. **Reads** your PRD (the "what to build")
2. **Analyzes** your codebase structure
3. **Generates** PRPs (the "how to build it")

Each PRP contains:
- **Context**: Files, patterns, dependencies
- **Tasks**: Atomic, executable steps
- **Validation**: Commands to verify success

## Usage Examples

```
/ralph-plan docs/MyProject_PRD.md
/ralph-plan "paste your PRD content here"
```

## After Planning

Once PRPs are generated:
1. Review them for accuracy
2. Run `/ralph-execute` to start building
3. Track progress with `/ralph-status`

## The Pipeline

```
PRD (what) -> PRPs (how) -> Execute (build) -> Validate (verify)
```
