import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Topbar } from "@/components/topbar";
import { Sparkles, Clock, MapPin, Video } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule · Nexus AI" }, { name: "description", content: "AI-managed calendar." }] }),
  component: SchedulePage,
});

const days = ["Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27"];
const hours = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];

type Event = { day: number; start: number; span: number; title: string; kind: "deep" | "meet" | "ai" };
const events: Event[] = [
  { day: 0, start: 0, span: 3, title: "Deep work · Q3 strategy", kind: "deep" },
  { day: 0, start: 4, span: 1, title: "1:1 — Marcus", kind: "meet" },
  { day: 1, start: 1, span: 2, title: "Design crit", kind: "meet" },
  { day: 1, start: 4, span: 2, title: "AI summary review", kind: "ai" },
  { day: 2, start: 0, span: 2, title: "Eng standup + planning", kind: "meet" },
  { day: 2, start: 3, span: 2, title: "Deep work · Memo", kind: "deep" },
  { day: 3, start: 1, span: 1, title: "Customer call", kind: "meet" },
  { day: 3, start: 3, span: 3, title: "Offsite prep", kind: "deep" },
  { day: 4, start: 0, span: 1, title: "Inbox sweep (AI)", kind: "ai" },
  { day: 4, start: 2, span: 2, title: "Roadmap review", kind: "meet" },
];

const kindStyle = {
  deep: "bg-primary/30 border-primary/50 text-primary-foreground",
  meet: "bg-accent/15 border-accent/40 text-foreground",
  ai: "gradient-primary text-white border-transparent",
};

function SchedulePage() {
  return (
    <>
      <Topbar title="Schedule" subtitle="AI defended 3 focus blocks · 2 conflicts auto-resolved." />
      <main className="flex-1 p-4 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-white hover:scale-[1.02] transition">
            <Sparkles className="h-4 w-4" /> Find best time
          </button>
          <div className="flex items-center gap-2 text-xs">
            <Legend cls="bg-primary/40" l="Deep work" />
            <Legend cls="bg-accent/40" l="Meetings" />
            <Legend cls="gradient-primary" l="AI handled" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 md:p-6 animate-fade-up overflow-x-auto">
          <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-2 min-w-[720px]">
            <div></div>
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground pb-2">{d}</div>
            ))}
            {hours.map((h, hi) => (
              <>
                <div key={`h${hi}`} className="text-[10px] text-muted-foreground text-right pr-2 pt-1">{h}{Number(h) < 9 ? "pm" : "am"}</div>
                {days.map((_, di) => {
                  const ev = events.find((e) => e.day === di && e.start === hi);
                  if (ev) {
                    return (
                      <div
                        key={`${di}-${hi}`}
                        className={`rounded-lg border p-2 text-[11px] leading-tight animate-fade-up ${kindStyle[ev.kind]}`}
                        style={{ gridRow: `span ${ev.span}`, animationDelay: `${(di + hi) * 0.03}s` }}
                      >
                        <div className="font-medium">{ev.title}</div>
                        <div className="opacity-70 mt-1 flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {ev.span * 30}m</div>
                      </div>
                    );
                  }
                  const occupied = events.some((e) => e.day === di && hi > e.start && hi < e.start + e.span);
                  if (occupied) return null;
                  return <div key={`${di}-${hi}`} className="h-12 rounded-lg border border-dashed border-border/40 hover:border-accent/40 transition" />;
                })}
              </>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { i: Video, t: "Design crit", time: "Tue 10:00", loc: "Zoom" },
            { i: MapPin, t: "Customer call — Acme", time: "Thu 10:00", loc: "HQ · Room 4" },
            { i: Sparkles, t: "AI weekly digest", time: "Fri 4:30pm", loc: "Generated" },
          ].map((c, i) => (
            <div key={i} className="glass-card card-hover animate-fade-up rounded-2xl p-5" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-white"><c.i className="h-4 w-4" /></div>
              <div className="mt-3 text-sm font-medium">{c.t}</div>
              <div className="text-xs text-muted-foreground">{c.time} · {c.loc}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function Legend({ cls, l }: { cls: string; l: string }) {
  return <span className="inline-flex items-center gap-1.5 text-muted-foreground"><span className={`h-2.5 w-2.5 rounded-sm ${cls}`} />{l}</span>;
}
