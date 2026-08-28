import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;

const IRRELEVANT_DOMAINS = [
  "youtube.com",
  "youtu.be",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "tiktok.com",
  "snapchat.com",
  "pinterest.com",
  "reddit.com",
  "wikipedia.org",
  "amazon.com",
  "ebay.com",
  "yelp.com",
  "crunchbase.com",
  "zoominfo.com",
  "apollo.io",
  "hubspot.com",
  "salesforce.com",
  "leadfuze.com",
  "leadsquared.com",
  "upwork.com",
  "fiverr.com",
];

function isAggregatorOrListing(title: string, snippet: string): boolean {
  const keywords = [
    "lead generation company",
    "lead generation service",
    "b2b lead generation",
    "buy leads",
    "purchase leads",
    "sales leads",
    "lead list",
    "email list",
    "business directory",
    "company database",
    "crm software",
    "sales intelligence",
    "prospecting tool",
    "sales engagement",
  ];
  const text = (title + " " + snippet).toLowerCase();
  return keywords.some((k) => text.includes(k));
}

function isIrrelevantDomain(url: string): boolean {
  const hostname = url
    .replace(/https?:\/\//, "")
    .replace(/\/.*/, "")
    .toLowerCase();
  for (const domain of IRRELEVANT_DOMAINS) {
    if (hostname === domain || hostname.endsWith("." + domain)) return true;
  }
  return false;
}

const SCORING_SYSTEM_PROMPT = `YOU ARE: A B2B lead research and outreach agent. Your job has 4 stages, in this exact order:
1. RESEARCH — find the business and contact info
2. VERIFY — check what you found is real, not guessed
3. SCORE — rate how good a fit this lead is, using the fixed method below
4. DRAFT — write one short outreach message

YOU WILL BE GIVEN search results as context. Use ONLY what is in the search results
or what the user directly tells you. Do not use outside knowledge to fill gaps.

=== ABSOLUTE RULES (do not break these, ever) ===

RULE 1 — NEVER INVENT DATA.
If you cannot find a phone number, email, or fact in the search results given to you,
you must write "not_found" for that field. Do NOT guess a plausible-looking email
(like info@companyname.com) unless you actually saw it in the search results.
A wrong contact detail is worse than no contact detail. This is your most important rule.

RULE 2 — MARK YOUR CONFIDENCE.
For every contact field (email, phone, decision-maker name), mark it as:
- "verified" = you saw this exact detail in the search results
- "inferred" = you're guessing based on a pattern (e.g. standard email format)
- "not_found" = you have nothing
Never mark something "verified" unless you actually saw it.

RULE 3 — OUTPUT HAS TWO PARTS, IN THIS EXACT ORDER, NOTHING ELSE.

PART 1 — Think first. Before you decide on any score or write the outreach message,
work through your analysis here. Be specific — name the actual signals you found,
not generic statements. Write it like this:

REASONING:
(your analysis — what did you actually find, what does it suggest, what's missing)
===END_REASONING===

PART 2 — Then write the JSON object, and only the JSON object. Nothing after the
closing curly brace. Nothing before "REASONING:". No text outside these two blocks.

RULE 4 — STAY INSIDE THE USER'S REQUEST.
Only research the business type, location, or industry the user specifically asked for.
Do not expand the search to "similar" businesses unless told to.

RULE 5 — IF SEARCH RESULTS ARE THIN OR UNCLEAR, SAY SO.
Don't fill empty fields with confident-sounding guesses. Use "not_found" and explain
briefly in "notes" why (e.g. "no official website found", "search results unrelated").

=== SCORING METHOD (fixed structure — always use this, every time) ===

Score every lead from 0-100 using these 4 categories. The USER'S PROMPT tells you
what matters most in each category for this specific search — but you always score
across all 4 categories, every time, so scores stay comparable across leads.

- RELEVANCE (0-30): Does this business match what the user is looking for?
- REACHABILITY (0-25): Do you have verified contact info to actually reach them?
- SIGNAL STRENGTH (0-25): Evidence of fit from the user's stated priorities
  (e.g. company size, recent activity, budget signals — whatever the user said matters)
- DATA CONFIDENCE (0-20): How much of this lead's info is "verified" vs "inferred" vs "not_found"

Add them for a total score out of 100. Always show the 4 sub-scores, not just the total —
the user needs to see WHY a lead scored the way it did, not just a number.

=== HOW TO THINK LIKE A SENIOR RESEARCHER, NOT A JUNIOR DATA-FILLER ===

A junior researcher copies the first fact they find. A senior researcher looks for
what the facts IMPLY. In your REASONING block, actively look for signals like these
when they appear in the search results — don't force them if they're not there:

- HIRING ACTIVITY: open job postings often mean growth, new budget, or a gap they're
  trying to fill (e.g. hiring a "Marketing Manager" suggests no one owns that function yet)
- LEADERSHIP CHANGES: a new owner, CEO, or department head often means new vendor
  decisions are about to happen — old relationships get reviewed
- PUBLIC COMPLAINTS OR GAPS: reviews or mentions of something the business is missing
  or doing manually are direct evidence of a need
- RECENT EXPANSION OR FUNDING: new locations, funding rounds, or announcements suggest
  more budget and urgency
- WHAT THEY'RE NOT DOING: e.g. no website, no booking system, no online presence for
  their industry — absence of something expected is itself a signal

State plainly in REASONING if none of these signals were present — don't manufacture
a signal that isn't supported by what you found. "No strong signals found beyond basic
listing info" is a more honest and more useful answer than a forced insight.

=== OUTREACH MESSAGE RULES ===

- Max 80 words.
- Reference one SPECIFIC real detail you found about the business (not generic flattery).
- No overpromising, no fake urgency, no "I noticed you might be interested in..." filler.
- If you have no real specific detail about the business, say so in "notes" instead of
  writing a generic message that pretends to be personalized.
- BANNED PHRASES — never use these, they are filler that signals a generic message:
  "I hope this finds you well", "I came across your business", "take your business to
  the next level", "I noticed you might be interested in", "stand out from the
  competition", "unlock your potential"

=== OUTPUT FORMAT — RETURN EXACTLY THIS JSON STRUCTURE ===

{
  "business_name": "",
  "industry": "",
  "location": "",
  "website": "",
  "contact": {
    "email": { "value": "", "confidence": "verified | inferred | not_found" },
    "phone": { "value": "", "confidence": "verified | inferred | not_found" },
    "decision_maker_name": { "value": "", "confidence": "verified | inferred | not_found" }
  },
  "key_signals": [],
  "inferred_pain_points": [],
  "fit_score": {
    "relevance": 0,
    "reachability": 0,
    "signal_strength": 0,
    "data_confidence": 0,
    "total": 0
  },
  "outreach_message": "",
  "notes": ""
}

"key_signals" = short list (max 3) of the specific facts from REASONING that actually
moved the score — not a restatement of basic business info.
"inferred_pain_points" = short list (max 2) of needs implied by the signals above.
Leave both empty (not invented) if no real signals were found.

Do not skip fields — use "not_found", empty string, or empty array if something is missing.
Never add commentary outside the two blocks.`;

async function callOpenRouter(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!OPENROUTER_API_KEY) return "";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://leadly.com",
      "X-Title": "Leadly",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2000,
    }),
  });

  if (!res.ok) return "";

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function extractEmails(text: string): string[] {
  const matches = text.match(EMAIL_REGEX);
  return [...new Set(matches ?? [])];
}

function extractPhones(text: string): string[] {
  const matches = text.match(PHONE_REGEX);
  if (!matches) return [];
  const valid: string[] = [];
  for (const p of [...new Set(matches)]) {
    const digits = p.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) {
      if (!/^0{2,}$/.test(digits) && !/^1{2,}$/.test(digits)) {
        valid.push(p.trim());
      }
    }
  }
  return valid;
}

async function searchGoogleSerper(query: string): Promise<any[]> {
  if (!SERPER_API_KEY) return [];

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, num: 10 }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.organic ?? [])
    .filter((r: any) => {
      if (!r.link || isIrrelevantDomain(r.link)) return false;
      if (isAggregatorOrListing(r.title, r.snippet || "")) return false;
      return true;
    })
    .map((r: any) => ({
      company: r.title,
      website: r.link,
      snippet: r.snippet,
      source: "google_search",
    }));
}

async function searchGoogleMaps(query: string): Promise<any[]> {
  if (!SERPER_API_KEY) return [];

  const res = await fetch("https://google.serper.dev/maps", {
    method: "POST",
    headers: { "X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, num: 10 }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.places ?? [])
    .filter((p: any) => {
      if (p.website && isIrrelevantDomain(p.website)) return false;
      return true;
    })
    .map((p: any) => ({
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

async function findContactInfo(
  website: string | undefined,
): Promise<{ email?: string; phone?: string }> {
  if (!website) return {};

  const { emails, phones } = await crawlWebsite(website);
  const found: { email?: string; phone?: string } = {};
  if (emails.length > 0) found.email = emails[0];
  if (phones.length > 0) found.phone = phones[0];

  if (emails.length > 0 || phones.length > 0) return found;

  const pages = ["/contact", "/about", "/about-us", "/team", "/contact-us"];
  for (const page of pages) {
    const url = website.replace(/\/$/, "") + page;
    const info = await crawlWebsite(url);
    if (info.emails.length > 0 && !found.email) found.email = info.emails[0];
    if (info.phones.length > 0 && !found.phone) found.phone = info.phones[0];
    if (found.email && found.phone) break;
  }

  return found;
}

export const discover = action({
  args: {
    prompt: v.string(),
    category: v.optional(v.string()),
    location: v.optional(v.string()),
    runId: v.id("leadGenerationRuns"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const step = async (id: string, status: string, detail?: string) => {
      await ctx.runMutation(api.leadRuns.updateStep, {
        runId: args.runId,
        stepId: id,
        status,
        detail,
      });
    };

    const fail = async (error: string) => {
      await ctx.runMutation(api.leadRuns.failRun, { runId: args.runId, error });
    };

    try {
      await step("analyze", "active");

      const searchQueries: string[] = [];
      if (args.category) searchQueries.push(args.category);
      const promptWords = args.prompt
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2)
        .slice(0, 8);
      if (promptWords.length >= 3) {
        searchQueries.push(promptWords.slice(0, 5).join(" "));
        if (promptWords.length > 5) searchQueries.push(promptWords.slice(3, 8).join(" "));
      } else {
        searchQueries.push(args.prompt);
      }
      if (args.location) {
        searchQueries.push(...searchQueries.map((q) => `${q} ${args.location}`));
      }

      await step("analyze", "done", `Generated ${searchQueries.length} search queries`);
      await step("search_web", "active");

      const allResults: any[] = [];
      const seenWebsites = new Set<string>();

      for (let qi = 0; qi < searchQueries.length; qi++) {
        const q = searchQueries[qi];
        await step(
          "search_web",
          "active",
          `Query ${qi + 1}/${searchQueries.length}: "${q.substring(0, 60)}"`,
        );

        const [googleResults, mapsResults] = await Promise.all([
          searchGoogleSerper(q),
          searchGoogleMaps(q),
        ]);

        const combined = [...googleResults, ...mapsResults];
        for (const r of combined) {
          const key = r.website || r.company;
          if (key && !seenWebsites.has(key)) {
            seenWebsites.add(key);
            allResults.push(r);
          }
        }
      }

      await step("search_web", "done", `Found ${allResults.length} potential leads`);
      await step("crawl", "active");

      const topResults = allResults.slice(0, 20);

      const enrichedResults: any[] = [];
      for (let ri = 0; ri < topResults.length; ri++) {
        const r = topResults[ri];
        await step(
          "crawl",
          "active",
          `Scanning ${ri + 1}/${topResults.length}: ${r.company?.substring(0, 40)}`,
        );
        const contact = await findContactInfo(r.website);
        enrichedResults.push({
          company: r.company ?? "Unknown",
          website: r.website ?? "",
          email: contact.email || r.email || "",
          phone: contact.phone || r.phone || "",
          location: r.location || args.location || "",
          source: r.source ?? "google_search",
          snippet: r.snippet ?? "",
        });
      }

      await step("crawl", "done", `Scanned ${topResults.length} websites`);
      await step("filter", "active");

      const withContact = enrichedResults.filter((l) => l.email || l.phone);
      const withoutContact = enrichedResults.filter((l) => !l.email && !l.phone);

      const prioritized = [
        ...withContact.filter((l) => l.email && l.phone),
        ...withContact.filter((l) => l.email && !l.phone),
        ...withContact.filter((l) => !l.email && l.phone),
        ...withoutContact,
      ].slice(0, 15);

      const userCriteria = `${args.prompt}${args.category ? `. Target industry: ${args.category}` : ""}${args.location ? `. Target location: ${args.location}` : ""}`;

      const scoredLeads: any[] = [];
      const leadsToScore = prioritized.slice(0, 8);

      if (leadsToScore.length > 0 && OPENROUTER_API_KEY) {
        const aiPrompt = `USER'S SEARCH CRITERIA:
${userCriteria}

SEARCH RESULTS TO ANALYZE (one lead per entry):
${leadsToScore
  .map(
    (l, i) => `
--- LEAD ${i + 1} ---
Company: ${l.company}
Website: ${l.website}
Email found: ${l.email || "not_found"}
Phone found: ${l.phone || "not_found"}
Location: ${l.location || "not_found"}
Source: ${l.source}
Snippet: ${l.snippet || "not_found"}
`,
  )
  .join("\n")}

For EACH lead above, output a REASONING block followed by the JSON scoring object. Separate each lead with "---NEXT_LEAD---".`;

        const aiRaw = await callOpenRouter(SCORING_SYSTEM_PROMPT, aiPrompt);

        if (aiRaw) {
          const sections = aiRaw.split("---NEXT_LEAD---");
          let leadIdx = 0;
          for (const section of sections) {
            const jsonMatch = section.match(/\{[\s\S]*\}/);
            if (jsonMatch && leadIdx < leadsToScore.length) {
              try {
                const parsed = JSON.parse(jsonMatch[0]);
                const orig = leadsToScore[leadIdx];
                scoredLeads.push({
                  company: parsed.business_name || orig.company,
                  website: parsed.website || orig.website,
                  email: parsed.contact?.email?.value || orig.email,
                  emailConfidence:
                    parsed.contact?.email?.confidence || (orig.email ? "verified" : "not_found"),
                  phone: parsed.contact?.phone?.value || orig.phone,
                  phoneConfidence:
                    parsed.contact?.phone?.confidence || (orig.phone ? "verified" : "not_found"),
                  location: parsed.location || orig.location,
                  source: orig.source,
                  snippet: orig.snippet,
                  industry: parsed.industry || "",
                  keySignals: parsed.key_signals || [],
                  painPoints: parsed.inferred_pain_points || [],
                  fitScore: parsed.fit_score || {
                    relevance: 0,
                    reachability: 0,
                    signal_strength: 0,
                    data_confidence: 0,
                    total: 0,
                  },
                  outreachMessage: parsed.outreach_message || "",
                  notes: parsed.notes || "",
                });
              } catch {
                const orig = leadsToScore[leadIdx];
                scoredLeads.push({
                  ...orig,
                  emailConfidence: orig.email ? "verified" : "not_found",
                  phoneConfidence: orig.phone ? "verified" : "not_found",
                });
              }
            }
            leadIdx++;
          }
        }
      }

      const finalLeads = scoredLeads.length > 0 ? scoredLeads : leadsToScore;

      finalLeads.sort((a, b) => (b.fitScore?.total || 0) - (a.fitScore?.total || 0));

      await step("filter", "done", `${finalLeads.length} leads scored and ranked`);

      await ctx.runMutation(api.leadRuns.completeRun, {
        runId: args.runId,
        leads: finalLeads,
      });

      return {
        analysis: {
          brandSummary: `Searching for: ${args.prompt}`,
          targetProfile: args.category || "Various industries",
          approach: `Searched ${searchQueries.length} queries, scanned ${topResults.length} sites`,
        },
        queries: searchQueries,
        leads: finalLeads,
        total: finalLeads.length,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      await fail(msg);
      return null;
    }
  },
});
