import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAction, useMutation, useQuery, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { DashboardShell } from "@/components/DashboardShell";
import {
  Sparkles, Send, Globe, Mail, Phone, MapPin, ChevronDown,
  Download, FileSpreadsheet, FileText, FileCode, Bot, User,
  Settings2, X, CheckCircle2, Loader2, Circle, Search, Target, Glasses,
  Trash2, Plus, MessageSquare, PanelLeftOpen, PanelLeftClose,
} from "lucide-react";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/leads-by-ai")({
  head: () => ({
    meta: [
      { title: "Leads By AI — Leadly" },
      {
        name: "description",
        content: "Use AI to discover and analyze leads for your business based on your brand description.",
      },
    ],
  }),
  component: LeadsByAI,
});

const INDUSTRIES = [
  "Technology & SaaS", "Healthcare & Biotech", "Finance & Banking",
  "E-commerce & Retail", "Manufacturing & Industrial", "Real Estate & Construction",
  "Education & E-Learning", "Marketing & Advertising", "Consulting & Professional Services",
  "Logistics & Supply Chain", "Energy & Utilities", "Hospitality & Travel",
  "Media & Entertainment", "Telecommunications", "Legal & Insurance",
  "Agriculture & Food", "Nonprofit & Government", "Automotive & Transportation",
] as const;

type Lead = {
  company: string; website: string; email: string; phone: string;
  location: string; source: string; snippet: string;
  fitScore?: { relevance: number; reachability: number; signal_strength: number; data_confidence: number; total: number };
  outreachMessage?: string; notes?: string;
};

type Analysis = { brandSummary: string; targetProfile: string; approach: string };

type Step = { id: string; label: string; status: string; detail?: string };

type Message = {
  role: "user" | "assistant";
  content?: string;
  analysis?: Analysis;
  queries?: string[];
  leads?: Lead[];
  error?: string;
  runId?: Id<"leadGenerationRuns">;
  createdAt: number;
};

const STEP_ICONS: Record<string, typeof Sparkles> = {
  analyze: Glasses,
  search_web: Search,
  crawl: Globe,
  filter: Target,
};

function LeadsByAI() {
  const convex = useConvex();
  const discover = useAction(api.aiLeads.discover);
  const createRun = useMutation(api.leadRuns.create);
  const createChat = useMutation(api.chats.create);
  const addMessage = useMutation(api.chats.addMessage);
  const deleteChatMut = useMutation(api.chats.deleteChat);
  const updateTitle = useMutation(api.chats.updateTitle);

  const chats = useQuery(api.chats.list);
  const [activeChatId, setActiveChatId] = useState<Id<"chats"> | null>(null);
  const activeChat = useQuery(
    api.chats.get,
    activeChatId ? { chatId: activeChatId } : "skip"
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRunId, setActiveRunId] = useState<Id<"leadGenerationRuns"> | null>(null);
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages: Message[] = activeChat?.messages ?? localMessages;

  const runStatus = useQuery(
    api.leadRuns.get,
    activeRunId ? { runId: activeRunId } : "skip"
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, runStatus]);

  useEffect(() => {
    if (chats && chats.length > 0 && !activeChatId) {
      setActiveChatId(chats[0]._id);
    }
  }, [chats, activeChatId]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const now = Date.now();
    const userMsg: Message = { role: "user", content: text, createdAt: now };

    try {
      let chatId = activeChatId;

      if (!chatId) {
        const title = text.length > 60 ? text.substring(0, 57) + "..." : text;
        chatId = await createChat({ title });
        setActiveChatId(chatId);
      }

      await addMessage({ chatId, message: userMsg });
      if (!activeChatId) {
        if (chats && chats.length > 0) {
          setLocalMessages([]);
        }
      }

      setLoading(true);

      const runId = await createRun({
        prompt: text,
        category: industry || undefined,
        targetLocation: location.trim() || undefined,
      });
      setActiveRunId(runId);

      const result = await discover({
        prompt: text,
        category: industry || undefined,
        location: location.trim() || undefined,
        runId,
      });

      if (!result) {
        const finalRun = await queryRun(runId);
        const errorMsg: Message = {
          role: "assistant",
          error: finalRun?.error || "Failed to generate leads. Please try again.",
          createdAt: Date.now(),
        };
        await addMessage({ chatId, message: errorMsg });
      } else {
        const assistantMsg: Message = {
          role: "assistant",
          analysis: result.analysis as Analysis,
          queries: result.queries,
          leads: result.leads as Lead[],
          createdAt: Date.now(),
        };
        await addMessage({ chatId, message: assistantMsg });
      }
    } catch (err) {
      const chatId = activeChatId || (await createChat({ title: text.length > 60 ? text.substring(0, 57) + "..." : text }));
      if (!activeChatId) setActiveChatId(chatId);
      await addMessage({ chatId, message: userMsg });
      const errorMsg: Message = {
        role: "assistant",
        error: err instanceof Error ? err.message : "Failed to generate leads",
        createdAt: Date.now(),
      };
      await addMessage({ chatId, message: errorMsg });
    } finally {
      setLoading(false);
      setActiveRunId(null);
      inputRef.current?.focus();
    }
  };

  const queryRun = async (runId: Id<"leadGenerationRuns">): Promise<any> => {
    try {
      return await convex.query(api.leadRuns.get, { runId });
    } catch {
      return null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setLocalMessages([]);
    setInput("");
    setActiveRunId(null);
    inputRef.current?.focus();
  };

  const handleDeleteChat = async (chatId: Id<"chats">) => {
    await deleteChatMut({ chatId });
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setLocalMessages([]);
    }
  };

  const downloadXLSX = (leads: Lead[]) => {
    const wb = XLSX.utils.book_new();
    const data = leads.map((l, i) => ({
      "#": i + 1, Company: l.company, Website: l.website, Email: l.email, Phone: l.phone,
      Location: l.location, Source: l.source, Score: l.fitScore?.total ?? "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 35 }, { wch: 35 }, { wch: 20 }, { wch: 25 }, { wch: 18 }, { wch: 8 }];
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads-by-ai.xlsx");
  };

  const downloadCSV = (leads: Lead[]) => {
    const headers = "Company,Website,Email,Phone,Location,Source,Score\n";
    const rows = leads.map((l) => `"${l.company}","${l.website}","${l.email}","${l.phone}","${l.location}","${l.source}","${l.fitScore?.total ?? ""}"`).join("\n");
    const blob = new Blob(["\ufeff" + headers + rows], { type: "text/csv;charset=utf-8" });
    downloadBlob(blob, "leads-by-ai.csv");
  };

  const downloadMarkdown = (leads: Lead[]) => {
    const h = "# Leads By AI\n\n| # | Company | Website | Email | Phone | Location | Source | Score |\n|---|---|---|---|---|---|---|---|\n";
    const rows = leads.map((l, i) => `| ${i + 1} | ${l.company} | ${l.website} | ${l.email} | ${l.phone} | ${l.location} | ${l.source} | ${l.fitScore?.total ?? "—"} |`).join("\n");
    downloadBlob(new Blob([h + rows], { type: "text/markdown;charset=utf-8" }), "leads-by-ai.md");
  };

  const downloadText = (leads: Lead[]) => {
    const lines = leads.map((l, i) => `${i + 1}. ${l.company}\n   Website: ${l.website}\n   Email: ${l.email}\n   Phone: ${l.phone}\n   Location: ${l.location}\n   Source: ${l.source}\n   Score: ${l.fitScore?.total ?? "—"}\n`);
    downloadBlob(new Blob(["Leads By AI\n" + "=".repeat(40) + "\n\n" + lines.join("\n")], { type: "text/plain;charset=utf-8" }), "leads-by-ai.txt");
  };

  const downloadJSON = (leads: Lead[]) => {
    downloadBlob(new Blob([JSON.stringify(leads, null, 2)], { type: "application/json;charset=utf-8" }), "leads-by-ai.json");
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const steps: Step[] = runStatus?.steps ?? [];

  return (
    <DashboardShell>
      <div className="h-[calc(100vh-4rem)] flex -m-6">
        <div className={`${showChatList && chats ? "w-64" : "w-0"} border-r flex flex-col shrink-0 transition-all overflow-hidden`}>
          <div className="p-3 border-b flex items-center justify-between shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Chat History</span>
            <button
              onClick={() => setShowChatList(false)}
              className="rounded-md p-1 hover:bg-muted transition cursor-pointer bg-transparent border-none text-muted-foreground"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer bg-transparent"
            >
              <Plus className="h-3.5 w-3.5" />
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {chats?.map((chat) => (
              <div
                key={chat._id}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-xs cursor-pointer transition ${
                  activeChatId === chat._id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveChatId(chat._id)}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate flex-1">{chat.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat._id); }}
                  className={`p-0.5 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer bg-transparent border-none ${
                    activeChatId === chat._id ? "text-background/60 hover:text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {chats && chats.length === 0 && (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">No chats yet</div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-6 py-3 border-b shrink-0">
            <div className="flex items-center gap-2.5">
              {!showChatList && (
                <button
                  onClick={() => setShowChatList(true)}
                  className="rounded-md p-1 hover:bg-muted transition cursor-pointer bg-transparent border-none text-muted-foreground"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              )}
              <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-background" />
              </div>
              <div>
                <h1 className="text-sm font-medium">Leads By AI</h1>
                <p className="text-xs text-muted-foreground">AI-powered lead discovery</p>
              </div>
            </div>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className={`rounded-full p-2 transition cursor-pointer border-none flex items-center gap-1.5 text-xs ${
                showOptions ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Options</span>
            </button>
          </div>

          {showOptions && (
            <div className="shrink-0 border-b bg-muted/20 px-6 py-3">
              <div className="flex items-center gap-3 max-w-2xl">
                <div className="flex-1 relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none focus:ring-2 ring-ring appearance-none cursor-pointer"
                  >
                    <option value="">All industries</option>
                    {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location (optional)"
                    className="w-full rounded-lg border bg-background pl-8 pr-3 py-2 text-xs outline-none focus:ring-2 ring-ring"
                  />
                  {location && (
                    <button onClick={() => setLocation("")} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </button>
                  )}
                </div>
                {(industry || location) ? (
                  <button onClick={() => { setIndustry(""); setLocation(""); }} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none shrink-0">
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="h-14 w-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-foreground/40" />
                </div>
                <h2 className="text-lg font-medium">What leads are you looking for?</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Describe your brand, ideal customers, or target market. AI will search the web
                  and find matching leads with contact info.
                </p>
                <div className="flex flex-wrap gap-2 mt-6 max-w-lg">
                  {[
                    "Find me SaaS companies with 50-200 employees hiring for VP of Sales",
                    "I need fintech companies that recently raised Series A funding",
                    "Find marketing agencies in London with 20+ employees",
                    "E-commerce stores using Shopify with $1M+ revenue",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}
                      className="text-xs rounded-full border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer bg-transparent"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-foreground shrink-0 mt-0.5 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-background" />
                  </div>
                )}
                <div className={`max-w-[640px] ${msg.role === "user" ? "order-first" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="rounded-2xl bg-foreground text-background px-4 py-2.5 text-sm">{msg.content}</div>
                  ) : msg.error ? (
                    <div className="rounded-2xl bg-destructive/10 text-destructive px-4 py-3 text-sm">{msg.error}</div>
                  ) : (
                    <div className="space-y-4">
                      {msg.analysis && (
                        <div className="rounded-2xl border bg-card p-4 space-y-3">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                            <Sparkles className="h-3.5 w-3.5" /> AI Analysis
                          </div>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div className="rounded-xl bg-muted/50 p-3">
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Brand</div>
                              <div className="text-sm leading-snug">{msg.analysis.brandSummary}</div>
                            </div>
                            <div className="rounded-xl bg-muted/50 p-3">
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target</div>
                              <div className="text-sm leading-snug">{msg.analysis.targetProfile}</div>
                            </div>
                            <div className="rounded-xl bg-muted/50 p-3">
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Strategy</div>
                              <div className="text-sm leading-snug">{msg.analysis.approach}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {msg.queries && msg.queries.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {msg.queries.map((q, qi) => (
                            <span key={qi} className="text-[11px] rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{q}</span>
                          ))}
                        </div>
                      )}
                      {msg.leads && msg.leads.length > 0 && (
                        <div className="rounded-2xl border bg-card overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/20">
                            <span className="text-xs font-medium">Found {msg.leads.length} leads</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => downloadXLSX(msg.leads!)} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none"><FileSpreadsheet className="h-3 w-3" /> XLSX</button>
                              <button onClick={() => downloadCSV(msg.leads!)} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none"><Download className="h-3 w-3" /> CSV</button>
                              <button onClick={() => downloadMarkdown(msg.leads!)} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none"><FileText className="h-3 w-3" /> MD</button>
                              <button onClick={() => downloadText(msg.leads!)} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none"><FileText className="h-3 w-3" /> TXT</button>
                              <button onClick={() => downloadJSON(msg.leads!)} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none"><FileCode className="h-3 w-3" /> JSON</button>
                            </div>
                          </div>
                          <div className="divide-y">
                            {msg.leads.slice(0, 5).map((lead, li) => (
                              <div key={li} className="px-4 py-3 hover:bg-muted/10 transition">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm font-medium truncate">{lead.company}</div>
                                      {lead.fitScore?.total ? (
                                        <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-medium ${
                                          lead.fitScore.total >= 70 ? "bg-green-100 text-green-700" :
                                          lead.fitScore.total >= 40 ? "bg-yellow-100 text-yellow-700" :
                                          "bg-gray-100 text-gray-500"
                                        }`}>{lead.fitScore.total}</span>
                                      ) : null}
                                    </div>
                                    {lead.website && (
                                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5 truncate">
                                        <Globe className="h-3 w-3 shrink-0" />
                                        {lead.website.replace(/https?:\/\//, "").replace(/\/.*/, "")}
                                      </a>
                                    )}
                                  </div>
                                  <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground shrink-0">
                                    {lead.source.replace(/_/g, " ")}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
                                  {lead.email && <div className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3 shrink-0" /> {lead.email}</div>}
                                  {lead.phone && <div className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3 shrink-0" /> {lead.phone}</div>}
                                  {lead.location && <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" /> {lead.location}</div>}
                                </div>
                                {lead.outreachMessage && (
                                  <div className="mt-2 rounded-lg bg-muted/30 border p-2.5">
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Outreach Draft</div>
                                    <div className="text-xs leading-relaxed">{lead.outreachMessage}</div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {msg.leads.length > 5 && (
                            <div className="px-4 py-2 border-t text-center">
                              <span className="text-xs text-muted-foreground">+{msg.leads.length - 5} more — download full list above</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted shrink-0 mt-0.5 flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-foreground shrink-0 mt-0.5 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-background" />
                </div>
                <div className="rounded-2xl border bg-card p-4 min-w-[280px]">
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-xs font-medium">Working on your request...</span>
                  </div>
                  <div className="space-y-2">
                    {steps.map((step) => {
                      const Icon = STEP_ICONS[step.id] || Circle;
                      const isActive = step.status === "active";
                      const isDone = step.status === "done";
                      const isError = step.status === "error";
                      return (
                        <div
                          key={step.id}
                          className={`flex items-start gap-2.5 text-xs ${
                            isDone ? "text-green-600" : isError ? "text-destructive" : isActive ? "text-foreground" : "text-muted-foreground/50"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          ) : isError ? (
                            <X className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          ) : (
                            <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isActive ? "animate-pulse" : ""}`} />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{step.label}</div>
                            {step.detail && (
                              <div className="text-muted-foreground truncate mt-0.5">{step.detail}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="shrink-0 border-t px-6 py-4">
            <div className="max-w-2xl mx-auto flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your brand or ideal leads..."
                  rows={1}
                  className="w-full rounded-xl border bg-background px-4 py-3 pr-12 text-sm outline-none focus:ring-2 ring-ring resize-none"
                  style={{ minHeight: 44, maxHeight: 120 }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = Math.min(el.scrollHeight, 120) + "px";
                  }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="h-11 w-11 rounded-xl bg-foreground text-background flex items-center justify-center hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Searches Google Search + Maps, crawls websites for contact info. Results may vary — verify before reaching out.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
