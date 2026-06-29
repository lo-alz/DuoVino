import * as React from 'react';

/**
 * KkpCard — from @duovino/design-system@0.1.0.
 */
export interface KkpCardProps {
  id: string;
  cat: string;
  statement: string;
  verified?: boolean;
  chain?: { label: string; value: string; }[];
}

export declare const KkpCard: React.ComponentType<KkpCardProps>;
