export default function FloatingControls() {
  return (
    <div className="absolute left-6 bottom-6 rounded-2xl px-3 py-2 flex items-center gap-1 z-10 bg-[#1c1c1c] border border-white/8">
      {["⟲", "▶", "⏸", "⏭"].map((g, i) => (
        <button key={i} className="btn-ghost">{g}</button>
      ))}
      <div className="w-px h-5 bg-white/10 mx-1" />
      {["－", "＋", "⤢"].map((g, i) => (
        <button key={i} className="btn-ghost">{g}</button>
      ))}
    </div>
  );
}
