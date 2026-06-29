import * as React from 'react';

/**
 * ExplainCard — from @duovino/design-system@0.1.0.
 */
export interface ExplainCardProps {
  topic: string;
  prompt: string;
  requiredPoints?: string[];
  revealed?: boolean;
  chain?: { label: string; value: string; }[];
}

export declare const ExplainCard: React.ComponentType<ExplainCardProps>;
