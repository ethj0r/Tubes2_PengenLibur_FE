import { DomNode as DomNodeT, LogEntry } from "./types";
import DomNode from "./DomNode";
import Edges from "./Edges";
import FloatingControls from "./FloatingControls";
import StatsCard from "./StatsCard";

type Props = {
  nodes: DomNodeT[];
  nodeById: Record<string, DomNodeT>;
  log: LogEntry[];
};

export default function Canvas({ nodes, nodeById, log }: Props) {
  return (
    <section className="flex-1 relative overflow-hidden app-canvas">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Edges nodeById={nodeById} />
      {nodes.map(n => <DomNode key={n.id} node={n} />)}
      <FloatingControls />
      <StatsCard log={log} />
    </section>
  );
}
