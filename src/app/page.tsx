import Canvas from "./components/playground/Canvas";
import { INITIAL_NODES, MATCHES, TRAVERSAL_ORDER } from "./components/playground/mockData";
import type { DomNode, LogEntry } from "./components/playground/types";

export default function PlaygroundLayout() {
  const nodes: DomNode[] = INITIAL_NODES.map(node => {
    if (MATCHES.has(node.id)) {
      return { ...node, state: "matched" };
    }
    if (TRAVERSAL_ORDER.includes(node.id)) {
      return { ...node, state: "visited" };
    }
    return node;
  });

  const nodeById: Record<string, DomNode> = Object.fromEntries(
    nodes.map(node => [node.id, node])
  );

  const log: LogEntry[] = TRAVERSAL_ORDER.map((id, index) => ({
    step: index + 1,
    id,
    matched: MATCHES.has(id),
  }));

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

        <Canvas nodes={nodes} nodeById={nodeById} log={log} />
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
