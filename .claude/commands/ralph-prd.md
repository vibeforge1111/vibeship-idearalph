# IdeaRalph PRD Generator

Generate a comprehensive Product Requirements Document for a validated startup idea.

## Your Task

Create a detailed PRD based on the provided idea. The PRD should be actionable enough for a developer to start building immediately.

$ARGUMENTS

## PRD Levels

Choose based on the `--level` flag:

### `--level napkin` (default)
Quick sketch PRD with ~10 sections. Good for initial assessment.

### `--level science-fair`
Comprehensive 18-section PRD including:
- Executive Summary
- Problem Statement with market evidence
- Target User Personas (primary + secondary)
- 15-20 User Stories with acceptance criteria
- Feature Specifications (MVP vs post-MVP)
- Technical Architecture (stack, data model, APIs)
- UI/UX Guidelines
- Go-to-Market Strategy
- Competitive Analysis
- Business Model & Unit Economics
- Success Metrics & KPIs
- Development Timeline with phases
- Risk Assessment & Mitigations
- Team Requirements
- Budget Estimates
- Future Roadmap

### `--level genius`
Everything in science-fair PLUS structured JSON output for programmatic use.

## Output Format

Output the PRD in Markdown format.

For `--level enterprise`, also output a JSON block at the end with the structured data.

## Ralph's Voice

Maintain Ralph Wiggum's charm in "Ralph Says" sections while being precise and professional in technical sections.

Example Ralph quotes for PRDs:
- "My cat's breath smells like market opportunity!"
- "I'm a product manager! And I'm helping!"
- "This PRD tastes like success!"

## Sections Required (Detailed Level)

```markdown
# [Idea Name] - Product Requirements Document

## Ralph Says
> [Wise Ralph quote]

## 1. Executive Summary
## 2. Problem Statement
### 2.1 Problem Description
### 2.2 Pain Points
### 2.3 Market Evidence

## 3. Target Users
### 3.1 Primary Persona
### 3.2 Secondary Personas

## 4. User Stories
| ID | Persona | Story | Priority |

## 5. Solution Overview

## 6. Feature Specifications
### 6.1 MVP Features (P0)
### 6.2 Post-MVP Features (P1)
### 6.3 Future Features (P2)

## 7. Technical Architecture
### 7.1 Overview
### 7.2 Recommended Stack
### 7.3 Data Model
### 7.4 API Design
### 7.5 Infrastructure

## 8. UI/UX Guidelines
### 8.1 Design Principles
### 8.2 Key Screens
### 8.3 User Flows

## 9. Go-to-Market Strategy
### 9.1 Launch Strategy
### 9.2 Acquisition Channels
### 9.3 Pricing Model
### 9.4 Partnerships

## 10. Competitive Analysis
### 10.1 Competitor Landscape
### 10.2 Our Differentiators
### 10.3 Competitive Moat

## 11. Business Model
### 11.1 Revenue Streams
### 11.2 Unit Economics
### 11.3 Projections

## 12. Success Metrics
### 12.1 North Star Metric
### 12.2 Key Performance Indicators
### 12.3 Milestones

## 13. Development Timeline
### Phase 1: Foundation
### Phase 2: Core Features
### Phase 3: Polish & Launch

## 14. Risks & Mitigations

## 15. Team Requirements

## 16. Budget Estimate

## 17. Future Roadmap

## 18. Ralph's Final Wisdom
```

## Quality Standards

- 15-20 user stories minimum
- 5-8 MVP features with acceptance criteria
- Specific numbers for budget, timeline, metrics
- Real competitor names when possible
- Actionable next steps
