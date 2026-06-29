RefCard from @duovino/design-system. Use via `window.DuoVino.RefCard` (bundle loaded from the root `_ds_bundle.js`).

A reference card with a lazy-loaded thumbnail above a name and optional tag;
the image quietly hides itself if the source fails to load.

## Props

```ts
interface RefCardProps {
  name: string;
  tag?: string;
  imgSrc: string;
  onSelect?: () => void;
}
```

## Examples

### FrenchOak

```jsx
() => (
  <div style={{ width: 200 }}>
    <RefCard name="French Oak" tag="Barrique · tight grain" imgSrc={OAK} />
  </div>
)
```
