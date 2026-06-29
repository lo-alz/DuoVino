import React from "react";

export interface MiniMapProps {
  /** Latitude of the region centre. */
  lat: number;
  /** Longitude of the region centre. */
  lng: number;
  /** Zoom level (web-mercator). Default 6 — regional context. */
  zoom?: number;
  /** Basemap theme. Defaults to dark to match the app's default theme. */
  theme?: "light" | "dark";
}

const SUBS = ["a", "b", "c", "d"];

function lon2px(lon: number, z: number) {
  return ((lon + 180) / 360) * Math.pow(2, z) * 256;
}
function lat2px(lat: number, z: number) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z) * 256;
}

/**
 * A static "locator" map centred on a wine region — a tiled Carto basemap
 * (theme-matched, no API key) with a centred pin. Used as the Compare column
 * header for regions, and exports cleanly to image (CORS-enabled tiles).
 */
export function MiniMap({ lat, lng, zoom = 6, theme = "dark" }: MiniMapProps) {
  const z = zoom;
  const n = Math.pow(2, z);
  const cx = lon2px(lng, z);
  const cy = lat2px(lat, z);
  const ctx = Math.floor(cx / 256);
  const cty = Math.floor(cy / 256);
  const style = theme === "light" ? "light_all" : "dark_all";
  const tiles: React.ReactNode[] = [];
  for (let tx = ctx - 2; tx <= ctx + 2; tx++) {
    for (let ty = cty - 2; ty <= cty + 2; ty++) {
      if (ty < 0 || ty >= n) continue;
      const wx = ((tx % n) + n) % n; // wrap longitude
      const offX = tx * 256 - cx;
      const offY = ty * 256 - cy;
      const sub = SUBS[(Math.abs(tx) + Math.abs(ty)) % SUBS.length];
      const url = `https://${sub}.basemaps.cartocdn.com/${style}/${z}/${wx}/${ty}.png`;
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
    <div className="cmpmap" role="img" aria-label="region locator map">
      {tiles}
      <span className="cmppin" />
    </div>
  );
}
