import { LogEntry } from "./types";

export default function TraversalLog({ log }: { log: LogEntry[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-gray-500">Log</span>
        <span className="text-[10px] text-gray-400 font-mono">{log.length} steps</span>
      </div>
      <div className="space-y-1 max-h-[260px] overflow-y-auto pr-1">
        {log.length === 0 && (
          <div className="text-xs text-gray-400 text-center py-6 rounded-lg bg-white/50 border border-black/8">
            No steps yet — hit Run
          </div>
        )}
        {log.map(s => (
          <div
            key={s.step}
            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-white/60 border border-black/8"
          >
            <span className="text-gray-400 w-6">{s.step}</span>
            <span className="text-gray-900 flex-1">{s.id}</span>
            {s.matched
              ? <span className="text-[#0367fd]">● matched</span>
              : <span className="text-[#161616]">● visit</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
