#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  tools,
  brainstormSchema,
  validateSchema,
  refineSchema,
  prdSchema,
  architectureSchema,
  designSchema,
  checklistSchema,
  planSchema,
  executeSchema,
  statusSchema,
  handleBrainstorm,
  handleValidate,
  handleRefine,
  handlePRD,
  handleArchitecture,
  handleDesign,
  handleChecklist,
  handlePlan,
  handleExecute,
  handleStatus,
} from "./tools.js";

// Create the MCP server
const server = new Server(
  {
    name: "idearalph-mcp",
    version: "2.4.0", // PRP execution pipeline
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls - now returns prompts for Claude to process directly
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case "idearalph_brainstorm": {
        const parsed = brainstormSchema.parse(args);
        result = handleBrainstorm(parsed);
        break;
      }
      case "idearalph_validate": {
        const parsed = validateSchema.parse(args);
        result = handleValidate(parsed);
        break;
      }
      case "idearalph_refine": {
        const parsed = refineSchema.parse(args);
        result = handleRefine(parsed);
        break;
      }
      case "idearalph_prd": {
        const parsed = prdSchema.parse(args);
        result = handlePRD(parsed);
        break;
      }
      case "idearalph_architecture": {
        const parsed = architectureSchema.parse(args);
        result = handleArchitecture(parsed);
        break;
      }
      case "idearalph_design": {
        const parsed = designSchema.parse(args);
        result = handleDesign(parsed);
        break;
      }
      case "idearalph_checklist": {
        const parsed = checklistSchema.parse(args);
        result = handleChecklist(parsed);
        break;
      }
      case "idearalph_plan": {
        const parsed = planSchema.parse(args);
        result = handlePlan(parsed);
        break;
      }
      case "idearalph_execute": {
        const parsed = executeSchema.parse(args);
        result = handleExecute(parsed);
        break;
      }
      case "idearalph_status": {
        const parsed = statusSchema.parse(args);
        result = handleStatus(parsed);
        break;
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("IdeaRalph MCP Server v2.4 running on stdio (no API key required!)");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
