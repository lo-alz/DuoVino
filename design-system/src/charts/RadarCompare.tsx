import React from "react";
import type { ClimateScores } from "./Radar";

export interface RadarCompareProps {
  /** First series scores (rendered in gold). */
  a: ClimateScores;
  /** Second series scores (rendered in azure). */
  b: ClimateScores;
  /** Legend label for series A. */
  aLabel: string;
  /** Legend label for series B. */
  bLabel: string;
}

const RADAR_AX: [keyof ClimateScores, string][] = [
  ["warmth", "Warmth"],
  ["sun", "Sun"],
  ["rain", "Rain"],
  ["diurnal", "Diurnal"],
  ["risk", "Risk"],
];

function polar(cx: number, cy: number, r: number, a: number): [number, number] {
  const rad = ((a - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function series(scores: ClimateScores, cx: number, cy: number, R: number, N: number) {
  return RADAR_AX.map((ax, i) => {
    const v = scores[ax[0]] || 0;
    const [vx, vy] = polar(cx, cy, (R * v) / 5, (i * 360) / N);
    return vx.toFixed(1) + "," + vy.toFixed(1);
  });
}

/**
 * Two climate fingerprints overlaid on a single radar so two regions can be
 * compared directly — series A in gold, series B in azure, with a colour-keyed
 * legend underneath. The combined view replaces side-by-side radars in Compare.
 */
export function RadarCompare({ a, b, aLabel, bLabel }: RadarCompareProps) {
  const cx = 100, cy = 96, R = 66, N = 5;
  const grid: React.ReactNode[] = [];
  for (let ring = 1; ring <= 5; ring++) {
    const pts: string[] = [];
    for (let i = 0; i < N; i++) {
      const [x, y] = polar(cx, cy, (R * ring) / 5, (i * 360) / N);
      pts.push(x.toFixed(1) + "," + y.toFixed(1));
    }
    grid.push(<polygon key={"g" + ring} points={pts.join(" ")} fill="none" stroke="var(--line)" strokeWidth="1" />);
  }
  const axes: React.ReactNode[] = [];
  const labels: React.ReactNode[] = [];
  RADAR_AX.forEach((ax, i) => {
    const [x, y] = polar(cx, cy, R, (i * 360) / N);
    axes.push(<line key={"a" + i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" />);
    const [lx, ly] = polar(cx, cy, R + 15, (i * 360) / N);
    labels.push(
      <text key={"l" + i} x={lx} y={ly} fontFamily="var(--mono)" fontSize="9" fill="var(--muted)" textAnchor="middle" dominantBaseline="middle" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>
        {ax[1]}
      </text>
    );
  });
  const pa = series(a, cx, cy, R, N);
  const pb = series(b, cx, cy, R, N);
  return (
    <div className="cmpclim">
      <svg viewBox="0 0 200 192" width="100%" role="img" aria-label="climate comparison">
        {grid}
        {axes}
        <polygon points={pb.join(" ")} fill="rgba(63,130,196,.16)" stroke="var(--azul)" strokeWidth="2" />
        <polygon points={pa.join(" ")} fill="rgba(202,166,75,.16)" stroke="var(--gold)" strokeWidth="2" />
        {pa.map((p, i) => { const [x, y] = p.split(","); return <circle key={"da" + i} cx={x} cy={y} r="2.4" fill="var(--gold-l)" />; })}
        {pb.map((p, i) => { const [x, y] = p.split(","); return <circle key={"db" + i} cx={x} cy={y} r="2.4" fill="var(--azul-l)" />; })}
        {labels}
      </svg>
      <div className="legend">
        <span><span className="dot" style={{ background: "var(--gold)" }} />{aLabel}</span>
        <span><span className="dot" style={{ background: "var(--azul)" }} />{bLabel}</span>
      </div>
    </div>
  );
}
