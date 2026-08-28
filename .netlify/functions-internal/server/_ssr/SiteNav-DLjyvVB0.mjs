import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteNav-DLjyvVB0.js
var import_jsx_runtime = require_jsx_runtime();
function SiteNav({ variant = "light" }) {
	const linkBase = variant === "light" ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed top-4 inset-x-0 z-50 flex justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "glass-pill flex items-center gap-2 rounded-full pl-5 pr-2 py-2 w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-serif text-xl italic mr-auto",
					children: ["Lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "not-italic font-sans font-medium",
						children: "ly"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex items-center gap-1 text-sm",
					children: [
						{
							to: "/pricing",
							label: "Pricing"
						},
						{
							to: "/docs",
							label: "Docs"
						},
						{
							to: "/careers",
							label: "Careers"
						},
						{
							to: "/blog",
							label: "Blog"
						},
						{
							to: "/login",
							label: "Login"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: `px-3 py-1.5 rounded-full transition ${linkBase}`,
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "ml-2 inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition",
					children: "Get started"
				})
			]
		})
	});
}
//#endregion
export { SiteNav as t };
