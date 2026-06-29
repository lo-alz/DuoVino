import React from "react";

export interface MiniMapProps {
  /** Latitude of the region centre. */
  lat: number;
  /** Longitude of the region centre. */
  lng: number;
  /** Zoom level (web-mercator). Default 6 — regional context. */
  zoom?: number;
}

function lon2px(lon: number, z: number) {
  return ((lon + 180) / 360) * Math.pow(2, z) * 256;
}
function lat2px(lat: number, z: number) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z) * 256;
}

/**
 * A static "locator" map centred on a wine region — a tiled Esri **World
 * Terrain** basemap (shaded relief + topography, so the terroir reads at a
 * glance) with a centred pin. No API key; CORS-enabled tiles export cleanly
 * to image.
 */
export function MiniMap({ lat, lng, zoom = 6 }: MiniMapProps) {
  const z = zoom;
  const n = Math.pow(2, z);
  const cx = lon2px(lng, z);
  const cy = lat2px(lat, z);
  const ctx = Math.floor(cx / 256);
  const cty = Math.floor(cy / 256);
  const tiles: React.ReactNode[] = [];
  for (let tx = ctx - 2; tx <= ctx + 2; tx++) {
    for (let ty = cty - 2; ty <= cty + 2; ty++) {
      if (ty < 0 || ty >= n) continue;
      const wx = ((tx % n) + n) % n; // wrap longitude
      const offX = tx * 256 - cx;
      const offY = ty * 256 - cy;
      // Esri World Topo (terrain/relief). Note the URL order is {z}/{y}/{x}.
      const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${ty}/${wx}`;
      tiles.push(
        <img
          key={tx + "_" + ty}
          className="cmpmaptile"
          src={url}
          alt=""
          crossOrigin="anonymous"
          loading="lazy"
          style={{ left: `calc(50% + ${offX}px)`, top: `calc(50% + ${offY}px)` }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      );
    }
  }
  return (
    <div className="cmpmap" role="img" aria-label="region terrain locator map">
      {tiles}
      <span className="cmppin" />
    </div>
  );
}
