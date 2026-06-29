import React from "react";
import { Glass } from "../charts/Glass";

export interface CornerLogoProps {}

/**
 * The DuoVino corner mark — a fully filled miniature wine glass that brands the
 * edge of the layout.
 */
export function CornerLogo(props: CornerLogoProps) {
  return (
    <span className="corner-logo" role="img" aria-label="DuoVino">
      <Glass pct={100} width={24} />
    </span>
  );
}
