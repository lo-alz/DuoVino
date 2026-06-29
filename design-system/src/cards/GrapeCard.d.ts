import * as React from 'react';

/**
 * GrapeCard — from @duovino/design-system@0.1.0.
 */
export interface GrapeCardProps {
  name: string;
  color: "w" | "r";
  aka?: string[];
  stats: { label: string; value: string; }[];
  onSelect?: () => void;
}

export declare const GrapeCard: React.ComponentType<GrapeCardProps>;
