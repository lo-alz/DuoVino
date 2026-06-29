import React from "react";
import { LoAccordion } from "@duovino/design-system";

/** An open learning objective with a four-state mastery track. */
export const Open = () => (
  <LoAccordion
    code="LO2"
    title="Climate & site"
    statement="Explain how natural factors shape Rioja’s style"
    open
    segments={[
      { state: 3, pct: 30 },
      { state: 2, pct: 25 },
      { state: 1, pct: 20 },
      { state: 0, pct: 25 },
    ]}
  >
    <p>
      Rioja’s altitude and the cold, Atlantic-influenced nights create a wide
      diurnal range. Warm days ripen Tempranillo fully while cool nights slow
      sugar accumulation and preserve acidity, giving wines with ripe fruit
      and a fresh backbone.
    </p>
  </LoAccordion>
);
