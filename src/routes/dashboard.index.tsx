import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Search, Target, Users, ArrowRight, Loader2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Leadly" },
      { name: "description", content: "Your Leadly dashboard." },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const leads = useQuery(api.leads.list, {});
  const campaigns = useQuery(api.campaigns.list);
  const stats = useQuery(api.leads.stats);

  if (leads === undefined || campaigns === undefined || stats === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Overview of your lead generation activity.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border bg-card p-6">
          <div className="text-4xl font-serif">{stats.total}</div>
          <div className="text-sm text-muted-foreground mt-1">Total leads</div>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <div className="text-4xl font-serif text-blue-600">{stats.new}</div>
          <div className="text-sm text-muted-foreground mt-1">New</div>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <div className="text-4xl font-serif text-yellow-600">{stats.contacted}</div>
          <div className="text-sm text-muted-foreground mt-1">Contacted</div>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <div className="text-4xl font-serif text-green-600">{stats.qualified}</div>
          <div className="text-sm text-muted-foreground mt-1">Qualified</div>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Campaigns
            </h2>
            <Link to="/campaigns" className="text-sm text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
          {campaigns.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">No campaigns yet.</div>
          ) : (
            <div className="space-y-2">
              {campaigns.slice(0, 3).map((c) => (
                <div
                  key={c._id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm">{c.name}</span>
                  <span className="text-xs capitalize text-muted-foreground">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Recent Leads
            </h2>
            <Link to="/leads" className="text-sm text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
          {leads.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">
              No leads yet.{" "}
              <Link to="/finder" className="underline">
                Find some leads
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {leads.slice(0, 5).map((l) => (
                <div
                  key={l._id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{l.company}</div>
                    {l.email && <div className="text-xs text-muted-foreground">{l.email}</div>}
                  </div>
                  <span className="text-xs capitalize text-muted-foreground">{l.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/finder"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
        >
          <Search className="h-4 w-4" />
          Find new leads
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
