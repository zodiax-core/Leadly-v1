import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-CEa-QBhs.js
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-foreground text-background mt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-6 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-4 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-serif italic text-3xl",
					children: ["Lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "not-italic font-sans font-medium",
						children: "ly"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-background/60 max-w-xs",
					children: "Turn visitors into qualified leads on autopilot."
				})] }), [
					{
						heading: "Product",
						links: [
							{
								to: "/",
								label: "Home"
							},
							{
								to: "/pricing",
								label: "Pricing"
							},
							{
								to: "/login",
								label: "Login"
							}
						]
					},
					{
						heading: "Resources",
						links: [{
							to: "/docs",
							label: "Docs"
						}, {
							to: "/blog",
							label: "Blog"
						}]
					},
					{
						heading: "Company",
						links: [{
							to: "/careers",
							label: "Careers"
						}, {
							to: "/blog",
							label: "Contact"
						}]
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-sans text-xs uppercase tracking-widest text-background/50 mb-4",
					children: c.heading
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-background/80 hover:text-background",
						children: l.label
					}) }, l.label))
				})] }, c.heading))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Leadly. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Twitter" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LinkedIn" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "YouTube" })
					]
				})]
			})]
		})
	});
}
//#endregion
export { SiteFooter as t };
