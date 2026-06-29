import React from "react";

export interface ChipProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
}

/**
 * A pill-shaped filter toggle that highlights when active, used for quick
 * faceted selection.
 */
export function Chip({ label, active, onSelect }: ChipProps) {
  return (
    <button className={active ? "chip on" : "chip"} onClick={onSelect}>
      {label}
    </button>
  );
}
