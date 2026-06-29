SummaryPanel from @duovino/design-system. Use via `window.DuoVino.SummaryPanel` (bundle loaded from the root `_ds_bundle.js`).

End-of-session summary: the filled-glass glyph crowns a tally of mastered, partial and revisit cards with a fresh scope percentage.

## Props

```ts
interface SummaryPanelProps {
  pct: number;
  cards: number;
  mastered: number;
  partial: number;
  revisit: number;
}
```

## Examples

### Complete

```jsx
() => (
  <SummaryPanel pct={46} cards={18} mastered={9} partial={5} revisit={4} />
)
```
