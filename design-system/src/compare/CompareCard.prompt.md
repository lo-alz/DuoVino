CompareCard from @duovino/design-system. Use via `window.DuoVino.CompareCard` (bundle loaded from the root `_ds_bundle.js`).

The Compare card — two entities side by side with image headers, an ordered
set of attribute rows (full-width or two-column), auto-highlighted "Differs"
rows, and a subtle branded footer for shareable image export.

## Props

```ts
interface CompareCardProps {
  /** Left column entity. */
  a: CompareColumn;
  /** Right column entity. */
  b: CompareColumn;
  /** Ordered comparison rows. */
  rows: CompareRow[];
  /** Optional action bar rendered below the card (Drill / Copy link / Save image). */
  actions?: React.ReactNode;
}
```

## Examples

### RegionVsRegion

```jsx
() => <CompareCard a={a} b={b} rows={rows} />
```
