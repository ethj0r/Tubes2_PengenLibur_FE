export default function LeftRail() {
  return (
    <aside className="app-rail flex flex-col items-center py-4 border-r border-white/5 bg-[#141414] z-20">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#d2f801] text-lg"
        style={{
          background: "linear-gradient(180deg,#0367fc,#0350c7)",
          boxShadow: "0 0 18px -6px rgba(3,103,252,.55)",
        }}
        aria-label="PengenLibur"
      >
        🌲
      </div>
    </aside>
  );
}
