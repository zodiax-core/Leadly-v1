import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Leadly" },
      { name: "description", content: "Help us build the future of lead generation. We're hiring across engineering, design, and growth." },
    ],
  }),
  component: Careers,
});

const roles = [
  { title: "Founding Engineer", team: "Engineering", location: "Remote (US/EU)" },
  { title: "Product Designer", team: "Design", location: "Remote" },
  { title: "Growth Marketer", team: "Marketing", location: "New York" },
  { title: "AI Research Engineer", team: "AI", location: "Remote" },
  { title: "Customer Success Lead", team: "Success", location: "London" },
  { title: "Developer Advocate", team: "Community", location: "Remote" },
];

function Careers() {
  return (
    <div>
      <SiteNav />
      <section className="pt-40 pb-20 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-7xl">
          Build the future of <span className="italic">pipeline</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Small team. Big ambitions. We're rewriting how every business turns
          attention into revenue.
        </p>
      </section>

      <section className="px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            ["Remote-first", "Work from anywhere. We meet in person twice a year."],
            ["Real ownership", "Meaningful equity from day one. We win as a team."],
            ["High craft", "Small team that ships fast. No politics, no busywork."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border p-8 bg-card">
              <div className="font-serif text-2xl">{t}</div>
              <p className="text-muted-foreground mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl mb-6">Open roles</h2>
        <div className="border rounded-3xl bg-card divide-y overflow-hidden">
          {roles.map((r) => (
            <div
              key={r.title}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-6 hover:bg-secondary/60 cursor-pointer transition"
            >
              <div>
                <div className="font-serif text-xl">{r.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {r.team} · {r.location}
                </div>
              </div>
              <button className="rounded-full border px-5 py-2 text-sm hover:bg-foreground hover:text-background transition self-start md:self-auto">
                Apply →
              </button>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
