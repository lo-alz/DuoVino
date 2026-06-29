CompareColHead from @duovino/design-system. Use via `window.DuoVino.CompareColHead` (bundle loaded from the root `_ds_bundle.js`).

A Compare column header — the region's locator map or the grape's photo with
the name and sub-label overlaid on a gradient scrim. Replaces the old empty
mastery glass with imagery of what's actually being compared.

## Props

```ts
interface CompareColHeadProps {
  /** Entity name shown over the media, e.g. "Rioja" or "Albariño". */
  name: string;
  /** Sub-label, e.g. "🇪🇸 Spain" or "White grape". */
  sub: string;
  /** Header media rendered behind the name — a <MiniMap/> for regions or an <img className="cmpmediaimg"/> grape photo. Omit  */
  media?: React.ReactNode;
}
```

## Examples

### Region

```jsx
() => (
  <div style={{ width: 300 }}>
    <CompareColHead name="Rioja" sub="🇪🇸 Spain" media={<MapMedia />} />
  </div>
);
/** Grape header — variety photo behind the name and grape-colour sub-label. */
```

### Grape

```jsx
() => (
  <div style={{ width: 300 }}>
    <CompareColHead name="Tempranillo" sub="Black grape" media={<GrapeMedia />} />
  </div>
)
```
