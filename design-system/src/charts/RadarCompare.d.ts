import * as React from 'react';

/**
 * RadarCompare — from @duovino/design-system@0.1.0.
 */
export interface RadarCompareProps {
  /** First series scores (rendered in gold). */
  a: ClimateScores;
  /** Second series scores (rendered in azure). */
  b: ClimateScores;
  /** Legend label for series A. */
  aLabel: string;
  /** Legend label for series B. */
  bLabel: string;
}

export declare const RadarCompare: React.ComponentType<RadarCompareProps>;
