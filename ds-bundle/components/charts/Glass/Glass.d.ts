import * as React from 'react';

/**
 * Glass — from @duovino/design-system@0.1.0.
 */
export interface GlassProps {
  /** Fill level 0–100. Drives how high the garnet wine rises in the bowl. */
  pct: number;
  /** Glyph width in px (height scales to 1.36×). Default 26. */
  width?: number;
}

export declare const Glass: React.ComponentType<GlassProps>;
