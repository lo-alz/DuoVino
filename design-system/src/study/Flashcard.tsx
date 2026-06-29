import React from "react";

export interface FlashcardProps {
  topic: string;
  question: string;
  side: "question" | "answer";
  answerBullets?: string[];
  imgSrc?: string;
  imgLabel?: string;
  onFlip?: () => void;
  onGrade?: (g: 1 | 2 | 3) => void;
}

/** A flip flashcard for active recall: shows a question prompt that flips to reveal bullets, an optional image, and self-grade actions. */
export function Flashcard({ topic, question, side, answerBullets, imgSrc, imgLabel, onFlip, onGrade }: FlashcardProps) {
  const isAnswer = side === "answer";
  return (
    <div className="qcard">
      <div className="qmeta">
        <span className="topic">{topic}</span>
        <span className="qtype">Recall</span>
      </div>
      <div className="flipcard-wrap">
        <div className={`flipcard ${isAnswer ? "answer" : ""}`} onClick={onFlip}>
          <span className="fl">{isAnswer ? "Answer" : "Question — tap to flip"}</span>
          {isAnswer ? (
            <div className="fans">
              {imgSrc ? (
                <div className="fimg">
                  <img
                    src={imgSrc}
                    alt={imgLabel || ""}
                    loading="lazy"
                    onError={(e) => {
                      const p = (e.currentTarget as HTMLImageElement).parentElement;
                      if (p) p.style.display = "none";
                    }}
                  />
                  <span className="fcap">{imgLabel || ""}</span>
                </div>
              ) : null}
              {answerBullets && answerBullets.length ? (
                <ul className="fbul">
                  {answerBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <div className="ftxt">{question}</div>
              )}
            </div>
          ) : (
            <span className="ftxt">{question}</span>
          )}
        </div>
      </div>
      {isAnswer ? (
        <div className="actions">
          <button className="b-again" onClick={() => onGrade?.(1)}>
            Again
          </button>
          <button className="b-part" onClick={() => onGrade?.(2)}>
            Partial
          </button>
          <button className="b-got" onClick={() => onGrade?.(3)}>
            Got it
          </button>
        </div>
      ) : (
        <div className="tapflip">Tap the card to reveal</div>
      )}
    </div>
  );
}
