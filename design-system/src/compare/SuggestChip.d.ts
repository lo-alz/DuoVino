import * as React from 'react';

/**
 * SuggestChip — from @duovino/design-system@0.1.0.
 */
export interface SuggestChipProps {
  /** Chip label, e.g. "Rioja × Ribera del Duero". */
  label: string;
  onSelect?: () => void;
}

export declare const SuggestChip: React.ComponentType<SuggestChipProps>;
