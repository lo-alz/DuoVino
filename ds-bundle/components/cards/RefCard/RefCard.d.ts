import * as React from 'react';

/**
 * RefCard — from @duovino/design-system@0.1.0.
 */
export interface RefCardProps {
  name: string;
  tag?: string;
  imgSrc: string;
  onSelect?: () => void;
}

export declare const RefCard: React.ComponentType<RefCardProps>;
