import React from "react";
import { SummaryPanel } from "@duovino/design-system";

/** End-of-session summary with the filled-glass glyph and tallies. */
export const Complete = () => (
  <SummaryPanel pct={46} cards={18} mastered={9} partial={5} revisit={4} />
);
