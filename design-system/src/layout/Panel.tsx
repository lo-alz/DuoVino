import React from "react";

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The foundational surface card — a rounded, padded container that groups
 * related content with the design system's panel styling.
 */
export function Panel({ children, className }: PanelProps) {
  return <div className={className ? `panel ${className}` : "panel"}>{children}</div>;
}
