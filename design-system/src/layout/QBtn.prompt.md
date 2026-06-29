QBtn from @duovino/design-system. Use via `window.DuoVino.QBtn` (bundle loaded from the root `_ds_bundle.js`).

A large quick-action button stacking a bold title over a descriptive
subtitle, with an optional accent treatment for the primary action.

## Props

```ts
interface QBtnProps {
  title: string;
  desc: string;
  accent?: boolean;
  onClick?: () => void;
}
```

## Examples

### Default

```jsx
() => <QBtn title="Quick quiz" desc="Multiple-choice facts" />
```

### Accent

```jsx
() => (
  <QBtn title="Review weakest" desc="Target your 24 open gaps" accent />
)
```
