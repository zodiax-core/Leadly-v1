import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    campaignId: v.optional(v.id("campaigns")),
    status: v.optional(v.string()),
    search: v.optional(v.string()),
    dateRange: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    let leads = await ctx.db
      .query("leads")
      .withIndex("by_discoveredBy", (q) => q.eq("discoveredBy", userId))
      .order("desc")
      .collect();

    if (args.campaignId) {
      leads = leads.filter((l) => l.campaignId === args.campaignId);
    }
    if (args.status) {
      leads = leads.filter((l) => l.status === args.status);
    }
    if (args.dateRange) {
      const now = Date.now();
      const ranges: Record<string, number> = {
        today: now - 86400000,
        week: now - 604800000,
        month: now - 2592000000,
        quarter: now - 7776000000,
        year: now - 31536000000,
      };
      const cutoff = ranges[args.dateRange];
      if (cutoff) {
        leads = leads.filter((l) => l._creationTime >= cutoff);
      }
    }
    if (args.search) {
      const q = args.search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.company.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.website?.toLowerCase().includes(q) ||
          l.location?.toLowerCase().includes(q),
      );
    }

    return leads;
  },
});

export const get = query({
  args: { leadId: v.id("leads") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.get(args.leadId);
  },
});

export const create = mutation({
  args: {
    company: v.string(),
    website: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.string(),
    industry: v.optional(v.string()),
    location: v.optional(v.string()),
    campaignId: v.optional(v.id("campaigns")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("leads", {
      company: args.company,
      website: args.website,
      email: args.email,
      phone: args.phone,
      source: args.source,
      industry: args.industry,
      location: args.location,
      campaignId: args.campaignId,
      status: "new",
      score: 0,
      discoveredBy: userId,
    });
  },
});

export const updateStatus = mutation({
  args: {
    leadId: v.id("leads"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("unqualified"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(args.leadId, { status: args.status });
  },
});

export const updateScore = mutation({
  args: {
    leadId: v.id("leads"),
    score: v.number(),
    enrichedData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(args.leadId, {
      score: args.score,
      enrichedData: args.enrichedData,
    });
  },
});

export const remove = mutation({
  args: { leadId: v.id("leads") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.delete(args.leadId);
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const leads = await ctx.db
      .query("leads")
      .withIndex("by_discoveredBy", (q) => q.eq("discoveredBy", userId))
      .collect();

    return {
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      qualified: leads.filter((l) => l.status === "qualified").length,
      converted: leads.filter((l) => l.status === "converted").length,
    };
  },
});
