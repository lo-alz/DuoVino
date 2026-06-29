import * as React from 'react';

/**
 * GrapeBars — from @duovino/design-system@0.1.0.
 */
export interface GrapeBarsProps {
  /** The grapes for this column, rendered as labelled horizontal bars. */
  grapes: GrapeBar[];
  /** Names of the grapes grown by the OTHER column — shared grapes are muted. */
  otherNames?: string[];
}

export declare const GrapeBars: React.ComponentType<GrapeBarsProps>;
