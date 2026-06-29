BlindCard from @duovino/design-system. Use via `window.DuoVino.BlindCard` (bundle loaded from the root `_ds_bundle.js`).

A blind-tasting card: presents a tasting note and, when revealed, the deduction plus the markers that justify each conclusion.

## Props

```ts
interface BlindCardProps {
  tastingProfile: string;
  deduce?: string[];
  justifyWith?: string[];
  revealed?: boolean;
}
```

## Examples

### Unrevealed

```jsx
() => (
  <BlindCard tastingProfile="Pale lemon; high acid; green apple, lime, wet stone, a whiff of petrol; low alcohol; off-dry." />
);

/** The revealed deduction with its justifying markers. */
```

### Revealed

```jsx
() => (
  <BlindCard
    tastingProfile="Pale lemon; high acid; green apple, lime, wet stone, a whiff of petrol; low alcohol; off-dry."
    revealed
    deduce={["Riesling", "Cool climate", "Mosel, Germany"]}
    justifyWith={[
      "Petrol = aged Riesling",
      "High acid + low alcohol = cool climate",
      "Slate minerality + off-dry = Mosel",
    ]}
  />
)
```
