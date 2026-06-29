GrapeBars from @duovino/design-system. Use via `window.DuoVino.GrapeBars` (bundle loaded from the root `_ds_bundle.js`).

Compare-mode grape breakdown — one labelled horizontal bar per variety
(name · bar · %), gold for whites and garnet for reds. Grapes the other
region also grows are muted so the unique varieties stand out.

## Props

```ts
interface GrapeBarsProps {
  /** The grapes for this column, rendered as labelled horizontal bars. */
  grapes: GrapeBar[];
  /** Names of the grapes grown by the OTHER column — shared grapes are muted. */
  otherNames?: string[];
}
```

## Examples

### AdelaideHills

```jsx
() => (
  <div style={{ width: 300 }}>
    <GrapeBars grapes={adelaideGrapes} otherNames={["Sangiovese"]} />
  </div>
);
/** Brunello — 100% Sangiovese, with the Adelaide varieties muted as shared. */
```

### Brunello

```jsx
() => (
  <div style={{ width: 300 }}>
    <GrapeBars
      grapes={[{ name: "Sangiovese", color: "r", pct: 100 }]}
      otherNames={adelaideNames}
    />
  </div>
)
```
