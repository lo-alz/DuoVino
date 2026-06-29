import React from "react";
import { CompareColHead, MiniMap } from "@duovino/design-system";

/** Region header — locator map behind the name and country sub-label. */
export const Region = () => (
  <div style={{ width: 300 }}>
    <CompareColHead
      name="Rioja"
      sub="🇪🇸 Spain"
      media={<MiniMap lat={42.46} lng={-2.45} />}
    />
  </div>
);
/** Grape header — variety photo behind the name and grape-colour sub-label. */
export const Grape = () => (
  <div style={{ width: 300 }}>
    <CompareColHead
      name="Tempranillo"
      sub="Black grape"
      media={
        <img
          className="cmpmediaimg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Old_Wine_Barrels.jpg/320px-Old_Wine_Barrels.jpg"
          alt=""
        />
      }
    />
  </div>
);
