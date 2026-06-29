import * as React from 'react';

/**
 * CurriculumOption — from @duovino/design-system@0.1.0.
 */
export interface CurriculumOptionProps {
  label: string;
  desc: string;
  count: number;
  active?: boolean;
  onSelect?: () => void;
}

export declare const CurriculumOption: React.ComponentType<CurriculumOptionProps>;
