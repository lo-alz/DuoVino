import React from "react";
import { MiniMap } from "@duovino/design-system";

/** Rioja locator map (northern Spain). */
export const Rioja = () => (
  <div style={{ position: "relative", width: 300, height: 96 }}>
    <MiniMap lat={42.46} lng={-2.45} />
  </div>
);
/** Barossa Valley locator map (South Australia). */
export const Barossa = () => (
  <div style={{ position: "relative", width: 300, height: 96 }}>
    <MiniMap lat={-34.53} lng={138.95} />
  </div>
);
