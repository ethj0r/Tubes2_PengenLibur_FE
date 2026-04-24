"use client";

import type { RefObject } from "react";

type Props = {
  speed: number;
  setSpeed: (n: number) => void;
  running: boolean;
  canControlPlayback: boolean;
  onReplay: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onResetView: () => void;
  mouseContainer?: RefObject<HTMLElement | null>;
};

const MIN_MS = 50;
const MAX_MS = 1200;

const BOX_W = 560;

export default function FloatingControls({
  speed,
  setSpeed,
  running,
  canControlPlayback,
  onReplay,
  onPlay,
  onPause,
  onNext,
  onZoomOut,
  onZoomIn,
  onResetView,
}: Props) {
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
        <button className="btn-ghost" onClick={onReplay} title="Replay" disabled={!canControlPlayback}>⟲</button>
        <button className="btn-ghost" onClick={onPlay} title="Play" disabled={!canControlPlayback || running}>▶</button>
        <button className="btn-ghost" onClick={onPause} title="Pause" disabled={!running}>⏸</button>
        <button className="btn-ghost" onClick={onNext} title="Next step" disabled={!canControlPlayback}>⏭</button>
        <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
        <button className="btn-ghost" onClick={onZoomOut} title="Zoom out">－</button>
        <button className="btn-ghost" onClick={onZoomIn} title="Zoom in">＋</button>
        <button className="btn-ghost" onClick={onResetView} title="Reset view">⤢</button>
        <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
        <div className="flex items-center gap-2 pl-1 flex-1">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Speed</span>
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
          <span className="text-[10px] w-12 text-right" style={{ color: "var(--fg)" }}>{speed}ms</span>
        </div>
      </div>
    </div>
  );
}
