import { i as __toESM } from "../_runtime.mjs";
import { l as require_jsx_runtime, s as useQuery, u as require_react } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { A as ChevronDown, D as ExternalLink, E as FileCode, L as LoaderCircle, O as Download, T as FileSpreadsheet, f as Phone, g as Mail, h as MapPin, n as Users, u as Search, w as FileText, x as Globe } from "../_libs/lucide-react.mjs";
import { t as DashboardShell } from "./DashboardShell-CRRQA_Ju.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-CdYUzrzz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
	contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
	qualified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
	converted: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
	unqualified: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
};
var DATE_RANGES = [
	{
		label: "All time",
		value: ""
	},
	{
		label: "Today",
		value: "today"
	},
	{
		label: "This week",
		value: "week"
	},
	{
		label: "This month",
		value: "month"
	},
	{
		label: "This quarter",
		value: "quarter"
	},
	{
		label: "This year",
		value: "year"
	}
];
function Leads() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [dateRange, setDateRange] = (0, import_react.useState)("");
	const leads = useQuery(api.leads.list, {
		search: search || void 0,
		dateRange: dateRange || void 0
	});
	const stats = useQuery(api.leads.stats);
	const downloadXLSX = () => {
		if (!leads) return;
		const wb = utils.book_new();
		const data = leads.map((l, i) => ({
			"#": i + 1,
			Company: l.company,
			Website: l.website || "",
			Email: l.email || "",
			Phone: l.phone || "",
			Location: l.location || "",
			Source: l.source,
			Status: l.status,
			Score: l.score ?? ""
		}));
		const ws = utils.json_to_sheet(data);
		ws["!cols"] = [
			{ wch: 4 },
			{ wch: 30 },
			{ wch: 35 },
			{ wch: 35 },
			{ wch: 20 },
			{ wch: 25 },
			{ wch: 14 },
			{ wch: 8 }
		];
		utils.book_append_sheet(wb, ws, "Leads");
		writeFileSync(wb, "leads.xlsx");
	};
	const downloadCSV = () => {
		if (!leads) return;
		const rows = leads.map((l) => `"${l.company}","${l.website || ""}","${l.email || ""}","${l.phone || ""}","${l.location || ""}","${l.source}","${l.status}","${l.score ?? ""}"`).join("\n");
		downloadBlob(new Blob(["﻿Company,Website,Email,Phone,Location,Source,Status,Score\n" + rows], { type: "text/csv;charset=utf-8" }), "leads.csv");
	};
	const downloadMarkdown = () => {
		if (!leads) return;
		const rows = leads.map((l, i) => `| ${i + 1} | ${l.company} | ${l.website || "—"} | ${l.email || "—"} | ${l.phone || "—"} | ${l.location || "—"} | ${l.source} | ${l.status} | ${l.score ?? "—"} |`).join("\n");
		downloadBlob(new Blob(["# Leads\n\n| # | Company | Website | Email | Phone | Location | Source | Status | Score |\n|---|---|---|---|---|---|---|---|---|\n" + rows], { type: "text/markdown;charset=utf-8" }), "leads.md");
	};
	const downloadText = () => {
		if (!leads) return;
		const lines = leads.map((l, i) => `${i + 1}. ${l.company}\n   Website: ${l.website || "—"}\n   Email: ${l.email || "—"}\n   Phone: ${l.phone || "—"}\n   Location: ${l.location || "—"}\n   Source: ${l.source}\n   Status: ${l.status}\n   Score: ${l.score ?? "—"}\n`);
		downloadBlob(new Blob(["Leads\n" + "=".repeat(40) + "\n\n" + lines.join("\n")], { type: "text/plain;charset=utf-8" }), "leads.txt");
	};
	const downloadJSON = () => {
		if (!leads) return;
		downloadBlob(new Blob([JSON.stringify(leads, null, 2)], { type: "application/json;charset=utf-8" }), "leads.json");
	};
	const downloadBlob = (blob, filename) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Leads"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "View and manage all your leads in one place."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4",
				children: [
					{
						label: "Total",
						value: stats?.total ?? 0
					},
					{
						label: "New",
						value: stats?.new ?? 0,
						color: "text-blue-600"
					},
					{
						label: "Contacted",
						value: stats?.contacted ?? 0,
						color: "text-yellow-600"
					},
					{
						label: "Qualified",
						value: stats?.qualified ?? 0,
						color: "text-green-600"
					}
				].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `text-3xl font-serif ${stat.color ?? ""}`,
						children: stat.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground mt-1",
						children: stat.label
					})]
				}, stat.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-3xl border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 min-w-[200px] max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search by company, email, or location...",
								className: "w-full rounded-xl border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 ring-ring",
								value: search,
								onChange: (e) => setSearch(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: dateRange,
								onChange: (e) => setDateRange(e.target.value),
								className: "rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring appearance-none cursor-pointer pr-8",
								children: DATE_RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: r.value,
									children: r.label
								}, r.value))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" })]
						}),
						leads && leads.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 ml-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground mr-1",
									children: "Download:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: downloadXLSX,
									className: "rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-3 w-3" }), " XLSX"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: downloadCSV,
									className: "rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " CSV"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: downloadMarkdown,
									className: "rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " MD"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: downloadText,
									className: "rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " TXT"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: downloadJSON,
									className: "rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "h-3 w-3" }), " JSON"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Source"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium text-muted-foreground",
									children: "Score"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: leads === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "text-center py-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin mx-auto text-muted-foreground/50" })
						}) }) : leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "text-center text-muted-foreground py-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8 text-muted-foreground/50" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No leads yet" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: "Leads will appear here once you find them."
									})
								]
							})
						}) }) : leads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b last:border-0 hover:bg-muted/10 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-medium flex items-center gap-1.5",
										children: [lead.company, lead.website && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: lead.website,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-muted-foreground/50 hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
										})]
									}), lead.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" }), lead.website.replace(/https?:\/\//, "").replace(/\/.*/, "")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-sm",
									children: lead.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3 text-muted-foreground shrink-0" }), lead.email]
									}) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-sm",
									children: lead.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3 text-muted-foreground shrink-0" }), lead.phone]
									}) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-sm",
									children: lead.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-muted-foreground shrink-0" }), lead.location]
									}) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground",
										children: lead.source.replace(/_/g, " ")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs rounded-full px-2.5 py-0.5 font-medium ${statusStyles[lead.status] || ""}`,
										children: lead.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: lead.score && lead.score >= 50 ? "text-green-600 font-medium" : "text-muted-foreground",
										children: lead.score ?? "—"
									})
								})
							]
						}, lead._id)) })]
					})
				})]
			})
		]
	}) });
}
//#endregion
export { Leads as component };
