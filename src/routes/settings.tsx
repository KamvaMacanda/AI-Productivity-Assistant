import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/topbar";
import { Bell, Lock, Palette, Plug, User } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Nexus AI" }] }),
  component: SettingsPage,
});

const sections = [
  { i: User, t: "Profile", d: "Name, role, working hours" },
  { i: Bell, t: "Notifications", d: "AI digests and alerts" },
  { i: Palette, t: "Appearance", d: "Theme and density" },
  { i: Plug, t: "Integrations", d: "Connect tools" },
  { i: Lock, t: "Security", d: "Sessions and SSO" },
];

function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Tune your workspace and AI behavior." />
      <main className="flex-1 p-4 md:p-8 grid md:grid-cols-3 gap-4">
        {sections.map((s, i) => (
          <div key={s.t} className="glass-card card-hover animate-fade-up rounded-2xl p-5" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-white"><s.i className="h-4 w-4" /></div>
            <div className="mt-3 text-sm font-semibold">{s.t}</div>
            <div className="text-xs text-muted-foreground">{s.d}</div>
          </div>
        ))}
      </main>
    </>
  );
}
