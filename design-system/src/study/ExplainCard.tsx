import React from "react";
import { ChainTable } from "./ChainTable";

export interface ExplainCardProps {
  topic: string;
  prompt: string;
  requiredPoints?: string[];
  revealed?: boolean;
  chain?: { label: string; value: string }[];
}

/** An "explain why" card: a prompt that, when revealed, lists the points a complete answer needs and an optional reasoning chain. */
export function ExplainCard({ topic, prompt, requiredPoints, revealed, chain }: ExplainCardProps) {
  return (
    <div className="qcard">
      <div className="qmeta">
        <span className="topic">{topic}</span>
        <span className="qtype">Explain · why</span>
      </div>
      <div className="qbody">
        <div className="prompt">{prompt}</div>
        {chain ? null : <div className="ptip">Build the chain: factor → mechanism → effect → style.</div>}
        {revealed ? (
          <div className="revealbox">
            <div className="rl">A complete answer contains</div>
            <ul>
              {(requiredPoints || []).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            {chain ? <ChainTable steps={chain} /> : null}
          </div>
        ) : null}
      </div>
      {revealed ? (
        <div className="actions">
          <button className="b-again">Missed it</button>
          <button className="b-part">Some points</button>
          <button className="b-got">Nailed it</button>
        </div>
      ) : (
        <div className="actions">
          <button className="b-next">Reveal model answer</button>
        </div>
      )}
    </div>
  );
}
