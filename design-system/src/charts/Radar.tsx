import React from "react";

export interface ClimateScores {
  warmth: number;
  sun: number;
  rain: number;
  diurnal: number;
  risk: number;
}

export interface RadarProps {
  /** Climate fingerprint, each axis scored 0–5. */
  scores: ClimateScores;
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

/**
 * Climate "fingerprint" — a five-axis radar (warmth, sun, rain, diurnal range,
 * frost/disease risk) rendered as a gold polygon over a gridded pentagon.
 * The shape lets a region's climate be read at a glance.
 */
export function Radar({ scores }: RadarProps) {
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
  const valpts: string[] = [];
  RADAR_AX.forEach((ax, i) => {
    const [x, y] = polar(cx, cy, R, (i * 360) / N);
    axes.push(<line key={"a" + i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" />);
    const v = scores[ax[0]] || 0;
    const [vx, vy] = polar(cx, cy, (R * v) / 5, (i * 360) / N);
    valpts.push(vx.toFixed(1) + "," + vy.toFixed(1));
    const [lx, ly] = polar(cx, cy, R + 15, (i * 360) / N);
    labels.push(
      <text key={"l" + i} x={lx} y={ly} fontFamily="var(--mono)" fontSize="9" fill="var(--muted)" textAnchor="middle" dominantBaseline="middle" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>
        {ax[1]}
      </text>
    );
  });
  return (
    <svg viewBox="0 0 200 192" width="100%" role="img" aria-label="climate fingerprint">
      {grid}
      {axes}
      <polygon points={valpts.join(" ")} fill="rgba(202,166,75,.22)" stroke="var(--gold)" strokeWidth="2" />
      {valpts.map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={"d" + i} cx={x} cy={y} r="2.4" fill="var(--gold-l)" />;
      })}
      {labels}
    </svg>
  );
}
