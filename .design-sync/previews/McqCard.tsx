import React from "react";
import { McqCard } from "@duovino/design-system";

/** An unanswered multiple-choice question. */
export const Unanswered = () => (
  <McqCard
    topic="Rioja"
    question="Which grape dominates Rioja?"
    options={["Tempranillo", "Grenache", "Sangiovese", "Nebbiolo"]}
  />
);

/** Answered with a wrong pick — correct and wrong options marked. */
export const Answered = () => (
  <McqCard
    topic="Rioja"
    question="Which grape dominates Rioja?"
    options={["Tempranillo", "Grenache", "Sangiovese", "Nebbiolo"]}
    answered
    correctIndex={0}
    pickedIndex={2}
  />
);
