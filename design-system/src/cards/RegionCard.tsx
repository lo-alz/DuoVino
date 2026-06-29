import React from "react";
import { Glass } from "../charts/Glass";

export interface RegionCardProps {
  title: string;
  flag?: string;
  alt?: string;
  kkpCount: number;
  whyCount: number;
  pct: number;
  onSelect?: () => void;
}

/**
 * A tappable region summary card headed by the signature Glass mastery glyph,
 * pairing the region title with KKP, "why" and percent-complete metrics.
 */
export function RegionCard({ title, flag, alt, kkpCount, whyCount, pct, onSelect }: RegionCardProps) {
  return (
    <button className="tcard" onClick={onSelect}>
      <span className="tctop">
        <Glass pct={pct} width={26} />
        <h3>{title}</h3>
      </span>
      <div className="alt">{flag || ""} {alt || ""}</div>
      <div className="meta">
        <span className="mb"><b>{kkpCount}</b> KKP</span>
        <span className="mb"><b>{whyCount}</b> why</span>
        <span className="mb"><b>{pct}%</b></span>
      </div>
    </button>
  );
}
