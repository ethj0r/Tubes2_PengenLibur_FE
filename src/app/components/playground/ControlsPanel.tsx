import { Algo, LogEntry, SourceType } from "./types";
import TraversalLog from "./TraversalLog";

type Props = {
  algo: Algo;
  setAlgo: (a: Algo) => void;
  sourceType: SourceType;
  setSourceType: (s: SourceType) => void;
  source: string;
  setSource: (s: string) => void;
  selector: string;
  setSelector: (s: string) => void;
  limit: number;
  setLimit: (n: number) => void;
  running: boolean;
  onRun: () => void;
  onStop: () => void;
  log: LogEntry[];
  selectedNodeA: string;
  setSelectedNodeA: (id: string) => void;
  selectedNodeB: string;
  setSelectedNodeB: (id: string) => void;
  nodeOptions: Array<{ id: string; label: string }>;
  onComputeLCA: () => void;
  lcaLoading: boolean;
  lcaNodeId: string | null;
};

export default function ControlsPanel(props: Props) {
  const {
    algo,
    setAlgo,
    sourceType,
    setSourceType,
    source,
    setSource,
    selector,
    setSelector,
    limit,
    setLimit,
    running,
    onRun,
    onStop,
    log,
    selectedNodeA,
    setSelectedNodeA,
    selectedNodeB,
    setSelectedNodeB,
    nodeOptions,
    onComputeLCA,
    lcaLoading,
    lcaNodeId,
  } = props;

  const disableLCA = lcaLoading || running || nodeOptions.length < 2 || !selectedNodeA || !selectedNodeB;

  return (
    <aside className="panel-right app-panel flex flex-col z-20">
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <h2 className="font-semibold" style={{ color: "var(--fg)" }}>Traversal</h2>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Controls</span>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <Field label="Source">
          <div className="rounded-lg p-1 flex text-xs" style={{ background: "var(--surface-soft)", border: "1px solid var(--border)" }}>
            {(["url", "html"] as const).map(s => (
              <button
                key={s}
                onClick={() => {
                  setSourceType(s);
                  setSource("");
                }}
                className={`flex-1 py-1.5 rounded-md font-medium transition ${
                  sourceType === s
                    ? "shadow-sm"
                    : ""
                }`}
                style={{
                  background: sourceType === s ? "var(--surface-strong)" : "transparent",
                  color: sourceType === s ? "var(--fg)" : "var(--muted)",
                }}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <input
            className="input-glass input-mono mt-2"
            placeholder={sourceType === "url" ? "https://example.com" : "<html>…</html>"}
            value={source}
            onChange={e => setSource(e.target.value)}
          />
        </Field>

        <Field label="CSS Selector">
          <input
            className="input-glass input-mono"
            value={selector}
            onChange={e => setSelector(e.target.value)}
            placeholder=".container > .item"
          />
        </Field>

        <Field label="Algorithm">
          <div className="grid grid-cols-2 gap-2">
            {(["bfs", "dfs"] as const).map(a => (
              <button
                key={a}
                onClick={() => setAlgo(a)}
                className={`py-2 text-sm font-medium rounded-lg border transition ${
                  algo === a
                    ? ""
                    : ""
                }`}
                style={{
                  background: algo === a ? "rgba(3, 103, 253, 0.14)" : "var(--surface-soft)",
                  borderColor: algo === a ? "#0367fd" : "var(--border)",
                  color: algo === a ? "#0367fd" : "var(--fg)",
                }}
              >
                {a.toUpperCase()}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Limit">
          <div className="flex gap-2">
            <input
              className="input-glass"
              placeholder="Top-N"
              type="number"
              min={0}
              value={limit || ""}
              onChange={e => setLimit(Number(e.target.value) || 0)}
            />
            <button
              className="px-3 text-xs rounded-lg"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--border)", color: "var(--fg)" }}
              onClick={() => setLimit(0)}
            >
              All
            </button>
          </div>
        </Field>

        <Field label="Lowest Common Ancestor">
          <div className="grid grid-cols-1 gap-2">
            <select
              className="input-glass input-mono"
              value={selectedNodeA}
              onChange={e => setSelectedNodeA(e.target.value)}
              disabled={nodeOptions.length === 0}
            >
              {nodeOptions.length === 0 ? (
                <option value="">Run traversal first</option>
              ) : (
                nodeOptions.map(opt => (
                  <option key={`a-${opt.id}`} value={opt.id}>{opt.label}</option>
                ))
              )}
            </select>

            <select
              className="input-glass input-mono"
              value={selectedNodeB}
              onChange={e => setSelectedNodeB(e.target.value)}
              disabled={nodeOptions.length === 0}
            >
              {nodeOptions.length === 0 ? (
                <option value="">Run traversal first</option>
              ) : (
                nodeOptions.map(opt => (
                  <option key={`b-${opt.id}`} value={opt.id}>{opt.label}</option>
                ))
              )}
            </select>

            <button
              className="btn-accent w-full"
              onClick={onComputeLCA}
              disabled={disableLCA}
            >
              {lcaLoading ? "Computing LCA..." : "Compute LCA"}
            </button>

            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {lcaNodeId ? `LCA Result: ${lcaNodeId}` : "Pilih 2 node untuk mencari LCA"}
            </p>
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-2">
          <button className="btn-accent w-full" onClick={onRun} disabled={running}>
            {running ? "Traversing…" : "Run traversal"}
          </button>
          <button
            className="w-full rounded-lg border text-sm font-medium"
            onClick={onStop}
            disabled={!running}
            style={{
              background: running ? "rgba(239, 68, 68, 0.14)" : "var(--surface-soft)",
              borderColor: running ? "#ef4444" : "var(--border)",
              color: running ? "#b91c1c" : "var(--muted)",
              opacity: running ? 1 : 0.8,
            }}
          >
            Stop
          </button>
        </div>

        <div className="hairline" />

        <TraversalLog log={log} />
      </div>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</label>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}
