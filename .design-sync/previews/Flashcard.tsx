import React from "react";
import { Flashcard } from "@duovino/design-system";

/** The question side of a recall flashcard. */
export const Question = () => (
  <Flashcard
    topic="Rioja"
    side="question"
    question="Why does Rioja retain freshness despite a warm climate?"
  />
);

/** The answer side, revealing the supporting bullets. */
export const Answer = () => (
  <Flashcard
    topic="Rioja"
    side="answer"
    question="Why does Rioja retain freshness despite a warm climate?"
    answerBullets={[
      "Altitude moderates daytime heat",
      "Cold Atlantic-influenced nights",
      "Wide diurnal range preserves acidity",
      "Limestone-clay soils hold water",
    ]}
  />
);
