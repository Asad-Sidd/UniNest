"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />; // Placeholder to prevent layout shift

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cream dark:bg-dark-elevated border border-mist/50 dark:border-dark-border text-charcoal dark:text-dark-text hover:border-coral dark:hover:border-coral transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coral/50"
      aria-label="Toggle dark mode"
    >
      <Sun className={`absolute w-4 h-4 transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
      <Moon className={`absolute w-4 h-4 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
    </button>
  );
}
