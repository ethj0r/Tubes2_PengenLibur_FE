"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DomNode as DomNodeT, LogEntry } from "./types";
import DomNode from "./DomNode";
import Edges from "./Edges";

type Props = {
  nodes: DomNodeT[];
  nodeById: Record<string, DomNodeT>;
  edges: [string, string][];
  log: LogEntry[];
  speed: number;
  setSpeed: (n: number) => void;
  worldWidth?: number;
  worldHeight?: number;
};

const MIN_SCALE = 0.05;
const MAX_SCALE = 3;
const DEFAULT_WORLD_W = 2000;
const DEFAULT_WORLD_H = 1400;

export type CanvasHandle = { el: HTMLElement | null };

const Canvas = forwardRef<CanvasHandle, Props>(function Canvas(
  { nodes, nodeById, edges, worldWidth, worldHeight }: Props,
  ref
) {
  const WORLD_W = Math.max(worldWidth ?? DEFAULT_WORLD_W, DEFAULT_WORLD_W);
  const WORLD_H = Math.max(worldHeight ?? DEFAULT_WORLD_H, DEFAULT_WORLD_H);
  const wrapRef = useRef<HTMLElement>(null);
  const [view, setView] = useState({ scale: 1, x: 40, y: 20 });

  useImperativeHandle(ref, () => ({ get el() { return wrapRef.current; } }));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (e.ctrlKey || e.metaKey) {
        setView(v => {
          const factor = Math.exp(-e.deltaY * 0.01);
          const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale * factor));
          const wx = (mx - v.x) / v.scale;
          const wy = (my - v.y) / v.scale;
          return { scale: nextScale, x: mx - wx * nextScale, y: my - wy * nextScale };
        });
      } else {
        setView(v => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const worldStyle = {
    transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
    transformOrigin: "0 0" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: WORLD_W,
    height: WORLD_H,
  };

  return (
    <section
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden app-canvas"
      style={{ touchAction: "none" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <svg width={WORLD_W} height={WORLD_H} style={worldStyle}>
        <defs>
          <filter id="edge-glow-black" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="edge-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Edges nodeById={nodeById} edges={edges} />
      </svg>

      <div style={worldStyle}>
        {nodes.map(n => <DomNode key={n.id} node={n} />)}
      </div>
    </section>
  );
});

export default Canvas;
