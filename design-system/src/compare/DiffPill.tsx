import React from "react";

export interface DiffPillProps {
  /** Pill label. Defaults to "Differs". */
  label?: string;
}

/**
 * The "Differs" marker shown beside a Compare row label when the two entities
 * diverge on that attribute — a readable gold pill that replaces the old cryptic
 * "Δ" badge. Pairs with the row's gold-tinted highlight.
 */
export function DiffPill({ label = "Differs" }: DiffPillProps) {
  return <span className="cmpdiffpill">{label}</span>;
}
