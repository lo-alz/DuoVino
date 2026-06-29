import * as React from 'react';

/**
 * McqCard — from @duovino/design-system@0.1.0.
 */
export interface McqCardProps {
  topic: string;
  question: string;
  options: string[];
  correctIndex?: number;
  pickedIndex?: number;
  answered?: boolean;
  onPick?: (i: number) => void;
}

export declare const McqCard: React.ComponentType<McqCardProps>;
