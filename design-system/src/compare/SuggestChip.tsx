import React from "react";

export interface SuggestChipProps {
  /** Chip label, e.g. "Rioja × Ribera del Duero". */
  label: string;
  onSelect?: () => void;
}

/**
 * A suggested-pairing chip on the empty Compare screen — tapping it loads a
 * classic head-to-head (Rioja vs Ribera, Mosel vs Rheingau…) into the card.
 */
export function SuggestChip({ label, onSelect }: SuggestChipProps) {
  return (
    <button className="cmpchip" onClick={onSelect}>
      {label}
    </button>
  );
}
