import * as React from 'react';

/**
 * BottomNav — from @duovino/design-system@0.1.0.
 */
export interface BottomNavProps {
  active: string;
  onNavigate?: (key: string) => void;
}

export declare const BottomNav: React.ComponentType<BottomNavProps>;
