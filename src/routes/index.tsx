import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { CountUp } from "@/components/count-up";
import {
  Mail, CheckSquare, FileText, Sparkles, ArrowUpRight, ArrowRight,
  Calendar, Users, Brain, Zap, TrendingUp, Clock, Plus,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  Bar, BarChart, Cell,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Nexus AI" },
      { name: "description", content: "Your AI-powered workplace command center." },
    ],
  }),
  component: Dashboard,
});

const trend = [
  { d: "Mon", v: 120, t: 80 }, { d: "Tue", v: 180, t: 110 },
  { d: "Wed", v: 150, t: 140 }, { d: "Thu", v: 240, t: 170 },
  { d: "Fri", v: 290, t: 210 }, { d: "Sat", v: 200, t: 150 },
  { d: "Sun", v: 320, t: 240 },
];

const bars = [
  { c: "Email", v: 85 }, { c: "Tasks", v: 64 }, { c: "Meetings", v: 48 },
  { c: "Docs", v: 72 }, { c: "Search", v: 39 }, { c: "Code", v: 56 },
];

const activities = [
  { i: Mail, t: "Generated reply to Sarah's Q3 proposal", time: "2m ago", tag: "Email" },
  { i: FileText, t: "Summarized 47-page market research deck", time: "12m ago", tag: "Summary" },
  { i: Calendar, t: "Rescheduled 3 conflicting meetings", time: "28m ago", tag: "Schedule" },
  { i: CheckSquare, t: "Created 8 tasks from project kickoff notes", time: "1h ago", tag: "Tasks" },
  { i: Brain, t: "Drafted product strategy memo (v2)", time: "2h ago", tag: "Writing" },
];

const quickActions = [
  { i: Mail, label: "Draft Email", desc: "Compose with tone" },
  { i: FileText, label: "Summarize", desc: "Doc, thread or call" },
  { i: CheckSquare, label: "Plan Tasks", desc: "From any input" },
  { i: Calendar, label: "Schedule", desc: "Find best time" },
];

function Dashboard() {
  return (
    <>
      <Topbar title="Good morning, Alex" subtitle="Here's what your AI assistant handled overnight." />
      <main className="flex-1 p-4 md:p-8 space-y-6">

        {/* Hero strip */}
        <section className="glass-card card-hover animate-fade-up rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
                <Sparkles className="h-3 w-3" /> Live AI insights
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                You saved <span className="gradient-text">4h 28m</span> today
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                Nexus handled 47 routine tasks across email, scheduling and docs — freeing your focus for deep work this afternoon.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => toast.success("AI workspace ready", { description: "Start typing to delegate anything." })}
                  className="group inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-6px_oklch(0.78_0.13_230/0.5)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition" /> Ask Nexus
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-medium hover:border-accent/50 transition">
                  <Plus className="h-4 w-4" /> New workflow
                </button>
              </div>
            </div>
            <AssistantOrb />
          </div>
        </section>

        {/* Stat tiles */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Mail} label="Emails Generated" value={1245} delta="+18%" delay="0.05s" />
          <StatCard icon={CheckSquare} label="Tasks Planned" value={832} delta="+9%" delay="0.1s" />
          <StatCard icon={FileText} label="Summaries Created" value={560} delta="+24%" delay="0.15s" />
          <StatCard icon={Clock} label="Hours Saved" value={147} suffix="h" delta="+31%" delay="0.2s" />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6 lg:col-span-2" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">Productivity trend</h3>
                <p className="text-xs text-muted-foreground">Tasks completed vs AI-assisted</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Legend color="oklch(0.78 0.13 230)" label="AI assisted" />
                <Legend color="oklch(0.55 0.18 255)" label="Manual" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={trend} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="gv" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.13 230)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.78 0.13 230)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gt" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.3 0.03 250 / 0.3)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.22 0.018 260)",
                      border: "1px solid oklch(0.78 0.13 230 / 0.3)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.78 0.13 230)" strokeWidth={2.5} fill="url(#gv)" animationDuration={1400} />
                  <Area type="monotone" dataKey="t" stroke="oklch(0.55 0.18 255)" strokeWidth={2} fill="url(#gt)" animationDuration={1600} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold">By category</h3>
            <p className="text-xs text-muted-foreground mb-4">This week's automation mix</p>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={bars} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid stroke="oklch(0.3 0.03 250 / 0.3)" vertical={false} />
                  <XAxis dataKey="c" stroke="oklch(0.6 0.02 250)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "oklch(0.78 0.13 230 / 0.08)" }} contentStyle={{ background: "oklch(0.22 0.018 260)", border: "1px solid oklch(0.78 0.13 230 / 0.3)", borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="v" radius={[6, 6, 0, 0]} animationDuration={1200}>
                    {bars.map((_, i) => (
                      <Cell key={i} fill={`url(#bg${i % 2})`} />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="bg0" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.13 230)" />
                      <stop offset="100%" stopColor="oklch(0.43 0.18 270)" />
                    </linearGradient>
                    <linearGradient id="bg1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.15 210)" />
                      <stop offset="100%" stopColor="oklch(0.42 0.12 240)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Quick actions + activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
            {quickActions.map((a, i) => (
              <button
                key={a.label}
                onClick={() => toast(`${a.label} ready`, { description: a.desc })}
                className="glass-card card-hover animate-fade-up group rounded-xl p-4 text-left"
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg gradient-primary text-white group-hover:scale-110 transition">
                  <a.i className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-medium">{a.label}</div>
                <div className="text-[11px] text-muted-foreground">{a.desc}</div>
                <ArrowUpRight className="mt-2 h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}

            <div className="col-span-2 md:col-span-4 glass-card card-hover animate-fade-up rounded-2xl p-6" style={{ animationDelay: "0.55s" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-accent" /> Smart insights</h3>
                  <p className="text-xs text-muted-foreground">AI-detected patterns this week</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <Insight title="Focus blocks dropping" body="Calendar load is up 22%. Want me to defend Tue/Thu mornings?" />
                <Insight title="Slow responder" body="3 customer threads waiting >24h. Draft replies?" />
                <Insight title="Doc to decision" body="Q3 plan has 14 open questions. Generate decision log?" />
              </div>
            </div>
          </div>

          <div className="glass-card animate-fade-up rounded-2xl p-6" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Activity</h3>
              <button className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></button>
            </div>
            <ul className="space-y-2">
              {activities.map((a, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 rounded-lg border border-transparent p-2.5 hover:border-accent/30 hover:bg-accent/5 transition animate-slide-in-right"
                  style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-accent">
                    <a.i className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-snug">{a.t}</div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="rounded-full border border-border bg-secondary/50 px-1.5 py-0.5">{a.tag}</span>
                      <span>{a.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Teams ribbon */}
        <section className="glass-card card-hover animate-fade-up rounded-2xl p-6 flex flex-wrap items-center gap-6" style={{ animationDelay: "0.65s" }}>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-accent" />
            <div>
              <div className="text-sm font-medium">Team capacity</div>
              <div className="text-xs text-muted-foreground">12 members · 4 deep-work modes active</div>
            </div>
          </div>
          <div className="flex -space-x-2">
            {["AK", "JL", "MR", "PS", "TN", "WD"].map((n, i) => (
              <div key={n} className="grid h-8 w-8 place-items-center rounded-full border-2 border-card gradient-primary text-[10px] font-semibold text-white" style={{ zIndex: 10 - i }}>{n}</div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-6 text-sm">
            <div><div className="text-xs text-muted-foreground">Avg response</div><div className="font-semibold">2h 14m</div></div>
            <div><div className="text-xs text-muted-foreground">Throughput</div><div className="font-semibold gradient-text">+38%</div></div>
          </div>
        </section>
      </main>
    </>
  );
}

function StatCard({ icon: Icon, label, value, suffix, delta, delay }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; suffix?: string; delta: string; delay: string }) {
  return (
    <div className="glass-card card-hover animate-fade-up rounded-2xl p-5" style={{ animationDelay: delay }}>
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[11px] font-medium text-accent flex items-center gap-1"><TrendingUp className="h-3 w-3" />{delta}</span>
      </div>
      <div className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
        <CountUp end={value} suffix={suffix} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 hover:border-accent/40 hover:bg-secondary/50 transition">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{body}</div>
      <button className="mt-3 text-xs text-accent flex items-center gap-1 hover:gap-2 transition-all">Act on this <ArrowRight className="h-3 w-3" /></button>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      {label}
    </span>
  );
}

function AssistantOrb() {
  return (
    <div className="relative grid place-items-center h-40 w-40 shrink-0 mx-auto md:mx-0">
      <div className="absolute inset-0 rounded-full gradient-primary opacity-30 blur-2xl animate-pulse-soft" />
      <div className="absolute inset-4 rounded-full border border-accent/30 animate-spin-slow" />
      <div className="absolute inset-8 rounded-full border border-accent/20" style={{ animation: "spin-slow 12s linear reverse infinite" }} />
      <div className="absolute inset-0 rounded-full" style={{ animation: "ring-pulse 2.6s ease-out infinite", border: "1px solid oklch(0.78 0.13 230 / 0.5)" }} />
      <div className="relative grid h-20 w-20 place-items-center rounded-full gradient-primary text-white shadow-[0_10px_40px_-8px_oklch(0.78_0.13_230/0.7)]">
        <Brain className="h-9 w-9 animate-pulse-soft" />
      </div>
    </div>
  );
}
