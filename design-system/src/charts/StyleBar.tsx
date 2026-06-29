import React from "react";

export interface StyleComposition {
  red?: number;
  white?: number;
  rose?: number;
  sparkling?: number;
  sweet?: number;
}

export interface StyleBarProps {
  /** Wine-style composition for a region, values in percent. */
  style: StyleComposition;
}

const STYLE_COL: Record<string, string> = { red: "#8a2540", white: "#caa64b", rose: "#c0566e", sparkling: "#6aa6e0", sweet: "#d98a9c" };
const STYLE_LBL: Record<string, string> = { red: "Red", white: "White", rose: "Rosé", sparkling: "Sparkling", sweet: "Sweet" };

/**
 * Wine-style composition bar — a single horizontal bar split by share of red /
 * white / rosé / sparkling / sweet, with a colour-keyed legend below. Shows at
 * a glance what styles a region is known for.
 */
export function StyleBar({ style }: StyleBarProps) {
  if (!style) return null;
  const keys = (Object.keys(style) as (keyof StyleComposition)[]).filter((k) => (style[k] || 0) > 0);
  const tot = keys.reduce((s, k) => s + (style[k] || 0), 0) || 1;
  return (
    <>
      <div style={{ display: "flex", height: 22, borderRadius: 7, overflow: "hidden", border: "1px solid var(--line)" }}>
        {keys.map((k) => (
          <i key={k} style={{ width: `${((style[k] || 0) / tot) * 100}%`, background: STYLE_COL[k] }} />
        ))}
      </div>
      <div className="legend">
        {keys.map((k) => (
          <span key={k}>
            <span className="dot" style={{ background: STYLE_COL[k] }} />
            {STYLE_LBL[k]} {style[k]}%
          </span>
        ))}
      </div>
    </>
  );
}
