import { Link, useRouter, useLocation } from "@tanstack/react-router";
import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { LayoutDashboard, Search, Target, Users, Settings, LogOut, Loader2, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/finder", label: "Lead Finder", icon: Search },
  { to: "/leads-by-ai", label: "Leads By AI", icon: Sparkles },
  { to: "/campaigns", label: "Campaigns", icon: Target },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">Sign in required</h1>
        <p className="text-muted-foreground">Please sign in to access this page.</p>
        <Link
          to="/login"
          className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-60 border-r flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="font-serif text-xl italic">
            Lead<span className="not-italic font-sans font-medium">ly</span>
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={() => signOut().then(() => router.invalidate())}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition cursor-pointer bg-transparent border-none"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-end px-6">
          <button
            onClick={() => signOut().then(() => router.invalidate())}
            className="text-sm text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none"
          >
            Sign out
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
