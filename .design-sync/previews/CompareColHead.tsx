import React from "react";
import { CompareColHead } from "@duovino/design-system";

// Non-network stand-ins for the header media so the card renders in the
// headless check. The real MiniMap (its own card) and grape photos load over
// the network in Claude Design's browser environment.
const MapMedia = () => (
  <div className="cmpmap" style={{ background: "linear-gradient(135deg,#2e323e,#3a4150)" }}>
    <span className="cmppin" />
  </div>
);
const GrapeMedia = () => (
  <div className="cmpmediaimg" style={{ background: "radial-gradient(circle at 40% 35%, #6e1d33, #2a0e16)" }} />
);

/** Region header — locator map behind the name and country sub-label. */
export const Region = () => (
  <div style={{ width: 300 }}>
    <CompareColHead name="Rioja" sub="🇪🇸 Spain" media={<MapMedia />} />
  </div>
);
/** Grape header — variety photo behind the name and grape-colour sub-label. */
export const Grape = () => (
  <div style={{ width: 300 }}>
    <CompareColHead name="Tempranillo" sub="Black grape" media={<GrapeMedia />} />
  </div>
);
