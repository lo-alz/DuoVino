import * as React from 'react';

/**
 * ChainTable — from @duovino/design-system@0.1.0.
 */
export interface ChainTableProps {
  /** Ordered cause→effect steps; the last cell is visually emphasised. */
  steps: { label: string; value: string; }[];
}

export declare const ChainTable: React.ComponentType<ChainTableProps>;
