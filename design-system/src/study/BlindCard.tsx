import React from "react";

export interface BlindCardProps {
  tastingProfile: string;
  deduce?: string[];
  justifyWith?: string[];
  revealed?: boolean;
}

/** A blind-tasting card: presents a tasting note and, when revealed, the deduction plus the markers that justify each conclusion. */
export function BlindCard({ tastingProfile, deduce, justifyWith, revealed }: BlindCardProps) {
  return (
    <div className="qcard">
      <div className="qmeta">
        <span className="topic">Blind</span>
        <span className="qtype">Deduce + justify</span>
      </div>
      <div className="qbody">
        <div className="eyebrow" style={{ marginBottom: "8px" }}>
          Tasting note
        </div>
        <div className="tasting">{tastingProfile}</div>
        {revealed ? (
          <div className="revealbox">
            <div className="rl">Deduction</div>
            <ul className="deduce">
              {(deduce || []).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <div className="rl" style={{ marginTop: "12px" }}>
              Justified by
            </div>
            <ul>
              {(justifyWith || []).map((j, i) => (
                <li key={i}>{j}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="ptip">Name grape, climate and region — and the markers that prove each.</div>
        )}
      </div>
      {revealed ? (
        <div className="actions">
          <button className="b-again">Missed</button>
          <button className="b-part">Partly</button>
          <button className="b-got">Got it</button>
        </div>
      ) : (
        <div className="actions">
          <button className="b-next">Reveal deduction</button>
        </div>
      )}
    </div>
  );
}
