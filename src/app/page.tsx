export default function PlaygroundLayout() {
  return (
    <div className="app-shell">
      <aside className="app-rail flex flex-col items-center py-4 border-r border-white/5 bg-[#141414]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold text-white/90"
          style={{
            background: "linear-gradient(180deg,#0367fc,#0350c7)",
            boxShadow: "0 0 18px -6px rgba(3,103,252,.55)",
          }}
        >
          PL
        </div>
        <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">UI</span>
      </aside>

      <main className="app-main">
        <header className="app-topbar flex items-center justify-between px-6 border-b border-white/5 bg-[#161616]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">PengenLibur</span>
            <span className="text-white/30">/</span>
            <span className="text-sm font-medium">DOM Traverse</span>
          </div>
          <div className="text-xs text-white/40">Layout draft</div>
        </header>

        <section className="app-canvas relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative p-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
              Canvas area
            </div>
          </div>
        </section>
      </main>

      <aside className="panel-right app-panel">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold">Traversal</h2>
          <span className="text-[10px] uppercase tracking-wider text-white/40">Layout</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            Source + selector
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            Algorithm + limit
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            Run action
          </div>
        </div>
      </aside>
    </div>
  );
}
