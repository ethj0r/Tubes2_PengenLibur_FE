"use client";

import type { RefObject } from "react";
import { LogEntry } from "./types";
import type { ApiStats } from "../../../lib/api";

type Props = {
  log: LogEntry[];
  stats?: ApiStats;
  elapsedMs?: number;
  running?: boolean;
  mouseContainer?: RefObject<HTMLElement | null>;
};

const BOX_W = 230;

export default function StatsCard({ log, stats, elapsedMs, running }: Props) {
  const matches = log.filter(l => l.matched).length;
  const shownTime = running ? null : (elapsedMs ?? stats?.timeTakenMs);
  const timeValue = shownTime != null ? `${formatMs(shownTime)}ms` : "—";
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
        <Row label="Time" value={timeValue} />
        <Row label="Nodes visited" value={`${log.length}`} />
        <Row label="Matches" value={`${matches}`} highlight />
        <Row label="Max depth" value={stats ? `${stats.traversalMaxDepth}` : "—"} />
      </div>
    </div>
  );
}

function formatMs(ms: number): string {
  if (!Number.isFinite(ms)) return "0";
  if (ms < 1) return ms.toFixed(3);
  if (ms < 10) return ms.toFixed(2);
  if (ms < 100) return ms.toFixed(1);
  return Math.round(ms).toString();
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between mb-1 last:mb-0">
      <span style={{ color: "var(--muted)" }}>{label}</span>
      <span style={{ color: highlight ? "var(--accent-soft)" : "var(--fg)" }}>
        {value}
      </span>
    </div>
  );
}
