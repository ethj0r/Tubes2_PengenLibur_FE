"use client";

import type { RefObject } from "react";
import { LogEntry } from "./types";
import type { ApiStats } from "../../../lib/api";

type Props = {
  log: LogEntry[];
  stats?: ApiStats;
  mouseContainer?: RefObject<HTMLElement | null>;
};

const BOX_W = 230;

export default function StatsCard({ log, stats }: Props) {
  const matches = log.filter(l => l.matched).length;
  return (
    <div
      className="liquid-glass-card"
      style={{
        position: "absolute",
        top: 24,
        right: 24,
        width: BOX_W,
        padding: "14px 18px",
        borderRadius: 18,
        zIndex: 10,
      }}
    >
      <div className="text-xs">
        <Row label="Time" value={stats ? `${stats.timeTakenMs}ms` : "—"} />
        <Row label="Nodes visited" value={`${log.length}`} />
        <Row label="Matches" value={`${matches}`} highlight />
        <Row label="Max depth" value={stats ? `${stats.traversalMaxDepth}` : "—"} />
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between mb-1 last:mb-0">
      <span className="text-gray-600">{label}</span>
      <span className={highlight ? "text-[#0367FD]" : "text-gray-900"}>
        {value}
      </span>
    </div>
  );
}
