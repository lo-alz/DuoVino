import React from "react";
import { Glass } from "../charts/Glass";

export interface HeroProps {
  pct: number;
  mastered: number;
  total: number;
  message: string;
}

/**
 * The mastery hero banner — a filling wine glass paired with a headline tally
 * and encouraging message to summarize overall progress.
 */
export function Hero({ pct, mastered, total, message }: HeroProps) {
  return (
    <div className="hero">
      <div className="glasswrap">
        <Glass pct={pct} width={72} />
        <div className="pct">{pct}%</div>
        <div className="pctl">Glass filled</div>
      </div>
      <div className="right">
        <div className="eyebrow">Mastery</div>
        <h2>
          {mastered}
          <span style={{ color: "var(--muted)", fontSize: ".6em" }}> / {total}</span> KKP mastered
        </h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
