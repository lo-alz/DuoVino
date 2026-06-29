ThemeToggle from @duovino/design-system. Use via `window.DuoVino.ThemeToggle` (bundle loaded from the root `_ds_bundle.js`).

A compact icon button that flips between dark and light themes, showing the
destination theme's glyph (sun while dark, moon while light).

## Props

```ts
interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle?: () => void;
}
```

## Examples

### Dark

```jsx
() => <ThemeToggle theme="dark" />
```

### Light

```jsx
() => <ThemeToggle theme="light" />
```
