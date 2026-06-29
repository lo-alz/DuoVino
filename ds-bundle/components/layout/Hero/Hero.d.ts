import * as React from 'react';

/**
 * Hero — from @duovino/design-system@0.1.0.
 */
export interface HeroProps {
  pct: number;
  mastered: number;
  total: number;
  message: string;
}

export declare const Hero: React.ComponentType<HeroProps>;
