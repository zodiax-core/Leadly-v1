import { useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ReactNode } from "react";

// Fallback URL ensures SSR never throws even if env var is missing at build time
function getConvexUrl(): string {
  return import.meta.env.VITE_CONVEX_URL || "https://tremendous-elephant-255.convex.cloud";
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new ConvexReactClient(getConvexUrl()));
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
