import React from "react";

export interface QBtnProps {
  title: string;
  desc: string;
  accent?: boolean;
  onClick?: () => void;
}

/**
 * A large quick-action button stacking a bold title over a descriptive
 * subtitle, with an optional accent treatment for the primary action.
 */
export function QBtn({ title, desc, accent, onClick }: QBtnProps) {
  return (
    <button className={accent ? "qbtn accent" : "qbtn"} onClick={onClick}>
      <span className="qt">{title}</span>
      <span className="qd">{desc}</span>
    </button>
  );
}
