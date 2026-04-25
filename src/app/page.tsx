"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Canvas, { type CanvasHandle } from "./components/playground/Canvas";
import ControlsPanel from "./components/playground/ControlsPanel";
import LeftRail from "./components/playground/LeftRail";
import TopBar from "./components/playground/TopBar";
import FloatingControls from "./components/playground/FloatingControls";
import StatsCard from "./components/playground/StatsCard";
import type { Algo, DomNode, LogEntry, SourceType } from "./components/playground/types";
import { computeLCA, traverse, type ApiNode, type TraverseResponse } from "../lib/api";
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
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [selectedNodeA, setSelectedNodeA] = useState("");
  const [selectedNodeB, setSelectedNodeB] = useState("");
  const [lcaNodeId, setLCANodeId] = useState<string | null>(null);
  const [lcaLoading, setLCALoading] = useState(false);
  const [currentTree, setCurrentTree] = useState<ApiNode | null>(null);

  const canvasRef = useRef<CanvasHandle>(null);
  const mouseRef = useRef<HTMLElement | null>(null);
  const replayRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const runIdRef = useRef(0);
  const speedRef = useRef(speed);
  const playbackIndexRef = useRef(0);
  const playbackStartRef = useRef<number | null>(null);
  const replayDataRef = useRef<{ log: { step: number; nodeId: string; matched: boolean }[]; matches: Set<string> } | null>(null);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const nodeById: Record<string, DomNode> = Object.fromEntries(
    nodes.map(n => [n.id, n])
  );

  const nodeOptions = nodes
    .map(n => ({ id: n.id, label: `${n.id} (${n.tag})` }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const clearReplayTimer = useCallback(() => {
    if (replayRef.current != null) {
      window.clearTimeout(replayRef.current);
      replayRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      clearReplayTimer();
    };
  }, [clearReplayTimer]);

  const finishPlayback = useCallback(() => {
    clearReplayTimer();
    setRunning(false);
    setActiveNodeId(null);
    if (playbackStartRef.current != null) {
      setElapsedMs(performance.now() - playbackStartRef.current);
    }
  }, [clearReplayTimer]);

  const applyNextStep = useCallback(() => {
    const replayData = replayDataRef.current;
    if (!replayData) return false;

    const i = playbackIndexRef.current;
    if (i >= replayData.log.length) {
      finishPlayback();
      return false;
    }

    const entry = replayData.log[i];
    playbackIndexRef.current = i + 1;

    setActiveNodeId(entry.nodeId);
    setNodes(prev =>
      prev.map(n =>
        n.id === entry.nodeId
          ? { ...n, state: replayData.matches.has(entry.nodeId) ? "matched" : "visited" }
          : n
      )
    );
    setLog(prev => [...prev, { step: entry.step, id: entry.nodeId, matched: entry.matched }]);

    if (playbackIndexRef.current >= replayData.log.length) {
      finishPlayback();
    }

    return true;
  }, [finishPlayback]);

  const schedulePlayback = useCallback(() => {
    clearReplayTimer();
    replayRef.current = window.setTimeout(function tick() {
      const progressed = applyNextStep();
      if (!progressed) return;

      if (playbackIndexRef.current < (replayDataRef.current?.log.length ?? 0)) {
        replayRef.current = window.setTimeout(tick, speedRef.current);
      }
    }, speedRef.current);
  }, [applyNextStep, clearReplayTimer]);

  const onPausePlayback = useCallback(() => {
    clearReplayTimer();
    setRunning(false);
    setActiveNodeId(null);
  }, [clearReplayTimer]);

  const onPlayPlayback = useCallback(() => {
    const replayData = replayDataRef.current;
    if (!replayData || replayData.log.length === 0) return;

    if (playbackIndexRef.current >= replayData.log.length) {
      playbackIndexRef.current = 0;
      setNodes(prev => prev.map(n => ({ ...n, state: "idle" })));
      setLCANodeId(null);
      setLog([]);
      setActiveNodeId(null);
      setElapsedMs(null);
      playbackStartRef.current = performance.now();
    }

    setRunning(true);
    schedulePlayback();
  }, [schedulePlayback]);

  const onReplayPlayback = useCallback(() => {
    const replayData = replayDataRef.current;
    if (!replayData || replayData.log.length === 0) return;

    clearReplayTimer();
    playbackIndexRef.current = 0;
    setNodes(prev => prev.map(n => ({ ...n, state: "idle" })));
    setLCANodeId(null);
    setLog([]);
    setActiveNodeId(null);
    setElapsedMs(null);
    playbackStartRef.current = performance.now();
    setRunning(true);
    schedulePlayback();
  }, [clearReplayTimer, schedulePlayback]);

  const onNextStep = useCallback(() => {
    const replayData = replayDataRef.current;
    if (!replayData || replayData.log.length === 0) return;

    clearReplayTimer();
    setRunning(false);
    if (playbackStartRef.current == null) {
      playbackStartRef.current = performance.now();
      setElapsedMs(null);
    }
    applyNextStep();
  }, [applyNextStep, clearReplayTimer]);

  const stopTraversal = useCallback(() => {
    runIdRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    clearReplayTimer();
    setRunning(false);
    setElapsedMs(null);
    setActiveNodeId(null);
  }, [clearReplayTimer]);

  const applyLCAHighlight = useCallback((targetNodeId: string | null) => {
    setNodes(prev =>
      prev.map(n => {
        if (targetNodeId && n.id === targetNodeId) {
          return { ...n, state: "lca" };
        }

        if (n.state === "lca") {
          return { ...n, state: "visited" };
        }

        return n;
      })
    );
  }, []);

  const onComputeLCA = useCallback(async () => {
    if (!currentTree) {
      setError("Run traversal first to build a DOM tree for LCA.");
      return;
    }

    if (!selectedNodeA || !selectedNodeB) {
      setError("Please select both node A and node B.");
      return;
    }

    setError(null);
    setLCALoading(true);

    try {
      const resp = await computeLCA({
        tree: currentTree,
        nodeA: selectedNodeA,
        nodeB: selectedNodeB,
      });

      setLCANodeId(resp.lcaNodeId);
      setActiveNodeId(resp.lcaNodeId);
      applyLCAHighlight(resp.lcaNodeId);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLCALoading(false);
    }
  }, [applyLCAHighlight, currentTree, selectedNodeA, selectedNodeB]);

  const onRun = async () => {
    if (running) return;
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const runStart = performance.now();

    setError(null);
    setRunning(true);
    setElapsedMs(null);
    clearReplayTimer();
    setLCANodeId(null);
    applyLCAHighlight(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await traverse({
        source: sourceType,
        input: source,
        selector,
        algorithm: algo,
        limit,
      }, controller.signal);

      if (runIdRef.current !== runId) return;

      const { nodes: laidOut, edges: laidEdges, width, height } = layoutTree(resp.tree);
      setNodes(laidOut.map(n => ({ ...n, state: "idle" })));
      setEdges(laidEdges);
      setWorld({ w: width, h: height });
      setStats(resp.stats);
      setCurrentTree(resp.tree);
      setLog([]);
      setActiveNodeId(null);

      if (laidOut.length > 0) {
        const sortedIds = laidOut.map(n => n.id).sort((a, b) => a.localeCompare(b));
        setSelectedNodeA(sortedIds[0]);
        setSelectedNodeB(sortedIds[Math.min(1, sortedIds.length - 1)]);
      }

      replayDataRef.current = {
        log: resp.log.map(entry => ({ step: entry.step, nodeId: entry.nodeId, matched: entry.matched })),
        matches: new Set(resp.matches),
      };
      playbackIndexRef.current = 0;
      playbackStartRef.current = runStart;

      if (resp.log.length === 0) {
        finishPlayback();
        abortRef.current = null;
        return;
      }

      schedulePlayback();
    } catch (e) {
      if (runIdRef.current !== runId) return;
      if (!(e instanceof Error && e.name === "AbortError")) {
        setError(e instanceof Error ? e.message : String(e));
        setElapsedMs(performance.now() - runStart);
      }
      setRunning(false);
      setActiveNodeId(null);
    } finally {
      if (runIdRef.current === runId) {
        abortRef.current = null;
      }
    }
  };

  const canControlPlayback = (replayDataRef.current?.log.length ?? 0) > 0;

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
          {stats && <StatsCard log={log} stats={stats} elapsedMs={elapsedMs ?? undefined} running={running} mouseContainer={mouseRef} />}
          <FloatingControls
            speed={speed}
            setSpeed={setSpeed}
            running={running}
            canControlPlayback={canControlPlayback}
            onReplay={onReplayPlayback}
            onPlay={onPlayPlayback}
            onPause={onPausePlayback}
            onNext={onNextStep}
            onZoomOut={() => canvasRef.current?.zoomOut()}
            onZoomIn={() => canvasRef.current?.zoomIn()}
            onResetView={() => canvasRef.current?.resetView()}
            mouseContainer={mouseRef}
          />
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
        onStop={stopTraversal}
        log={log}
        selectedNodeA={selectedNodeA}
        setSelectedNodeA={setSelectedNodeA}
        selectedNodeB={selectedNodeB}
        setSelectedNodeB={setSelectedNodeB}
        nodeOptions={nodeOptions}
        onComputeLCA={onComputeLCA}
        lcaLoading={lcaLoading}
        lcaNodeId={lcaNodeId}
      />
    </div>
  );
}
