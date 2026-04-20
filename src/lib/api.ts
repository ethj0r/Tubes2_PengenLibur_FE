export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

export type ApiAttribute = { name: string; value: string };

export type ApiNode = {
  id: string;
  tag: string;
  isText: boolean;
  text?: string;
  attributes: ApiAttribute[];
  children: ApiNode[];
};

export type ApiLogEntry = {
  step: number;
  nodeId: string;
  depth: number;
  matched: boolean;
};

export type ApiStats = {
  timeTakenMs: number;
  visitedNodeCount: number;
  traversalMaxDepth: number;
  treeMaxDepth: number;
};

export type TraverseResponse = {
  tree: ApiNode;
  log: ApiLogEntry[];
  matches: string[];
  visitedOrder: string[];
  stats: ApiStats;
};

export type TraverseRequest = {
  source: "url" | "html";
  input: string;
  selector: string;
  algorithm: "bfs" | "dfs";
  limit: number;
};

export async function traverse(req: TraverseRequest): Promise<TraverseResponse> {
  const res = await fetch(`${API_BASE}/api/v1/traverse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`traverse failed: ${res.status} ${body}`);
  }
  return res.json();
}
