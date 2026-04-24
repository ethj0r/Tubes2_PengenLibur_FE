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

function shortText(input?: string): string | undefined {
  if (!input) return undefined;
  
  const normalized = input.replace(/\s+/g, " ").trim();
  if (!normalized) return undefined;

  // batas maks 21 karakter + ...
  return normalized.length > 24 ? `${normalized.slice(0, 21)}...` : normalized;
}

function firstClass(attrs: ApiNode["attributes"]): string | undefined {
  const cls = attrs.find(a => a.name === "class")?.value;
  if (!cls) return undefined;
  return cls.trim().split(/\s+/)[0];
}

export function layoutTree(root: ApiNode): LayoutResult {
  const nodes: DomNode[] = [];
  const edges: [string, string][] = [];
  let leafIdx = 0;

  function walk(node: ApiNode, depth: number): number {
    const layoutChildren = node.children;

    let x: number;
    if (layoutChildren.length === 0) {
      x = X_OFFSET + leafIdx * LEAF_STEP;
      leafIdx++;
    } else {
      const xs = layoutChildren.map(c => walk(c, depth + 1));
      x = (xs[0] + xs[xs.length - 1]) / 2;
    }

    for (const c of layoutChildren) edges.push([node.id, c.id]);

    nodes.push({
      id: node.id,
      tag: node.isText ? "text" : node.tag,
      cls: node.isText ? undefined : firstClass(node.attributes),
      isText: node.isText,
      text: node.isText ? shortText(node.text) : undefined,
      x,
      y: Y_OFFSET + depth * LEVEL_Y,
      state: "idle",
    });

    return x;
  }

  walk(root, 0);

  let maxX = 0, maxY = 0;
  for (const n of nodes) {
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  const width = maxX + NODE_W + X_OFFSET;
  const height = maxY + 80 + Y_OFFSET;

  return { nodes, edges, width, height };
}
