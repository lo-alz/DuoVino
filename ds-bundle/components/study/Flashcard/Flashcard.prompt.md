Flashcard from @duovino/design-system. Use via `window.DuoVino.Flashcard` (bundle loaded from the root `_ds_bundle.js`).

A flip flashcard for active recall: shows a question prompt that flips to reveal bullets, an optional image, and self-grade actions.

## Props

```ts
interface FlashcardProps {
  topic: string;
  question: string;
  side: "question" | "answer";
  answerBullets?: string[];
  imgSrc?: string;
  imgLabel?: string;
  onFlip?: () => void;
  onGrade?: (g: 1 | 2 | 3) => void;
}
```

## Examples

### Question

```jsx
() => (
  <Flashcard
    topic="Rioja"
    side="question"
    question="Why does Rioja retain freshness despite a warm climate?"
  />
);

/** The answer side, revealing the supporting bullets. */
```

### Answer

```jsx
() => (
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
)
```
