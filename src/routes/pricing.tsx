import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Leadly" },
      { name: "description", content: "Simple, transparent pricing for teams capturing leads at any scale." },
      { property: "og:title", content: "Pricing — Leadly" },
      { property: "og:description", content: "Simple, transparent pricing." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Starter",
    price: "$0",
    sub: "Forever free",
    features: ["1 funnel", "100 leads / mo", "Email notifications", "Basic AI scoring"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    sub: "per month",
    features: ["Unlimited funnels", "10,000 leads / mo", "All integrations", "AI enrichment + scoring", "Slack & SMS"],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    sub: "Talk to sales",
    features: ["Unlimited leads", "SSO + SAML", "Dedicated success", "SLA + audit logs", "Custom AI models"],
    cta: "Contact sales",
    featured: false,
  },
];

function Pricing() {
  return (
    <div>
      <SiteNav />
      <section className="pt-40 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-7xl">
          Simple, <span className="italic">honest</span> pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Start free. Upgrade when you're ready. Cancel anytime.
        </p>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-8 border ${
                t.featured
                  ? "bg-foreground text-background border-foreground shadow-2xl scale-[1.02]"
                  : "bg-card"
              }`}
            >
              <div className="font-serif text-3xl">{t.name}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-serif">{t.price}</span>
                <span className={t.featured ? "text-background/70" : "text-muted-foreground"}>
                  {t.sub}
                </span>
              </div>
              <button
                className={`mt-6 w-full rounded-full py-3 text-sm font-medium transition ${
                  t.featured
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {t.cta}
              </button>
              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-4xl text-center">Questions</h2>
          <div className="mt-8 divide-y border-y">
            {[
              ["Is there really a free plan?", "Yes. 100 leads a month, forever. No card required."],
              ["Can I cancel anytime?", "Cancel in one click. You keep access until the end of the period."],
              ["Do you offer discounts for startups?", "50% off Growth for our first year if you're under $1M ARR."],
              ["Where is my data stored?", "EU and US regions. SOC 2 Type II. GDPR compliant."],
            ].map(([q, a]) => (
              <details key={q} className="py-5 group">
                <summary className="cursor-pointer flex justify-between items-center font-medium">
                  {q}
                  <span className="text-muted-foreground group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
