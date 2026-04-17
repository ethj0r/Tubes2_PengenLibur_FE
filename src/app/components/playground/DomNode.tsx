import { DomNode as DomNodeT } from "./types";

export default function DomNode({ node }: { node: DomNodeT }) {
  const { state } = node;
  const dot =
    state === "matched" ? "#d2f801" :
    state === "visited" ? "#0367fc" : "rgba(255,255,255,0.2)";

  return (
    <div
      className={`dom-node absolute w-[140px] px-3 py-2 text-left ${
        state === "visited" ? "is-visited" : state === "matched" ? "is-matched" : ""
      }`}
      style={{ left: node.x, top: node.y }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
        <span className="font-mono text-xs text-white/90">&lt;{node.tag}&gt;</span>
      </div>
      {node.cls && <div className="font-mono text-[10px] text-white/45 mt-1">.{node.cls}</div>}
      <div className="text-[9px] text-white/30 mt-1">{node.id}</div>
    </div>
  );
}
