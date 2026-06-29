import React from "react";

export interface EyebrowProps {
  children: React.ReactNode;
}

/**
 * A small uppercase label that sits above a heading, giving sections a
 * refined editorial kicker.
 */
export function Eyebrow({ children }: EyebrowProps) {
  return <div className="eyebrow">{children}</div>;
}
