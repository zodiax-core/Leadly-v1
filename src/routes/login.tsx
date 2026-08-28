import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import heroSky from "@/assets/hero-sky.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Leadly" },
      {
        name: "description",
        content: "Sign in to your Leadly account to manage funnels and leads.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: mode });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src={heroSky} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/30 to-transparent" />
        <Link to="/" className="absolute top-8 left-8 font-serif text-2xl italic text-white">
          Lead<span className="not-italic font-sans font-medium">ly</span>
        </Link>
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-serif text-3xl italic max-w-md leading-snug">
            "Leadly turned our blog into our #1 source of qualified pipeline."
          </p>
          <div className="mt-4 text-sm opacity-80">— Alisha, Head of Growth at Kiro</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="md:hidden font-serif text-2xl italic block mb-8">
            Lead<span className="not-italic font-sans font-medium">ly</span>
          </Link>
          <h1 className="text-4xl">{mode === "signIn" ? "Welcome back" : "Create account"}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {mode === "signIn"
              ? "Sign in to continue to your dashboard."
              : "Get started with your free account."}
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-destructive/10 text-destructive text-sm p-3">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-xl border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 ring-ring"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground">Password</label>
                {mode === "signIn" && (
                  <a className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                    Forgot?
                  </a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 ring-ring"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : mode === "signIn" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            {mode === "signIn" ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signUp");
                    setError(null);
                  }}
                  className="text-foreground underline cursor-pointer bg-transparent border-none p-0"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signIn");
                    setError(null);
                  }}
                  className="text-foreground underline cursor-pointer bg-transparent border-none p-0"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
