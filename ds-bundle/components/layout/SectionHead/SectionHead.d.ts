import * as React from 'react';

/**
 * SectionHead — from @duovino/design-system@0.1.0.
 */
export interface SectionHeadProps {
  title: string;
  link?: string;
  onLink?: () => void;
}

export declare const SectionHead: React.ComponentType<SectionHeadProps>;
