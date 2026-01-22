# Ralph Execute: Run PRPs with Fresh Context

Execute PRPs with the fresh-context-per-task approach.

## Your Task

$ARGUMENTS

## Actions

- **start**: Begin executing a PRP
- **resume**: Continue paused execution
- **pause**: Pause and save state
- **status**: Check progress

## Usage Examples

```
/ralph-execute                    # List and execute PRPs
/ralph-execute prp-1-foundation   # Execute specific PRP
/ralph-execute --resume exec-xyz  # Resume paused execution
```

## Fresh Context Execution

Each task runs with ONLY the context it needs:
- Task description and details
- Target file contents
- Pattern references
- Validation commands

This prevents:
- Context bloat (too much information)
- Hallucination (making things up)
- Cascading errors (one mistake affecting everything)

## Validation Pyramid

After each task:
1. **Lint** - Style and formatting
2. **Types** - TypeScript compilation
3. **Tests** - Unit tests (if applicable)
4. **Build** - Full build verification

## Error Recovery

If a task fails:
1. Execution stops automatically
2. Error is reported with details
3. You can fix and resume
4. State is preserved for continuity
