import { useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ReactNode } from "react";

function getConvexUrl(): string {
  const url =
    import.meta.env.VITE_CONVEX_URL ||
    (typeof process !== "undefined" ? process.env.VITE_CONVEX_URL : undefined);
  if (!url) throw new Error("Missing VITE_CONVEX_URL environment variable");
  return url;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new ConvexReactClient(getConvexUrl()));
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
