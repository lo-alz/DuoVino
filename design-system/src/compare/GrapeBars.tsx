import React from "react";

export interface GrapeBar {
  name: string;
  /** "w" = white (gold bar), anything else = red (garnet bar). */
  color: "w" | "r" | string;
  /** Planting share in percent. */
  pct: number;
}

export interface GrapeBarsProps {
  /** The grapes for this column, rendered as labelled horizontal bars. */
  grapes: GrapeBar[];
  /** Names of the grapes grown by the OTHER column — shared grapes are muted. */
  otherNames?: string[];
}

/**
 * Compare-mode grape breakdown — one labelled horizontal bar per variety
 * (name · bar · %), gold for whites and garnet for reds. Grapes the other
 * region also grows are muted so the unique varieties stand out.
 */
export function GrapeBars({ grapes, otherNames = [] }: GrapeBarsProps) {
  if (!grapes || !grapes.length) return <div className="cmptxt sm cmpmuted">—</div>;
  const others = new Set(otherNames.map((n) => n.toLowerCase()));
  return (
    <div className="cmpgbars">
      {grapes.map((g, i) => {
        const shared = others.has(g.name.toLowerCase());
        const fill = g.color === "w" ? "var(--gold)" : "var(--garnet)";
        // grape name takes the colour of the grape — gold for whites, rose-garnet
        // for reds. The shared signal is carried by the bar's reduced opacity.
        const nameColor = g.color === "w" ? "var(--gold-l)" : "var(--rose)";
        return (
          <div className={shared ? "cmpgbar sh" : "cmpgbar"} key={g.name + i}>
            <span className="gbn" style={{ color: nameColor }}>{g.name}</span>
            <span className="gbt">
              <span className="gbf" style={{ width: `${Math.max(3, Math.min(100, g.pct))}%`, background: fill }} />
            </span>
            <span className="gbp">{g.pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
