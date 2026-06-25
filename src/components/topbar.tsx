import { Search, Bell, Command } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border/60 bg-background/70 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground w-80 focus-within:border-accent/60 focus-within:shadow-[0_0_0_3px_oklch(0.78_0.13_230/0.15)] transition">
        <Search className="h-4 w-4" />
        <input className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search or ask AI anything…" />
        <kbd className="flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]"><Command className="h-3 w-3" />K</kbd>
      </div>
      <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 hover:border-accent/50 transition">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_oklch(0.78_0.13_230)]" />
      </button>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-2 py-1">
        <div className="grid h-7 w-7 place-items-center rounded-md gradient-primary text-xs font-semibold text-white">AK</div>
        <div className="hidden md:block leading-tight">
          <div className="text-xs font-medium">Alex Kim</div>
          <div className="text-[10px] text-muted-foreground">Product Lead</div>
        </div>
      </div>
    </header>
  );
}
