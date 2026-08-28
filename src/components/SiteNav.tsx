import { Link } from "@tanstack/react-router";

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const linkBase =
    variant === "light"
      ? "text-foreground/80 hover:text-foreground"
      : "text-white/80 hover:text-white";
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass-pill flex items-center gap-2 rounded-full pl-5 pr-2 py-2 w-full max-w-3xl">
        <Link to="/" className="font-serif text-xl italic mr-auto">
          Lead<span className="not-italic font-sans font-medium">ly</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm">
          {[
            { to: "/pricing", label: "Pricing" },
            { to: "/docs", label: "Docs" },
            { to: "/careers", label: "Careers" },
            { to: "/blog", label: "Blog" },
            { to: "/login", label: "Login" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-full transition ${linkBase}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          to="/login"
          className="ml-2 inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Get started
        </Link>
      </nav>
    </header>
  );
}
