"use client";

import { useEffect, useState } from "react";
import { Algo } from "./types";

type Props = {
  algo: Algo;
  setAlgo: (a: Algo) => void;
  running: boolean;
  onRun: () => void;
};

export default function TopBar({ algo }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const nextTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <header
      className="app-topbar flex items-center justify-between px-6 h-14 liquid-glass-card"
      style={{ borderLeft: "none", borderRight: "none", borderTop: "none" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm" style={{ color: "var(--muted)" }}>PengenLibur</span>
        <span style={{ color: "var(--muted)" }}>/</span>
        <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
          DOM-Traverse · {algo.toUpperCase()}
        </span>
      </div>

      <div
        className="flex items-center gap-1 rounded-full p-1"
        style={{
          background: "var(--surface-soft)",
          border: "1px solid var(--border)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
        }}
        aria-label="Theme selector"
      >
        <button
          type="button"
          onClick={() => {
            setTheme("light");
            document.documentElement.dataset.theme = "light";
            window.localStorage.setItem("theme", "light");
          }}
          className="rounded-full px-3 py-1 text-xs font-medium transition"
          style={{
            background: theme === "light" ? "var(--surface-strong)" : "transparent",
            border: theme === "light" ? "1px solid var(--border-strong)" : "1px solid transparent",
            color: theme === "light" ? "var(--fg)" : "var(--muted)",
            boxShadow: theme === "light" ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
          }}
          aria-pressed={theme === "light"}
          title="Light mode"
        >
          ☀ Light
        </button>
        <button
          type="button"
          onClick={() => {
            setTheme("dark");
            document.documentElement.dataset.theme = "dark";
            window.localStorage.setItem("theme", "dark");
          }}
          className="rounded-full px-3 py-1 text-xs font-medium transition"
          style={{
            background: theme === "dark" ? "var(--surface-strong)" : "transparent",
            border: theme === "dark" ? "1px solid var(--border-strong)" : "1px solid transparent",
            color: theme === "dark" ? "var(--fg)" : "var(--muted)",
            boxShadow: theme === "dark" ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
          }}
          aria-pressed={theme === "dark"}
          title="Dark mode"
        >
          ☾ Dark
        </button>
      </div>
    </header>
  );
}
