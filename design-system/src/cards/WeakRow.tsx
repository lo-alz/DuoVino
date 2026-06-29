import React from "react";

export interface WeakRowProps {
  topicTitle: string;
  statement: string;
  cat: string;
  state: 0 | 1 | 2 | 3;
}

/**
 * A weak-spot review row whose coloured dot encodes mastery state, surfacing a
 * topic title, its statement and a category-plus-state meta line.
 */
export function WeakRow({ topicTitle, statement, cat, state }: WeakRowProps) {
  const dotColor = ["var(--s0)", "var(--s1)", "var(--s2)", "var(--s3)"][state];
  const stateLabel = ["untouched", "seen", "partial", "mastered"][state];
  return (
    <div className="wk">
      <span className="dot" style={{ background: dotColor, width: "10px", height: "10px" }}></span>
      <div className="wktx">
        <b>{topicTitle}</b> · {statement}
        <div className="wkmeta">{cat} · {stateLabel}</div>
      </div>
    </div>
  );
}
