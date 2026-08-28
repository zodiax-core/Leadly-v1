import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Target, Loader2 } from "lucide-react";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — Leadly" },
      { name: "description", content: "Manage your lead generation campaigns." },
    ],
  }),
  component: Campaigns,
});

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  running: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
};

function Campaigns() {
  const navigate = useNavigate();
  const campaigns = useQuery(api.campaigns.list);

  return (
    <DashboardShell>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl">Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your lead generation campaigns.
            </p>
          </div>
          <Button
            className="rounded-full"
            onClick={() => navigate({ to: "/finder" })}
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns === undefined ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
            </div>
          ) : campaigns.length === 0 ? (
            <Card className="rounded-3xl border-dashed col-span-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Create your first campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-3 py-8">
                  <Target className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    No campaigns yet. Click "New Campaign" to get started.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            campaigns.map((campaign) => (
              <Card key={campaign._id} className="rounded-3xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {campaign.description && (
                    <p className="text-sm text-muted-foreground">{campaign.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {campaign.sources.map((s) => (
                      <span key={s} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                        {s.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {campaign.location ? `${campaign.location} · ` : ""}
                    {campaign.query}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
