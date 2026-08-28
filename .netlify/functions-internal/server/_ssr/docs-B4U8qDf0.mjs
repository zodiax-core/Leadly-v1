import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as SiteNav } from "./SiteNav-DLjyvVB0.mjs";
import { t as SiteFooter } from "./SiteFooter-CEa-QBhs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/docs-B4U8qDf0.js
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		heading: "Getting started",
		items: [
			"Quickstart in 5 minutes",
			"Install the JS snippet",
			"Create your first funnel",
			"Routing leads to your CRM"
		]
	},
	{
		heading: "Funnels",
		items: [
			"Form components",
			"Conditional logic",
			"Multi-step quizzes",
			"Custom themes"
		]
	},
	{
		heading: "Integrations",
		items: [
			"HubSpot",
			"Salesforce",
			"Slack & Teams",
			"Webhooks & Zapier"
		]
	},
	{
		heading: "AI Features",
		items: [
			"Lead scoring",
			"Email enrichment",
			"Auto-replies",
			"Custom prompts"
		]
	}
];
function Docs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-32 max-w-6xl mx-auto px-6 grid md:grid-cols-[240px_1fr] gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "md:sticky md:top-32 md:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Search docs...",
					className: "w-full rounded-full border bg-card px-4 py-2 text-sm outline-none focus:ring-2 ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-6 space-y-6 text-sm",
					children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground mb-2",
						children: s.heading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: s.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "block py-1 text-foreground/80 hover:text-foreground cursor-pointer",
							children: i
						}) }, i))
					})] }, s.heading))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "prose-styles max-w-none pb-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-5xl md:text-6xl",
						children: "Welcome to Leadly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground max-w-2xl",
						children: "Everything you need to build, launch, and scale lead funnels. Start with the quickstart, then dive into integrations and AI scoring."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid sm:grid-cols-2 gap-4",
						children: [
							["Quickstart", "Ship your first funnel in 5 minutes."],
							["JS Snippet", "Drop one line of code into your site."],
							["CRM Sync", "Two‑way sync with HubSpot, Salesforce, more."],
							["AI Scoring", "Use GPT‑5 to grade lead fit automatically."]
						].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border p-6 bg-card hover:shadow-md transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-serif text-2xl",
								children: t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: d
							})]
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl mt-16",
						children: "Install the snippet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground mt-2",
						children: [
							"Paste this before ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "bg-secondary px-1 rounded",
								children: "</body>"
							}),
							":"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-4 bg-foreground text-background rounded-2xl p-6 text-sm overflow-x-auto",
						children: `<script src="https://cdn.leadly.app/v1.js" data-key="pk_live_..."><\/script>`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl mt-16",
						children: "Create a funnel via API"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-4 bg-foreground text-background rounded-2xl p-6 text-sm overflow-x-auto",
						children: `POST /v1/funnels
Authorization: Bearer sk_live_...
Content-Type: application/json

{
  "name": "Demo Request",
  "fields": ["email", "company", "team_size"],
  "route_to": "salesforce"
}`
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Docs as component };
