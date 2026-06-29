Radar from @duovino/design-system. Use via `window.DuoVino.Radar` (bundle loaded from the root `_ds_bundle.js`).

Climate "fingerprint" — a five-axis radar (warmth, sun, rain, diurnal range,
frost/disease risk) rendered as a gold polygon over a gridded pentagon.
The shape lets a region's climate be read at a glance.

## Props

```ts
interface RadarProps {
  /** Climate fingerprint, each axis scored 0–5. */
  scores: ClimateScores;
}
```

## Examples

### Rioja

```jsx
() => <Radar scores={{ warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 }} />;
/** Mosel — cool climate, higher rain and frost/disease risk. */
```

### Mosel

```jsx
() => <Radar scores={{ warmth: 2, sun: 2, rain: 3, diurnal: 3, risk: 4 }} />
```

## Related

`RadarCompare`
