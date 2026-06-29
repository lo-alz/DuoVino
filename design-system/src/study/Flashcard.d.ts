import * as React from 'react';

/**
 * Flashcard — from @duovino/design-system@0.1.0.
 */
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

export declare const Flashcard: React.ComponentType<FlashcardProps>;
