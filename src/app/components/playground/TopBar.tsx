import { Algo } from "./types";

type Props = {
  algo: Algo;
  setAlgo: (a: Algo) => void;
  running: boolean;
  onRun: () => void;
};

export default function TopBar({ algo, setAlgo, running, onRun }: Props) {
  return (
    <header className="app-topbar flex items-center justify-between px-6 h-14 border-b border-white/5 bg-[#161616]">
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/50">PengenLibur</span>
        <span className="text-white/30">/</span>
        <span className="text-sm font-medium">DOM-Traverse · {algo.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* <div className="rounded-full p-1 flex text-xs bg-white/5 border border-white/5">
          {(["bfs", "dfs"] as const).map(a => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-3 py-1 rounded-full font-medium transition ${
                algo === a ? "bg-[#0367fc] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {a.toUpperCase()}
            </button>
          ))}
        </div> */}
        {/* <button className="btn-lime" onClick={onRun} disabled={running}>
          {running ? "Running…" : "▶ Run once"}
        </button> */}
      </div>
    </header>
  );
}
