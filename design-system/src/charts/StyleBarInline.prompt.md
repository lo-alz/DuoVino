StyleBarInline from @duovino/design-system. Use via `window.DuoVino.StyleBarInline` (bundle loaded from the root `_ds_bundle.js`).

Compare-mode style bar — same composition bar as StyleBar, but each segment
carries its own "Style %" label in a contrasting colour and there is no
external legend. Keeps the Compare card compact and free of duplicated labels.

## Props

```ts
interface StyleBarInlineProps {
  /** Wine-style composition, values in percent. */
  style: StyleComposition;
}
```

## Examples

### AdelaideHills

```jsx
() => <StyleBarInline style={{ white: 60, red: 40 }} />;
/** Brunello di Montalcino — entirely red (Sangiovese). */
```

### Brunello

```jsx
() => <StyleBarInline style={{ red: 100 }} />
```
