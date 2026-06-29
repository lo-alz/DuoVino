LoAccordion from @duovino/design-system. Use via `window.DuoVino.LoAccordion` (bundle loaded from the root `_ds_bundle.js`).

A learning-objective accordion: a header with a four-state mastery track and a collapsible body revealing its contents.

## Props

```ts
interface LoAccordionProps {
  code: string;
  title: string;
  statement: string;
  open?: boolean;
  segments: { state: 0 | 1 | 2 | 3; pct: number; }[];
  children?: React.ReactNode;
  onToggle?: () => void;
}
```

## Examples

### Open

```jsx
() => (
  <LoAccordion
    code="LO2"
    title="Climate & site"
    statement="Explain how natural factors shape Rioja’s style"
    open
    segments={[
      { state: 3, pct: 30 },
      { state: 2, pct: 25 },
      { state: 1, pct: 20 },
      { state: 0, pct: 25 },
    ]}
  >
    <p>
      Rioja’s altitude and the cold, Atlantic-influenced nights create a wide
      diurnal range. Warm days ripen Tempranillo fully while cool nights slow
      sugar accumulation and preserve acidity, giving wines with ripe fruit
      and a fresh backbone.
    </p>
  </LoAccordion>
)
```
