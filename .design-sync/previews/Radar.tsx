import React from "react";
import { Radar } from "@duovino/design-system";

/** Rioja — warm continental climate fingerprint. */
export const Rioja = () => <Radar scores={{ warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 }} />;
/** Mosel — cool climate, higher rain and frost/disease risk. */
export const Mosel = () => <Radar scores={{ warmth: 2, sun: 2, rain: 3, diurnal: 3, risk: 4 }} />;
