import { DomNode } from "./types";
import { NODE_CX, NODE_CY, NODE_H } from "./DomNode";

type Props = {
  nodeById: Record<string, DomNode>;
  edges: [string, string][];
  backtrack?: Set<string>;
};

const EDGE_IDLE = "var(--edge-idle)";
const EDGE_TRAVERSE = "var(--edge-traverse)";
const EDGE_BACKTRACK = "var(--edge-backtrack)";

const edgeKey = (a: string, b: string) => `${a}->${b}`;

export default function Edges({ nodeById, edges, backtrack }: Props) {
  return (
    <g>
      {edges.map(([a, b]) => {
        const na = nodeById[a], nb = nodeById[b];
        if (!na || !nb) return null;
        const active = na.state !== "idle" && nb.state !== "idle";
        const isBacktrack = backtrack?.has(edgeKey(a, b)) ?? false;

        const x1 = NODE_CX(na), y1 = NODE_CY(na) + NODE_H / 2;
        const x2 = NODE_CX(nb), y2 = NODE_CY(nb) - NODE_H / 2;
        const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;

        const stroke = !active ? EDGE_IDLE : isBacktrack ? EDGE_BACKTRACK : EDGE_TRAVERSE;
        const opacity = !active ? 0.25 : 0.9;
        const filter = !active
          ? undefined
          : isBacktrack
            ? "url(#edge-glow-blue)"
            : "url(#edge-glow-black)";

        return (
          <path
            key={a + b}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={active ? 1.8 : 1}
            opacity={opacity}
            filter={filter}
            style={{ transition: "opacity .25s ease, stroke .25s ease" }}
          />
        );
      })}
    </g>
  );
}
