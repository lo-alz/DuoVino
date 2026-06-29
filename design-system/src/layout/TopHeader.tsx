import React from "react";

export interface TopHeaderProps {
  title: string;
  sub?: string;
}

/**
 * The app's masthead: a serif title with an optional subtitle, anchoring the
 * brand identity at the top of each screen.
 */
export function TopHeader({ title, sub }: TopHeaderProps) {
  return (
    <div className="top">
      <div className="brand">
        <span>
          <h1 style={{ fontSize: 26 }}>{title}</h1>
          {sub ? <div className="sub">{sub}</div> : null}
        </span>
      </div>
    </div>
  );
}
