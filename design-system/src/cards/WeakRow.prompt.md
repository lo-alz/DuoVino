WeakRow from @duovino/design-system. Use via `window.DuoVino.WeakRow` (bundle loaded from the root `_ds_bundle.js`).

A weak-spot review row whose coloured dot encodes mastery state, surfacing a
topic title, its statement and a category-plus-state meta line.

## Props

```ts
interface WeakRowProps {
  topicTitle: string;
  statement: string;
  cat: string;
  state: 0 | 1 | 2 | 3;
}
```

## Examples

### Seen

```jsx
() => (
  <WeakRow
    topicTitle="Rioja"
    statement="Diurnal range retains acidity in ripe Tempranillo"
    cat="relationship"
    state={1}
  />
);

/** Untouched state — not yet reviewed. */
```

### Untouched

```jsx
() => (
  <WeakRow
    topicTitle="Rioja"
    statement="Diurnal range retains acidity in ripe Tempranillo"
    cat="relationship"
    state={0}
  />
)
```
