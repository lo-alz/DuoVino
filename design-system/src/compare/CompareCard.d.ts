import * as React from 'react';

/**
 * CompareCard — from @duovino/design-system@0.1.0.
 */
export interface CompareCardProps {
  /** Left column entity. */
  a: CompareColumn;
  /** Right column entity. */
  b: CompareColumn;
  /** Ordered comparison rows. */
  rows: CompareRow[];
  /** Optional action bar rendered below the card (Drill / Copy link / Save image). */
  actions?: React.ReactNode;
}

export declare const CompareCard: React.ComponentType<CompareCardProps>;
