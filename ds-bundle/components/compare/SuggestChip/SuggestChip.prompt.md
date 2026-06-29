SuggestChip from @duovino/design-system. Use via `window.DuoVino.SuggestChip` (bundle loaded from the root `_ds_bundle.js`).

A suggested-pairing chip on the empty Compare screen — tapping it loads a
classic head-to-head (Rioja vs Ribera, Mosel vs Rheingau…) into the card.

## Props

```ts
interface SuggestChipProps {
  /** Chip label, e.g. "Rioja × Ribera del Duero". */
  label: string;
  onSelect?: () => void;
}
```

## Examples

### RiojaVsRibera

```jsx
() => (
  <SuggestChip label="Rioja × Ribera del Duero" />
);
/** A German Riesling head-to-head. */
```

### MoselVsRheingau

```jsx
() => (
  <SuggestChip label="Mosel × Rheingau" />
)
```
