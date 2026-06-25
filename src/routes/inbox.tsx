import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Sparkles, Star, Reply, Archive, Tag } from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({ meta: [{ title: "Smart Inbox · Nexus AI" }, { name: "description", content: "AI-triaged inbox." }] }),
  component: InboxPage,
});

const threads = [
  { from: "Sarah Chen", subj: "Re: Q3 proposal revisions", snippet: "Loved the new pricing tiers. Two questions on the enterprise tier…", tag: "Deal", priority: true, ai: "Draft sent for review" },
  { from: "GitHub", subj: "PR #284 ready for review", snippet: "feat(billing): add proration logic for mid-cycle upgrades", tag: "Eng", priority: false, ai: "Summarized + auto-approved" },
  { from: "Marcus L.", subj: "Offsite logistics confirmed", snippet: "Venue locked in for Oct 14-16. Sending out invites today.", tag: "People", priority: false, ai: "Added to calendar" },
  { from: "Acme Legal", subj: "MSA redlines attached", snippet: "Please review sections 4.2 and 7.1 — minor changes to liability cap…", tag: "Legal", priority: true, ai: "Summary + 3 risks flagged" },
  { from: "Notion", subj: "Weekly digest: 12 docs updated", snippet: "Most active: Product Strategy, Q4 Hiring, Brand Voice…", tag: "Updates", priority: false, ai: "Condensed to 5 bullets" },
];

function InboxPage() {
  return (
    <>
      <Topbar title="Smart Inbox" subtitle="312 emails triaged · 47 auto-handled · 8 need you." />
      <main className="flex-1 p-4 md:p-8">
        <div className="glass-card rounded-2xl divide-y divide-border/50 animate-fade-up overflow-hidden">
          {threads.map((t, i) => (
            <div key={i} className="group flex items-start gap-4 p-4 md:p-5 hover:bg-secondary/30 transition cursor-pointer">
              <button className="text-muted-foreground hover:text-accent transition pt-1"><Star className={`h-4 w-4 ${t.priority ? "fill-accent text-accent" : ""}`} /></button>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-primary text-xs font-semibold text-white">{t.from.split(" ").map((p) => p[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{t.from}</span>
                  <span className="rounded-full border border-border bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"><Tag className="inline h-2.5 w-2.5 mr-1" />{t.tag}</span>
                  {t.priority && <span className="rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] text-destructive">Priority</span>}
                </div>
                <div className="mt-1 text-sm font-medium truncate">{t.subj}</div>
                <div className="text-xs text-muted-foreground truncate">{t.snippet}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 text-[11px] text-accent">
                  <Sparkles className="h-3 w-3" /> {t.ai}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"><Reply className="h-4 w-4 text-muted-foreground" /></button>
                <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"><Archive className="h-4 w-4 text-muted-foreground" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
