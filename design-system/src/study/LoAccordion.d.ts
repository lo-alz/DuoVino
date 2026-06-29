import * as React from 'react';

/**
 * LoAccordion — from @duovino/design-system@0.1.0.
 */
export interface LoAccordionProps {
  code: string;
  title: string;
  statement: string;
  open?: boolean;
  segments: { state: 0 | 1 | 2 | 3; pct: number; }[];
  children?: React.ReactNode;
  onToggle?: () => void;
}

export declare const LoAccordion: React.ComponentType<LoAccordionProps>;
