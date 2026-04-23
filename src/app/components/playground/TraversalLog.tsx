import { LogEntry } from "./types";

export default function TraversalLog({ log }: { log: LogEntry[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Log</span>
        <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{log.length} steps</span>
      </div>
      <div className="space-y-1 max-h-65 overflow-y-auto pr-1">
        {log.length === 0 && (
          <div className="text-xs text-center py-6 rounded-lg" style={{ color: "var(--muted)", background: "var(--surface-soft)", border: "1px solid var(--border)" }}>
            No steps yet — hit Run
          </div>
        )}
        {log.map(s => (
          <div
            key={s.step}
            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--border)" }}
          >
            <span className="w-6" style={{ color: "var(--muted)" }}>{s.step}</span>
            <span className="flex-1" style={{ color: "var(--fg)" }}>{s.id}</span>
            {s.matched
              ? <span style={{ color: "#0367fd" }}>● matched</span>
              : <span style={{ color: "var(--fg)" }}>● visit</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
