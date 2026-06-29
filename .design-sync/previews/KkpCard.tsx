import React from "react";
import { KkpCard } from "@duovino/design-system";

/** A verified relationship knowledge point. */
export const Relationship = () => (
  <KkpCard
    id="1.2.3"
    cat="relationship"
    statement="Altitude and cold nights give a wide diurnal range → fresh acidity is retained in ripe Tempranillo."
    verified
  />
);

/** A comparison knowledge point carrying a reasoning chain. */
export const Comparison = () => (
  <KkpCard
    id="1.2.4"
    cat="comparison"
    statement="Ribera del Duero sits higher and more continental than Rioja → riper, more powerful Tempranillo with firmer tannin."
    verified
    chain={[
      { label: "Factor", value: "High altitude + Atlantic nights" },
      { label: "Mechanism", value: "Wide diurnal range" },
      { label: "Effect", value: "Slow sugar accumulation" },
      { label: "Style", value: "Ripe fruit with fresh acidity" },
    ]}
  />
);
