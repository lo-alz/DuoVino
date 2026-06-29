import React from "react";

export interface ModeSegMode {
  key: string;
  label: string;
}

export interface ModeSegProps {
  modes: ModeSegMode[];
  active: string;
  onSelect?: (key: string) => void;
}

/**
 * A segmented control that lets the user switch between mutually exclusive
 * modes, highlighting the active segment.
 */
export function ModeSeg({ modes, active, onSelect }: ModeSegProps) {
  return (
    <div className="modeseg">
      {modes.map((m) => (
        <button
          key={m.key}
          className={active === m.key ? "mode on" : "mode"}
          onClick={() => onSelect?.(m.key)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
