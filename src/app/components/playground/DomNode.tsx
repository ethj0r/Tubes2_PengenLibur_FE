"use client";

import { DomNode as DomNodeT } from "./types";

type Props = { node: DomNodeT };

export const NODE_W = 128;
export const NODE_H = 56;
export const NODE_CX = (n: { x: number }) => n.x + NODE_W / 2;
export const NODE_CY = (n: { y: number }) => n.y + NODE_H / 2;

export default function DomNode({ node }: Props) {
  const stateClass =
    node.state === "lca" ? "is-lca" :
    node.state === "matched" ? "is-matched" :
    node.state === "visited" ? "is-visited" :
    "";

  const secondary = node.isText
    ? `${node.text || "(empty text)"} · ${node.id}`
    : (node.cls ? `.${node.cls} · ${node.id}` : node.id);

  return (
    <div
      className={`dom-node ${stateClass}`}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: NODE_W,
        height: NODE_H,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.1,
      }}
    >
      <span
        className="node-title"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {node.tag}
      </span>
      <span className="node-meta" style={{ fontSize: 10 }}>
        {secondary}
      </span>
    </div>
  );
}
