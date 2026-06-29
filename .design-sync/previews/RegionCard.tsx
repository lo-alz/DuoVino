import React from "react";
import { RegionCard } from "@duovino/design-system";

/** Rioja — partly studied. */
export const Rioja = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 8, maxWidth: 380 }}>
    <RegionCard title="Rioja" flag="🇪🇸" alt="Spain" kkpCount={14} whyCount={5} pct={38} />
    <RegionCard title="Mosel" flag="🇩🇪" alt="Germany" kkpCount={11} whyCount={4} pct={0} />
  </div>
);
