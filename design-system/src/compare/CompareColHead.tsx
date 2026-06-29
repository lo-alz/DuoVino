import React from "react";

export interface CompareColHeadProps {
  /** Entity name shown over the media, e.g. "Rioja" or "Albariño". */
  name: string;
  /** Sub-label, e.g. "🇪🇸 Spain" or "White grape". */
  sub: string;
  /**
   * Header media rendered behind the name — a <MiniMap/> for regions or an
   * <img className="cmpmediaimg"/> grape photo. Omit for a plain panel.
   */
  media?: React.ReactNode;
}

/**
 * A Compare column header — the region's locator map or the grape's photo with
 * the name and sub-label overlaid on a gradient scrim. Replaces the old empty
 * mastery glass with imagery of what's actually being compared.
 */
export function CompareColHead({ name, sub, media }: CompareColHeadProps) {
  return (
    <div className="cmpmedia">
      {media}
      <div className="cmpmedscrim" />
      <div className="cmpmedlab">
        <div className="cmpmedname">{name}</div>
        <div className="cmpmedsub">{sub}</div>
      </div>
    </div>
  );
}
