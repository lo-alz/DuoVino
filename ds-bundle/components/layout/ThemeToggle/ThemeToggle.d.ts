import * as React from 'react';

/**
 * ThemeToggle — from @duovino/design-system@0.1.0.
 */
export interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle?: () => void;
}

export declare const ThemeToggle: React.ComponentType<ThemeToggleProps>;
