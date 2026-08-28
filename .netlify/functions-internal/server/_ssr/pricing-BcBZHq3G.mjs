import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as SiteNav } from "./SiteNav-DLjyvVB0.mjs";
import { t as SiteFooter } from "./SiteFooter-CEa-QBhs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-BcBZHq3G.js
var import_jsx_runtime = require_jsx_runtime();
var tiers = [
	{
		name: "Starter",
		price: "$0",
		sub: "Forever free",
		features: [
			"1 funnel",
			"100 leads / mo",
			"Email notifications",
			"Basic AI scoring"
		],
		cta: "Start free",
		featured: false
	},
	{
		name: "Growth",
		price: "$49",
		sub: "per month",
		features: [
			"Unlimited funnels",
			"10,000 leads / mo",
			"All integrations",
			"AI enrichment + scoring",
			"Slack & SMS"
		],
		cta: "Start 14-day trial",
		featured: true
	},
	{
		name: "Scale",
		price: "Custom",
		sub: "Talk to sales",
		features: [
			"Unlimited leads",
			"SSO + SAML",
			"Dedicated success",
			"SLA + audit logs",
			"Custom AI models"
		],
		cta: "Contact sales",
		featured: false
	}
];
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-40 pb-20 px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-6xl md:text-7xl",
				children: [
					"Simple, ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic",
						children: "honest"
					}),
					" pricing"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground max-w-xl mx-auto",
				children: "Start free. Upgrade when you're ready. Cancel anytime."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-6 pb-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto grid md:grid-cols-3 gap-6",
				children: tiers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-3xl p-8 border ${t.featured ? "bg-foreground text-background border-foreground shadow-2xl scale-[1.02]" : "bg-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-3xl",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-5xl font-serif",
								children: t.price
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: t.featured ? "text-background/70" : "text-muted-foreground",
								children: t.sub
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `mt-6 w-full rounded-full py-3 text-sm font-medium transition ${t.featured ? "bg-background text-foreground hover:opacity-90" : "bg-foreground text-background hover:opacity-90"}`,
							children: t.cta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-3 text-sm",
							children: t.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
							}, f))
						})
					]
				}, t.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl text-center",
					children: "Questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 divide-y border-y",
					children: [
						["Is there really a free plan?", "Yes. 100 leads a month, forever. No card required."],
						["Can I cancel anytime?", "Cancel in one click. You keep access until the end of the period."],
						["Do you offer discounts for startups?", "50% off Growth for our first year if you're under $1M ARR."],
						["Where is my data stored?", "EU and US regions. SOC 2 Type II. GDPR compliant."]
					].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "py-5 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "cursor-pointer flex justify-between items-center font-medium",
							children: [q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground group-open:rotate-45 transition",
								children: "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: a
						})]
					}, q))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Pricing as component };
