import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — Leadly" },
      {
        name: "description",
        content: "Guides, API reference, and recipes to ship lead funnels faster.",
      },
    ],
  }),
  component: Docs,
});

const sections = [
  {
    heading: "Getting started",
    items: [
      "Quickstart in 5 minutes",
      "Install the JS snippet",
      "Create your first funnel",
      "Routing leads to your CRM",
    ],
  },
  {
    heading: "Funnels",
    items: ["Form components", "Conditional logic", "Multi-step quizzes", "Custom themes"],
  },
  {
    heading: "Integrations",
    items: ["HubSpot", "Salesforce", "Slack & Teams", "Webhooks & Zapier"],
  },
  {
    heading: "AI Features",
    items: ["Lead scoring", "Email enrichment", "Auto-replies", "Custom prompts"],
  },
];

function Docs() {
  return (
    <div>
      <SiteNav />
      <div className="pt-32 max-w-6xl mx-auto px-6 grid md:grid-cols-[240px_1fr] gap-12">
        <aside className="md:sticky md:top-32 md:self-start">
          <input
            placeholder="Search docs..."
            className="w-full rounded-full border bg-card px-4 py-2 text-sm outline-none focus:ring-2 ring-ring"
          />
          <nav className="mt-6 space-y-6 text-sm">
            {sections.map((s) => (
              <div key={s.heading}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {s.heading}
                </div>
                <ul className="space-y-1">
                  {s.items.map((i) => (
                    <li key={i}>
                      <a className="block py-1 text-foreground/80 hover:text-foreground cursor-pointer">
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="prose-styles max-w-none pb-32">
          <h1 className="text-5xl md:text-6xl">Welcome to Leadly</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Everything you need to build, launch, and scale lead funnels. Start with the quickstart,
            then dive into integrations and AI scoring.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              ["Quickstart", "Ship your first funnel in 5 minutes."],
              ["JS Snippet", "Drop one line of code into your site."],
              ["CRM Sync", "Two‑way sync with HubSpot, Salesforce, more."],
              ["AI Scoring", "Use GPT‑5 to grade lead fit automatically."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl border p-6 bg-card hover:shadow-md transition cursor-pointer"
              >
                <div className="font-serif text-2xl">{t}</div>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl mt-16">Install the snippet</h2>
          <p className="text-muted-foreground mt-2">
            Paste this before <code className="bg-secondary px-1 rounded">&lt;/body&gt;</code>:
          </p>
          <pre className="mt-4 bg-foreground text-background rounded-2xl p-6 text-sm overflow-x-auto">
            {`<script src="https://cdn.leadly.app/v1.js" data-key="pk_live_..."></script>`}
          </pre>

          <h2 className="text-3xl mt-16">Create a funnel via API</h2>
          <pre className="mt-4 bg-foreground text-background rounded-2xl p-6 text-sm overflow-x-auto">
            {`POST /v1/funnels
Authorization: Bearer sk_live_...
Content-Type: application/json

{
  "name": "Demo Request",
  "fields": ["email", "company", "team_size"],
  "route_to": "salesforce"
}`}
          </pre>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
