import React from "react";
import { CompareColHead } from "./CompareColHead";
import { Glass } from "../charts/Glass";

export interface CompareColumn {
  name: string;
  sub: string;
  media?: React.ReactNode;
}

export interface CompareRow {
  /** Row label, e.g. "Climate", "Principal grapes", "Style". */
  label: string;
  /** Full-width row spanning both columns (e.g. the combined climate radar). */
  full?: boolean;
  /** Content for column A (two-column rows). */
  cellA?: React.ReactNode;
  /** Content for column B (two-column rows). */
  cellB?: React.ReactNode;
  /** Content for a full-width row. */
  cellFull?: React.ReactNode;
}

export interface CompareCardProps {
  /** Left column entity. */
  a: CompareColumn;
  /** Right column entity. */
  b: CompareColumn;
  /** Ordered comparison rows. */
  rows: CompareRow[];
  /** Optional action bar rendered below the card (Drill / Copy link / Save image). */
  actions?: React.ReactNode;
}

/**
 * The Compare card — two entities side by side with image headers, an ordered
 * set of attribute rows (full-width or two-column), auto-highlighted "Differs"
 * rows, and a subtle branded footer for shareable image export.
 */
export function CompareCard({ a, b, rows, actions }: CompareCardProps) {
  return (
    <>
      <div className="cmp-card" id="cmpCard">
        <div className="cmpcols">
          <CompareColHead name={a.name} sub={a.sub} media={a.media} />
          <CompareColHead name={b.name} sub={b.sub} media={b.media} />
        </div>
        {rows.map((r, i) => (
          <div className={"cmprow" + (r.full ? " full" : "")} key={r.label + i}>
            <div className="cmprl">{r.label}</div>
            <div className="cmprc">
              {r.full ? (
                r.cellFull
              ) : (
                <>
                  <div className="cmpcell">{r.cellA}</div>
                  <div className="cmpcell">{r.cellB}</div>
                </>
              )}
            </div>
          </div>
        ))}
        <div className="cmpfoot">
          <Glass pct={100} width={13} /> duovino.netlify.app
        </div>
      </div>
      {actions && <div className="cmpact">{actions}</div>}
    </>
  );
}
