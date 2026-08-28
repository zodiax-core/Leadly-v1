import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    prompt: v.string(),
    category: v.optional(v.string()),
    targetLocation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const now = Date.now();
    return await ctx.db.insert("leadGenerationRuns", {
      userId,
      status: "analyzing",
      prompt: args.prompt,
      category: args.category,
      targetLocation: args.targetLocation,
      steps: [
        { id: "analyze", label: "Analyzing your query", status: "pending", detail: undefined },
        { id: "search_web", label: "Searching Google", status: "pending", detail: undefined },
        {
          id: "crawl",
          label: "Crawling websites for contacts",
          status: "pending",
          detail: undefined,
        },
        {
          id: "filter",
          label: "Filtering and validating results",
          status: "pending",
          detail: undefined,
        },
      ],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateStep = mutation({
  args: {
    runId: v.id("leadGenerationRuns"),
    stepId: v.string(),
    status: v.string(),
    detail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const run = await ctx.db.get(args.runId);
    if (!run) throw new Error("Run not found");
    const steps = run.steps.map((s) =>
      s.id === args.stepId ? { ...s, status: args.status, detail: args.detail ?? s.detail } : s,
    );
    await ctx.db.patch(args.runId, { steps, updatedAt: Date.now() });
  },
});

export const updateAnalysis = mutation({
  args: {
    runId: v.id("leadGenerationRuns"),
    analysis: v.any(),
    queries: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      analysis: args.analysis,
      queries: args.queries,
      updatedAt: Date.now(),
    });
  },
});

export const completeRun = mutation({
  args: {
    runId: v.id("leadGenerationRuns"),
    leads: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "complete",
      leads: args.leads,
      total: args.leads.length,
      updatedAt: Date.now(),
    });
  },
});

export const failRun = mutation({
  args: {
    runId: v.id("leadGenerationRuns"),
    error: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "error",
      error: args.error,
      updatedAt: Date.now(),
    });
  },
});

export const get = query({
  args: { runId: v.id("leadGenerationRuns") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.get(args.runId);
  },
});
