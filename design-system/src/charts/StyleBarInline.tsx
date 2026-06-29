import React from "react";
import type { StyleComposition } from "./StyleBar";

export interface StyleBarInlineProps {
  /** Wine-style composition, values in percent. */
  style: StyleComposition;
}

const STYLE_COL: Record<string, string> = {
  red: "#8a2540", white: "#caa64b", rose: "#c0566e", sparkling: "#6aa6e0", sweet: "#d98a9c",
};
const STYLE_LBL: Record<string, string> = {
  red: "Red", white: "White", rose: "Rosé", sparkling: "Sparkling", sweet: "Sweet",
};
const STYLE_INK: Record<string, string> = {
  red: "#f7e9ec", white: "#1a1407", rose: "#2a0e16", sparkling: "#06121f", sweet: "#2a0e16",
};

/** Minimum segment width (%) to show the label inside; narrower → callout above. */
const THRESHOLD = 12;

/**
 * Compare-mode style bar — a horizontal bar split by wine-style share. A legend
 * strip above names each colour; segments show only the % inside (if wide enough)
 * or a small callout above with a tick line when the segment is too narrow.
 */
export function StyleBarInline({ style }: StyleBarInlineProps) {
  if (!style) return null;
  const keys = (Object.keys(style) as (keyof StyleComposition)[]).filter((k) => (style[k] || 0) > 0);
  const tot = keys.reduce((s, k) => s + (style[k] || 0), 0) || 1;

  let cum = 0;
  const segs = keys.map((k) => {
    const pct = style[k] || 0;
    const w = (pct / tot) * 100;
    const left = cum;
    cum += w;
    return { key: k, pct, w, left };
  });

  const hasCallout = segs.some((s) => s.w < THRESHOLD);

  return (
    <div>
      {/* Legend — name + % for every segment */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", marginBottom: 7 }}>
        {segs.map((s) => (
          <span key={s.key} style={{ display: "flex", alignItems: "center", gap: 4,
            fontFamily: "var(--mono)", fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: STYLE_COL[s.key], flexShrink: 0 }} />
            {STYLE_LBL[s.key]} {s.pct}%
          </span>
        ))}
      </div>

      {/* Bar — % shown inside for large segments only; small segments are identified via legend */}
      <div style={{ height: 26, borderRadius: 7, overflow: "hidden", display: "flex" }}>
        {segs.map((s) => (
          <div key={s.key} style={{
            width: `${s.w}%`, background: STYLE_COL[s.key], height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {s.w >= 15 ? (
              <span style={{ fontFamily: "var(--mono)", fontSize: 9.5,
                color: STYLE_INK[s.key], fontStyle: "normal" }}>{s.pct}%</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
