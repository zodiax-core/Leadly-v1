import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE_REGEX = /(\+\d{1,3}\s?)?(\(?\d+\)?[\s.-]?)?[\d\s.-]{7,}/g;

function extractEmails(text: string): string[] {
  const matches = text.match(EMAIL_REGEX);
  return [...new Set(matches ?? [])];
}

function extractPhones(text: string): string[] {
  const matches = text.match(PHONE_REGEX);
  return [...new Set(matches ?? [])].filter((p) => p.replace(/\D/g, "").length >= 7);
}

async function searchGoogleSerper(query: string): Promise<any[]> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return [];

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, num: 10 }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.organic ?? []).map((r: any) => ({
    company: r.title,
    website: r.link,
    snippet: r.snippet,
    source: "google_search",
  }));
}

async function searchGoogleMaps(query: string): Promise<any[]> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return [];

  const res = await fetch("https://google.serper.dev/maps", {
    method: "POST",
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, num: 10 }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.places ?? []).map((p: any) => ({
    company: p.title,
    website: p.website,
    phone: p.phoneNumber,
    location: p.address,
    source: "google_maps",
  }));
}

async function crawlWebsite(url: string): Promise<{ emails: string[]; phones: string[] }> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadlyBot/1.0)" },
    });

    if (!res.ok) return { emails: [], phones: [] };

    const text = await res.text();
    return {
      emails: extractEmails(text),
      phones: extractPhones(text),
    };
  } catch {
    return { emails: [], phones: [] };
  }
}

export const search = action({
  args: {
    query: v.string(),
    location: v.optional(v.string()),
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
    depth: v.optional(v.number()),
    campaignId: v.optional(v.id("campaigns")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const fullQuery = args.location ? `${args.query} ${args.location}` : args.query;
    const results: any[] = [];

    if (args.sources.includes("google_search")) {
      const googleResults = await searchGoogleSerper(fullQuery);
      results.push(...googleResults);
    }

    if (args.sources.includes("google_maps")) {
      const mapsResults = await searchGoogleMaps(fullQuery);
      results.push(...mapsResults);
    }

    const depth = args.depth ?? 3;

    if (args.sources.includes("company_websites")) {
      const sites = results.filter((r) => r.website).slice(0, depth);
      for (const site of sites) {
        const { emails, phones } = await crawlWebsite(site.website);
        if (emails.length > 0) site.email = emails[0];
        if (phones.length > 0) site.phone = phones[0];
      }
    }

    const savedLeads: string[] = [];

    for (const r of results.slice(0, 20)) {
      const leadId = await ctx.runMutation(api.leads.create, {
        company: r.company ?? "Unknown",
        website: r.website,
        email: r.email,
        phone: r.phone,
        source: r.source ?? "unknown",
        industry: r.industry,
        location: r.location ?? args.location,
        campaignId: args.campaignId,
      });
      savedLeads.push(leadId);
    }

    return {
      total: results.length,
      saved: savedLeads.length,
      leads: results.slice(0, 20),
    };
  },
});
