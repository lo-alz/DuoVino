McqCard from @duovino/design-system. Use via `window.DuoVino.McqCard` (bundle loaded from the root `_ds_bundle.js`).

A multiple-choice question card; once answered it marks the correct and wrongly-picked options and offers a next action.

## Props

```ts
interface McqCardProps {
  topic: string;
  question: string;
  options: string[];
  correctIndex?: number;
  pickedIndex?: number;
  answered?: boolean;
  onPick?: (i: number) => void;
}
```

## Examples

### Unanswered

```jsx
() => (
  <McqCard
    topic="Rioja"
    question="Which grape dominates Rioja?"
    options={["Tempranillo", "Grenache", "Sangiovese", "Nebbiolo"]}
  />
);

/** Answered with a wrong pick — correct and wrong options marked. */
```

### Answered

```jsx
() => (
  <McqCard
    topic="Rioja"
    question="Which grape dominates Rioja?"
    options={["Tempranillo", "Grenache", "Sangiovese", "Nebbiolo"]}
    answered
    correctIndex={0}
    pickedIndex={2}
  />
)
```
