export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-bg opacity-80 animate-mesh" />
      <div className="absolute top-[-10%] left-[20%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px] animate-float" />
      <div className="absolute bottom-[-15%] right-[10%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(oklch(0.78 0.13 230) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <Particles />
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 14 });
  return (
    <div className="absolute inset-0">
      {particles.map((_, i) => {
        const left = (i * 73) % 100;
        const delay = (i * 1.3) % 14;
        const dur = 14 + (i % 6) * 2;
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-accent/60"
            style={{
              left: `${left}%`,
              bottom: `-10px`,
              width: size,
              height: size,
              animation: `particle-float ${dur}s linear ${delay}s infinite`,
              boxShadow: "0 0 12px oklch(0.78 0.13 230 / 0.8)",
            }}
          />
        );
      })}
    </div>
  );
}
