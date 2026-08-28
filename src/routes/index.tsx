import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import heroSky from "@/assets/hero-sky.jpg";
import crtTv from "@/assets/crt-tv.png";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadly — Turn words into leads" },
      {
        name: "description",
        content:
          "Leadly captures, qualifies, and routes leads from any page on your site. No code, no setup.",
      },
      { property: "og:title", content: "Leadly — Turn words into leads" },
      { property: "og:description", content: "Capture, qualify, and route leads on autopilot." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <SiteNav />

      {/* HERO */}
      <section className="relative h-full flex flex-col items-center justify-center overflow-hidden px-4">
        <img
          src={heroSky}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/40" />

        <div className="relative z-10 text-center max-w-3xl -mt-24">
          <h1 className="font-serif text-6xl md:text-8xl text-white drop-shadow-sm">
            <span className="italic">Lead</span>ly
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/95 text-balance max-w-xl mx-auto">
            Turn your words into capture forms, quizzes, and lead funnels — built in minutes. Add
            CRMs and 40+ integrations in an instant.
          </p>

          <form className="mt-10 mx-auto max-w-xl glass-pill rounded-3xl p-3 flex flex-col gap-3 text-left">
            <textarea
              placeholder="Describe your next lead funnel..."
              rows={3}
              className="bg-transparent resize-none outline-none px-3 py-2 text-foreground placeholder:text-foreground/50"
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition"
                aria-label="Send"
              >
                ↑
              </button>
            </div>
          </form>
        </div>

        {/* <img
          src={crtTv}
          alt=""
          width={1024}
          height={1024}
          className="relative z-10 mt-16 w-[360px] md:w-[480px] drop-shadow-2xl -pt-16 md:-mt-10 animate-float opacity:0"
        /> */}
      </section>

      {/* CONTACT ICONS */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <a
          href="mailto:hello@leadly.com"
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
