import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Leadly" },
      {
        name: "description",
        content: "Playbooks, product updates, and growth experiments from the Leadly team.",
      },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    tag: "Playbook",
    title: "The 7-question demo qualifier that doubled our SQLs",
    date: "Jun 24, 2026",
    read: "6 min",
    grad: "from-rose-200 to-orange-200",
  },
  {
    tag: "Product",
    title: "Introducing AI Routing — leads find the right rep, automatically",
    date: "Jun 18, 2026",
    read: "4 min",
    grad: "from-sky-200 to-indigo-200",
  },
  {
    tag: "Growth",
    title: "Why your landing page form is leaking 60% of leads",
    date: "Jun 10, 2026",
    read: "8 min",
    grad: "from-emerald-200 to-teal-200",
  },
  {
    tag: "Engineering",
    title: "How we built real-time enrichment in under 200ms",
    date: "May 30, 2026",
    read: "11 min",
    grad: "from-amber-200 to-pink-200",
  },
  {
    tag: "Playbook",
    title: "The cold email teardown: 12 wins, 4 disasters",
    date: "May 22, 2026",
    read: "9 min",
    grad: "from-violet-200 to-fuchsia-200",
  },
  {
    tag: "Story",
    title: "From 0 to 10k leads/mo: how Bloom Realty did it",
    date: "May 14, 2026",
    read: "7 min",
    grad: "from-lime-200 to-emerald-200",
  },
];

function Blog() {
  const [featured, ...rest] = posts;
  return (
    <div>
      <SiteNav />
      <section className="pt-40 pb-12 px-6 max-w-6xl mx-auto">
        <div className="text-sm uppercase tracking-widest text-muted-foreground">Blog</div>
        <h1 className="mt-3 text-6xl md:text-7xl">Notes from the field</h1>
      </section>

      <section className="px-6 max-w-6xl mx-auto">
        <article className="grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden border bg-card cursor-pointer hover:shadow-xl transition">
          <div className={`h-72 md:h-full bg-gradient-to-br ${featured.grad}`} />
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {featured.tag} · Featured
            </div>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">{featured.title}</h2>
            <div className="mt-4 text-sm text-muted-foreground">
              {featured.date} · {featured.read} read
            </div>
          </div>
        </article>

        <div className="mt-12 grid md:grid-cols-3 gap-6 pb-32">
          {rest.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl overflow-hidden border bg-card cursor-pointer hover:shadow-lg transition"
            >
              <div className={`h-44 bg-gradient-to-br ${p.grad}`} />
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </div>
                <h3 className="mt-2 text-2xl text-balance">{p.title}</h3>
                <div className="mt-4 text-xs text-muted-foreground">
                  {p.date} · {p.read} read
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
