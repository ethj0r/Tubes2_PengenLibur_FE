"use client";

import { DomNode as DomNodeT } from "./types";

type Props = { node: DomNodeT };

export const NODE_W = 128;
export const NODE_H = 56;
export const NODE_CX = (n: { x: number }) => n.x + NODE_W / 2;
export const NODE_CY = (n: { y: number }) => n.y + NODE_H / 2;

export default function DomNode({ node }: Props) {
  const isStyled = node.state === "matched" || node.state === "visited";
  const accent = isStyled ? "#ffffff" : "#6b7280";
  const subColor = isStyled ? "rgba(255,255,255,0.75)" : "#6b7280";

  const stateClass =
    node.state === "matched" ? "is-matched" :
    node.state === "visited" ? "is-visited" :
    "";

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
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          color: accent,
        }}
      >
        {node.tag}
      </span>
      <span style={{ fontSize: 10, color: subColor }}>
        {node.cls ? `.${node.cls}` : node.id}
      </span>
    </div>
  );
}
