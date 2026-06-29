import * as React from 'react';

/**
 * BlindCard — from @duovino/design-system@0.1.0.
 */
export interface BlindCardProps {
  tastingProfile: string;
  deduce?: string[];
  justifyWith?: string[];
  revealed?: boolean;
}

export declare const BlindCard: React.ComponentType<BlindCardProps>;
