StyleBar from @duovino/design-system. Use via `window.DuoVino.StyleBar` (bundle loaded from the root `_ds_bundle.js`).

Wine-style composition bar — a single horizontal bar split by share of red /
white / rosé / sparkling / sweet, with a colour-keyed legend below. Shows at
a glance what styles a region is known for.

## Props

```ts
interface StyleBarProps {
  /** Wine-style composition for a region, values in percent. */
  style: StyleComposition;
}
```

## Examples

### Rioja

```jsx
() => <StyleBar style={{ red: 85, white: 8, rose: 7 }} />;
/** Mosel — overwhelmingly white, with a sparkling Sekt share. */
```

### Mosel

```jsx
() => <StyleBar style={{ white: 92, sparkling: 8 }} />
```

## Related

`StyleBarInline`
