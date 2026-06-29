import React from "react";

export interface CurriculumOptionProps {
  label: string;
  desc: string;
  count: number;
  active?: boolean;
  onSelect?: () => void;
}

/**
 * A selectable curriculum option, gold-highlighted with an "Active" badge when
 * chosen, showing its description and the number of regions in scope.
 */
export function CurriculumOption({ label, desc, count, active, onSelect }: CurriculumOptionProps) {
  return (
    <button className={`curopt ${active ? "on" : ""}`} onClick={onSelect}>
      <span className="curtop">
        <b>{label}</b>
        {active ? <span className="curon">Active</span> : ""}
      </span>
      <span className="curdesc">{desc}</span>
      <span className="curcount">{count} region{count === 1 ? "" : "s"} in scope</span>
    </button>
  );
}
