import React from "react";
import { RefCard } from "@duovino/design-system";

// Inline oak-brown swatch so the preview renders without a network fetch.
const OAK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%237a5230'/><stop offset='1' stop-color='%233a2616'/></linearGradient></defs><rect width='160' height='100' fill='url(%23g)'/></svg>";

/** French oak barrel reference. */
export const FrenchOak = () => (
  <div style={{ width: 200 }}>
    <RefCard name="French Oak" tag="Barrique · tight grain" imgSrc={OAK} />
  </div>
);
