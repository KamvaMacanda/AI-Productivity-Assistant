import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Plus, Sparkles, MoreHorizontal, Flag } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks · Nexus AI" }, { name: "description", content: "AI-planned tasks and projects." }] }),
  component: TasksPage,
});

type Task = { id: string; t: string; tag: string; p: "low" | "med" | "high"; ai?: boolean };
const cols: { title: string; items: Task[] }[] = [
  { title: "Today", items: [
    { id: "1", t: "Review Q3 OKR draft", tag: "Strategy", p: "high" },
    { id: "2", t: "Reply to design partner thread", tag: "Email", p: "med", ai: true },
    { id: "3", t: "Approve new pricing page copy", tag: "Marketing", p: "med" },
  ]},
  { title: "This week", items: [
    { id: "4", t: "Run 1:1s with leads", tag: "People", p: "med" },
    { id: "5", t: "Spec onboarding v2 flow", tag: "Product", p: "high", ai: true },
    { id: "6", t: "Audit billing webhook reliability", tag: "Eng", p: "low" },
    { id: "7", t: "Prep board update deck", tag: "Strategy", p: "high" },
  ]},
  { title: "Later", items: [
    { id: "8", t: "Refresh brand guidelines", tag: "Brand", p: "low" },
    { id: "9", t: "Plan offsite agenda", tag: "People", p: "low", ai: true },
  ]},
  { title: "Done", items: [
    { id: "10", t: "Ship analytics filters", tag: "Eng", p: "med" },
    { id: "11", t: "Send investor digest", tag: "Finance", p: "high" },
  ]},
];

const flagColor = { low: "text-muted-foreground", med: "text-accent", high: "text-destructive" } as const;

function TasksPage() {
  return (
    <>
      <Topbar title="Tasks" subtitle="AI plans, you decide. 47 active across 6 projects." />
      <main className="flex-1 p-4 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-6px_oklch(0.78_0.13_230/0.5)] hover:scale-[1.02] transition">
            <Plus className="h-4 w-4" /> New task
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent hover:bg-accent/20 transition">
            <Sparkles className="h-4 w-4" /> Generate from notes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cols.map((c, ci) => (
            <div key={c.title} className="glass-card rounded-2xl p-4 animate-fade-up" style={{ animationDelay: `${ci * 0.08}s` }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{c.items.length}</span>
              </div>
              <ul className="space-y-2">
                {c.items.map((t, i) => (
                  <li key={t.id} className="group rounded-xl border border-border/60 bg-secondary/30 p-3 hover:border-accent/40 hover:bg-secondary/60 transition animate-fade-up" style={{ animationDelay: `${ci * 0.08 + i * 0.05}s` }}>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1 accent-[oklch(0.78_0.13_230)]" defaultChecked={c.title === "Done"} />
                      <div className="min-w-0 flex-1">
                        <div className={`text-sm leading-snug ${c.title === "Done" ? "line-through text-muted-foreground" : ""}`}>{t.t}</div>
                        <div className="mt-2 flex items-center gap-2 text-[11px]">
                          <span className="rounded-full border border-border bg-card/60 px-1.5 py-0.5 text-muted-foreground">{t.tag}</span>
                          <Flag className={`h-3 w-3 ${flagColor[t.p]}`} />
                          {t.ai && <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 text-accent px-1.5 py-0.5"><Sparkles className="h-2.5 w-2.5" /> AI</span>}
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
