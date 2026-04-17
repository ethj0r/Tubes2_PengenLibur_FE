"use client";

import { useState } from "react";
import Canvas from "./components/playground/Canvas";
import ControlsPanel from "./components/playground/ControlsPanel";
import LeftRail from "./components/playground/LeftRail";
import TopBar from "./components/playground/TopBar";
import { INITIAL_NODES, MATCHES, TRAVERSAL_ORDER } from "./components/playground/mockData";
import type { Algo, DomNode, LogEntry, SourceType } from "./components/playground/types";

export default function PlaygroundLayout() {
  const [algo, setAlgo] = useState<Algo>("bfs");
  const [sourceType, setSourceType] = useState<SourceType>("url");
  const [selector, setSelector] = useState(".box");

  const nodes: DomNode[] = INITIAL_NODES.map(node => {
    if (MATCHES.has(node.id)) {
      return { ...node, state: "matched" };
    }
    if (TRAVERSAL_ORDER.includes(node.id)) {
      return { ...node, state: "visited" };
    }
    return node;
  });

  const nodeById: Record<string, DomNode> = Object.fromEntries(
    nodes.map(node => [node.id, node])
  );

  const log: LogEntry[] = TRAVERSAL_ORDER.map((id, index) => ({
    step: index + 1,
    id,
    matched: MATCHES.has(id),
  }));

  const running = false;
  const onRun = () => {};

  return (
    <div className="app-shell">
      <LeftRail />

      <main className="app-main">
        <TopBar algo={algo} setAlgo={setAlgo} running={running} onRun={onRun} />

        <Canvas nodes={nodes} nodeById={nodeById} log={log} />
      </main>

      <ControlsPanel
        algo={algo}
        setAlgo={setAlgo}
        sourceType={sourceType}
        setSourceType={setSourceType}
        selector={selector}
        setSelector={setSelector}
        running={running}
        onRun={onRun}
        log={log}
      />
    </div>
  );
}
