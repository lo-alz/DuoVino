import * as React from 'react';

/**
 * CompareColHead — from @duovino/design-system@0.1.0.
 */
export interface CompareColHeadProps {
  /** Entity name shown over the media, e.g. "Rioja" or "Albariño". */
  name: string;
  /** Sub-label, e.g. "🇪🇸 Spain" or "White grape". */
  sub: string;
  /** Header media rendered behind the name — a <MiniMap/> for regions or an <img className="cmpmediaimg"/> grape photo. Omit  */
  media?: React.ReactNode;
}

export declare const CompareColHead: React.ComponentType<CompareColHeadProps>;
