import * as React from 'react';

/**
 * Radar — from @duovino/design-system@0.1.0.
 */
export interface RadarProps {
  /** Climate fingerprint, each axis scored 0–5. */
  scores: ClimateScores;
}

export declare const Radar: React.ComponentType<RadarProps>;
