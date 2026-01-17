// Ralph Loop Core Types

export interface PMFScores {
  marketSize: number;       // 0-10: How big is the potential market?
  problemSeverity: number;  // 0-10: How painful is the problem?
  solutionFit: number;      // 0-10: How well does idea solve it?
  competition: number;      // 0-10: How crowded is the space? (lower = more competition)
  vibeCodeable: number;     // 0-10: Can a vibe coder build this?
  virality: number;         // 0-10: Will people share this?
}

export interface RalphIdea {
  id: string;
  name: string;
  rawIdea: string;
  refinedIdea: string | null;
  ralphQuote: string | null;
  status: 'sandbox' | 'validating' | 'refining' | 'completed' | 'archived';
  dopeLevel: number;        // 0-5 scale
  iteration: number;
  maxIterations: number;
  pmfScores: PMFScores | null;
  chaosLevel: number;       // 1-10: How wild should Ralph get?
  context: Record<string, unknown>;
}

export interface RalphIteration {
  id: string;
  ideaId: string;
  iterationNumber: number;
  ideaContent: string;
  dopeLevel: number;
  pmfScores: PMFScores | null;
  ralphFeedback: string | null;
  changesMade: string | null;
  createdAt: string;
}

export interface RalphLoopConfig {
  maxIterations: number;
  dopeThreshold: number;    // Minimum dope level to pass (default: 4)
  chaosLevel: number;       // 1-10 chaos multiplier
  userId: string;
}

export interface RalphResponse {
  idea: string;
  name: string;
  ralphQuote: string;
  dopeLevel: number;
  pmfScores: PMFScores;
  feedback: string;
  shouldContinue: boolean;
}

export interface GenerateIdeaInput {
  prompt?: string;
  chaosLevel?: number;
  context?: Record<string, unknown>;
}

export interface RefineIdeaInput {
  ideaId: string;
  feedback?: string;
  chaosLevel?: number;
}

export interface RalphLoopResult {
  success: boolean;
  idea: RalphIdea;
  iterations: RalphIteration[];
  finalDopeLevel: number;
  totalIterations: number;
}

// Ralph personality constants
export const RALPH_QUOTES = {
  thinking: [
    "My brain is having a thought!",
    "I'm using my thinking cap!",
    "The leprechaun tells me ideas!",
    "It tastes like burning... but in a good way!",
    "My cat's breath smells like cat food and also innovation!"
  ],
  excited: [
    "This idea tastes like purple!",
    "I'm helping with business!",
    "Me fail English? That's unpossible! But this idea is possible!",
    "I bent my wookie... into a startup!",
    "Yay, I'm a entrepreneur!"
  ],
  meh: [
    "This idea makes my eyes rain.",
    "My doctor said I'm not allowed to make that idea.",
    "That's not as fun as paste.",
    "Even my invisible friend thinks this is boring.",
    "The voices say to try again."
  ],
  dope: [
    "When I grow up I want to be a principal... or this startup!",
    "This idea is super Nintendo!",
    "I'm learnding... to be rich!",
    "My worm went in my mouth and then I ate it. But this idea is even better!",
    "That's my sandbox! And it has gold stars!"
  ]
};

// Dope level descriptions
export const DOPE_LEVELS: Record<number, string> = {
  0: "Ralph ate the idea",
  1: "Tastes like burning",
  2: "My cat's breath level",
  3: "Paste-worthy",
  4: "Gold star material",
  5: "SUPER NINTENDO DOPE"
};

// PRD Types
// Napkin = quick sketch, Science Fair = detailed project, Genius = complete with structured JSON
export type PRDLevel = 'napkin' | 'science-fair' | 'genius';

export interface PRDConfig {
  level: PRDLevel;
  includeUserStories: boolean;
  includeTechArchitecture: boolean;
  includeCompetitiveAnalysis: boolean;
  includeFinancials: boolean;
  includeTimeline: boolean;
}

export interface DetailedPRD {
  // Meta
  generatedAt: string;
  level: PRDLevel;
  ideaName: string;

  // Content sections
  executiveSummary: string;
  problemStatement: {
    description: string;
    painPoints: string[];
    marketEvidence: string;
  };
  targetUsers: {
    primaryPersona: UserPersona;
    secondaryPersonas: UserPersona[];
  };
  userStories: UserStory[];
  solutionOverview: string;
  featureSpecs: FeatureSpec[];
  technicalArchitecture: {
    overview: string;
    stack: string[];
    dataModel: string;
    apiDesign: string;
    infrastructure: string;
  };
  uiUxGuidelines: {
    designPrinciples: string[];
    keyScreens: ScreenSpec[];
    userFlows: string[];
  };
  goToMarket: {
    launchStrategy: string;
    acquisitionChannels: string[];
    pricingModel: string;
    partnerships: string[];
  };
  competitiveAnalysis: {
    competitors: Competitor[];
    differentiators: string[];
    moat: string;
  };
  businessModel: {
    revenueStreams: string[];
    unitEconomics: string;
    projections: string;
  };
  successMetrics: {
    northStar: string;
    kpis: KPI[];
    milestones: Milestone[];
  };
  timeline: {
    phases: Phase[];
    totalDuration: string;
  };
  risks: Risk[];
  teamRequirements: TeamRole[];
  budgetEstimate: {
    mvp: string;
    fullProduct: string;
    breakdown: string[];
  };
  futureRoadmap: string[];
  ralphNotes: string;
  markdown: string;
}

export interface UserPersona {
  name: string;
  role: string;
  demographics: string;
  goals: string[];
  frustrations: string[];
  quote: string;
}

export interface UserStory {
  id: string;
  persona: string;
  story: string;
  acceptanceCriteria: string[];
  priority: 'must-have' | 'should-have' | 'nice-to-have';
}

export interface FeatureSpec {
  name: string;
  description: string;
  userStories: string[];
  acceptanceCriteria: string[];
  priority: 'P0' | 'P1' | 'P2';
  complexity: 'low' | 'medium' | 'high';
  mvp: boolean;
}

export interface ScreenSpec {
  name: string;
  purpose: string;
  keyElements: string[];
  interactions: string[];
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
}

export interface KPI {
  name: string;
  target: string;
  timeframe: string;
}

export interface Milestone {
  name: string;
  description: string;
  deliverables: string[];
  targetDate: string;
}

export interface Phase {
  name: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
}

export interface Risk {
  category: 'technical' | 'market' | 'competitive' | 'operational' | 'financial';
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface TeamRole {
  role: string;
  responsibilities: string[];
  skills: string[];
  fullTimeEquivalent: number;
}
