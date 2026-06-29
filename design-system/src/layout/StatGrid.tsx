import React from "react";

export interface StatGridProps {
  mastered: number;
  partial: number;
  seen: number;
  relMastered: number;
  relTotal: number;
}

/**
 * A four-cell statistics grid summarizing mastery tiers and why-link coverage,
 * each cell color-coded to its state.
 */
export function StatGrid({ mastered, partial, seen, relMastered, relTotal }: StatGridProps) {
  return (
    <div className="statgrid">
      <div className="stat">
        <div className="n" style={{ color: "var(--s3)" }}>
          {mastered}
        </div>
        <div className="l">
          <span className="dot" style={{ background: "var(--s3)" }}></span>Mastered
        </div>
      </div>
      <div className="stat">
        <div className="n" style={{ color: "var(--s2)" }}>
          {partial}
        </div>
        <div className="l">
          <span className="dot" style={{ background: "var(--s2)" }}></span>Partial
        </div>
      </div>
      <div className="stat">
        <div className="n" style={{ color: "var(--s1)" }}>
          {seen}
        </div>
        <div className="l">
          <span className="dot" style={{ background: "var(--s1)" }}></span>Seen
        </div>
      </div>
      <div className="stat">
        <div className="n" style={{ color: "var(--gold-l)" }}>
          {relMastered}
          <span style={{ color: "var(--muted)", fontSize: ".55em" }}>/{relTotal}</span>
        </div>
        <div className="l">Why-links</div>
      </div>
    </div>
  );
}
