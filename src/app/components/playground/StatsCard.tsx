import { LogEntry } from "./types";

export default function StatsCard({ log }: { log: LogEntry[] }) {
  const matches = log.filter(l => l.matched).length;
  return (
    <div className="absolute right-6 top-6 px-4 py-3 text-xs z-10 min-w-[220px] rounded-xl bg-[#1c1c1c] border border-white/8">
      <Row label="Time" value="12.4ms" />
      <Row label="Nodes visited" value={`${log.length}`} />
      <Row label="Matches" value={`${matches}`} highlight />
      <Row label="Max depth" value="4" />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-white/50 mb-1 last:mb-0">
      <span>{label}</span>
      <span className={`font-mono ${highlight ? "text-[#d2f801]" : "text-white"}`}>{value}</span>
    </div>
  );
}
