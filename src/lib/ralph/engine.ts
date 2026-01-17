// Ralph Loop Engine - The Core AI System
// This orchestrates the idea generation and refinement loop

import { askClaude, parseClaudeJSON } from '$lib/server/claude';
import {
  GENERATE_IDEA_PROMPT,
  REFINE_IDEA_PROMPT,
  GENERATE_PRD_PROMPT,
  EVALUATE_IDEA_PROMPT,
  GENERATE_DETAILED_PRD_PROMPT,
  GENERATE_DETAILED_PRD_JSON_PROMPT
} from './prompts';
import type {
  RalphIdea,
  RalphIteration,
  RalphLoopConfig,
  RalphLoopResult,
  RalphResponse,
  PMFScores,
  GenerateIdeaInput,
  RefineIdeaInput,
  PRDLevel,
  PRDConfig,
  DetailedPRD
} from './types';
import { RALPH_QUOTES } from './types';

/**
 * Get a random Ralph quote for a given mood
 */
function getRandomQuote(mood: 'thinking' | 'excited' | 'meh' | 'dope'): string {
  const quotes = RALPH_QUOTES[mood];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Calculate average PMF score
 */
export function calculatePMFAverage(scores: PMFScores): number {
  const values = Object.values(scores);
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Determine if idea should continue refining
 */
function shouldContinueRefining(
  dopeLevel: number,
  iteration: number,
  maxIterations: number,
  threshold: number
): boolean {
  // Stop if we've hit max iterations
  if (iteration >= maxIterations) return false;

  // Stop if we've reached the dope threshold
  if (dopeLevel >= threshold) return false;

  // Continue refining
  return true;
}

/**
 * Generate a new idea from scratch
 */
export async function generateIdea(input: GenerateIdeaInput = {}): Promise<RalphResponse> {
  const { prompt, chaosLevel = 5 } = input;

  const promptText = GENERATE_IDEA_PROMPT(chaosLevel, prompt);

  const response = await askClaude(promptText, {
    temperature: 0.7 + (chaosLevel * 0.03), // Higher chaos = more temperature
    maxTokens: 2048
  });

  const parsed = parseClaudeJSON<RalphResponse & { changesMade?: string }>(response);

  return {
    idea: parsed.idea,
    name: parsed.name,
    ralphQuote: parsed.ralphQuote,
    dopeLevel: Math.min(5, Math.max(0, parsed.dopeLevel)),
    pmfScores: parsed.pmfScores,
    feedback: parsed.feedback,
    shouldContinue: parsed.dopeLevel < 4
  };
}

/**
 * Refine an existing idea
 */
export async function refineIdea(
  currentIdea: string,
  currentDopeLevel: number,
  iteration: number,
  maxIterations: number,
  userFeedback?: string,
  chaosLevel: number = 5
): Promise<RalphResponse & { changesMade: string }> {
  const promptText = REFINE_IDEA_PROMPT(
    currentIdea,
    currentDopeLevel,
    iteration,
    maxIterations,
    userFeedback,
    chaosLevel
  );

  const response = await askClaude(promptText, {
    temperature: 0.6 + (chaosLevel * 0.02),
    maxTokens: 2048
  });

  const parsed = parseClaudeJSON<RalphResponse & { changesMade: string }>(response);

  return {
    idea: parsed.idea,
    name: parsed.name,
    ralphQuote: parsed.ralphQuote,
    dopeLevel: Math.min(5, Math.max(0, parsed.dopeLevel)),
    pmfScores: parsed.pmfScores,
    feedback: parsed.feedback,
    changesMade: parsed.changesMade || 'Various improvements',
    shouldContinue: shouldContinueRefining(
      parsed.dopeLevel,
      iteration + 1,
      maxIterations,
      4
    )
  };
}

/**
 * Evaluate an existing idea without modifying it
 */
export async function evaluateIdea(idea: string): Promise<{
  pmfScores: PMFScores;
  dopeLevel: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  ralphQuote: string;
}> {
  const promptText = EVALUATE_IDEA_PROMPT(idea);

  const response = await askClaude(promptText, {
    temperature: 0.5,
    maxTokens: 1024
  });

  return parseClaudeJSON(response);
}

/**
 * Generate a PRD for a completed idea
 */
export async function generatePRD(
  idea: string,
  name: string,
  pmfScores: PMFScores
): Promise<string> {
  const promptText = GENERATE_PRD_PROMPT(idea, name, pmfScores);

  const response = await askClaude(promptText, {
    temperature: 0.6,
    maxTokens: 4096
  });

  return response;
}

/**
 * Run the complete Ralph Loop
 * Generates an idea and refines it until it reaches dope level 4+
 */
export async function runRalphLoop(
  config: RalphLoopConfig,
  initialPrompt?: string
): Promise<RalphLoopResult> {
  const { maxIterations = 3, dopeThreshold = 4, chaosLevel = 5, userId } = config;

  const iterations: RalphIteration[] = [];

  // Generate initial idea
  const initial = await generateIdea({
    prompt: initialPrompt,
    chaosLevel
  });

  let currentIdea: RalphIdea = {
    id: crypto.randomUUID(),
    name: initial.name,
    rawIdea: initial.idea,
    refinedIdea: null,
    ralphQuote: initial.ralphQuote,
    status: 'sandbox',
    dopeLevel: initial.dopeLevel,
    iteration: 0,
    maxIterations,
    pmfScores: initial.pmfScores,
    chaosLevel,
    context: { userId }
  };

  // Store initial iteration
  iterations.push({
    id: crypto.randomUUID(),
    ideaId: currentIdea.id,
    iterationNumber: 0,
    ideaContent: initial.idea,
    dopeLevel: initial.dopeLevel,
    pmfScores: initial.pmfScores,
    ralphFeedback: initial.feedback,
    changesMade: null,
    createdAt: new Date().toISOString()
  });

  // Refine until we hit threshold or max iterations
  let iterationCount = 0;

  while (
    currentIdea.dopeLevel < dopeThreshold &&
    iterationCount < maxIterations
  ) {
    iterationCount++;
    currentIdea.status = 'refining';
    currentIdea.iteration = iterationCount;

    const refined = await refineIdea(
      currentIdea.refinedIdea || currentIdea.rawIdea,
      currentIdea.dopeLevel,
      iterationCount,
      maxIterations,
      undefined,
      chaosLevel
    );

    // Update idea
    currentIdea.name = refined.name;
    currentIdea.refinedIdea = refined.idea;
    currentIdea.ralphQuote = refined.ralphQuote;
    currentIdea.dopeLevel = refined.dopeLevel;
    currentIdea.pmfScores = refined.pmfScores;

    // Store iteration
    iterations.push({
      id: crypto.randomUUID(),
      ideaId: currentIdea.id,
      iterationNumber: iterationCount,
      ideaContent: refined.idea,
      dopeLevel: refined.dopeLevel,
      pmfScores: refined.pmfScores,
      ralphFeedback: refined.feedback,
      changesMade: refined.changesMade,
      createdAt: new Date().toISOString()
    });

    // Check if we should stop
    if (!refined.shouldContinue) break;
  }

  // Set final status
  currentIdea.status = currentIdea.dopeLevel >= dopeThreshold ? 'completed' : 'sandbox';

  return {
    success: currentIdea.dopeLevel >= dopeThreshold,
    idea: currentIdea,
    iterations,
    finalDopeLevel: currentIdea.dopeLevel,
    totalIterations: iterationCount + 1
  };
}

/**
 * Get a status message based on the loop result
 */
export function getLoopStatusMessage(result: RalphLoopResult): {
  title: string;
  message: string;
  quote: string;
} {
  if (result.success) {
    return {
      title: 'Gold Star Achievement!',
      message: `Your idea achieved dope level ${result.finalDopeLevel} in ${result.totalIterations} iterations!`,
      quote: getRandomQuote('dope')
    };
  }

  if (result.finalDopeLevel >= 3) {
    return {
      title: 'Almost There!',
      message: `Dope level ${result.finalDopeLevel} after ${result.totalIterations} iterations. Keep refining!`,
      quote: getRandomQuote('thinking')
    };
  }

  return {
    title: 'Back to the Sandbox',
    message: `Dope level ${result.finalDopeLevel}. This idea needs more work.`,
    quote: getRandomQuote('meh')
  };
}

// ============================================================================
// DETAILED PRD GENERATION
// ============================================================================

/**
 * Default PRD configuration
 */
export const DEFAULT_PRD_CONFIG: PRDConfig = {
  level: 'science-fair',
  includeUserStories: true,
  includeTechArchitecture: true,
  includeCompetitiveAnalysis: true,
  includeFinancials: true,
  includeTimeline: true
};

/**
 * Generate a detailed PRD in Markdown format
 * This is the full, comprehensive version for serious builders
 */
export async function generateDetailedPRD(
  idea: string,
  name: string,
  pmfScores: PMFScores,
  iterations?: Array<{ content: string; dopeLevel: number; feedback: string }>,
  config: Partial<PRDConfig> = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_PRD_CONFIG, ...config };

  const promptText = GENERATE_DETAILED_PRD_PROMPT(
    idea,
    name,
    pmfScores,
    iterations
  );

  const response = await askClaude(promptText, {
    temperature: 0.7,
    maxTokens: 8192 // Detailed PRDs need more tokens
  });

  return response;
}

/**
 * Generate a detailed PRD as structured JSON
 * Useful for programmatic use, storing in database, or further processing
 */
export async function generateDetailedPRDJson(
  idea: string,
  name: string,
  pmfScores: PMFScores
): Promise<DetailedPRD> {
  const promptText = GENERATE_DETAILED_PRD_JSON_PROMPT(idea, name, pmfScores);

  const response = await askClaude(promptText, {
    temperature: 0.7,
    maxTokens: 8192
  });

  const parsed = parseClaudeJSON<Omit<DetailedPRD, 'generatedAt' | 'level' | 'ideaName' | 'markdown'>>(response);

  // Generate markdown version from the JSON
  const markdown = convertDetailedPRDToMarkdown(parsed, name, pmfScores);

  return {
    generatedAt: new Date().toISOString(),
    level: 'detailed',
    ideaName: name,
    ...parsed,
    markdown
  };
}

/**
 * Convert structured PRD JSON to Markdown
 */
function convertDetailedPRDToMarkdown(
  prd: Omit<DetailedPRD, 'generatedAt' | 'level' | 'ideaName' | 'markdown'>,
  name: string,
  pmfScores: PMFScores
): string {
  const avgScore = Math.round(
    (pmfScores.marketSize + pmfScores.problemSeverity + pmfScores.solutionFit +
     pmfScores.competition + pmfScores.vibeCodeable + pmfScores.virality) / 6
  );

  return `# ${name} - Product Requirements Document

## Ralph Says
> ${prd.ralphNotes}

---

## 1. Executive Summary

${prd.executiveSummary}

---

## 2. Problem Statement

### 2.1 Problem Description
${prd.problemStatement.description}

### 2.2 Pain Points
${prd.problemStatement.painPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

### 2.3 Market Evidence
${prd.problemStatement.marketEvidence}

---

## 3. Target Users

### 3.1 Primary Persona
**Name:** ${prd.targetUsers.primaryPersona.name}
**Role:** ${prd.targetUsers.primaryPersona.role}
**Demographics:** ${prd.targetUsers.primaryPersona.demographics}

**Goals:**
${prd.targetUsers.primaryPersona.goals.map(g => `- ${g}`).join('\n')}

**Frustrations:**
${prd.targetUsers.primaryPersona.frustrations.map(f => `- ${f}`).join('\n')}

**Quote:** "${prd.targetUsers.primaryPersona.quote}"

### 3.2 Secondary Personas
${prd.targetUsers.secondaryPersonas.map(p => `
**${p.name}** - ${p.role}
${p.demographics}
Goals: ${p.goals.join(', ')}
`).join('\n')}

---

## 4. User Stories

| ID | Persona | Story | Priority |
|----|---------|-------|----------|
${prd.userStories.map(s => `| ${s.id} | ${s.persona} | ${s.story} | ${s.priority} |`).join('\n')}

---

## 5. Solution Overview

${prd.solutionOverview}

---

## 6. Feature Specifications

### 6.1 MVP Features (P0)

${prd.featureSpecs.filter(f => f.mvp).map(f => `
#### Feature: ${f.name}
- **Description:** ${f.description}
- **User Stories:** ${f.userStories.join(', ')}
- **Acceptance Criteria:**
${f.acceptanceCriteria.map(c => `  - [ ] ${c}`).join('\n')}
- **Complexity:** ${f.complexity}
`).join('\n')}

### 6.2 Post-MVP Features (P1)

${prd.featureSpecs.filter(f => !f.mvp && f.priority === 'P1').map(f => `- **${f.name}:** ${f.description}`).join('\n')}

### 6.3 Future Features (P2)

${prd.featureSpecs.filter(f => f.priority === 'P2').map(f => `- **${f.name}:** ${f.description}`).join('\n')}

---

## 7. Technical Architecture

### 7.1 Overview
${prd.technicalArchitecture.overview}

### 7.2 Recommended Stack
${prd.technicalArchitecture.stack.map(s => `- ${s}`).join('\n')}

### 7.3 Data Model
${prd.technicalArchitecture.dataModel}

### 7.4 API Design
\`\`\`
${prd.technicalArchitecture.apiDesign}
\`\`\`

### 7.5 Infrastructure
${prd.technicalArchitecture.infrastructure}

---

## 8. UI/UX Guidelines

### 8.1 Design Principles
${prd.uiUxGuidelines.designPrinciples.map(p => `- ${p}`).join('\n')}

### 8.2 Key Screens
| Screen | Purpose | Key Elements |
|--------|---------|--------------|
${prd.uiUxGuidelines.keyScreens.map(s => `| ${s.name} | ${s.purpose} | ${s.keyElements.join(', ')} |`).join('\n')}

### 8.3 User Flows
${prd.uiUxGuidelines.userFlows.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## 9. Go-to-Market Strategy

### 9.1 Launch Strategy
${prd.goToMarket.launchStrategy}

### 9.2 Acquisition Channels
${prd.goToMarket.acquisitionChannels.map(c => `- ${c}`).join('\n')}

### 9.3 Pricing Model
${prd.goToMarket.pricingModel}

### 9.4 Partnerships
${prd.goToMarket.partnerships.map(p => `- ${p}`).join('\n')}

---

## 10. Competitive Analysis

### 10.1 Competitor Landscape
| Competitor | Description | Strengths | Weaknesses | Pricing |
|------------|-------------|-----------|------------|---------|
${prd.competitiveAnalysis.competitors.map(c => `| ${c.name} | ${c.description} | ${c.strengths.join(', ')} | ${c.weaknesses.join(', ')} | ${c.pricing} |`).join('\n')}

### 10.2 Our Differentiators
${prd.competitiveAnalysis.differentiators.map(d => `- ${d}`).join('\n')}

### 10.3 Competitive Moat
${prd.competitiveAnalysis.moat}

---

## 11. Business Model

### 11.1 Revenue Streams
${prd.businessModel.revenueStreams.map(r => `- ${r}`).join('\n')}

### 11.2 Unit Economics
${prd.businessModel.unitEconomics}

### 11.3 Projections
${prd.businessModel.projections}

---

## 12. Success Metrics

### 12.1 North Star Metric
**${prd.successMetrics.northStar}**

### 12.2 Key Performance Indicators
| KPI | Target | Timeframe |
|-----|--------|-----------|
${prd.successMetrics.kpis.map(k => `| ${k.name} | ${k.target} | ${k.timeframe} |`).join('\n')}

### 12.3 Milestones
| Milestone | Description | Target Date |
|-----------|-------------|-------------|
${prd.successMetrics.milestones.map(m => `| ${m.name} | ${m.description} | ${m.targetDate} |`).join('\n')}

---

## 13. Development Timeline

${prd.timeline.phases.map(p => `
### ${p.name} (${p.duration})
**Objectives:**
${p.objectives.map(o => `- ${o}`).join('\n')}

**Deliverables:**
${p.deliverables.map(d => `- ${d}`).join('\n')}
`).join('\n')}

**Total Estimated Timeline:** ${prd.timeline.totalDuration}

---

## 14. Risks & Mitigations

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
${prd.risks.map(r => `| ${r.description} | ${r.category} | ${r.likelihood} | ${r.impact} | ${r.mitigation} |`).join('\n')}

---

## 15. Team Requirements

| Role | Responsibilities | FTE |
|------|-----------------|-----|
${prd.teamRequirements.map(t => `| ${t.role} | ${t.responsibilities.join(', ')} | ${t.fullTimeEquivalent} |`).join('\n')}

---

## 16. Budget Estimate

### MVP Budget
${prd.budgetEstimate.breakdown.map(b => `- ${b}`).join('\n')}
- **Total MVP:** ${prd.budgetEstimate.mvp}

### Full Product (12 months)
- **Total:** ${prd.budgetEstimate.fullProduct}

---

## 17. Future Roadmap

${prd.futureRoadmap.map(f => `- ${f}`).join('\n')}

---

## 18. Ralph's Final Wisdom

> ${prd.ralphNotes}

---

*PRD Generated by IdeaRalph | Dope Level: ${avgScore}/10*
*Generated at: ${new Date().toISOString()}*
`;
}

/**
 * Generate PRD based on level (napkin, science-fair, or genius)
 */
export async function generatePRDByLevel(
  idea: string,
  name: string,
  pmfScores: PMFScores,
  level: PRDLevel = 'napkin',
  iterations?: Array<{ content: string; dopeLevel: number; feedback: string }>
): Promise<{ markdown: string; json?: DetailedPRD }> {
  switch (level) {
    case 'napkin':
      // Quick sketch PRD
      const napkinMarkdown = await generatePRD(idea, name, pmfScores);
      return { markdown: napkinMarkdown };

    case 'science-fair':
      // Full detailed PRD project
      const scienceFairMarkdown = await generateDetailedPRD(idea, name, pmfScores, iterations);
      return { markdown: scienceFairMarkdown };

    case 'genius':
      // Complete PRD with structured JSON
      const geniusPRD = await generateDetailedPRDJson(idea, name, pmfScores);
      return { markdown: geniusPRD.markdown, json: geniusPRD };

    default:
      const defaultMarkdown = await generatePRD(idea, name, pmfScores);
      return { markdown: defaultMarkdown };
  }
}
