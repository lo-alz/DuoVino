import React from "react";
import {
  CompareCard,
  MiniMap,
  RadarCompare,
  GrapeBars,
  StyleBarInline,
} from "@duovino/design-system";

const adelaideScores = { warmth: 2, sun: 4, rain: 3, diurnal: 4, risk: 2 };
const brunelloScores = { warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 };

const adelaideGrapes = [
  { name: "Sauvignon Blanc", color: "w", pct: 32 },
  { name: "Chardonnay", color: "w", pct: 28 },
  { name: "Pinot Noir", color: "r", pct: 24 },
  { name: "Shiraz", color: "r", pct: 16 },
];
const adelaideNames = adelaideGrapes.map((g) => g.name);

const a = {
  name: "Adelaide Hills",
  sub: "🇦🇺 Australia",
  media: <MiniMap lat={-34.9} lng={138.7} />,
};
const b = {
  name: "Brunello di Montalcino",
  sub: "🇮🇹 Italy",
  media: <MiniMap lat={43.06} lng={11.49} />,
};

const rows = [
  {
    label: "Climate",
    full: true,
    cellFull: (
      <RadarCompare
        a={adelaideScores}
        b={brunelloScores}
        aLabel="Adelaide Hills"
        bLabel="Brunello"
      />
    ),
  },
  {
    label: "Principal grapes",
    cellA: <GrapeBars grapes={adelaideGrapes} otherNames={["Sangiovese"]} />,
    cellB: (
      <GrapeBars
        grapes={[{ name: "Sangiovese", color: "r", pct: 100 }]}
        otherNames={adelaideNames}
      />
    ),
  },
  {
    label: "Style",
    cellA: <StyleBarInline style={{ white: 60, red: 40 }} />,
    cellB: <StyleBarInline style={{ red: 100 }} />,
  },
  {
    label: "Winemaking",
    cellA: "Cool-fermented Sauvignon; barrel-worked Chardonnay; some sparkling",
    cellB: "100% Sangiovese; long mandatory oak & bottle ageing",
  },
  {
    label: "Quality",
    cellA: "Very good to outstanding",
    cellB: "Outstanding",
  },
  {
    label: "Price",
    cellA: "Premium",
    cellB: "Premium to super-premium",
  },
];

/** The showcase Compare card — Adelaide Hills vs Brunello di Montalcino. */
export const RegionVsRegion = () => <CompareCard a={a} b={b} rows={rows} />;
