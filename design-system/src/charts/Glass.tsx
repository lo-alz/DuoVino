import React from "react";

export interface GlassProps {
  /** Fill level 0–100. Drives how high the garnet wine rises in the bowl. */
  pct: number;
  /** Glyph width in px (height scales to 1.36×). Default 26. */
  width?: number;
}

/**
 * The "fill the glass" mastery glyph — DuoVino's signature progress metaphor and
 * brand mark. A finely-drawn wine glass: a softly belled bowl on a slender stem
 * and an open elliptical foot, outlined in gold, whose bowl fills bottom-up with
 * a garnet gradient in proportion to `pct`. Used in headers, cards and summaries.
 */
export function Glass({ pct, width = 26 }: GlassProps) {
  const uid = React.useId().replace(/:/g, "");
  const clip = "gl" + uid;
  const grad = "gg" + uid;
  const h = width * 1.36;
  // bowl interior spans y≈20 (rim) to y≈61 (base of bowl); fill from bottom up
  const top = 62 - (Math.max(0, Math.min(100, pct)) / 100) * 42;
  const bowl = "M24 20 C17 31 22 61 40 61 C58 61 63 31 56 20 Z";
  return (
    <svg viewBox="0 0 80 108" width={width} height={h} aria-label={`${pct}% filled`} role="img">
      <defs>
        <clipPath id={clip}>
          <path d={bowl} />
        </clipPath>
        <linearGradient id={grad} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#6e1d33" />
          <stop offset="1" stopColor="#a8324f" />
        </linearGradient>
      </defs>
      <rect x="16" y={top} width="48" height="50" fill={`url(#${grad})`} clipPath={`url(#${clip})`} />
      <path d={bowl} fill="none" stroke="var(--gold)" strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="40" y1="61" x2="40" y2="92" stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="40" cy="95" rx="13" ry="2.8" fill="none" stroke="var(--gold)" strokeWidth="1.1" />
      <ellipse cx="40" cy="20" rx="16" ry="2.6" fill="none" stroke="var(--gold)" strokeWidth="1.1" />
    </svg>
  );
}
