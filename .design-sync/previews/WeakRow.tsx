import React from "react";
import { WeakRow } from "@duovino/design-system";

/** Seen state — a partially reviewed relationship. */
export const Seen = () => (
  <WeakRow
    topicTitle="Rioja"
    statement="Diurnal range retains acidity in ripe Tempranillo"
    cat="relationship"
    state={1}
  />
);

/** Untouched state — not yet reviewed. */
export const Untouched = () => (
  <WeakRow
    topicTitle="Rioja"
    statement="Diurnal range retains acidity in ripe Tempranillo"
    cat="relationship"
    state={0}
  />
);
