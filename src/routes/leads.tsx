import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DashboardShell } from "@/components/DashboardShell";
import {
  Search, Users, Loader2, ExternalLink, Globe, Mail, Phone,
  MapPin, Download, FileSpreadsheet, FileText, FileCode, ChevronDown,
} from "lucide-react";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Leadly" },
      { name: "description", content: "View and manage your leads." },
    ],
  }),
  component: Leads,
});

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  qualified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  converted: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  unqualified: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const DATE_RANGES = [
  { label: "All time", value: "" },
  { label: "Today", value: "today" },
  { label: "This week", value: "week" },
  { label: "This month", value: "month" },
  { label: "This quarter", value: "quarter" },
  { label: "This year", value: "year" },
] as const;

function Leads() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const leads = useQuery(api.leads.list, { search: search || undefined, dateRange: dateRange || undefined });
  const stats = useQuery(api.leads.stats);

  const downloadXLSX = () => {
    if (!leads) return;
    const wb = XLSX.utils.book_new();
    const data = leads.map((l, i) => ({
      "#": i + 1,
      Company: l.company,
      Website: l.website || "",
      Email: l.email || "",
      Phone: l.phone || "",
      Location: l.location || "",
      Source: l.source,
      Status: l.status,
      Score: l.score ?? "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [
      { wch: 4 }, { wch: 30 }, { wch: 35 }, { wch: 35 },
      { wch: 20 }, { wch: 25 }, { wch: 14 }, { wch: 8 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
  };

  const downloadCSV = () => {
    if (!leads) return;
    const headers = "Company,Website,Email,Phone,Location,Source,Status,Score\n";
    const rows = leads.map((l) =>
      `"${l.company}","${l.website || ""}","${l.email || ""}","${l.phone || ""}","${l.location || ""}","${l.source}","${l.status}","${l.score ?? ""}"`
    ).join("\n");
    const blob = new Blob(["\ufeff" + headers + rows], { type: "text/csv;charset=utf-8" });
    downloadBlob(blob, "leads.csv");
  };

  const downloadMarkdown = () => {
    if (!leads) return;
    const header = "# Leads\n\n";
    const tableHeader = "| # | Company | Website | Email | Phone | Location | Source | Status | Score |\n|---|---|---|---|---|---|---|---|---|\n";
    const rows = leads.map((l, i) =>
      `| ${i + 1} | ${l.company} | ${l.website || "—"} | ${l.email || "—"} | ${l.phone || "—"} | ${l.location || "—"} | ${l.source} | ${l.status} | ${l.score ?? "—"} |`
    ).join("\n");
    const blob = new Blob([header + tableHeader + rows], { type: "text/markdown;charset=utf-8" });
    downloadBlob(blob, "leads.md");
  };

  const downloadText = () => {
    if (!leads) return;
    const lines = leads.map((l, i) =>
      `${i + 1}. ${l.company}\n   Website: ${l.website || "—"}\n   Email: ${l.email || "—"}\n   Phone: ${l.phone || "—"}\n   Location: ${l.location || "—"}\n   Source: ${l.source}\n   Status: ${l.status}\n   Score: ${l.score ?? "—"}\n`
    );
    const blob = new Blob(["Leads\n" + "=".repeat(40) + "\n\n" + lines.join("\n")], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, "leads.txt");
  };

  const downloadJSON = () => {
    if (!leads) return;
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json;charset=utf-8" });
    downloadBlob(blob, "leads.json");
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl">
        <h1 className="text-4xl">Leads</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your leads in one place.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats?.total ?? 0 },
            { label: "New", value: stats?.new ?? 0, color: "text-blue-600" },
            { label: "Contacted", value: stats?.contacted ?? 0, color: "text-yellow-600" },
            { label: "Qualified", value: stats?.qualified ?? 0, color: "text-green-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border bg-card p-5">
              <div className={`text-3xl font-serif ${stat.color ?? ""}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border bg-card">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search by company, email, or location..."
                className="w-full rounded-xl border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 ring-ring"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring appearance-none cursor-pointer pr-8"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {leads && leads.length > 0 && (
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-xs text-muted-foreground mr-1">Download:</span>
                <button onClick={downloadXLSX} className="rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none">
                  <FileSpreadsheet className="h-3 w-3" /> XLSX
                </button>
                <button onClick={downloadCSV} className="rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none">
                  <Download className="h-3 w-3" /> CSV
                </button>
                <button onClick={downloadMarkdown} className="rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none">
                  <FileText className="h-3 w-3" /> MD
                </button>
                <button onClick={downloadText} className="rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none">
                  <FileText className="h-3 w-3" /> TXT
                </button>
                <button onClick={downloadJSON} className="rounded-md bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80 transition flex items-center gap-1 cursor-pointer border-none">
                  <FileCode className="h-3 w-3" /> JSON
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Score</th>
                </tr>
              </thead>
              <tbody>
                {leads === undefined ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground/50" />
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted-foreground py-16">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground/50" />
                        <p>No leads yet</p>
                        <p className="text-sm">Leads will appear here once you find them.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="border-b last:border-0 hover:bg-muted/10 transition">
                      <td className="px-4 py-3">
                        <div className="font-medium flex items-center gap-1.5">
                          {lead.company}
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        {lead.website && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Globe className="h-3 w-3" />
                            {lead.website.replace(/https?:\/\//, "").replace(/\/.*/, "")}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {lead.email ? (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                            {lead.email}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {lead.phone ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                            {lead.phone}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {lead.location ? (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                            {lead.location}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                          {lead.source.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${statusStyles[lead.status] || ""}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={lead.score && lead.score >= 50 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                          {lead.score ?? "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
