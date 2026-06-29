CurriculumOption from @duovino/design-system. Use via `window.DuoVino.CurriculumOption` (bundle loaded from the root `_ds_bundle.js`).

A selectable curriculum option, gold-highlighted with an "Active" badge when
chosen, showing its description and the number of regions in scope.

## Props

```ts
interface CurriculumOptionProps {
  label: string;
  desc: string;
  count: number;
  active?: boolean;
  onSelect?: () => void;
}
```

## Examples

### Options

```jsx
() => (
  <div style={{ display: "grid", gap: 8, padding: 8, maxWidth: 380 }}>
    <CurriculumOption
      label="WSET Diploma · D3"
      desc="All still wines of the world — the full Diploma D3 unit."
      count={91}
      active
    />
    <CurriculumOption
      label="WSET Level 3"
      desc="Still-wine regions in the Level 3 scope."
      count={57}
    />
  </div>
)
```
