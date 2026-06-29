import React from "react";
import { GrapeCard } from "@duovino/design-system";

/** A red and a white grape variety. */
export const Varieties = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 8, maxWidth: 380 }}>
    <GrapeCard
      name="Tempranillo"
      color="r"
      aka={["Tinto Fino"]}
      stats={[
        { label: "Acid", value: "Medium" },
        { label: "Tannin", value: "Med+" },
        { label: "Body", value: "Full" },
      ]}
    />
    <GrapeCard
      name="Riesling"
      color="w"
      aka={["Rheinriesling"]}
      stats={[
        { label: "Acid", value: "High" },
        { label: "Body", value: "Light" },
      ]}
    />
  </div>
);
