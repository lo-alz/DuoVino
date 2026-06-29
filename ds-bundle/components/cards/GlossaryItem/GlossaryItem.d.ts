import * as React from 'react';

/**
 * GlossaryItem — from @duovino/design-system@0.1.0.
 */
export interface GlossaryItemProps {
  term: string;
  language?: string;
  def: string;
}

export declare const GlossaryItem: React.ComponentType<GlossaryItemProps>;
