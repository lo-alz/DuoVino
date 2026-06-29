import React from "react";

export interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle?: () => void;
}

/**
 * A compact icon button that flips between dark and light themes, showing the
 * destination theme's glyph (sun while dark, moon while light).
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button className="themebtn" aria-label="Toggle theme" onClick={onToggle}>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
