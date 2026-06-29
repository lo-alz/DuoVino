import React from "react";
import { RadarCompare } from "@duovino/design-system";

/** Adelaide Hills (gold) vs Brunello di Montalcino (azure) climate overlay. */
export const HillsVsBrunello = () => (
  <RadarCompare
    a={{ warmth: 2, sun: 4, rain: 3, diurnal: 4, risk: 2 }}
    b={{ warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 }}
    aLabel="Adelaide Hills"
    bLabel="Brunello di Montalcino"
  />
);
