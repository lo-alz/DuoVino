GrapeCard from @duovino/design-system. Use via `window.DuoVino.GrapeCard` (bundle loaded from the root `_ds_bundle.js`).

A grape variety card colour-keyed white or red via its swatch, listing the
variety name, an optional a.k.a. synonym and a compact strip of key stats.

## Props

```ts
interface GrapeCardProps {
  name: string;
  color: "w" | "r";
  aka?: string[];
  stats: { label: string; value: string; }[];
  onSelect?: () => void;
}
```

## Examples

### Varieties

```jsx
() => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 8, maxWidth: 380 }}>
    <GrapeCard
      name="Tempranillo"
      color="r"
      aka={["Tinto Fino"]}
      stats={[
        { label: "Acid", value: "Medium" },
        { label: "Tannin", value: "Med+" },
        { label: "Body", value: "Full" },
      ]}
    />
    <GrapeCard
      name="Riesling"
      color="w"
      aka={["Rheinriesling"]}
      stats={[
        { label: "Acid", value: "High" },
        { label: "Body", value: "Light" },
      ]}
    />
  </div>
)
```
