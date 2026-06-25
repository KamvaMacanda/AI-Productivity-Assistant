import { Sparkles } from "lucide-react";

export function FloatingAssistant() {
  return (
    <button
      aria-label="Open AI assistant"
      className="fixed bottom-6 right-6 z-30 group"
    >
      <span className="absolute inset-0 rounded-full animate-pulse-glow" />
      <span className="absolute inset-0 -m-3 rounded-full border border-accent/40" style={{ animation: "ring-pulse 2.4s ease-out infinite" }} />
      <span className="absolute inset-0 -m-3 rounded-full border border-accent/40" style={{ animation: "ring-pulse 2.4s ease-out 1.2s infinite" }} />
      <span className="relative grid h-14 w-14 place-items-center rounded-full gradient-primary text-white shadow-[0_10px_40px_-8px_oklch(0.78_0.13_230/0.6)] transition-transform group-hover:scale-110">
        <Sparkles className="h-6 w-6 animate-pulse-soft" />
      </span>
    </button>
  );
}
