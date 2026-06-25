import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Sparkles, Send, Paperclip, Mic, FileText, Mail, CheckSquare, Calendar, Code2, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant · Nexus AI" }, { name: "description", content: "Chat with your workplace AI." }] }),
  component: AssistantPage,
});

const prompts = [
  { i: Mail, t: "Draft a polite follow-up to a stalled deal" },
  { i: FileText, t: "Summarize this 50-page report into 5 bullets" },
  { i: CheckSquare, t: "Turn this meeting transcript into tasks" },
  { i: Calendar, t: "Find a 30-min slot with 4 people next week" },
  { i: Code2, t: "Explain this SQL query in plain English" },
  { i: BarChart3, t: "Build a weekly KPI digest for my team" },
];

const seed = [
  { who: "ai", t: "Good morning, Alex. I've pre-drafted replies for 6 priority threads and blocked 90 minutes for your Q3 review. Want me to summarize last night's standup notes too?" },
];

function AssistantPage() {
  const [msgs, setMsgs] = useState(seed);
  const [val, setVal] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { who: "me", t: text }]);
    setVal("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { who: "ai", t: "Here's a first pass — I pulled context from the linked thread and your last brief. Want me to refine the tone or add data?" }]);
      setThinking(false);
      toast.success("Response generated");
    }, 1800);
  };

  return (
    <>
      <Topbar title="AI Assistant" subtitle="Delegate anything — drafting, planning, research." />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {prompts.map((p, i) => (
              <button key={i} onClick={() => send(p.t)} className="glass-card card-hover animate-fade-up rounded-xl p-4 text-left text-sm" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="grid h-8 w-8 place-items-center rounded-md bg-accent/10 text-accent mb-2"><p.i className="h-4 w-4" /></div>
                {p.t}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-4 md:p-6 space-y-4 min-h-[420px]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 animate-fade-up ${m.who === "me" ? "flex-row-reverse" : ""}`}>
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${m.who === "ai" ? "gradient-primary text-white" : "bg-secondary"}`}>
                  {m.who === "ai" ? <Sparkles className="h-4 w-4" /> : "AK"}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.who === "ai" ? "bg-secondary/60 border border-border" : "gradient-primary text-white"}`}>
                  {m.t}
                </div>
              </div>
            ))}
            {thinking && <ThinkingBubble />}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(val); }}
            className="glass-card rounded-2xl p-3 flex items-end gap-2 sticky bottom-4 focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_oklch(0.78_0.13_230/0.15)] transition"
          >
            <button type="button" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"><Paperclip className="h-4 w-4 text-muted-foreground" /></button>
            <textarea
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(val); } }}
              rows={1}
              placeholder="Ask Nexus anything — emails, research, planning…"
              className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"><Mic className="h-4 w-4 text-muted-foreground" /></button>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95">
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

function ThinkingBubble() {
  const [phase, setPhase] = useState(0);
  const phrases = ["Analyzing your request…", "Generating insights…", "Optimizing results…", "Finalizing output…"];
  useState(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % phrases.length), 900);
    return () => clearInterval(id);
  });
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-primary text-white animate-pulse-glow">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="rounded-2xl bg-secondary/60 border border-accent/30 px-4 py-3 text-sm flex items-center gap-3 min-w-[260px]">
        <div className="relative h-6 w-6">
          <span className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent animate-spin-slow" />
        </div>
        <span className="text-muted-foreground">{phrases[phase]}</span>
        <div className="ml-auto flex gap-1">
          <Dot d="0s" /><Dot d="0.2s" /><Dot d="0.4s" />
        </div>
      </div>
    </div>
  );
}

function Dot({ d }: { d: string }) {
  return <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" style={{ animationDelay: d }} />;
}
