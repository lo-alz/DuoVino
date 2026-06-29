SectionHead from @duovino/design-system. Use via `window.DuoVino.SectionHead` (bundle loaded from the root `_ds_bundle.js`).

A section header pairing a title with an optional trailing action link,
used to introduce and navigate content groups.

## Props

```ts
interface SectionHeadProps {
  title: string;
  link?: string;
  onLink?: () => void;
}
```

## Examples

### Default

```jsx
() => <SectionHead title="By country" link="All topics →" />
```

### NoLink

```jsx
() => <SectionHead title="Recently studied" />
```
