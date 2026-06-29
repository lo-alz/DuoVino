GrapeCompare from the DuoVino design system. Use via `window.DuoVinoDesignSystem_63905c.GrapeCompare` (bundle loaded from the root `_ds_bundle.js`).

Merged, full-width grape comparison for the Compare card: one row per variety
across both regions. Shared grapes show two bars (left region then right) so the
difference in planting share reads at a glance; grapes unique to one region show
a single bar in that grape's type colour (gold whites, garnet reds) tagged
"only <region>". Rows sort by the left region's share, descending.

## Props
```ts
interface GrapeCompareProps {
  a: { name: string; color: "w" | "r"; pct: number }[]; // left region
  b: { name: string; color: "w" | "r"; pct: number }[]; // right region
  aLabel: string;
  bLabel: string;
}
```

## Example
```jsx
() => (
  <GrapeCompare
    aLabel="Rioja" bLabel="Ribera del Duero"
    a={[{name:"Tempranillo",color:"r",pct:88},{name:"Garnacha",color:"r",pct:8},{name:"Graciano",color:"r",pct:4}]}
    b={[{name:"Tempranillo",color:"r",pct:95},{name:"Cabernet S.",color:"r",pct:5}]} />
);
```

Render it inside a full-width Compare row (`{ label: "Grapes", full: true, cellFull: <GrapeCompare … /> }`).
