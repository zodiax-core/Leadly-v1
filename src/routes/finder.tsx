import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MapPin, Filter, ExternalLink, Loader2 } from "lucide-react";

export const Route = createFileRoute("/finder")({
  head: () => ({
    meta: [
      { title: "Lead Finder — Leadly" },
      { name: "description", content: "Find new leads." },
    ],
  }),
  component: LeadFinder,
});

const sourceOptions = [
  { id: "google_search", label: "Google Search" },
  { id: "google_maps", label: "Google Maps" },
  { id: "yelp", label: "Yelp" },
  { id: "yellow_pages", label: "Yellow Pages" },
  { id: "facebook", label: "Facebook" },
  { id: "company_websites", label: "Company Websites" },
  { id: "bing", label: "Bing Search" },
] as const;

function LeadFinder() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(["google_search"]);
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLeads = useAction(api.finder.search);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await searchLeads({
        query: keyword.trim(),
        location: location.trim() || undefined,
        sources: selectedSources as any,
      });
      setResults(result.leads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl">
        <h1 className="text-4xl">Lead Finder</h1>
        <p className="text-muted-foreground mt-1">
          Search for leads across multiple sources.
        </p>

        <div className="mt-8 rounded-3xl border bg-card p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Industry, niche, or keywords..."
                className="pl-9"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location (city, state, or country)"
                className="pl-9"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Sources
            </p>
            <div className="flex flex-wrap gap-4">
              {sourceOptions.map((source) => (
                <label
                  key={source.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSources.includes(source.id)}
                    onCheckedChange={() => toggleSource(source.id)}
                  />
                  {source.label}
                </label>
              ))}
            </div>
          </div>

          <Button
            className="rounded-full"
            onClick={handleSearch}
            disabled={loading || !keyword.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {loading ? "Searching..." : "Find Leads"}
          </Button>

          {error && (
            <div className="rounded-xl bg-destructive/10 text-destructive text-sm p-3">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-3xl border bg-card">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-medium">
              Results {results ? `(${results.length})` : ""}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {results === null
                ? 'Enter your search criteria above and click "Find Leads" to get started.'
                : results.length === 0
                  ? "No leads found. Try adjusting your search criteria."
                  : `Found ${results.length} potential leads.`}
            </p>
          </div>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results === null || results.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-12"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {loading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
                        ) : (
                          <Search className="h-8 w-8 text-muted-foreground/50" />
                        )}
                        <p>
                          {loading
                            ? "Searching..."
                            : results === null
                              ? "No results yet"
                              : "No leads found"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  results.map((lead, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{lead.company}</TableCell>
                      <TableCell>
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {new URL(lead.website).hostname}
                          </a>
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.email ? (
                          <span className="text-sm">{lead.email}</span>
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.phone ? (
                          <span className="text-sm">{lead.phone}</span>
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs capitalize bg-secondary px-2 py-0.5 rounded-full">
                          {lead.source.replace(/_/g, " ")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
