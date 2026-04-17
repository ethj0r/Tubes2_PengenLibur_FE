import { DomNode } from "./types";

export const INITIAL_NODES: DomNode[] = [
  { id: "n0", tag: "html", x: 420, y: 40, state: "idle" },
  { id: "n1", tag: "head", x: 260, y: 140, state: "idle" },
  { id: "n2", tag: "body", x: 580, y: 140, state: "idle" },
  { id: "n3", tag: "title", cls: "t", x: 260, y: 240, state: "idle" },
  { id: "n4", tag: "header", cls: "hero", x: 420, y: 240, state: "idle" },
  { id: "n5", tag: "main", cls: "content", x: 600, y: 240, state: "idle" },
  { id: "n6", tag: "footer", x: 780, y: 240, state: "idle" },
  { id: "n7", tag: "h1", cls: "title", x: 340, y: 340, state: "idle" },
  { id: "n8", tag: "p", cls: "lead", x: 460, y: 340, state: "idle" },
  { id: "n9", tag: "section", cls: "box", x: 580, y: 340, state: "idle" },
  { id: "n10", tag: "article", cls: "box", x: 700, y: 340, state: "idle" },
  { id: "n11", tag: "span", x: 520, y: 440, state: "idle" },
  { id: "n12", tag: "div", cls: "box", x: 640, y: 440, state: "idle" },
];

export const EDGES: [string, string][] = [
  ["n0", "n1"], ["n0", "n2"],
  ["n1", "n3"],
  ["n2", "n4"], ["n2", "n5"], ["n2", "n6"],
  ["n4", "n7"], ["n4", "n8"],
  ["n5", "n9"], ["n5", "n10"],
  ["n9", "n11"], ["n9", "n12"],
];

export const TRAVERSAL_ORDER = ["n0","n2","n4","n5","n7","n9","n10","n11","n12"];
export const MATCHES = new Set(["n9", "n12"]);
