import * as React from 'react';

/**
 * MiniMap — from @duovino/design-system@0.1.0.
 */
export interface MiniMapProps {
  /** Latitude of the region centre. */
  lat: number;
  /** Longitude of the region centre. */
  lng: number;
  /** Zoom level (web-mercator). Default 6 — regional context. */
  zoom?: number;
}

export declare const MiniMap: React.ComponentType<MiniMapProps>;
