import { DomNode } from "./types";
import { EDGES } from "./mockData";

export default function Edges({ nodeById }: { nodeById: Record<string, DomNode> }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="edge-active" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0367fc" />
          <stop offset="100%" stopColor="#d2f801" />
        </linearGradient>
      </defs>
      {EDGES.map(([a, b]) => {
        const na = nodeById[a], nb = nodeById[b];
        if (!na || !nb) return null;
        const active = na.state !== "idle" && nb.state !== "idle";
        const x1 = na.x + 70, y1 = na.y + 38;
        const x2 = nb.x + 70, y2 = nb.y;
        const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
        return (
          <path
            key={a + b}
            d={d}
            fill="none"
            stroke={active ? "url(#edge-active)" : "rgba(255,255,255,0.1)"}
            strokeWidth={active ? 1.8 : 1}
            className={active ? "edge-flow" : ""}
          />
        );
      })}
    </svg>
  );
}
