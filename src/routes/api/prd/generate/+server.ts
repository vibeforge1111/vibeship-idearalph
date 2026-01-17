// POST /api/prd/generate - Generate a PRD for an idea
// Supports three levels: basic, detailed, enterprise
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generatePRD, generatePRDByLevel } from '$lib/ralph/engine';
import type { PRDLevel } from '$lib/ralph/types';
import { z } from 'zod';

const PRDSchema = z.object({
  idea: z.string().min(1),
  name: z.string().min(1),
  pmfScores: z.object({
    marketSize: z.number().min(0).max(10),
    problemSeverity: z.number().min(0).max(10),
    solutionFit: z.number().min(0).max(10),
    competition: z.number().min(0).max(10),
    vibeCodeable: z.number().min(0).max(10),
    virality: z.number().min(0).max(10)
  }),
  // PRD level: napkin (quick), science-fair (detailed), genius (with JSON)
  level: z.enum(['napkin', 'science-fair', 'genius']).optional().default('napkin'),
  // Optional: iteration history for context
  iterations: z.array(z.object({
    content: z.string(),
    dopeLevel: z.number(),
    feedback: z.string()
  })).optional()
});

export const POST: RequestHandler = async ({ request, locals }) => {
  // Check authentication
  if (!locals.session || !locals.user) {
    throw error(401, 'Authentication required');
  }

  try {
    const body = await request.json();
    const { idea, name, pmfScores, level, iterations } = PRDSchema.parse(body);

    // Generate PRD based on requested level
    const result = await generatePRDByLevel(
      idea,
      name,
      pmfScores,
      level as PRDLevel,
      iterations
    );

    return json({
      success: true,
      data: {
        markdown: result.markdown,
        json: result.json, // Only present for 'enterprise' level
        name,
        level,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Error generating PRD:', err);

    if (err instanceof z.ZodError) {
      throw error(400, 'Invalid request data');
    }

    throw error(500, 'Failed to generate PRD');
  }
};
