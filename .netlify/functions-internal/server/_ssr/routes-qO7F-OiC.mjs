import { l as require_jsx_runtime } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as SiteNav } from "./SiteNav-DLjyvVB0.mjs";
import { C as Github, g as Mail, i as Twitter, v as Linkedin } from "../_libs/lucide-react.mjs";
import { t as hero_sky_default } from "./hero-sky-C5yefQhx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-qO7F-OiC.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-full flex flex-col items-center justify-center overflow-hidden px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_sky_default,
						alt: "",
						width: 1920,
						height: 1280,
						className: "absolute inset-0 w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-center max-w-3xl -mt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-serif text-6xl md:text-8xl text-white drop-shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: "Lead"
								}), "ly"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg md:text-xl text-white/95 text-balance max-w-xl mx-auto",
								children: "Turn your words into capture forms, quizzes, and lead funnels — built in minutes. Add CRMs and 40+ integrations in an instant."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-10 mx-auto max-w-xl glass-pill rounded-3xl p-3 flex flex-col gap-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									placeholder: "Describe your next lead funnel...",
									rows: 3,
									className: "bg-transparent resize-none outline-none px-3 py-2 text-foreground placeholder:text-foreground/50"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition",
										"aria-label": "Send",
										children: "↑"
									})
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-50 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:hello@leadly.com",
						className: "h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://github.com",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://twitter.com",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://linkedin.com",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-4 w-4" })
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
