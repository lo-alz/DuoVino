StatGrid from @duovino/design-system. Use via `window.DuoVino.StatGrid` (bundle loaded from the root `_ds_bundle.js`).

A four-cell statistics grid summarizing mastery tiers and why-link coverage,
each cell color-coded to its state.

## Props

```ts
interface StatGridProps {
  mastered: number;
  partial: number;
  seen: number;
  relMastered: number;
  relTotal: number;
}
```

## Examples

### Default

```jsx
() => (
  <StatGrid mastered={118} partial={64} seen={53} relMastered={31} relTotal={91} />
)
```
