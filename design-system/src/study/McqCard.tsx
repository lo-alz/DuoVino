import React from "react";

export interface McqCardProps {
  topic: string;
  question: string;
  options: string[];
  correctIndex?: number;
  pickedIndex?: number;
  answered?: boolean;
  onPick?: (i: number) => void;
}

/** A multiple-choice question card; once answered it marks the correct and wrongly-picked options and offers a next action. */
export function McqCard({ topic, question, options, correctIndex, pickedIndex, answered, onPick }: McqCardProps) {
  return (
    <div className="qcard">
      <div className="qmeta">
        <span className="topic">{topic}</span>
        <span className="qtype">Multiple choice</span>
      </div>
      <div className="qbody">
        <div className="prompt">{question}</div>
        <div className="mcqopts">
          {options.map((o, i) => {
            const cls = answered ? (i === correctIndex ? "correct" : i === pickedIndex ? "wrong" : "") : "";
            return (
              <button key={i} className={`opt ${cls}`} disabled={answered} onClick={() => onPick?.(i)}>
                <span className="mk">{String.fromCharCode(65 + i)}</span>
                {o}
              </button>
            );
          })}
        </div>
      </div>
      {answered ? (
        <div className="actions">
          <button className="b-next">{pickedIndex === correctIndex ? "Correct — next" : "Next"} →</button>
        </div>
      ) : null}
    </div>
  );
}
