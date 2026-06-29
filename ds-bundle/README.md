# DuoVino (@duovino/design-system@0.1.0)

This design system is the published @duovino/design-system React library, bundled as a single
browser global. All 40 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.DuoVino`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.DuoVino.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { BlindCard } = window.DuoVino;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<BlindCard />);
```

## Tokens

28 CSS custom properties from @duovino/design-system. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **other** (28): `--bg`, `--bg2`, `--panel`, …

## Components

### study
- `BlindCard` — A blind-tasting card: presents a tasting note and, when revealed, the deduction plus the markers that justify each conclusion.
- `ChainTable` — A causeeffect chain rendered as a grid of label/value cells, terminating in an emphasised last cell.
- `ExplainCard` — An explain why card: a prompt that, when revealed, lists the points a complete answer needs and an optional reasoning chain.
- `Flashcard` — A flip flashcard for active recall: shows a question prompt that flips to reveal bullets, an optional image, and self-grade actions.
- `KkpCard` — A key knowledge point card: a single statement tagged by category, optionally unverified, with an optional reasoning chain.
- `LoAccordion` — A learning-objective accordion: a header with a four-state mastery track and a collapsible body revealing its contents.
- `McqCard` — A multiple-choice question card once answered it marks the correct and wrongly-picked options and offers a next action.
- `SummaryPanel` — End-of-session summary: the filled-glass glyph crowns a tally of mastered, partial and revisit cards with a fresh scope percentage.

### layout
- `BottomNav` — The fixed bottom tab bar with five primary destinations, marking the active
- `Chip` — A pill-shaped filter toggle that highlights when active, used for quick
- `CornerLogo` — The DuoVino corner mark  a fully filled miniature wine glass that brands the
- `CountryTile` — A tappable country tile showing a flag, topic count and a slim progress bar,
- `Eyebrow` — A small uppercase label that sits above a heading, giving sections a
- `Hero` — The mastery hero banner  a filling wine glass paired with a headline tally
- `ModeSeg` — A segmented control that lets the user switch between mutually exclusive
- `Panel` — The foundational surface card  a rounded, padded container that groups
- `ProgressBar` — A minimal horizontal progress bar whose fill width tracks the given
- `QBtn` — A large quick-action button stacking a bold title over a descriptive
- `SectionHead` — A section header pairing a title with an optional trailing action link,
- `StatGrid` — A four-cell statistics grid summarizing mastery tiers and why-link coverage,
- `ThemeToggle` — A compact icon button that flips between dark and light themes, showing the
- `TopHeader` — The app's masthead: a serif title with an optional subtitle, anchoring the

### compare
- `CompareCard` — The Compare card  two entities side by side with image headers, an ordered
- `CompareColHead` — A Compare column header  the region's locator map or the grape's photo with
- `GrapeBars` — Compare-mode grape breakdown  one labelled horizontal bar per variety
- `MiniMap` — A static locator map centred on a wine region  a tiled Esri World
- `SuggestChip` — A suggested-pairing chip on the empty Compare screen  tapping it loads a

### cards
- `CurriculumOption` — A selectable curriculum option, gold-highlighted with an Active badge when
- `GlossaryItem` — A glossary entry pairing a term with its definition, with an optional inline
- `GrapeCard` — A grape variety card colour-keyed white or red via its swatch, listing the
- `RefCard` — A reference card with a lazy-loaded thumbnail above a name and optional tag
- `RegionCard` — A tappable region summary card headed by the signature Glass mastery glyph,
- `SettingItem` — A single settings row pairing a leading icon with a title and description,
- `WeakRow` — A weak-spot review row whose coloured dot encodes mastery state, surfacing a

### charts
- `Donut` — Grape-blend donut  each variety a ring segment sized by planting share,
- `Glass` — The fill the glass mastery glyph  DuoVino's signature progress metaphor.
- `Radar` — Climate fingerprint  a five-axis radar (warmth, sun, rain, diurnal range,
- `RadarCompare` — Two climate fingerprints overlaid on a single radar so two regions can be
- `StyleBar` — Wine-style composition bar  a single horizontal bar split by share of red /
- `StyleBarInline` — Compare-mode style bar  same composition bar as StyleBar, but each segment
