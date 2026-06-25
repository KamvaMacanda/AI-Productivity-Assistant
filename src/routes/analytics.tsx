import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Nexus AI" }, { name: "description", content: "Productivity analytics." }] }),
  component: AnalyticsPage,
});

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, 9).map((m, i) => ({
  m, hours: 30 + i * 8 + (i % 3) * 6, tasks: 60 + i * 12,
}));

const mix = [
  { name: "Email", v: 35 }, { name: "Docs", v: 25 }, { name: "Planning", v: 18 }, { name: "Research", v: 12 }, { name: "Code", v: 10 },
];
const colors = ["oklch(0.78 0.13 230)", "oklch(0.55 0.18 255)", "oklch(0.42 0.12 240)", "oklch(0.68 0.15 210)", "oklch(0.85 0.1 215)"];

const teamBars = [
  { n: "Eng", v: 92 }, { n: "Design", v: 78 }, { n: "PM", v: 84 }, { n: "Sales", v: 71 }, { n: "Ops", v: 66 }, { n: "CS", v: 88 },
];

function AnalyticsPage() {
  return (
    <>
      <Topbar title="Analytics" subtitle="Where AI saved time, what your team shipped." />
      <main className="flex-1 p-4 md:p-8 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Hours saved", "1,247h", "+34%"],
            ["Tasks completed", "8,932", "+12%"],
            ["AI accuracy", "96.4%", "+1.8%"],
            ["Avg cycle time", "1.2d", "-22%"],
          ].map(([k, v, d], i) => (
            <div key={k} className="glass-card card-hover animate-fade-up rounded-2xl p-5" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="text-xs text-muted-foreground">{k}</div>
              <div className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">{v}</div>
              <div className="mt-1 text-xs text-accent">{d}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-1">Hours saved over time</h3>
            <p className="text-xs text-muted-foreground mb-4">Compounding effect of AI workflows</p>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={months} margin={{ left: -20, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="ah" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.13 230)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="oklch(0.78 0.13 230)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.3 0.03 250 / 0.3)" vertical={false} />
                  <XAxis dataKey="m" stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.018 260)", border: "1px solid oklch(0.78 0.13 230 / 0.3)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="hours" stroke="oklch(0.78 0.13 230)" strokeWidth={2.5} fill="url(#ah)" animationDuration={1400} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-1">Workload mix</h3>
            <p className="text-xs text-muted-foreground mb-4">What AI handled this quarter</p>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={mix} dataKey="v" innerRadius={55} outerRadius={90} paddingAngle={3} animationDuration={1200}>
                    {mix.map((_, i) => <Cell key={i} fill={colors[i]} stroke="transparent" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.018 260)", border: "1px solid oklch(0.78 0.13 230 / 0.3)", borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 justify-center text-[11px]">
              {mix.map((m, i) => (
                <span key={m.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} /> {m.name} {m.v}%
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Team adoption</h3>
            <p className="text-xs text-muted-foreground mb-4">% of teammates using AI weekly</p>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={teamBars} margin={{ left: -20 }}>
                  <CartesianGrid stroke="oklch(0.3 0.03 250 / 0.3)" vertical={false} />
                  <XAxis dataKey="n" stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "oklch(0.78 0.13 230 / 0.08)" }} contentStyle={{ background: "oklch(0.22 0.018 260)", border: "1px solid oklch(0.78 0.13 230 / 0.3)", borderRadius: 12, fontSize: 12 }} />
                  <defs>
                    <linearGradient id="bb" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.13 230)" />
                      <stop offset="100%" stopColor="oklch(0.43 0.18 270)" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="url(#bb)" animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-card card-hover animate-fade-up rounded-2xl p-6" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-1">Response time trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Median time to first reply (hours)</p>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={months} margin={{ left: -20 }}>
                  <CartesianGrid stroke="oklch(0.3 0.03 250 / 0.3)" vertical={false} />
                  <XAxis dataKey="m" stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.018 260)", border: "1px solid oklch(0.78 0.13 230 / 0.3)", borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="tasks" stroke="oklch(0.78 0.13 230)" strokeWidth={2.5} dot={{ r: 4, fill: "oklch(0.78 0.13 230)" }} animationDuration={1400} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
