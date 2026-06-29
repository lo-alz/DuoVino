import * as React from 'react';

/**
 * RegionCard — from @duovino/design-system@0.1.0.
 */
export interface RegionCardProps {
  title: string;
  flag?: string;
  alt?: string;
  kkpCount: number;
  whyCount: number;
  pct: number;
  onSelect?: () => void;
}

export declare const RegionCard: React.ComponentType<RegionCardProps>;
