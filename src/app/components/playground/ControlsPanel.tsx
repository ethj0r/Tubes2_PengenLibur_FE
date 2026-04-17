import { Algo, LogEntry, SourceType } from "./types";
import TraversalLog from "./TraversalLog";

type Props = {
  algo: Algo;
  setAlgo: (a: Algo) => void;
  sourceType: SourceType;
  setSourceType: (s: SourceType) => void;
  selector: string;
  setSelector: (s: string) => void;
  running: boolean;
  onRun: () => void;
  log: LogEntry[];
};

export default function ControlsPanel(props: Props) {
  const { algo, setAlgo, sourceType, setSourceType, selector, setSelector, running, onRun, log } = props;

  return (
    <aside className="panel-right app-panel flex flex-col z-20">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h2 className="font-semibold">Traversal</h2>
        <span className="text-[10px] uppercase tracking-wider text-white/40">Controls</span>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <Field label="Source">
          <div className="rounded-lg p-1 flex text-xs bg-white/5 border border-white/5">
            {(["url", "html"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSourceType(s)}
                className={`flex-1 py-1.5 rounded-md font-medium transition ${
                  sourceType === s ? "bg-white/10 text-white" : "text-white/50"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <input
            className="input-glass input-mono mt-2"
            placeholder={sourceType === "url" ? "https://example.com" : "<html>…</html>"}
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
                    ? "bg-[#0367fc]/15 border-[#0367fc] text-white"
                    : "bg-white/3 border-white/5 text-white/70 hover:text-white"
                }`}
              >
                {a.toUpperCase()}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Limit">
          <div className="flex gap-2">
            <input className="input-glass" placeholder="Top-N" defaultValue={5} />
            <button className="px-3 text-xs rounded-lg bg-white/5 border border-white/5 text-white/70 hover:text-white">
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
      <label className="text-[11px] uppercase tracking-wider text-white/40">{label}</label>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}
