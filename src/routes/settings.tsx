import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DashboardShell } from "@/components/DashboardShell";
import { Input } from "@/components/ui/input";
import { User, Key, Moon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Leadly" },
      { name: "description", content: "Manage your account settings." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <DashboardShell>
      <div className="max-w-3xl">
        <h1 className="text-4xl">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and integrations.</p>

        <div className="mt-8 space-y-8">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Profile
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <Input placeholder="Your name" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input placeholder="you@company.com" className="mt-1" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              API Keys
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your API keys for lead finding and enrichment.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">OpenRouter API Key</label>
                <Input type="password" placeholder="sk-or-v1-..." className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Serper API Key</label>
                <Input type="password" placeholder="..." className="mt-1" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              Appearance
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Theme preferences coming soon.</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
