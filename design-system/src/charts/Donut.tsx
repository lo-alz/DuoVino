import React from "react";

export interface GrapeSlice {
  name: string;
  /** "w" = white, anything else = red. Drives the gold vs garnet palette. */
  color: "w" | "r" | string;
  /** Share of plantings, in percent. */
  pct: number;
}

export interface DonutProps {
  /** Grape blend for a region; whites are gold-keyed, reds garnet-keyed. */
  grapes: GrapeSlice[];
}

const GOLDS = ["#caa64b", "#e6d7a0", "#b8923a", "#d9c27a", "#9c7c2e", "#f0e4b8"];
const REDS = ["#8a2540", "#c0566e", "#6e1d33", "#a83b56", "#d98a9c", "#5a1628"];

function polar(cx: number, cy: number, r: number, a: number): [number, number] {
  const rad = ((a - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/**
 * Grape-blend donut — each variety a ring segment sized by planting share,
 * whites in golds and reds in garnets, with a name+percent legend. Used on
 * region pages and the map detail panel to show what a region grows.
 */
export function Donut({ grapes }: DonutProps) {
  if (!grapes || !grapes.length) return null;
  const whites = grapes.filter((g) => g.color === "w").slice().sort((a, b) => b.pct - a.pct);
  const reds = grapes.filter((g) => g.color !== "w").slice().sort((a, b) => b.pct - a.pct);
  let gi = 0, ri = 0;
  const sl: (GrapeSlice & { c: string })[] = [];
  whites.forEach((g) => sl.push({ ...g, c: GOLDS[gi++ % GOLDS.length] }));
  reds.forEach((g) => sl.push({ ...g, c: REDS[ri++ % REDS.length] }));
  const tot = sl.reduce((s, x) => s + x.pct, 0) || 1;
  const cx = 100, cy = 100, R = 86, r = 52;
  let ang = 0;
  const paths: React.ReactNode[] = [];
  sl.forEach((s, idx) => {
    const a0 = ang, a1 = ang + (s.pct / tot) * 360;
    ang = a1;
    const [x0, y0] = polar(cx, cy, R, a0), [x1, y1] = polar(cx, cy, R, a1);
    const [xi1, yi1] = polar(cx, cy, r, a1), [xi0, yi0] = polar(cx, cy, r, a0);
    const lg = a1 - a0 > 180 ? 1 : 0;
    paths.push(
      <path
        key={idx}
        d={`M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 ${lg} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L${xi1.toFixed(1)} ${yi1.toFixed(1)} A${r} ${r} 0 ${lg} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`}
        fill={s.c}
        stroke="var(--panel)"
        strokeWidth="1.4"
      />
    );
  });
  return (
    <>
      <svg viewBox="0 0 200 200" width="84%" style={{ maxWidth: 170 }} role="img" aria-label="grape blend">
        {paths}
      </svg>
      <div className="legend">
        {sl.map((s, idx) => (
          <span key={idx}>
            <span className="dot" style={{ background: s.c }} />
            {s.name} {s.pct}%
          </span>
        ))}
      </div>
    </>
  );
}
