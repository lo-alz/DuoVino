import * as React from 'react';

/**
 * QBtn — from @duovino/design-system@0.1.0.
 */
export interface QBtnProps {
  title: string;
  desc: string;
  accent?: boolean;
  onClick?: () => void;
}

export declare const QBtn: React.ComponentType<QBtnProps>;
