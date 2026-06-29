import * as React from 'react';

/**
 * CountryTile — from @duovino/design-system@0.1.0.
 */
export interface CountryTileProps {
  name: string;
  flag?: string;
  topics: number;
  pct: number;
  onSelect?: () => void;
}

export declare const CountryTile: React.ComponentType<CountryTileProps>;
