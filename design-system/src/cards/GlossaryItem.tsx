import React from "react";

export interface GlossaryItemProps {
  term: string;
  language?: string;
  def: string;
}

/**
 * A glossary entry pairing a term with its definition, with an optional inline
 * language tag for terms borrowed from another tongue.
 */
export function GlossaryItem({ term, language, def }: GlossaryItemProps) {
  return (
    <div className="gt">
      <div className="gterm">{term}{language ? <span className="lang">{language}</span> : ""}</div>
      <div className="gdef">{def}</div>
    </div>
  );
}
