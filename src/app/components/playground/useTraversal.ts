import { useCallback, useMemo, useState } from "react";
import { DomNode, LogEntry } from "./types";
import { INITIAL_NODES, MATCHES, TRAVERSAL_ORDER } from "./mockData";

export function useTraversal() {
  const [nodes, setNodes] = useState<DomNode[]>(INITIAL_NODES);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [running, setRunning] = useState(false);

  const nodeById = useMemo(
    () => Object.fromEntries(nodes.map(n => [n.id, n])),
    [nodes]
  );

  const run = useCallback(async () => {
    setRunning(true);
    setNodes(ns => ns.map(n => ({ ...n, state: "idle" })));
    setLog([]);
    for (let i = 0; i < TRAVERSAL_ORDER.length; i++) {
      const id = TRAVERSAL_ORDER[i];
      const matched = MATCHES.has(id);
      await new Promise(r => setTimeout(r, 300));
      setNodes(ns => ns.map(n => n.id === id ? { ...n, state: matched ? "matched" : "visited" } : n));
      setLog(l => [...l, { step: i + 1, id, matched }]);
    }
    setRunning(false);
  }, []);

  return { nodes, nodeById, log, running, run };
}
