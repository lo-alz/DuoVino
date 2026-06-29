import React from "react";

export interface ProgressBarProps {
  pct: number;
}

/**
 * A minimal horizontal progress bar whose fill width tracks the given
 * percentage.
 */
export function ProgressBar({ pct }: ProgressBarProps) {
  return (
    <div className="progress">
      <i style={{ width: `${pct}%` }}></i>
    </div>
  );
}
