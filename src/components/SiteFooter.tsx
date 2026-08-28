import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const cols = [
    {
      heading: "Product",
      links: [
        { to: "/", label: "Home" },
        { to: "/pricing", label: "Pricing" },
        { to: "/login", label: "Login" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { to: "/docs", label: "Docs" },
        { to: "/blog", label: "Blog" },
      ],
    },
    {
      heading: "Company",
      links: [
        { to: "/careers", label: "Careers" },
        { to: "/blog", label: "Contact" },
      ],
    },
  ];
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="font-serif italic text-3xl">
              Lead<span className="not-italic font-sans font-medium">ly</span>
            </div>
            <p className="mt-3 text-sm text-background/60 max-w-xs">
              Turn visitors into qualified leads on autopilot.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.heading}>
              <h4 className="font-sans text-xs uppercase tracking-widest text-background/50 mb-4">
                {c.heading}
              </h4>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-background/80 hover:text-background">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/50">
          <div>© {new Date().getFullYear()} Leadly. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Twitter</span>
            <span>LinkedIn</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
