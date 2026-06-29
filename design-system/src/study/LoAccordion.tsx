import React from "react";

export interface LoAccordionProps {
  code: string;
  title: string;
  statement: string;
  open?: boolean;
  segments: { state: 0 | 1 | 2 | 3; pct: number }[];
  children?: React.ReactNode;
  onToggle?: () => void;
}

/** A learning-objective accordion: a header with a four-state mastery track and a collapsible body revealing its contents. */
export function LoAccordion({ code, title, statement, open, segments, children, onToggle }: LoAccordionProps) {
  const colors = ["var(--s0)", "var(--s1)", "var(--s2)", "var(--s3)"];
  return (
    <div className={`lo ${open ? "open" : ""}`}>
      <button className="lohead" onClick={onToggle}>
        <span className="code">{code}</span>
        <span className="lt">
          <span className="h">{title}</span>
          <span className="s">{statement}</span>
        </span>
        <span className="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </button>
      <div className="lomastery">
        <div className="track">
          {segments.map((seg, i) => (
            <i key={i} style={{ width: `${seg.pct}%`, background: colors[seg.state] }}></i>
          ))}
        </div>
      </div>
      <div className="lobody">{children}</div>
    </div>
  );
}
