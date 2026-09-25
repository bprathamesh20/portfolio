"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Both icons render; CSS picks one, so there is no hydration mismatch.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Moon className="h-3.5 w-3.5 transition-transform duration-300 group-active:-rotate-12 dark:hidden" />
      <Sun className="hidden h-3.5 w-3.5 transition-transform duration-300 group-active:rotate-45 dark:block" />
    </button>
  );
}
