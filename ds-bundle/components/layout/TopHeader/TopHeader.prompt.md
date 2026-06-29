TopHeader from @duovino/design-system. Use via `window.DuoVino.TopHeader` (bundle loaded from the root `_ds_bundle.js`).

The app's masthead: a serif title with an optional subtitle, anchoring the
brand identity at the top of each screen.

## Props

```ts
interface TopHeaderProps {
  title: string;
  sub?: string;
}
```

## Examples

### Default

```jsx
() => <TopHeader title="Learn" sub="Regions & appellations" />
```

### NoSub

```jsx
() => <TopHeader title="Compare" />
```
