import { LogEntry } from "./types";

export default function TraversalLog({ log }: { log: LogEntry[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-white/40">Log</span>
        <span className="text-[10px] text-white/30 font-mono">{log.length} steps</span>
      </div>
      <div className="space-y-1 max-h-[260px] overflow-y-auto pr-1">
        {log.length === 0 && (
          <div className="text-xs text-white/30 text-center py-6 rounded-lg bg-white/3 border border-white/5">
            No steps yet — hit Run
          </div>
        )}
        {log.map(s => (
          <div
            key={s.step}
            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
          >
            <span className="text-white/30 w-6">{s.step}</span>
            <span className="text-white/80 flex-1">{s.id}</span>
            {s.matched
              ? <span className="text-[#d2f801]">● matched</span>
              : <span className="text-[#0367fc]">● visit</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
