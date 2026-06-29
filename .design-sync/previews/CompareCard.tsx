import React from "react";
import {
  CompareCard,
  RadarCompare,
  GrapeBars,
  StyleBarInline,
} from "@duovino/design-system";

// Non-network stand-in for the locator-map header so the showcase renders in
// the headless check; the real MiniMap loads tiles in Claude Design's browser.
const MapMedia = () => (
  <div className="cmpmap" style={{ background: "linear-gradient(135deg,#2e323e,#3a4150)" }}>
    <span className="cmppin" />
  </div>
);

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
  media: <MapMedia />,
};
const b = {
  name: "Brunello di Montalcino",
  sub: "🇮🇹 Italy",
  media: <MapMedia />,
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
