import React from "react";

export interface GrapeShare {
  name: string;
  /** "w" = white (gold), anything else = red (garnet). */
  color: "w" | "r" | string;
  /** Planting share in percent. */
  pct: number;
}

export interface GrapeCompareProps {
  /** Left region's grapes. */
  a: GrapeShare[];
  /** Right region's grapes. */
  b: GrapeShare[];
  /** Left region label (column header). */
  aLabel: string;
  /** Right region label (column header). */
  bLabel: string;
}

/**
 * Proportional grape comparison table — one row per variety across both
 * regions. Each cell fills proportionally to that region's planting share,
 * coloured by grape type (gold for whites, garnet for reds). Empty cells
 * signal the grape isn't grown there. Rows sort by the left region's share,
 * descending.
 */
export function GrapeCompare({ a, b, aLabel, bLabel }: GrapeCompareProps) {
  const map: Record<string, { name: string; color: string; a: number; b: number }> = {};
  (a || []).forEach((g) => { map[g.name.toLowerCase()] = { name: g.name, color: g.color, a: g.pct, b: 0 }; });
  (b || []).forEach((g) => {
    const k = g.name.toLowerCase();
    if (map[k]) map[k].b = g.pct;
    else map[k] = { name: g.name, color: g.color, a: 0, b: g.pct };
  });
  const rows = Object.values(map).sort((x, y) => (y.a - x.a) || (y.b - x.b));

  const cell = (pct: number, color: string) => (
    <div className="gcmpcell">
      <div className="gcmpbar" style={{ width: `${pct}%`, background: color }}>
        {pct >= 10 ? <span className="gcmppct2">{pct}%</span> : null}
      </div>
      {pct > 0 && pct < 10 ? <span className="gcmppct2 gcmppct2-out">{pct}%</span> : null}
    </div>
  );

  return (
    <table className="gcmptbl">
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "35%" }} />
        <col style={{ width: "35%" }} />
      </colgroup>
      <thead>
        <tr>
          <th className="gcmpth"></th>
          <th className="gcmpth">{aLabel}</th>
          <th className="gcmpth">{bLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((g) => {
          const color = g.color === "w" ? "var(--gold)" : "var(--garnet)";
          const nameColor = g.color === "w" ? "var(--gold-l)" : "var(--rose)";
          return (
            <tr className="gcmptr" key={g.name}>
              <td className="gcmptd gcmpgname" style={{ color: nameColor }}>{g.name}</td>
              <td className="gcmptd">{g.a > 0 ? cell(g.a, color) : null}</td>
              <td className="gcmptd">{g.b > 0 ? cell(g.b, color) : null}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
