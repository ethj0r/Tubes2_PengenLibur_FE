import { Algo } from "./types";

type Props = {
  algo: Algo;
  setAlgo: (a: Algo) => void;
  running: boolean;
  onRun: () => void;
};

export default function TopBar({ algo }: Props) {
  return (
    <header
      className="app-topbar flex items-center justify-between px-6 h-14"
      style={{
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.7)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">PengenLibur</span>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-900">
          DOM-Traverse · {algo.toUpperCase()}
        </span>
      </div>
    </header>
  );
}
