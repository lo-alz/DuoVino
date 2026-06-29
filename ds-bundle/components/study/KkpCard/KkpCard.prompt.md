KkpCard from @duovino/design-system. Use via `window.DuoVino.KkpCard` (bundle loaded from the root `_ds_bundle.js`).

A "key knowledge point" card: a single statement tagged by category, optionally unverified, with an optional reasoning chain.

## Props

```ts
interface KkpCardProps {
  id: string;
  cat: string;
  statement: string;
  verified?: boolean;
  chain?: { label: string; value: string; }[];
}
```

## Examples

### Relationship

```jsx
() => (
  <KkpCard
    id="1.2.3"
    cat="relationship"
    statement="Altitude and cold nights give a wide diurnal range → fresh acidity is retained in ripe Tempranillo."
    verified
  />
);

/** A comparison knowledge point carrying a reasoning chain. */
```

### Comparison

```jsx
() => (
  <KkpCard
    id="1.2.4"
    cat="comparison"
    statement="Ribera del Duero sits higher and more continental than Rioja → riper, more powerful Tempranillo with firmer tannin."
    verified
    chain={[
      { label: "Factor", value: "High altitude + Atlantic nights" },
      { label: "Mechanism", value: "Wide diurnal range" },
      { label: "Effect", value: "Slow sugar accumulation" },
      { label: "Style", value: "Ripe fruit with fresh acidity" },
    ]}
  />
)
```
