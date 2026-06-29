SettingItem from @duovino/design-system. Use via `window.DuoVino.SettingItem` (bundle loaded from the root `_ds_bundle.js`).

A single settings row pairing a leading icon with a title and description,
trailed by a chevron to signal it opens a deeper screen.

## Props

```ts
interface SettingItemProps {
  icon: string;
  title: string;
  desc: string;
  onSelect?: () => void;
}
```

## Examples

### Curriculum

```jsx
() => (
  <SettingItem
    icon="🎓"
    title="Curriculum"
    desc="Choose your qualification & filter regions"
  />
)
```
