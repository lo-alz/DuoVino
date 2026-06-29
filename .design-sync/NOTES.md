# DuoVino design-system — sync notes

## What this is
DuoVino's live app is a single hand-authored `index.html` (vanilla JS template
strings). This `design-system/` package is a **faithful React reification** of
that UI, authored so Claude Design can build with on-brand components. The CSS in
`design-system/src/duovino.css` is lifted **verbatim** from `index.html`'s
`<style>` (tokens `:root` + `body.light`, all component classes), plus an appended
"compare card — redesigned" section for the new Compare components.

## Build
- `cd design-system && npm run build` → `dist/index.es.js` (ESM, externalises react)
  + `dist/index.d.ts` (bundled types) via tsup.
- Converter invocation (from repo root):
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./design-system/node_modules --entry ./design-system/dist/index.es.js --out ./ds-bundle`
  PKG_DIR resolves to `design-system/` (package.json name-walk from the entry), so
  `cssEntry: "src/duovino.css"` is package-relative and correct.

## Conventions
- 41 components in 5 groups: charts, layout, cards, study, compare. One component
  per file, named export + `<Name>Props` interface + JSDoc.
- Components are pure/props-driven (no app globals); they render the SAME
  classNames as the live app so styling is identical.
- Cross-component deps: cards/study/compare import charts (Glass, etc.) via
  relative paths. CompareCard composes CompareColHead + DiffPill + Glass; region
  Compare headers use `MiniMap` (Carto raster tiles, theme-matched, CORS-enabled).

## Fonts
- Brand fonts (Barlow Condensed, IBM Plex Sans, IBM Plex Mono) load via a remote
  Google Fonts `@import` at the top of `duovino.css` → expect `[FONT_REMOTE]`
  (informational, no action).

## Re-sync risks
- `duovino.css` is a manual copy of `index.html`'s `<style>`. If the live app's
  CSS changes, re-copy it (lines 11–523 of index.html) + keep the appended
  redesigned-compare section.
- `MiniMap` depends on Carto basemap tiles (`basemaps.cartocdn.com`) at render
  time — an external dependency; previews need network.
- Live app is evolving in parallel (Compare gained winemaking/quality/price rows;
  settings/curriculum changes) — those are app-side and not yet mirrored as
  component prop changes here beyond CompareCard's flexible `rows` API.

## Known render warns (triaged — benign)
- `Glass`, `CornerLogo` → `[RENDER_THIN]`: they are small pure-SVG glyphs with no
  text; the thin-content heuristic flags them but the screenshots are correct.
- `MiniMap` → `[RENDER]` page.goto timeout in the headless check: it loads remote
  Esri terrain tiles which hang behind this environment's proxy. It renders
  correctly in Claude Design's browser (network available). Its own preview keeps
  the real tiles; the composite previews (CompareCard, CompareColHead) use a
  non-network map stand-in so they verify locally.
- `BottomNav` → `[RENDER_BLANK]`: it is `position:fixed` (a real bottom nav bar),
  so it pins to the viewport edge and the card capture reads near-blank even as a
  single card. Renders correctly in the app/designs; benign for the catalog card.
