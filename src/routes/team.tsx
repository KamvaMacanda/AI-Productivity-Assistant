import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Hash, Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team Chat · Nexus AI" }, { name: "description", content: "Team channels with AI summaries." }] }),
  component: TeamPage,
});

const channels = ["product", "engineering", "design", "go-to-market", "ai-lab", "random"];
const messages = [
  { who: "Maya R.", t: "AI just shipped the new onboarding flow — 38% faster activation in beta. 🚀", time: "9:42" },
  { who: "Alex K.", t: "Huge. Can we pull a teardown for Thursday's review?", time: "9:44" },
  { who: "Nexus AI", ai: true, t: "Drafted teardown deck (12 slides) with usage data + 3 open questions. Want me to share it?", time: "9:45" },
  { who: "Priya S.", t: "Yes please. Also — Sarah's team wants to mirror the pattern in checkout.", time: "9:51" },
  { who: "Tom N.", t: "On it. Let's sync at 2pm.", time: "10:02" },
];

function TeamPage() {
  return (
    <>
      <Topbar title="Team Chat" subtitle="6 channels · AI summarizing in the background." />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 h-[calc(100vh-130px)]">
          <aside className="glass-card rounded-2xl p-4 space-y-1 animate-fade-up overflow-y-auto">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 px-2">Channels</div>
            {channels.map((c, i) => (
              <button key={c} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary/60 transition ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground"}`}>
                <Hash className="h-3.5 w-3.5" /> {c}
              </button>
            ))}
          </aside>

          <section className="glass-card rounded-2xl p-4 md:p-6 flex flex-col animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-4">
              <div className="flex items-center gap-2 font-semibold"><Hash className="h-4 w-4 text-accent" /> product</div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 text-[11px] text-accent">
                <Sparkles className="h-3 w-3" /> AI summary available
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${m.ai ? "gradient-primary text-white animate-pulse-glow" : "bg-secondary"}`}>
                    {m.ai ? <Sparkles className="h-4 w-4" /> : m.who.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 text-sm">
                      <span className="font-medium">{m.who}</span>
                      {m.ai && <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">AI</span>}
                      <span className="text-[11px] text-muted-foreground">{m.time}</span>
                    </div>
                    <div className={`mt-1 text-sm leading-relaxed ${m.ai ? "rounded-xl bg-secondary/60 border border-accent/30 p-3 inline-block" : ""}`}>{m.t}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="mt-4 glass-card rounded-xl p-2 flex items-center gap-2 focus-within:border-accent/50 transition">
              <input className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground" placeholder="Message #product" />
              <button type="button" className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-accent hover:bg-accent/10"><Sparkles className="h-3.5 w-3.5" /> AI</button>
              <button className="inline-flex items-center gap-1 rounded-lg gradient-primary px-3 py-1.5 text-sm text-white hover:scale-105 transition"><Send className="h-3.5 w-3.5" /></button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
