"use client";

import { useEffect, useRef, useState } from "react";
import Canvas, { type CanvasHandle } from "./components/playground/Canvas";
import ControlsPanel from "./components/playground/ControlsPanel";
import LeftRail from "./components/playground/LeftRail";
import TopBar from "./components/playground/TopBar";
import FloatingControls from "./components/playground/FloatingControls";
import StatsCard from "./components/playground/StatsCard";
import type { Algo, DomNode, LogEntry, SourceType } from "./components/playground/types";
import { traverse, type TraverseResponse } from "../lib/api";
import { layoutTree } from "../lib/layout";

export default function PlaygroundLayout() {
  const [algo, setAlgo] = useState<Algo>("bfs");
  const [sourceType, setSourceType] = useState<SourceType>("url");
  const [source, setSource] = useState("");
  const [selector, setSelector] = useState(".box");
  const [limit, setLimit] = useState(5);
  const [speed, setSpeed] = useState(300);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nodes, setNodes] = useState<DomNode[]>([]);
  const [edges, setEdges] = useState<[string, string][]>([]);
  const [world, setWorld] = useState<{ w: number; h: number }>({ w: 2000, h: 1400 });
  const [log, setLog] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<TraverseResponse["stats"] | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const canvasRef = useRef<CanvasHandle>(null);
  const mouseRef = useRef<HTMLElement | null>(null);
  const replayRef = useRef<number | null>(null);

  const nodeById: Record<string, DomNode> = Object.fromEntries(
    nodes.map(n => [n.id, n])
  );

  useEffect(() => {
    return () => {
      if (replayRef.current != null) window.clearTimeout(replayRef.current);
    };
  }, []);

  const onRun = async () => {
    if (running) return;
    setError(null);
    setRunning(true);
    if (replayRef.current != null) {
      window.clearTimeout(replayRef.current);
      replayRef.current = null;
    }

    try {
      const resp = await traverse({
        source: sourceType,
        input: source,
        selector,
        algorithm: algo,
        limit,
      });

      const { nodes: laidOut, edges: laidEdges, width, height } = layoutTree(resp.tree);
      setNodes(laidOut);
      setEdges(laidEdges);
      setWorld({ w: width, h: height });
      setStats(resp.stats);
      setLog([]);
      setActiveNodeId(null);

      const matches = new Set(resp.matches);
      let i = 0;

      const step = () => {
        if (i >= resp.log.length) {
          setRunning(false);
          setActiveNodeId(null);
          replayRef.current = null;
          return;
        }
        const entry = resp.log[i++];
        setActiveNodeId(entry.nodeId);
        setNodes(prev =>
          prev.map(n =>
            n.id === entry.nodeId
              ? { ...n, state: matches.has(entry.nodeId) ? "matched" : "visited" }
              : n
          )
        );
        setLog(prev => [
          ...prev,
          { step: entry.step, id: entry.nodeId, matched: entry.matched },
        ]);
        replayRef.current = window.setTimeout(step, speed);
      };

      step();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setRunning(false);
    }
  };

  return (
    <div className="app-shell">
      <LeftRail />

      <main
        className="app-main"
        ref={el => { mouseRef.current = el; }}
      >
        <TopBar algo={algo} setAlgo={setAlgo} running={running} onRun={onRun} />

        <div className="relative flex-1 min-h-0">
          <Canvas
            ref={canvasRef}
            nodes={nodes}
            nodeById={nodeById}
            edges={edges}
            log={log}
            speed={speed}
            setSpeed={setSpeed}
            worldWidth={world.w}
            worldHeight={world.h}
            focusNodeId={activeNodeId}
          />
          {stats && <StatsCard log={log} stats={stats} mouseContainer={mouseRef} />}
          <FloatingControls speed={speed} setSpeed={setSpeed} mouseContainer={mouseRef} />
          {error && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg z-20 max-w-md">
              {error}
            </div>
          )}
        </div>
      </main>

      <ControlsPanel
        algo={algo}
        setAlgo={setAlgo}
        sourceType={sourceType}
        setSourceType={setSourceType}
        source={source}
        setSource={setSource}
        selector={selector}
        setSelector={setSelector}
        limit={limit}
        setLimit={setLimit}
        running={running}
        onRun={onRun}
        log={log}
      />
    </div>
  );
}
