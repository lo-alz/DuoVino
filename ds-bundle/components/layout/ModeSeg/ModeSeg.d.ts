import * as React from 'react';

/**
 * ModeSeg — from @duovino/design-system@0.1.0.
 */
export interface ModeSegProps {
  modes: ModeSegMode[];
  active: string;
  onSelect?: (key: string) => void;
}

export declare const ModeSeg: React.ComponentType<ModeSegProps>;
