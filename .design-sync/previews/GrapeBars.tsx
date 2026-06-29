import React from "react";
import { GrapeBars } from "@duovino/design-system";

const adelaideGrapes = [
  { name: "Sauvignon Blanc", color: "w", pct: 32 },
  { name: "Chardonnay", color: "w", pct: 28 },
  { name: "Pinot Noir", color: "r", pct: 24 },
  { name: "Shiraz", color: "r", pct: 16 },
];
const adelaideNames = adelaideGrapes.map((g) => g.name);

/** Adelaide Hills blend — Sangiovese (Brunello's grape) muted as shared. */
export const AdelaideHills = () => (
  <div style={{ width: 300 }}>
    <GrapeBars grapes={adelaideGrapes} otherNames={["Sangiovese"]} />
  </div>
);
/** Brunello — 100% Sangiovese, with the Adelaide varieties muted as shared. */
export const Brunello = () => (
  <div style={{ width: 300 }}>
    <GrapeBars
      grapes={[{ name: "Sangiovese", color: "r", pct: 100 }]}
      otherNames={adelaideNames}
    />
  </div>
);
