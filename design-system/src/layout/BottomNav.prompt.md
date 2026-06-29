BottomNav from @duovino/design-system. Use via `window.DuoVino.BottomNav` (bundle loaded from the root `_ds_bundle.js`).

The fixed bottom tab bar with five primary destinations, marking the active
tab and emitting navigation events.

## Props

```ts
interface BottomNavProps {
  active: string;
  onNavigate?: (key: string) => void;
}
```

## Examples

### Dashboard

```jsx
() => <BottomNav active="dash" />
```

### Compare

```jsx
() => <BottomNav active="compare" />
```
