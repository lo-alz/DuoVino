Panel from @duovino/design-system. Use via `window.DuoVino.Panel` (bundle loaded from the root `_ds_bundle.js`).

The foundational surface card — a rounded, padded container that groups
related content with the design system's panel styling.

## Props

```ts
interface PanelProps {
  children: React.ReactNode;
  className?: string;
}
```

## Examples

### Default

```jsx
() => (
  <Panel>
    <h3>Rioja</h3>
    <p>
      Altitude and cold Atlantic-influenced nights give a wide diurnal range, so
      ripe Tempranillo keeps its fresh acidity.
    </p>
  </Panel>
)
```
