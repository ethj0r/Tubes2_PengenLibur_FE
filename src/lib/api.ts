// better always pake relative path sih
// jd dev mode dan prod mode sama melalui
// reverse proxy, jd Next.js rewrites di dev, nginx/server lain di prod yg
// nerusin /api/* ke backend.
// izin vinnnnnnnnnnnnnn
const API_BASE = "";

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

export type LCARequest = {
  tree: ApiNode;
  nodeA: string;
  nodeB: string;
};

export type LCAResponse = {
  lcaNodeId: string;
};

export async function traverse(req: TraverseRequest, signal?: AbortSignal): Promise<TraverseResponse> {
  const res = await fetch(`${API_BASE}/api/v1/traverse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
    signal,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`traverse failed: ${res.status} ${body}`);
  }
  return res.json();
}

export async function computeLCA(req: LCARequest, signal?: AbortSignal): Promise<LCAResponse> {
  const res = await fetch(`${API_BASE}/api/v1/lca`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
    signal,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`lca failed: ${res.status} ${body}`);
  }

  return res.json();
}
