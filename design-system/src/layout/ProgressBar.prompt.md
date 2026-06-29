ProgressBar from @duovino/design-system. Use via `window.DuoVino.ProgressBar` (bundle loaded from the root `_ds_bundle.js`).

A minimal horizontal progress bar whose fill width tracks the given
percentage.

## Props

```ts
interface ProgressBarProps {
  pct: number;
}
```

## Examples

### Low

```jsx
() => <ProgressBar pct={25} />
```

### Mid

```jsx
() => <ProgressBar pct={60} />
```

### High

```jsx
() => <ProgressBar pct={90} />
```
