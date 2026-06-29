RegionCard from @duovino/design-system. Use via `window.DuoVino.RegionCard` (bundle loaded from the root `_ds_bundle.js`).

A tappable region summary card headed by the signature Glass mastery glyph,
pairing the region title with KKP, "why" and percent-complete metrics.

## Props

```ts
interface RegionCardProps {
  title: string;
  flag?: string;
  alt?: string;
  kkpCount: number;
  whyCount: number;
  pct: number;
  onSelect?: () => void;
}
```

## Examples

### Rioja

```jsx
() => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 8, maxWidth: 380 }}>
    <RegionCard title="Rioja" flag="🇪🇸" alt="Spain" kkpCount={14} whyCount={5} pct={38} />
    <RegionCard title="Mosel" flag="🇩🇪" alt="Germany" kkpCount={11} whyCount={4} pct={0} />
  </div>
)
```
