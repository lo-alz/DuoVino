import React from "react";
import { BlindCard } from "@duovino/design-system";

/** A blind-tasting note before the deduction is revealed. */
export const Unrevealed = () => (
  <BlindCard tastingProfile="Pale lemon; high acid; green apple, lime, wet stone, a whiff of petrol; low alcohol; off-dry." />
);

/** The revealed deduction with its justifying markers. */
export const Revealed = () => (
  <BlindCard
    tastingProfile="Pale lemon; high acid; green apple, lime, wet stone, a whiff of petrol; low alcohol; off-dry."
    revealed
    deduce={["Riesling", "Cool climate", "Mosel, Germany"]}
    justifyWith={[
      "Petrol = aged Riesling",
      "High acid + low alcohol = cool climate",
      "Slate minerality + off-dry = Mosel",
    ]}
  />
);
