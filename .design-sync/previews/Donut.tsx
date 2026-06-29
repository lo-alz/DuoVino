import React from "react";
import { Donut } from "@duovino/design-system";

/** Rioja blend — Tempranillo-dominant with a splash of white Viura. */
export const Rioja = () => (
  <Donut
    grapes={[
      { name: "Tempranillo", color: "r", pct: 88 },
      { name: "Garnacha", color: "r", pct: 8 },
      { name: "Graciano", color: "r", pct: 2 },
      { name: "Viura", color: "w", pct: 2 },
    ]}
  />
);
/** Adelaide Hills blend — cool-climate whites alongside Pinot and Shiraz. */
export const AdelaideHills = () => (
  <Donut
    grapes={[
      { name: "Sauvignon Blanc", color: "w", pct: 32 },
      { name: "Chardonnay", color: "w", pct: 28 },
      { name: "Pinot Noir", color: "r", pct: 24 },
      { name: "Shiraz", color: "r", pct: 16 },
    ]}
  />
);
