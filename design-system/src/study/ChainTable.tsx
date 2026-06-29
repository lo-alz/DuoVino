import React from "react";

export interface ChainTableProps {
  /** Ordered cause→effect steps; the last cell is visually emphasised. */
  steps: { label: string; value: string }[];
}

/** A cause→effect chain rendered as a grid of label/value cells, terminating in an emphasised "last" cell. */
export function ChainTable({ steps }: ChainTableProps) {
  return (
    <div className="chain">
      {steps.map((s, i) => (
        <div key={i} className={`cc ${i === steps.length - 1 ? "last" : ""}`}>
          <div className="cl">{s.label}</div>
          <div className="cv">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
