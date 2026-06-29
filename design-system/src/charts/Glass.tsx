import React from "react";

export interface GlassProps {
  /** Fill level 0–100. Drives how high the garnet wine rises in the bowl. */
  pct: number;
  /** Glyph width in px (height scales to 1.36×). Default 26. */
  width?: number;
}

/**
 * The "fill the glass" mastery glyph — DuoVino's signature progress metaphor.
 * A wine glass outlined in gold whose bowl fills bottom-up with a garnet
 * gradient in proportion to `pct`. Used in headers, cards and summaries.
 */
export function Glass({ pct, width = 26 }: GlassProps) {
  const uid = React.useId().replace(/:/g, "");
  const clip = "gl" + uid;
  const grad = "gg" + uid;
  const h = width * 1.36;
  const top = 64 - (Math.max(0, Math.min(100, pct)) / 100) * 44;
  const bowl = "M16 20 C16 46 28 62 40 62 C52 62 64 46 64 20 Z";
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
      <rect x="14" y={top} width="52" height="60" fill={`url(#${grad})`} clipPath={`url(#${clip})`} />
      <path d={bowl} fill="none" stroke="var(--gold)" strokeWidth="1.6" />
      <line x1="40" y1="62" x2="40" y2="94" stroke="var(--gold)" strokeWidth="1.6" />
      <line x1="26" y1="98" x2="54" y2="98" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="40" cy="20" rx="24" ry="3.4" fill="none" stroke="var(--gold)" strokeWidth="1.6" />
    </svg>
  );
}
