import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as SiteNav } from "./SiteNav-DLjyvVB0.mjs";
import { t as SiteFooter } from "./SiteFooter-CEa-QBhs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-pX9yh-QC.js
var import_jsx_runtime = require_jsx_runtime();
var posts = [
	{
		tag: "Playbook",
		title: "The 7-question demo qualifier that doubled our SQLs",
		date: "Jun 24, 2026",
		read: "6 min",
		grad: "from-rose-200 to-orange-200"
	},
	{
		tag: "Product",
		title: "Introducing AI Routing — leads find the right rep, automatically",
		date: "Jun 18, 2026",
		read: "4 min",
		grad: "from-sky-200 to-indigo-200"
	},
	{
		tag: "Growth",
		title: "Why your landing page form is leaking 60% of leads",
		date: "Jun 10, 2026",
		read: "8 min",
		grad: "from-emerald-200 to-teal-200"
	},
	{
		tag: "Engineering",
		title: "How we built real-time enrichment in under 200ms",
		date: "May 30, 2026",
		read: "11 min",
		grad: "from-amber-200 to-pink-200"
	},
	{
		tag: "Playbook",
		title: "The cold email teardown: 12 wins, 4 disasters",
		date: "May 22, 2026",
		read: "9 min",
		grad: "from-violet-200 to-fuchsia-200"
	},
	{
		tag: "Story",
		title: "From 0 to 10k leads/mo: how Bloom Realty did it",
		date: "May 14, 2026",
		read: "7 min",
		grad: "from-lime-200 to-emerald-200"
	}
];
function Blog() {
	const [featured, ...rest] = posts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-40 pb-12 px-6 max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm uppercase tracking-widest text-muted-foreground",
				children: "Blog"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-6xl md:text-7xl",
				children: "Notes from the field"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-6 max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden border bg-card cursor-pointer hover:shadow-xl transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-72 md:h-full bg-gradient-to-br ${featured.grad}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 md:p-12 flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: [featured.tag, " · Featured"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-4xl md:text-5xl text-balance",
							children: featured.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-sm text-muted-foreground",
							children: [
								featured.date,
								" · ",
								featured.read,
								" read"
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid md:grid-cols-3 gap-6 pb-32",
				children: rest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-3xl overflow-hidden border bg-card cursor-pointer hover:shadow-lg transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-44 bg-gradient-to-br ${p.grad}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: p.tag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-2xl text-balance",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-xs text-muted-foreground",
								children: [
									p.date,
									" · ",
									p.read,
									" read"
								]
							})
						]
					})]
				}, p.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Blog as component };
