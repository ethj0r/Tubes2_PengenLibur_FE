export default function LeftRail() {
  return (
    <aside
      className="app-rail flex flex-col items-center py-4 z-20"
      style={{
        background: "var(--surface)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        borderRight: "1px solid var(--border-strong)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
        style={{
          background: "radial-gradient(at 35% 30%, #3b8bff 0%, #0367fd 60%, #0350c7 100%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 0 18px -6px rgba(3,103,253,0.5)",
          color: "#ffffff",
        }}
        aria-label="PengenLibur"
      >
        🌲
      </div>
    </aside>
  );
}
