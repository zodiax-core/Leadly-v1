import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ReactNode } from "react";

const convexUrl =
  import.meta.env.VITE_CONVEX_URL ||
  (typeof process !== "undefined" ? process.env.VITE_CONVEX_URL : undefined);

if (!convexUrl) {
  throw new Error("Missing VITE_CONVEX_URL environment variable");
}

const convexClient = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexAuthProvider client={convexClient}>{children}</ConvexAuthProvider>;
}
