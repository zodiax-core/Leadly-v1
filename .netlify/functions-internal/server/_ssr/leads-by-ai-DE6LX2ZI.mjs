import { i as __toESM } from "../_runtime.mjs";
import { a as useAction, l as require_jsx_runtime, o as useMutation, s as useQuery, u as require_react } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { A as ChevronDown, E as FileCode, F as PanelLeftOpen, I as PanelLeftClose, L as LoaderCircle, M as Bot, O as Download, P as Sparkles, S as Glasses, T as FileSpreadsheet, a as Trash2, c as Settings2, d as Plus, f as Phone, g as Mail, h as MapPin, k as Circle, l as Send, m as MessageSquare, o as Target, r as User, t as X, u as Search, w as FileText, x as Globe, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as DashboardShell } from "./DashboardShell-CRRQA_Ju.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-by-ai-DE6LX2ZI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INDUSTRIES = [
	"Technology & SaaS",
	"Healthcare & Biotech",
	"Finance & Banking",
	"E-commerce & Retail",
	"Manufacturing & Industrial",
	"Real Estate & Construction",
	"Education & E-Learning",
	"Marketing & Advertising",
	"Consulting & Professional Services",
	"Logistics & Supply Chain",
	"Energy & Utilities",
	"Hospitality & Travel",
	"Media & Entertainment",
	"Telecommunications",
	"Legal & Insurance",
	"Agriculture & Food",
	"Nonprofit & Government",
	"Automotive & Transportation"
];
var STEP_ICONS = {
	analyze: Glasses,
	search_web: Search,
	crawl: Globe,
	filter: Target
};
function LeadsByAI() {
	const discover = useAction(api.aiLeads.discover);
	const createRun = useMutation(api.leadRuns.create);
	const createChat = useMutation(api.chats.create);
	const addMessage = useMutation(api.chats.addMessage);
	const deleteChatMut = useMutation(api.chats.deleteChat);
	useMutation(api.chats.updateTitle);
	const chats = useQuery(api.chats.list);
	const [activeChatId, setActiveChatId] = (0, import_react.useState)(null);
	const activeChat = useQuery(api.chats.get, activeChatId ? { chatId: activeChatId } : "skip");
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [activeRunId, setActiveRunId] = (0, import_react.useState)(null);
	const [industry, setIndustry] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [showOptions, setShowOptions] = (0, import_react.useState)(false);
	const [showChatList, setShowChatList] = (0, import_react.useState)(true);
	const [localMessages, setLocalMessages] = (0, import_react.useState)([]);
	const chatEndRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const messages = activeChat?.messages ?? localMessages;
	const runStatus = useQuery(api.leadRuns.get, activeRunId ? { runId: activeRunId } : "skip");
	(0, import_react.useEffect)(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages,
		loading,
		runStatus
	]);
	(0, import_react.useEffect)(() => {
		if (chats && chats.length > 0 && !activeChatId) setActiveChatId(chats[0]._id);
	}, [chats, activeChatId]);
	const handleSend = async () => {
		const text = input.trim();
		if (!text || loading) return;
		setInput("");
		const userMsg = {
			role: "user",
			content: text,
			createdAt: Date.now()
		};
		try {
			let chatId = activeChatId;
			if (!chatId) {
				chatId = await createChat({ title: text.length > 60 ? text.substring(0, 57) + "..." : text });
				setActiveChatId(chatId);
			}
			await addMessage({
				chatId,
				message: userMsg
			});
			if (!activeChatId) {
				if (chats && chats.length > 0) setLocalMessages([]);
			}
			setLoading(true);
			const runId = await createRun({
				prompt: text,
				category: industry || void 0,
				targetLocation: location.trim() || void 0
			});
			setActiveRunId(runId);
			const result = await discover({
				prompt: text,
				category: industry || void 0,
				location: location.trim() || void 0,
				runId
			});
			if (!result) {
				const errorMsg = {
					role: "assistant",
					error: (await queryRun(runId))?.error || "Failed to generate leads. Please try again.",
					createdAt: Date.now()
				};
				await addMessage({
					chatId,
					message: errorMsg
				});
			} else {
				const assistantMsg = {
					role: "assistant",
					analysis: result.analysis,
					queries: result.queries,
					leads: result.leads,
					createdAt: Date.now()
				};
				await addMessage({
					chatId,
					message: assistantMsg
				});
			}
		} catch (err) {
			const chatId = activeChatId || await createChat({ title: text.length > 60 ? text.substring(0, 57) + "..." : text });
			if (!activeChatId) setActiveChatId(chatId);
			await addMessage({
				chatId,
				message: userMsg
			});
			await addMessage({
				chatId,
				message: {
					role: "assistant",
					error: err instanceof Error ? err.message : "Failed to generate leads",
					createdAt: Date.now()
				}
			});
		} finally {
			setLoading(false);
			setActiveRunId(null);
			inputRef.current?.focus();
		}
	};
	const queryRun = async (runId) => {
		try {
			const { fetchQuery } = await import("../_libs/@convex-dev/auth+[...].mjs").then((n) => n.c);
			const { api: generatedApi } = await import("./api-xr_VpTVu.mjs").then((n) => n.n).then((n) => n.n);
			return null;
		} catch {
			return null;
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};
	const handleNewChat = () => {
		setActiveChatId(null);
		setLocalMessages([]);
		setInput("");
		setActiveRunId(null);
		inputRef.current?.focus();
	};
	const handleDeleteChat = async (chatId) => {
		await deleteChatMut({ chatId });
		if (activeChatId === chatId) {
			setActiveChatId(null);
			setLocalMessages([]);
		}
	};
	const downloadXLSX = (leads) => {
		const wb = utils.book_new();
		const data = leads.map((l, i) => ({
			"#": i + 1,
			Company: l.company,
			Website: l.website,
			Email: l.email,
			Phone: l.phone,
			Location: l.location,
			Source: l.source,
			Score: l.fitScore?.total ?? ""
		}));
		const ws = utils.json_to_sheet(data);
		ws["!cols"] = [
			{ wch: 4 },
			{ wch: 30 },
			{ wch: 35 },
			{ wch: 35 },
			{ wch: 20 },
			{ wch: 25 },
			{ wch: 18 },
			{ wch: 8 }
		];
		utils.book_append_sheet(wb, ws, "Leads");
		writeFileSync(wb, "leads-by-ai.xlsx");
	};
	const downloadCSV = (leads) => {
		const rows = leads.map((l) => `"${l.company}","${l.website}","${l.email}","${l.phone}","${l.location}","${l.source}","${l.fitScore?.total ?? ""}"`).join("\n");
		downloadBlob(new Blob(["﻿Company,Website,Email,Phone,Location,Source,Score\n" + rows], { type: "text/csv;charset=utf-8" }), "leads-by-ai.csv");
	};
	const downloadMarkdown = (leads) => {
		const h = "# Leads By AI\n\n| # | Company | Website | Email | Phone | Location | Source | Score |\n|---|---|---|---|---|---|---|---|\n";
		const rows = leads.map((l, i) => `| ${i + 1} | ${l.company} | ${l.website} | ${l.email} | ${l.phone} | ${l.location} | ${l.source} | ${l.fitScore?.total ?? "—"} |`).join("\n");
		downloadBlob(new Blob([h + rows], { type: "text/markdown;charset=utf-8" }), "leads-by-ai.md");
	};
	const downloadText = (leads) => {
		const lines = leads.map((l, i) => `${i + 1}. ${l.company}\n   Website: ${l.website}\n   Email: ${l.email}\n   Phone: ${l.phone}\n   Location: ${l.location}\n   Source: ${l.source}\n   Score: ${l.fitScore?.total ?? "—"}\n`);
		downloadBlob(new Blob(["Leads By AI\n" + "=".repeat(40) + "\n\n" + lines.join("\n")], { type: "text/plain;charset=utf-8" }), "leads-by-ai.txt");
	};
	const downloadJSON = (leads) => {
		downloadBlob(new Blob([JSON.stringify(leads, null, 2)], { type: "application/json;charset=utf-8" }), "leads-by-ai.json");
	};
	const downloadBlob = (blob, filename) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};
	const steps = runStatus?.steps ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[calc(100vh-4rem)] flex -m-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `${showChatList && chats ? "w-64" : "w-0"} border-r flex flex-col shrink-0 transition-all overflow-hidden`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-b flex items-center justify-between shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted-foreground",
						children: "Chat History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowChatList(false),
						className: "rounded-md p-1 hover:bg-muted transition cursor-pointer bg-transparent border-none text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "h-3.5 w-3.5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleNewChat,
						className: "w-full flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer bg-transparent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New Chat"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-2 pb-2 space-y-0.5",
					children: [chats?.map((chat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group flex items-center gap-2 rounded-lg px-3 py-2 text-xs cursor-pointer transition ${activeChatId === chat._id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
						onClick: () => setActiveChatId(chat._id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate flex-1",
								children: chat.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									handleDeleteChat(chat._id);
								},
								className: `p-0.5 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer bg-transparent border-none ${activeChatId === chat._id ? "text-background/60 hover:text-background" : "text-muted-foreground hover:text-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
							})
						]
					}, chat._id)), chats && chats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-6 text-center text-xs text-muted-foreground",
						children: "No chats yet"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-6 py-3 border-b shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [
							!showChatList && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowChatList(true),
								className: "rounded-md p-1 hover:bg-muted transition cursor-pointer bg-transparent border-none text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-full bg-foreground flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-background" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-sm font-medium",
								children: "Leads By AI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "AI-powered lead discovery"
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowOptions(!showOptions),
						className: `rounded-full p-2 transition cursor-pointer border-none flex items-center gap-1.5 text-xs ${showOptions ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Options"
						})]
					})]
				}),
				showOptions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-b bg-muted/20 px-6 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: industry,
									onChange: (e) => setIndustry(e.target.value),
									className: "w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none focus:ring-2 ring-ring appearance-none cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "All industries"
									}), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: ind,
										children: ind
									}, ind))]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: location,
										onChange: (e) => setLocation(e.target.value),
										placeholder: "Location (optional)",
										className: "w-full rounded-lg border bg-background pl-8 pr-3 py-2 text-xs outline-none focus:ring-2 ring-ring"
									}),
									location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setLocation(""),
										className: "absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-muted-foreground" })
									})
								]
							}),
							industry || location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setIndustry("");
									setLocation("");
								},
								className: "text-xs text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none shrink-0",
								children: "Clear"
							}) : null
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-6 py-6 space-y-6",
					children: [
						messages.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center h-full text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-7 w-7 text-foreground/40" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-medium",
									children: "What leads are you looking for?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1 max-w-md",
									children: "Describe your brand, ideal customers, or target market. AI will search the web and find matching leads with contact info."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2 mt-6 max-w-lg",
									children: [
										"Find me SaaS companies with 50-200 employees hiring for VP of Sales",
										"I need fintech companies that recently raised Series A funding",
										"Find marketing agencies in London with 20+ employees",
										"E-commerce stores using Shopify with $1M+ revenue"
									].map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setInput(suggestion);
											inputRef.current?.focus();
										},
										className: "text-xs rounded-full border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer bg-transparent",
										children: suggestion
									}, suggestion))
								})
							]
						}),
						messages.map((msg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`,
							children: [
								msg.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 rounded-full bg-foreground shrink-0 mt-0.5 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4 text-background" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `max-w-[640px] ${msg.role === "user" ? "order-first" : ""}`,
									children: msg.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-2xl bg-foreground text-background px-4 py-2.5 text-sm",
										children: msg.content
									}) : msg.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-2xl bg-destructive/10 text-destructive px-4 py-3 text-sm",
										children: msg.error
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											msg.analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border bg-card p-4 space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " AI Analysis"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid sm:grid-cols-3 gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl bg-muted/50 p-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
																children: "Brand"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm leading-snug",
																children: msg.analysis.brandSummary
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl bg-muted/50 p-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
																children: "Target"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm leading-snug",
																children: msg.analysis.targetProfile
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-xl bg-muted/50 p-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
																children: "Strategy"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm leading-snug",
																children: msg.analysis.approach
															})]
														})
													]
												})]
											}),
											msg.queries && msg.queries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5",
												children: msg.queries.map((q, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] rounded-full bg-muted px-2.5 py-1 text-muted-foreground",
													children: q
												}, qi))
											}),
											msg.leads && msg.leads.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border bg-card overflow-hidden",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between px-4 py-2.5 border-b bg-muted/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-medium",
															children: [
																"Found ",
																msg.leads.length,
																" leads"
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => downloadXLSX(msg.leads),
																	className: "rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-3 w-3" }), " XLSX"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => downloadCSV(msg.leads),
																	className: "rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " CSV"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => downloadMarkdown(msg.leads),
																	className: "rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " MD"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => downloadText(msg.leads),
																	className: "rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " TXT"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => downloadJSON(msg.leads),
																	className: "rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "h-3 w-3" }), " JSON"]
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "divide-y",
														children: msg.leads.slice(0, 5).map((lead, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "px-4 py-3 hover:bg-muted/10 transition",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start justify-between gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "min-w-0 flex-1",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																				className: "text-sm font-medium truncate",
																				children: lead.company
																			}), lead.fitScore?.total ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: `text-[10px] rounded-full px-1.5 py-0.5 font-medium ${lead.fitScore.total >= 70 ? "bg-green-100 text-green-700" : lead.fitScore.total >= 40 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`,
																				children: lead.fitScore.total
																			}) : null]
																		}), lead.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
																			href: lead.website,
																			target: "_blank",
																			rel: "noopener noreferrer",
																			className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5 truncate",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3 shrink-0" }), lead.website.replace(/https?:\/\//, "").replace(/\/.*/, "")]
																		})]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground shrink-0",
																		children: lead.source.replace(/_/g, " ")
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5",
																	children: [
																		lead.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-1 text-xs text-muted-foreground",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3 shrink-0" }),
																				" ",
																				lead.email
																			]
																		}),
																		lead.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-1 text-xs text-muted-foreground",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3 shrink-0" }),
																				" ",
																				lead.phone
																			]
																		}),
																		lead.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-1 text-xs text-muted-foreground",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 shrink-0" }),
																				" ",
																				lead.location
																			]
																		})
																	]
																}),
																lead.outreachMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "mt-2 rounded-lg bg-muted/30 border p-2.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
																		children: "Outreach Draft"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "text-xs leading-relaxed",
																		children: lead.outreachMessage
																	})]
																})
															]
														}, li))
													}),
													msg.leads.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "px-4 py-2 border-t text-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs text-muted-foreground",
															children: [
																"+",
																msg.leads.length - 5,
																" more — download full list above"
															]
														})
													})
												]
											})
										]
									})
								}),
								msg.role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 rounded-full bg-muted shrink-0 mt-0.5 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" })
								})
							]
						}, i)),
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-full bg-foreground shrink-0 mt-0.5 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4 text-background" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border bg-card p-4 min-w-[280px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium",
										children: "Working on your request..."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: steps.map((step) => {
										const Icon = STEP_ICONS[step.id] || Circle;
										const isActive = step.status === "active";
										const isDone = step.status === "done";
										const isError = step.status === "error";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-start gap-2.5 text-xs ${isDone ? "text-green-600" : isError ? "text-destructive" : isActive ? "text-foreground" : "text-muted-foreground/50"}`,
											children: [isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 mt-0.5 shrink-0" }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mt-0.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 mt-0.5 shrink-0 ${isActive ? "animate-pulse" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium",
													children: step.label
												}), step.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-muted-foreground truncate mt-0.5",
													children: step.detail
												})]
											})]
										}, step.id);
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: chatEndRef })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 border-t px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl mx-auto flex items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: inputRef,
								value: input,
								onChange: (e) => setInput(e.target.value),
								onKeyDown: handleKeyDown,
								placeholder: "Describe your brand or ideal leads...",
								rows: 1,
								className: "w-full rounded-xl border bg-background px-4 py-3 pr-12 text-sm outline-none focus:ring-2 ring-ring resize-none",
								style: {
									minHeight: 44,
									maxHeight: 120
								},
								onInput: (e) => {
									const el = e.currentTarget;
									el.style.height = "auto";
									el.style.height = Math.min(el.scrollHeight, 120) + "px";
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleSend,
							disabled: loading || !input.trim(),
							className: "h-11 w-11 rounded-xl bg-foreground text-background flex items-center justify-center hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground text-center mt-2",
						children: "Searches Google Search + Maps, crawls websites for contact info. Results may vary — verify before reaching out."
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { LeadsByAI as component };
