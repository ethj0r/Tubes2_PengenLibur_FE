"use client";

import type { RefObject } from "react";

type Props = {
  speed: number;
  setSpeed: (n: number) => void;
  mouseContainer?: RefObject<HTMLElement | null>;
};

const MIN_MS = 50;
const MAX_MS = 1200;

const BOX_W = 560;

export default function FloatingControls({ speed, setSpeed }: Props) {
  return (
    <div
      className="liquid-glass-card"
      style={{
        position: "absolute",
        left: 24,
        bottom: 24,
        width: BOX_W,
        padding: "8px 14px",
        borderRadius: 22,
        zIndex: 10,
      }}
    >
      <div className="flex items-center gap-2">
        {["⟲", "▶", "⏸", "⏭"].map((g, i) => (
          <button key={i} className="btn-ghost">{g}</button>
        ))}
        <div className="w-px h-5 bg-black/10 mx-1" />
        {["－", "＋", "⤢"].map((g, i) => (
          <button key={i} className="btn-ghost">{g}</button>
        ))}
        <div className="w-px h-5 bg-black/10 mx-1" />
        <div className="flex items-center gap-2 pl-1 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-600">Speed</span>
          <input
            type="range"
            min={MIN_MS}
            max={MAX_MS}
            step={10}
            value={MAX_MS + MIN_MS - speed}
            onChange={e => setSpeed(MAX_MS + MIN_MS - Number(e.target.value))}
            className="flex-1 accent-[#0367fd]"
            aria-label="Traversal speed"
          />
          <span className="text-[10px] text-gray-800 w-12 text-right">{speed}ms</span>
        </div>
      </div>
    </div>
  );
}
