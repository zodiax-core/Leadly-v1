import { i as __toESM } from "../_runtime.mjs";
import { i as ConvexReactClient, l as require_jsx_runtime, t as ConvexAuthProvider, u as require_react } from "../_libs/@convex-dev/auth+[...].mjs";
import { P as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CFKgSWfN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DfJ4nn4U.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var convexClient = new ConvexReactClient("https://tremendous-elephant-255.convex.cloud");
function ConvexClientProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConvexAuthProvider, {
		client: convexClient,
		children
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConvexClientProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$12 = () => import("./settings-C935FvEv.mjs");
var Route$12 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings — Leadly" }, {
		name: "description",
		content: "Manage your account settings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./pricing-BcBZHq3G.mjs");
var Route$11 = createFileRoute("/pricing")({
	head: () => ({ meta: [
		{ title: "Pricing — Leadly" },
		{
			name: "description",
			content: "Simple, transparent pricing for teams capturing leads at any scale."
		},
		{
			property: "og:title",
			content: "Pricing — Leadly"
		},
		{
			property: "og:description",
			content: "Simple, transparent pricing."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./login-CHJBAdVN.mjs");
var Route$10 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login — Leadly" }, {
		name: "description",
		content: "Sign in to your Leadly account to manage funnels and leads."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./leads-by-ai-DE6LX2ZI.mjs");
var Route$9 = createFileRoute("/leads-by-ai")({
	head: () => [{ title: "Leads By AI — Leadly" }, {
		name: "description",
		content: "Use AI to discover and analyze leads for your business based on your brand description."
	}],
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./leads-CdYUzrzz.mjs");
var Route$8 = createFileRoute("/leads")({
	head: () => ({ meta: [{ title: "Leads — Leadly" }, {
		name: "description",
		content: "View and manage your leads."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./finder-C6YBc1Iu.mjs");
var Route$7 = createFileRoute("/finder")({
	head: () => ({ meta: [{ title: "Lead Finder — Leadly" }, {
		name: "description",
		content: "Find new leads."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./docs-B4U8qDf0.mjs");
var Route$6 = createFileRoute("/docs")({
	head: () => ({ meta: [{ title: "Docs — Leadly" }, {
		name: "description",
		content: "Guides, API reference, and recipes to ship lead funnels faster."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./dashboard-DGmSfkhj.mjs");
var Route$5 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Leadly" }, {
		name: "description",
		content: "Your Leadly dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./careers-DkYr61Ep.mjs");
var Route$4 = createFileRoute("/careers")({
	head: () => ({ meta: [{ title: "Careers — Leadly" }, {
		name: "description",
		content: "Help us build the future of lead generation. We're hiring across engineering, design, and growth."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./campaigns-rA2B8KWr.mjs");
var Route$3 = createFileRoute("/campaigns")({
	head: () => ({ meta: [{ title: "Campaigns — Leadly" }, {
		name: "description",
		content: "Manage your lead generation campaigns."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./blog-pX9yh-QC.mjs");
var Route$2 = createFileRoute("/blog")({
	head: () => ({ meta: [{ title: "Blog — Leadly" }, {
		name: "description",
		content: "Playbooks, product updates, and growth experiments from the Leadly team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-qO7F-OiC.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Leadly — Turn words into leads" },
		{
			name: "description",
			content: "Leadly captures, qualifies, and routes leads from any page on your site. No code, no setup."
		},
		{
			property: "og:title",
			content: "Leadly — Turn words into leads"
		},
		{
			property: "og:description",
			content: "Capture, qualify, and route leads on autopilot."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard.index-Bly0X2qK.mjs");
var Route = createFileRoute("/dashboard/")({
	head: () => ({ meta: [{ title: "Dashboard — Leadly" }, {
		name: "description",
		content: "Your Leadly dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$13
});
var PricingRoute = Route$11.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var LeadsByAiRoute = Route$9.update({
	id: "/leads-by-ai",
	path: "/leads-by-ai",
	getParentRoute: () => Route$13
});
var LeadsRoute = Route$8.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => Route$13
});
var FinderRoute = Route$7.update({
	id: "/finder",
	path: "/finder",
	getParentRoute: () => Route$13
});
var DocsRoute = Route$6.update({
	id: "/docs",
	path: "/docs",
	getParentRoute: () => Route$13
});
var DashboardRoute = Route$5.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$13
});
var CareersRoute = Route$4.update({
	id: "/careers",
	path: "/careers",
	getParentRoute: () => Route$13
});
var CampaignsRoute = Route$3.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => Route$13
});
var BlogRoute = Route$2.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var DashboardRouteChildren = { DashboardIndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	BlogRoute,
	CampaignsRoute,
	CareersRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	DocsRoute,
	FinderRoute,
	LeadsRoute,
	LeadsByAiRoute,
	LoginRoute,
	PricingRoute,
	SettingsRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
