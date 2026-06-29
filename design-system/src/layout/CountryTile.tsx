import React from "react";

export interface CountryTileProps {
  name: string;
  flag?: string;
  topics: number;
  pct: number;
  onSelect?: () => void;
}

/**
 * A tappable country tile showing a flag, topic count and a slim progress bar,
 * used to navigate regional study areas.
 */
export function CountryTile({ name, flag, topics, pct, onSelect }: CountryTileProps) {
  return (
    <button className="tile" onClick={onSelect}>
      <span className="flag">{flag || "🍷"}</span>
      <span className="ti">
        <span className="tn">{name}</span>
        <span className="tm">
          {topics} topics · {pct}%
        </span>
        <span className="tbar">
          <i style={{ width: `${pct}%` }}></i>
        </span>
      </span>
    </button>
  );
}
