import * as React from 'react';

/**
 * GrapeCompare — DuoVino design system.
 */
export interface GrapeShare {
  name: string;
  color: "w" | "r" | string;
  pct: number;
}

export interface GrapeCompareProps {
  /** Left region's grapes. */
  a: GrapeShare[];
  /** Right region's grapes. */
  b: GrapeShare[];
  /** Left region label. */
  aLabel: string;
  /** Right region label. */
  bLabel: string;
}

export declare const GrapeCompare: React.ComponentType<GrapeCompareProps>;
