MiniMap from @duovino/design-system. Use via `window.DuoVino.MiniMap` (bundle loaded from the root `_ds_bundle.js`).

A static "locator" map centred on a wine region — a tiled Esri **World
Terrain** basemap (shaded relief + topography, so the terroir reads at a
glance) with a centred pin. No API key; CORS-enabled tiles export cleanly
to image.

## Props

```ts
interface MiniMapProps {
  /** Latitude of the region centre. */
  lat: number;
  /** Longitude of the region centre. */
  lng: number;
  /** Zoom level (web-mercator). Default 6 — regional context. */
  zoom?: number;
}
```

## Examples

### Rioja

```jsx
() => (
  <div style={{ position: "relative", width: 300, height: 96 }}>
    <MiniMap lat={42.46} lng={-2.45} />
  </div>
);
/** Barossa Valley locator map (South Australia). */
```

### Barossa

```jsx
() => (
  <div style={{ position: "relative", width: 300, height: 96 }}>
    <MiniMap lat={-34.53} lng={138.95} />
  </div>
)
```
