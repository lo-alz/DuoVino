Chip from @duovino/design-system. Use via `window.DuoVino.Chip` (bundle loaded from the root `_ds_bundle.js`).

A pill-shaped filter toggle that highlights when active, used for quick
faceted selection.

## Props

```ts
interface ChipProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
}
```

## Examples

### Inactive

```jsx
() => <Chip label="France" />
```

### Active

```jsx
() => <Chip label="Spain" active />
```
