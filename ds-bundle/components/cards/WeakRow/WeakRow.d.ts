import * as React from 'react';

/**
 * WeakRow — from @duovino/design-system@0.1.0.
 */
export interface WeakRowProps {
  topicTitle: string;
  statement: string;
  cat: string;
  state: 0 | 1 | 2 | 3;
}

export declare const WeakRow: React.ComponentType<WeakRowProps>;
