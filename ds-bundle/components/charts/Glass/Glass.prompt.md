Glass from @duovino/design-system. Use via `window.DuoVino.Glass` (bundle loaded from the root `_ds_bundle.js`).

The "fill the glass" mastery glyph — DuoVino's signature progress metaphor.
A wine glass outlined in gold whose bowl fills bottom-up with a garnet
gradient in proportion to `pct`. Used in headers, cards and summaries.

## Props

```ts
interface GlassProps {
  /** Fill level 0–100. Drives how high the garnet wine rises in the bowl. */
  pct: number;
  /** Glyph width in px (height scales to 1.36×). Default 26. */
  width?: number;
}
```

## Examples

### Empty

```jsx
() => <Glass pct={0} width={56} />;
/** Filling — partial mastery. */
```

### Filling

```jsx
() => <Glass pct={45} width={56} />;
/** Full — region mastered. */
```

### Mastered

```jsx
() => <Glass pct={100} width={56} />
```
