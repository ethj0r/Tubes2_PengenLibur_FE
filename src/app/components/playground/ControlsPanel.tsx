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
  log: LogEntry[];
};

export default function ControlsPanel(props: Props) {
  const { algo, setAlgo, sourceType, setSourceType, source, setSource, selector, setSelector, limit, setLimit, running, onRun, log } = props;

  return (
    <aside className="panel-right app-panel flex flex-col z-20">
      <div className="p-4 border-b border-black/8 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Traversal</h2>
        <span className="text-[10px] uppercase tracking-wider text-gray-500">Controls</span>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <Field label="Source">
          <div className="rounded-lg p-1 flex text-xs bg-black/5 border border-black/8">
            {(["url", "html"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSourceType(s)}
                className={`flex-1 py-1.5 rounded-md font-medium transition ${
                  sourceType === s
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
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
                    ? "bg-[#0367fd]/10 border-[#0367fd] text-[#0367fd]"
                    : "bg-white/60 border-black/8 text-gray-700 hover:text-gray-900"
                }`}
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
              className="px-3 text-xs rounded-lg bg-white/60 border border-black/8 text-gray-700 hover:text-gray-900"
              onClick={() => setLimit(0)}
            >
              All
            </button>
          </div>
        </Field>

        <button className="btn-accent w-full" onClick={onRun} disabled={running}>
          {running ? "Traversing…" : "Run traversal"}
        </button>

        <div className="hairline" />

        <TraversalLog log={log} />
      </div>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-gray-500">{label}</label>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}
