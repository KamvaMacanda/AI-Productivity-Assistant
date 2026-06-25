import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  CheckSquare,
  BarChart3,
  Mail,
  Calendar,
  MessagesSquare,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/inbox", label: "Smart Inbox", icon: Mail },
  { to: "/schedule", label: "Schedule", icon: Calendar },
  { to: "/team", label: "Team Chat", icon: MessagesSquare },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl p-4">
      <Link to="/" className="flex items-center gap-2.5 px-2 py-3 group">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl gradient-primary animate-pulse-glow">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">Nexus AI</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workplace OS</div>
        </div>
      </Link>

      <div className="mt-4 px-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workspace</div>
      <nav className="mt-1 flex flex-col gap-1">
        {nav.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 hover:translate-x-0.5",
                active && "text-sidebar-foreground bg-sidebar-accent translate-x-1"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent shadow-[0_0_12px_oklch(0.78_0.13_230)]" />
              )}
              <Icon className={cn("h-4 w-4 transition-colors", active ? "text-accent" : "text-muted-foreground group-hover:text-accent")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Pro Plan</span>
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">2,340 / 5,000 AI credits used this month</div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[46%] gradient-primary" />
          </div>
        </div>
        <Link to="/settings" className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 transition">
          <Settings className="h-4 w-4" /> Settings
        </Link>
      </div>
    </aside>
  );
}
