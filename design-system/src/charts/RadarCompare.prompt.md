RadarCompare from @duovino/design-system. Use via `window.DuoVino.RadarCompare` (bundle loaded from the root `_ds_bundle.js`).

Two climate fingerprints overlaid on a single radar so two regions can be
compared directly — series A in gold, series B in azure, with a colour-keyed
legend underneath. The combined view replaces side-by-side radars in Compare.

## Props

```ts
interface RadarCompareProps {
  /** First series scores (rendered in gold). */
  a: ClimateScores;
  /** Second series scores (rendered in azure). */
  b: ClimateScores;
  /** Legend label for series A. */
  aLabel: string;
  /** Legend label for series B. */
  bLabel: string;
}
```

## Examples

### HillsVsBrunello

```jsx
() => (
  <RadarCompare
    a={{ warmth: 2, sun: 4, rain: 3, diurnal: 4, risk: 2 }}
    b={{ warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 }}
    aLabel="Adelaide Hills"
    bLabel="Brunello di Montalcino"
  />
)
```
