import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    onboarded: v.optional(v.boolean()),
    role: v.union(v.literal("free"), v.literal("pro"), v.literal("admin")),
  })
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" }),

  leads: defineTable({
    company: v.string(),
    website: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("unqualified"),
    ),
    score: v.optional(v.number()),
    enrichedData: v.optional(v.any()),
    campaignId: v.optional(v.id("campaigns")),
    discoveredBy: v.id("users"),
    industry: v.optional(v.string()),
    location: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  })
    .index("by_discoveredBy", ["discoveredBy"])
    .index("by_campaign", ["campaignId"])
    .index("by_status", ["status"])
    .searchIndex("search_company", { searchField: "company" }),

  campaigns: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("running"),
      v.literal("paused"),
      v.literal("completed"),
    ),
    createdBy: v.id("users"),
    sources: v.array(
      v.union(
        v.literal("google_search"),
        v.literal("google_maps"),
        v.literal("yelp"),
        v.literal("yellow_pages"),
        v.literal("facebook"),
        v.literal("company_websites"),
        v.literal("bing"),
      ),
    ),
    query: v.string(),
    location: v.optional(v.string()),
    depth: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_status", ["status"]),

  apiKeys: defineTable({
    userId: v.id("users"),
    service: v.string(),
    key: v.string(),
    label: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_service", ["service"]),

  chats: defineTable({
    userId: v.id("users"),
    title: v.string(),
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.optional(v.string()),
        analysis: v.optional(v.any()),
        queries: v.optional(v.array(v.string())),
        leads: v.optional(v.any()),
        error: v.optional(v.string()),
        runId: v.optional(v.id("leadGenerationRuns")),
        createdAt: v.number(),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_updatedAt", ["updatedAt"]),

  leadGenerationRuns: defineTable({
    userId: v.id("users"),
    status: v.string(),
    prompt: v.string(),
    category: v.optional(v.string()),
    targetLocation: v.optional(v.string()),
    steps: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        status: v.string(),
        detail: v.optional(v.string()),
      }),
    ),
    analysis: v.optional(v.any()),
    queries: v.optional(v.array(v.string())),
    leads: v.optional(v.any()),
    total: v.optional(v.number()),
    error: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),
});
