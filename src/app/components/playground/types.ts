export type NodeState = "idle" | "visited" | "matched";

export type DomNode = {
  id: string;
  tag: string;
  cls?: string;
  isText?: boolean;
  text?: string;
  x: number;
  y: number;
  state: NodeState;
};

export type LogEntry = { step: number; id: string; matched: boolean };

export type Algo = "bfs" | "dfs";
export type SourceType = "url" | "html";
