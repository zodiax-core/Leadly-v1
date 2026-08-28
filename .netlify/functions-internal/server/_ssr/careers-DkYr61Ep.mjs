import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as SiteNav } from "./SiteNav-DLjyvVB0.mjs";
import { t as SiteFooter } from "./SiteFooter-CEa-QBhs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-DkYr61Ep.js
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	{
		title: "Founding Engineer",
		team: "Engineering",
		location: "Remote (US/EU)"
	},
	{
		title: "Product Designer",
		team: "Design",
		location: "Remote"
	},
	{
		title: "Growth Marketer",
		team: "Marketing",
		location: "New York"
	},
	{
		title: "AI Research Engineer",
		team: "AI",
		location: "Remote"
	},
	{
		title: "Customer Success Lead",
		team: "Success",
		location: "London"
	},
	{
		title: "Developer Advocate",
		team: "Community",
		location: "Remote"
	}
];
function Careers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-40 pb-20 px-6 text-center max-w-3xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-6xl md:text-7xl",
				children: ["Build the future of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic",
					children: "pipeline"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg text-muted-foreground",
				children: "Small team. Big ambitions. We're rewriting how every business turns attention into revenue."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-6 max-w-5xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-6 mb-20",
					children: [
						["Remote-first", "Work from anywhere. We meet in person twice a year."],
						["Real ownership", "Meaningful equity from day one. We win as a team."],
						["High craft", "Small team that ships fast. No politics, no busywork."]
					].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border p-8 bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-2xl",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 text-sm",
							children: d
						})]
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl mb-6",
					children: "Open roles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border rounded-3xl bg-card divide-y overflow-hidden",
					children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-3 p-6 hover:bg-secondary/60 cursor-pointer transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-xl",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground mt-1",
							children: [
								r.team,
								" · ",
								r.location
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full border px-5 py-2 text-sm hover:bg-foreground hover:text-background transition self-start md:self-auto",
							children: "Apply →"
						})]
					}, r.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Careers as component };
