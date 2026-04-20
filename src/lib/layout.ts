import type { ApiNode } from "./api";
import type { DomNode } from "../app/components/playground/types";

const NODE_W = 128;
const H_GAP = 44;
const LEVEL_Y = 120;
const Y_OFFSET = 40;
const X_OFFSET = 40;
const LEAF_STEP = NODE_W + H_GAP;

export type LayoutResult = {
  nodes: DomNode[];
  edges: [string, string][];
  width: number;
  height: number;
};

function firstClass(attrs: ApiNode["attributes"]): string | undefined {
  const cls = attrs.find(a => a.name === "class")?.value;
  if (!cls) return undefined;
  return cls.trim().split(/\s+/)[0];
}

export function layoutTree(root: ApiNode): LayoutResult {
  const nodes: DomNode[] = [];
  const edges: [string, string][] = [];
  const pos: Record<string, { x: number; y: number }> = {};
  let leafIdx = 0;

  function walk(node: ApiNode, depth: number): number {
    const visibleChildren = node.children.filter(c => !c.isText);

    let x: number;
    if (visibleChildren.length === 0) {
      x = X_OFFSET + leafIdx * LEAF_STEP;
      leafIdx++;
    } else {
      const xs = visibleChildren.map(c => walk(c, depth + 1));
      x = (xs[0] + xs[xs.length - 1]) / 2;
    }

    pos[node.id] = { x, y: Y_OFFSET + depth * LEVEL_Y };

    for (const c of visibleChildren) edges.push([node.id, c.id]);

    nodes.push({
      id: node.id,
      tag: node.tag || "#text",
      cls: firstClass(node.attributes),
      x,
      y: Y_OFFSET + depth * LEVEL_Y,
      state: "idle",
    });

    return x;
  }

  if (!root.isText) walk(root, 0);

  let maxX = 0, maxY = 0;
  for (const n of nodes) {
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  const width = maxX + NODE_W + X_OFFSET;
  const height = maxY + 80 + Y_OFFSET;

  return { nodes, edges, width, height };
}
