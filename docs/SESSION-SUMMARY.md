# IdeaRalph Session Summary
*Last Updated: January 17, 2026*

## What We Built

### Core Product
**IdeaRalph** - An AI-powered startup idea generator that uses the Ralph Wiggum plugin for Claude Code to iteratively refine ideas until they score 9.9/10 on a PMF (Product-Market Fit) rubric.

### Key Features Completed

#### 1. Landing Page (`src/routes/+page.svelte`)
- Half-screen video hero with Ralph Wiggum animation
- "Ring the Bell" CTA button
- "Stupid Smart." tagline (two-tone styling)
- "How It Works" section with 3 steps
- "Ideas So Dumb They're Genius" examples section
- Footer with branding

#### 2. Step-by-Step Onboarding Flow
- **Setup**: Welcome screen explaining 3-step process
- **Install**: One-click copy command to install Ralph plugin
  - Clear `/exit` and `claude` restart instructions
- **Run**: Input for idea hint + copy command for `/ralph-loop`
- **Paste**: Textarea to paste JSON result
- **Result**: Full PMF visualization

#### 3. PMF Scoring System (10 Dimensions)
1. Problem Clarity
2. Market Size
3. Uniqueness
4. Feasibility
5. Monetization
6. Timing
7. Virality
8. Defensibility
9. Team Fit
10. Ralph Factor

Target score: **9.9/10** (Genius level)

#### 4. Result Display
- Total score with color coding
- Grid of all 10 dimension scores
- PMF Analysis (Customer, Acquire, Retain, Revenue)
- Ralph quote with iteration count
- Save and Generate PRD buttons

#### 5. LocalStorage Features
- Save ideas with timestamps
- Saved ideas panel/modal
- Load saved ideas back to view
- Delete saved ideas
- Remember plugin installation status

#### 6. PRD Export
- Full PRD generation from validated idea
- Sections: Executive Summary, Problem, Solution, PMF Analysis, Validation Scores, MVP Scope, Success Metrics, Tech Stack, Timeline, Risks, Next Steps
- Copy to clipboard
- Download as .md file

#### 7. Ralph Wiggum Plugin Integration
- Plugin installed at `~/.claude/plugins/cache/anthropic/ralph-wiggum/1.0.0/`
- Commands: `/ralph-loop`, `/cancel-ralph`
- Iterates until 9.9/10 score achieved

### Files Structure

```
vibeship-idearalph/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Main landing page with all steps
│   │   └── +layout.svelte        # Layout with Navbar
│   ├── lib/
│   │   └── components/
│   │       ├── ralph/
│   │       │   ├── HeroVideo.svelte
│   │       │   ├── RalphAvatar.svelte
│   │       │   ├── DopeMeter.svelte
│   │       │   └── ThoughtBubble.svelte
│   │       └── ui/
│   │           └── Navbar.svelte
│   └── app.css                   # Tailwind + custom styles
├── static/
│   ├── videos/ralph-hero.mp4     # Ralph animation video
│   └── images/ralph-logo.png     # Ralph logo image
├── docs/
│   ├── IDEA-ENGINE.md            # Full architecture documentation
│   └── SESSION-SUMMARY.md        # This file
├── prompts/
│   └── ralph-idea-loop.md        # Ready-to-use prompt for Ralph plugin
└── package.json
```

### Design System
- **Colors**: ralph-yellow, chalkboard, playground-green, sky-blue, playground-red, paper
- **Fonts**: Fredoka One (chalk), Patrick Hand (ralph-voice), Inter
- **Components**: btn-crayon, thought-bubble, shadow-crayon

---

## What's Remaining / Future Features

### High Priority
1. [ ] **Test Ralph Plugin End-to-End** - Restart Claude Code and run `/ralph-loop` command
2. [ ] **Deploy to Vercel/Netlify** - Make it publicly accessible
3. [ ] **Error Handling** - Better error messages if plugin not installed or JSON invalid

### Medium Priority
4. [ ] **Share Ideas** - Generate shareable links for ideas
5. [ ] **Idea History Timeline** - Visual timeline of saved ideas
6. [ ] **Export to Notion/Google Docs** - Direct export integrations
7. [ ] **Radar Chart Visualization** - Visual PMF score chart

### Low Priority / Nice to Have
8. [ ] **Dark Mode** - Theme toggle
9. [ ] **Idea Categories/Tags** - Organize saved ideas
10. [ ] **Comparison View** - Compare multiple ideas side by side
11. [ ] **Direct API Integration** - Skip manual copy/paste (requires API costs)

---

## Technical Notes

### Ralph Plugin Location
```
~/.claude/plugins/cache/anthropic/ralph-wiggum/1.0.0/
├── .claude-plugin/plugin.json
├── commands/
│   ├── ralph-loop.md
│   ├── cancel-ralph.md
│   └── help.md
├── hooks/
│   ├── hooks.json
│   └── stop-hook.sh
├── scripts/
└── README.md
```

### Plugin Registry Entry
Added to `~/.claude/plugins/installed_plugins.json`:
```json
"ralph-wiggum@anthropic": [{
  "scope": "user",
  "installPath": "C:\\Users\\USER\\.claude\\plugins\\cache\\anthropic\\ralph-wiggum\\1.0.0",
  "version": "1.0.0",
  "isLocal": true
}]
```

### Key Commands
```bash
# Install plugin (one-liner)
git clone https://github.com/anthropics/claude-code.git ~/cc-temp && cp -r ~/cc-temp/plugins/ralph-wiggum ~/.claude/plugins/ && rm -rf ~/cc-temp

# Restart Claude Code
/exit
claude

# Run idea generation
/ralph-loop "Generate a startup idea. Score on 10 PMF dimensions. Iterate until >= 9.9. Output JSON. <promise>SCORE_ACHIEVED</promise>" --max-iterations 30 --completion-promise "SCORE_ACHIEVED"
```

### LocalStorage Keys
- `idearalph-ideas` - Array of saved ideas
- `idearalph-plugin-installed` - Boolean flag for plugin status

---

## Git History (Recent)
- `dffdd59` - feat: Improve onboarding UX with clear restart instructions
- `bf7bdb7` - style: Simplify plugin install to single copy-paste command
- `306b517` - feat: Redesign onboarding with step-by-step plugin installation guide
- `8f63b8c` - style: Remove redundant CTA section at bottom of page
- `5331d6f` - docs: Add Ralph plugin quick start guide
- `9d270a7` - feat: Add localStorage saving, PRD export, and saved ideas gallery
- `0c43db5` - feat: Add PMF scoring system and visualization to result display
- `de9406a` - docs: Update target score to 9.9/10 for genius-level ideas
- `e10f4b9` - docs: Add Idea Validation Engine documentation and Ralph Loop prompt

---

## Resume Instructions

When resuming this project:

1. **Start dev server**: `cd vibeship-idearalph && npm run dev`
2. **Test Ralph plugin**: Restart Claude Code and run `/ralph-loop` command
3. **Website**: http://localhost:5178/
4. **Key file**: `src/routes/+page.svelte` contains most of the UI logic
5. **Docs**: `docs/IDEA-ENGINE.md` has full architecture

The main thing to test is whether the Ralph plugin works after restart!
