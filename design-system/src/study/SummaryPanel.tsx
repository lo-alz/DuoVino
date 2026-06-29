import React from "react";
import { Glass } from "../charts/Glass";

export interface SummaryPanelProps {
  pct: number;
  cards: number;
  mastered: number;
  partial: number;
  revisit: number;
}

/** End-of-session summary: the filled-glass glyph crowns a tally of mastered, partial and revisit cards with a fresh scope percentage. */
export function SummaryPanel({ pct, cards, mastered, partial, revisit }: SummaryPanelProps) {
  return (
    <div className="summary">
      <div className="glasswrap">
        <Glass pct={pct} width={110} />
      </div>
      <h2>Session complete</h2>
      <div className="ssub">
        {cards} card{cards > 1 ? "s" : ""} reviewed · scope now {pct}% filled
      </div>
      <div className="sgrid">
        <div className="sg">
          <div className="n" style={{ color: "var(--s3)" }}>
            {mastered}
          </div>
          <div className="l">Mastered</div>
        </div>
        <div className="sg">
          <div className="n" style={{ color: "var(--s2)" }}>
            {partial}
          </div>
          <div className="l">Partial</div>
        </div>
        <div className="sg">
          <div className="n" style={{ color: "var(--s1)" }}>
            {revisit}
          </div>
          <div className="l">Revisit</div>
        </div>
      </div>
      <button className="studybtn">Study again</button>
    </div>
  );
}
