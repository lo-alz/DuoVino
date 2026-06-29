ModeSeg from @duovino/design-system. Use via `window.DuoVino.ModeSeg` (bundle loaded from the root `_ds_bundle.js`).

A segmented control that lets the user switch between mutually exclusive
modes, highlighting the active segment.

## Props

```ts
interface ModeSegProps {
  modes: ModeSegMode[];
  active: string;
  onSelect?: (key: string) => void;
}
```

## Examples

### Default

```jsx
() => <ModeSeg modes={modes} active="regions" />
```
