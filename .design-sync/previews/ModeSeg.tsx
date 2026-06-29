import React from "react";
import { ModeSeg } from "@duovino/design-system";

const modes = [
  { key: "regions", label: "Regions" },
  { key: "grapes", label: "Grapes" },
  { key: "vessels", label: "Vessels" },
  { key: "soils", label: "Soils" },
];

export const Default = () => <ModeSeg modes={modes} active="regions" />;
