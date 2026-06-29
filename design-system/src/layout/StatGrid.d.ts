import * as React from 'react';

/**
 * StatGrid — from @duovino/design-system@0.1.0.
 */
export interface StatGridProps {
  mastered: number;
  partial: number;
  seen: number;
  relMastered: number;
  relTotal: number;
}

export declare const StatGrid: React.ComponentType<StatGridProps>;
