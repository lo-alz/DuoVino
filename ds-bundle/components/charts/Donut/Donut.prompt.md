Donut from @duovino/design-system. Use via `window.DuoVino.Donut` (bundle loaded from the root `_ds_bundle.js`).

Grape-blend donut — each variety a ring segment sized by planting share,
whites in golds and reds in garnets, with a name+percent legend. Used on
region pages and the map detail panel to show what a region grows.

## Props

```ts
interface DonutProps {
  /** Grape blend for a region; whites are gold-keyed, reds garnet-keyed. */
  grapes: GrapeSlice[];
}
```

## Examples

### Rioja

```jsx
() => (
  <Donut
    grapes={[
      { name: "Tempranillo", color: "r", pct: 88 },
      { name: "Garnacha", color: "r", pct: 8 },
      { name: "Graciano", color: "r", pct: 2 },
      { name: "Viura", color: "w", pct: 2 },
    ]}
  />
);
/** Adelaide Hills blend — cool-climate whites alongside Pinot and Shiraz. */
```

### AdelaideHills

```jsx
() => (
  <Donut
    grapes={[
      { name: "Sauvignon Blanc", color: "w", pct: 32 },
      { name: "Chardonnay", color: "w", pct: 28 },
      { name: "Pinot Noir", color: "r", pct: 24 },
      { name: "Shiraz", color: "r", pct: 16 },
    ]}
  />
)
```
