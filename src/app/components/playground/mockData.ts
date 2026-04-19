import { DomNode } from "./types";

type NodeMeta = { id: string; tag: string; cls?: string };

const META: NodeMeta[] = [
  { id: "n0", tag: "html" },
  { id: "n1", tag: "head" },
  { id: "n2", tag: "body" },
  { id: "n3", tag: "title", cls: "t" },
  { id: "n4", tag: "header", cls: "hero" },
  { id: "n5", tag: "main", cls: "content" },
  { id: "n6", tag: "footer" },
  { id: "n7", tag: "h1", cls: "title" },
  { id: "n8", tag: "p", cls: "lead" },
  { id: "n9", tag: "section", cls: "box" },
  { id: "n10", tag: "article", cls: "box" },
  { id: "n11", tag: "span" },
  { id: "n12", tag: "div", cls: "box" },
];

export const EDGES: [string, string][] = [
  ["n0", "n1"], ["n0", "n2"],
  ["n1", "n3"],
  ["n2", "n4"], ["n2", "n5"], ["n2", "n6"],
  ["n4", "n7"], ["n4", "n8"],
  ["n5", "n9"], ["n5", "n10"],
  ["n9", "n11"], ["n9", "n12"],
];

const ROOT = "n0";
const NODE_W = 140;
const H_GAP = 32;
const LEAF_STEP = NODE_W + H_GAP;
const LEVEL_Y = 120;
const Y_OFFSET = 40;
const X_OFFSET = 40;

function layout(): Record<string, { x: number; y: number; depth: number }> {
  const children: Record<string, string[]> = {};
  for (const [a, b] of EDGES) (children[a] ||= []).push(b);

  const pos: Record<string, { x: number; y: number; depth: number }> = {};
  let leafIdx = 0;

  function walk(id: string, depth: number): number {
    const kids = children[id] || [];
    let x: number;
    if (kids.length === 0) {
      x = X_OFFSET + leafIdx * LEAF_STEP;
      leafIdx++;
    } else {
      const xs = kids.map(k => walk(k, depth + 1));
      x = (xs[0] + xs[xs.length - 1]) / 2;
    }
    pos[id] = { x, y: Y_OFFSET + depth * LEVEL_Y, depth };
    return x;
  }

  walk(ROOT, 0);
  return pos;
}

const POS = layout();

export const INITIAL_NODES: DomNode[] = META.map(m => ({
  ...m,
  x: POS[m.id].x,
  y: POS[m.id].y,
  state: "idle",
}));

export const TRAVERSAL_ORDER = ["n0", "n2", "n4", "n5", "n7", "n9", "n10", "n11", "n12"];
export const MATCHES = new Set(["n9", "n12"]);
