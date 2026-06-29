import * as React from 'react';

/**
 * Chip — from @duovino/design-system@0.1.0.
 */
export interface ChipProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
}

export declare const Chip: React.ComponentType<ChipProps>;
