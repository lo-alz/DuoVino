import React from "react";
import type { StyleComposition } from "./StyleBar";

export interface StyleBarInlineProps {
  /** Wine-style composition, values in percent. */
  style: StyleComposition;
}

const STYLE_COL: Record<string, string> = { red: "#8a2540", white: "#caa64b", rose: "#c0566e", sparkling: "#6aa6e0", sweet: "#d98a9c" };
const STYLE_LBL: Record<string, string> = { red: "Red", white: "White", rose: "Rosé", sparkling: "Sparkling", sweet: "Sweet" };
// Contrast colour for the label that sits inside each segment.
const STYLE_INK: Record<string, string> = { red: "#f7e9ec", white: "#1a1407", rose: "#2a0e16", sparkling: "#06121f", sweet: "#2a0e16" };

/**
 * Compare-mode style bar — same composition bar as StyleBar, but each segment
 * carries its own "Style %" label in a contrasting colour and there is no
 * external legend. Keeps the Compare card compact and free of duplicated labels.
 */
export function StyleBarInline({ style }: StyleBarInlineProps) {
  if (!style) return null;
  const keys = (Object.keys(style) as (keyof StyleComposition)[]).filter((k) => (style[k] || 0) > 0);
  const tot = keys.reduce((s, k) => s + (style[k] || 0), 0) || 1;
  return (
    <div style={{ display: "flex", height: 26, borderRadius: 7, overflow: "hidden", border: "1px solid var(--line)" }}>
      {keys.map((k) => {
        const w = ((style[k] || 0) / tot) * 100;
        return (
          <i
            key={k}
            style={{
              width: `${w}%`,
              background: STYLE_COL[k],
              color: STYLE_INK[k],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              fontStyle: "normal",
              letterSpacing: ".02em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {w >= 16 ? `${STYLE_LBL[k]} ${style[k]}%` : `${style[k]}%`}
          </i>
        );
      })}
    </div>
  );
}
