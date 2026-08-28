import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

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
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 500,
    }),
  });

  if (!res.ok) return "";

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export const scoreLead = action({
  args: {
    leadId: v.id("leads"),
    company: v.string(),
    website: v.optional(v.string()),
    industry: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const prompt = `Score this B2B lead from 0-100 based on fit, intent, and data completeness.
Company: ${args.company}
${args.website ? `Website: ${args.website}` : ""}
${args.industry ? `Industry: ${args.industry}` : ""}
${args.location ? `Location: ${args.location}` : ""}

Respond with ONLY a JSON object: { "score": number, "reasoning": string }`;

    const response = await callOpenRouter("You are a lead scoring AI. Be concise.", prompt);

    try {
      const parsed = JSON.parse(response);
      const score = Math.min(100, Math.max(0, parsed.score ?? 0));

      await ctx.runMutation(api.leads.updateScore, {
        leadId: args.leadId,
        score,
        enrichedData: { reasoning: parsed.reasoning, scoredAt: Date.now() },
      });

      return { score, reasoning: parsed.reasoning };
    } catch {
      return { score: 0, reasoning: "Failed to score" };
    }
  },
});

export const enrichLead = action({
  args: {
    leadId: v.id("leads"),
    company: v.string(),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const prompt = `Given this company name, guess the industry, company size, and tech stack.
Company: ${args.company}
${args.website ? `Website: ${args.website}` : ""}

Respond with ONLY a JSON object: { "industry": string, "companySize": string, "techStack": string[], "description": string }`;

    const response = await callOpenRouter(
      "You are a B2B lead enrichment AI. Make reasonable guesses based on the company name.",
      prompt,
    );

    try {
      const parsed = JSON.parse(response);
      await ctx.runMutation(api.leads.updateScore, {
        leadId: args.leadId,
        score: 50,
        enrichedData: {
          industry: parsed.industry,
          companySize: parsed.companySize,
          techStack: parsed.techStack,
          description: parsed.description,
          enrichedAt: Date.now(),
        },
      });
      return parsed;
    } catch {
      return null;
    }
  },
});
