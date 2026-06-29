import React from "react";
import { CurriculumOption } from "@duovino/design-system";

/** The active Diploma D3 option above the Level 3 option. */
export const Options = () => (
  <div style={{ display: "grid", gap: 8, padding: 8, maxWidth: 380 }}>
    <CurriculumOption
      label="WSET Diploma · D3"
      desc="All still wines of the world — the full Diploma D3 unit."
      count={91}
      active
    />
    <CurriculumOption
      label="WSET Level 3"
      desc="Still-wine regions in the Level 3 scope."
      count={57}
    />
  </div>
);
