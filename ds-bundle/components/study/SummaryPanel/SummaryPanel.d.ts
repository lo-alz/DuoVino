import * as React from 'react';

/**
 * SummaryPanel — from @duovino/design-system@0.1.0.
 */
export interface SummaryPanelProps {
  pct: number;
  cards: number;
  mastered: number;
  partial: number;
  revisit: number;
}

export declare const SummaryPanel: React.ComponentType<SummaryPanelProps>;
