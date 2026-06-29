import React from "react";
import { ChainTable } from "@duovino/design-system";

/** A full cause→effect chain explaining Rioja's freshness. */
export const RiojaChain = () => (
  <ChainTable
    steps={[
      { label: "Factor", value: "High altitude + Atlantic nights" },
      { label: "Mechanism", value: "Wide diurnal range" },
      { label: "Effect", value: "Slow sugar accumulation" },
      { label: "Style", value: "Ripe fruit with fresh acidity" },
    ]}
  />
);
