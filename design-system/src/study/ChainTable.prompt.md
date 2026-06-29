ChainTable from @duovino/design-system. Use via `window.DuoVino.ChainTable` (bundle loaded from the root `_ds_bundle.js`).

A cause→effect chain rendered as a grid of label/value cells, terminating in an emphasised "last" cell.

## Props

```ts
interface ChainTableProps {
  /** Ordered cause→effect steps; the last cell is visually emphasised. */
  steps: { label: string; value: string; }[];
}
```

## Examples

### RiojaChain

```jsx
() => (
  <ChainTable
    steps={[
      { label: "Factor", value: "High altitude + Atlantic nights" },
      { label: "Mechanism", value: "Wide diurnal range" },
      { label: "Effect", value: "Slow sugar accumulation" },
      { label: "Style", value: "Ripe fruit with fresh acidity" },
    ]}
  />
)
```
