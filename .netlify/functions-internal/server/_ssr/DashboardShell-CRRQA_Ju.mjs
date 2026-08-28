import { l as require_jsx_runtime, n as useAuthActions, r as useAuth } from "../_libs/@convex-dev/auth+[...].mjs";
import { P as useRouter, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as LoaderCircle, P as Sparkles, _ as LogOut, n as Users, o as Target, s as Settings, u as Search, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardShell-CRRQA_Ju.js
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/finder",
		label: "Lead Finder",
		icon: Search
	},
	{
		to: "/leads-by-ai",
		label: "Leads By AI",
		icon: Sparkles
	},
	{
		to: "/campaigns",
		label: "Campaigns",
		icon: Target
	},
	{
		to: "/leads",
		label: "Leads",
		icon: Users
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function DashboardShell({ children }) {
	const { isLoading, isAuthenticated } = useAuth();
	const { signOut } = useAuthActions();
	const router = useRouter();
	const location = useLocation();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" })
	});
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Sign in required"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Please sign in to access this page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium",
				children: "Sign in"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-60 border-r flex flex-col shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 flex items-center px-6 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "font-serif text-xl italic",
						children: ["Lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "not-italic font-sans font-medium",
							children: "ly"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 flex flex-col gap-1 p-4",
					children: navItems.map((item) => {
						const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => signOut().then(() => router.invalidate()),
						className: "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition cursor-pointer bg-transparent border-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 shrink-0" }), "Sign out"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "h-16 border-b flex items-center justify-end px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => signOut().then(() => router.invalidate()),
					className: "text-sm text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none",
					children: "Sign out"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-auto p-6",
				children
			})]
		})]
	});
}
//#endregion
export { DashboardShell as t };
