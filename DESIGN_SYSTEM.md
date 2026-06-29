# DuoVino — Design System

The visual and interaction language of DuoVino, extracted from the live app
(`index.html`). DuoVino is a single self-contained vanilla HTML/CSS/JS SPA, so
this document **is** the design system — there is no separate component library.
Everything below maps 1:1 onto real CSS custom properties and component classes
in the source.

> **Theme of the brand:** a cellar-at-night palette (garnet, gold, ink on deep
> charcoal) with a "fill the glass" mastery metaphor. Studious, warm, premium —
> built for exam-pressured WSET candidates on a phone.

---

## 1. Foundations

### 1.1 Color tokens

All color is driven by CSS custom properties on `:root` (dark, default) and
overridden under `body.light`. **Never hardcode hex in components** — reference a
token so both themes stay correct.

| Token | Dark (`:root`) | Light (`body.light`) | Role |
|---|---|---|---|
| `--bg` | `#14161c` | `#f4efe5` | App background |
| `--bg2` | `#191c24` | `#ece4d4` | Inset fields / deepest surface |
| `--panel` | `#20232c` | `#fbf8f1` | Card / panel surface |
| `--panel2` | `#272b36` | `#f1ebdd` | Raised panel (segments, chips) |
| `--panel3` | `#2e323e` | `#e6ddc8` | Highest raised surface |
| `--ink` | `#ece3d2` | `#2a2620` | Primary text |
| `--ink-dim` | `#c9c0ad` | `#544b3a` | Secondary text |
| `--muted` | `#928a78` | `#8a7f67` | Eyebrows, captions, meta |
| `--line` | `#333949` | `#ded3bc` | Hairline borders |
| `--line2` | `#3d4456` | `#ccbf9f` | Stronger borders |
| `--gold` | `#caa64b` | `#9c7c2c` | Brand accent / primary highlight |
| `--gold-l` | `#e6d7a0` | `#7a5e1c` | Gold, lifted |
| `--gold-d` | `#b8923a` | `#6a521a` | Gold, recessed |
| `--garnet` | `#8a2540` | `#8a2540` | Wine red — primary action / selected |
| `--garnet-l` | `#a8324f` | `#a8324f` | Garnet hover/border |
| `--rose` | `#c0566e` | `#b0405c` | Active-state dot / soft accent |
| `--azul` | `#3f82c4` | `#2f6cab` | Compare motif / cool data accent |
| `--azul-l` | `#6aa6e0` | `#2f6cab` | Azul, lifted |
| `--green` | `#7faa55` | `#5f8a3a` | Mastery "full" / success |
| `--green-l` | `#9bc471` | `#4d7a2c` | Green, lifted |

**Mastery scale (the spine of the product).** Knowledge-point state `0–3` maps to:

| Token | Dark | Meaning |
|---|---|---|
| `--s0` | `#3a4150` | Untouched (empty glass) |
| `--s1` | `#3f82c4` | Seen — azul |
| `--s2` | `#caa64b` | Learning — gold |
| `--s3` | `#7faa55` | Mastered — green (glass full) |

> **Rule:** any progress visualization (the `glass()` SVG, mastery bars, column
> headers in Compare) reads from `--s0…--s3` so the "empty → blue → gold → green"
> journey is identical everywhere.

### 1.2 Typography

| Token | Stack | Use |
|---|---|---|
| `--disp` | `'Barlow Condensed', system-ui, sans-serif` | Headings, nav labels, buttons, eyebrows — uppercase, condensed |
| `--body` | `'IBM Plex Sans', system-ui, sans-serif` | Body copy, card text |
| `--mono` | `'IBM Plex Mono', ui-monospace, monospace` | Stat values, tags, percentages, active dots |

**Conventions**
- Display headings: uppercase, `letter-spacing: .04–.05em`.
- Eyebrows (`.eyebrow`): mono or condensed, ~11px, `--muted`, wide tracking, uppercase.
- Numbers that matter (KKP counts, %, phenology) use `--mono` so they read as data.

### 1.3 Spacing, radius, layout

- **Radius:** chips/pills `999px`; segments/inputs `8–11px`; cards/panels `11–14px`.
- **Borders:** `1px solid var(--line)` default; `--line2` for raised/interactive.
- **Bottom nav height:** `--navh: 64px` (content padding reserves this).
- **Page width:** mobile-first single column; comfortable max ~760px.
- **Corner chrome:** `.corner` is `position:fixed; top:0; right:0` holding the
  theme toggle + logo, with `env(safe-area-inset-top)` padding for notches.

### 1.4 Motion

- Interactive press: `transform: scale(.985)` on `:active` (cards), `.14s` ease.
- Segment/chip selection: `.12–.15s` color/background transitions.
- Selected primary controls cast a soft garnet glow:
  `box-shadow: 0 1px 6px rgba(138,37,64,.4)`.

### 1.5 Theming rules

1. Two themes only: dark (default) and `body.light`. Toggle via `.themebtn` in
   `.corner`; persisted in `localStorage` (`duovino.theme`).
2. Components must be theme-agnostic — style against tokens, not literals.
   Light-mode fixes live as `body.light .selector{…}` overrides only where a
   gradient or on-accent text color can't be expressed as a token (e.g.
   on-garnet button text becomes `#fbf8f1` in light mode).
3. Selection color is brand garnet in both themes.

---

## 2. Core component vocabulary

These classes are reused across every tab. Prefer them before inventing new ones.

| Class | What it is | Notes |
|---|---|---|
| `.view` | Page root wrapper | One per screen |
| `.top` / `.brand` | Page header with `h1` + `.sub` | Title + one-line subtitle |
| `.eyebrow` | Section kicker label | `--muted`, uppercase |
| `.panel` | Card surface | `--panel` bg, `--line` border, rounded |
| `.tcard` / `.tcards` | Region/topic card (+ grid) | Mastery `glass()` + title + meta |
| `.gcard` / `.gcards` | Grape card (2-col grid) | Left border: `--gold` (white) / `--garnet-l` (black) |
| `.chips` / `.chip` | Filter pill row + pill | `.on` = selected (garnet) |
| `.modeseg` / `.mode` | Segmented mode toggle | `.on` = active segment (garnet, glow) |
| `.qbtn` | Big selectable option button | `.accent` when chosen; `.qt`/`.qd` for title/desc |
| `.studybtn` | Primary full-width CTA | On-garnet, condensed uppercase |
| `.hero` | Featured dashboard block | Headline mastery summary |
| `.sec-h` | Section heading row | |
| `.kkp` (`.rel` / `.cmp`) | Knowledge-point line | `.rel` = relationship ("why"), `.cmp` = comparison |
| `.lo` | Learning-objective block | Groups KKPs |
| `.fbul` / `.fimg` | Flashcard bullet list / image | 4 bullets over 4 lines; image when relevant |
| `.refcard` / `.refchar` | Vessel/Soil reference card + trait | Photo + characteristics |
| `.curopt` / `.curul` / `.curbanner` | Curriculum option / list / active banner | Settings → Curriculum |
| `.setitem` / `.gearbtn` | Settings row / gear entry | |
| `.corner` / `.themebtn` | Fixed top-right chrome | Logo + theme toggle |
| `.cmp-card` / `.cmprow` / `.cmpcell` | Compare table card / row / cell | `.cmp-diff` = auto-highlighted difference |
| `.nav` + `[data-nav]` | Bottom tab bar | 5 tabs (see §3) |

**Signature visual helpers (JS-rendered SVG/markup):**
`glass(pct,w)` (fill-the-glass mastery), `radar(scores)` + `RADAR_AX` (climate
spider), `donut(grapes)` (grape composition), `styleBar(style)` (wine-style
composition bar), `fillPct(ids)` (aggregate mastery). Reuse these — do not
reimplement a chart.

---

## 3. Tabs & modes

DuoVino has **5 bottom-nav tabs** (`[data-nav]`): `dash`, `learn`, `study`,
`map`, `compare`. Several tabs have internal **modes**. Each gets a design spec
below.

### 3.1 Tab — Home (`dash`)
- **Icon:** dashboard grid. **Label:** "DuoVino".
- **Purpose:** at-a-glance mastery + entry point.
- **Layout:** `.top` header → `.hero` mastery summary → panels of recent / weak
  areas → CTAs into Study.
- **Signature element:** aggregate "fill the glass" using `--s0…--s3`.
- **Tone:** reassuring, momentum-focused ("here's where you are").

### 3.2 Tab — Learn (`learn`) — 4 modes
Segmented via `learnToggle()` → `.modeseg`. Modes: **Regions · Grapes · Vessels · Soils**.

| Mode | `learnMode` | Card | Distinctive design |
|---|---|---|---|
| **Regions** | `geo` (default) | `.tcard` in `.tcards` | Flag + country `.alt`; meta row `KKP / why / %`; mastery `glass()` top-left. Country `.chips` filter row. Honors curriculum filter → `.curbanner`. |
| **Grapes** | `grape` | `.gcard` in 2-col `.gcards` | Color swatch `.gsw`; left border gold (white) / garnet (black). Budding & ripening stats surfaced **at the top**. |
| **Vessels** | `barrels` | `.refcard` | Real photo + `.refchar` traits (oak/concrete/steel/amphora). |
| **Soils** | `soils` | `.refcard` | Real photo + soil characteristics; `SOILKEY` legend. |

- **Mode toggle pattern:** `.modeseg` with garnet `.on` segment. Same component
  reused for the Grapes sub-toggle.
- **Filter pattern:** horizontal `.chips`, `.on` = active country/filter.

### 3.3 Tab — Study (`study`) — 5 modes
Mode chosen via stacked `.qbtn` list (`studyMode`); scope via `.chips`
(`studyScope`); one `.studybtn` CTA showing live card count.

| Mode | `studyMode` | Subtitle | Card form |
|---|---|---|---|
| **Mixed** | `mixed` | "Everything, interleaved" | All check types, spaced |
| **Flashcards** | `flash` | "Fact recall" | Flip card: prompt → 4 `.fbul` bullets (+ `.fimg` when relevant) |
| **Quiz** | `mcq` | "Multiple-choice facts" | MCQ with distractors |
| **Explain** | `explain` | 'Causal "why" + rubric' | Free-recall against a rubric |
| **Blind tasting** | `blind` | "Deduce from the glass" | Tasting profile → deduce region/grape |

- **Design rules:**
  - Selected mode = `.qbtn.accent` with a mono rose `●` dot.
  - Scope chips: `All regions`, each country, `Weakest gaps`.
  - CTA reflects queue length: `Start — N cards →` or disabled "No cards in this scope".
  - A `modeHint()` line explains the selected mode in the `.empty` band.
  - **Flashcard formatting standard:** answers are **4 bullet points over 4
    lines** (`.fbul`), never inline prose — optimized for memorization. Add a
    relevant image (`.fimg`) where it aids recall.

### 3.4 Tab — Map (`map`)
- **Icon:** folded map. **Engine:** MapLibre GL (`maplibre-gl 4.7.1`).
- **Purpose:** spatial browsing of regions; tap a region → its topic page.
- **Design:** full-bleed map under the fixed chrome; markers themed to mastery
  state where shown. Controls minimal so the map stays the hero.

### 3.5 Tab — Compare (`compare`) — 2 modes
Single configurable engine (`CMP_MODES`) rendering a 2-column auto-highlighting
table (`.cmp-card`). Mode toggle = `.modeseg`. Modes: **Region · Grape**.

**Shared anatomy**
- Two entity pickers + **suggested-pair chips** (e.g. Rioja↔Ribera, Mosel↔Rheingau).
- `.cmp-card` = two column headers + an ordered **row set** from config.
- **Auto-highlight:** rows whose `diff(a,b)` is true get `.cmp-diff` (a `--gold`
  accent + small "Δ" tag). This is the core "what's actually different" signal.
- Action bar: **Drill this contrast** (study session over both entities' KKPs via
  a `pair` scope), **Copy link**, **Save image**.
- **Deep-link:** `#compare/<mode>/<aId>~<bId>` via `history.replaceState`;
  reload restores the comparison.
- **Export:** `html2canvas@1.4.1` renders `.cmp-card` to a branded PNG (uses live
  `--bg`, scale 2) → download or Web Share.

| Mode | Column header | Rows (in order) | Highlightable |
|---|---|---|---|
| **Region** | mastery `glass()` per column | Climate (radar) · Principal grapes · Style (`styleBar`) · Why it tastes that way · Signature | Climate, Grapes, Style |
| **Grape** | no mastery (note this in header) | Budding · Ripening · Climate · Acidity · Body · Alcohol · Tannin · Aromas · In the vineyard · In the winery · Overall style · Key regions | Key regions |

> **Mode difference to honor:** regions are mastery-tracked (glass in header);
> grapes are not — the grape column header must *say so* rather than show an
> empty glass.

### 3.6 Settings & Curriculum (`settings` → `curriculum`)
Reached from the `.gearbtn` in the fixed corner (`#gearBtn`), not the bottom nav.

- **Settings (`viewSettings`):** `.setitem` rows — account/sync status, theme,
  link to Curriculum.
- **Curriculum (`viewCurriculum`):** `.curopt` cards in `.curul` to pick the
  active curriculum filter — **All · WSET Level 3 · WSET Diploma · D3**
  (`curric`, persisted as `duovino.curric`). Active choice shows a `.curbanner`
  on Learn → Regions and filters the region list by each topic's `levels` tags.

---

## 4. Patterns & principles

1. **One engine, config per mode.** Compare proves the pattern: a single
   `viewCompare()` renders any mode from a `CMP_MODES` entry. New modes
   (Soils, Vessels, Classification…) are config, not new views. Apply the same
   discipline elsewhere before forking a view.
2. **Mastery is the through-line.** The `--s0…--s3` scale and `glass()` metaphor
   appear on Home, Learn cards, and Compare headers. Any new surface that shows
   progress must use them.
3. **Garnet = commit, gold = attention, azul = compare/cool data, green =
   mastered.** Keep accent semantics consistent across tabs.
4. **Mobile-first, thumb-reachable.** Primary actions are full-width buttons near
   the bottom; nav is a fixed 5-tab bar; the corner holds only logo + theme.
5. **Data reads as data.** Counts, percentages, phenology, and tags use `--mono`;
   prose uses `--body`; headings/labels use `--disp` uppercase.
6. **Reuse the visual helpers** (`glass`, `radar`, `donut`, `styleBar`) — they
   are the brand's chart language.
7. **Theme via tokens, override only when unavoidable.** A component authored
   against tokens works in both themes for free.

---

## 5. Why this isn't a claude.ai/design sync

The `/design-sync` converter ingests a design-system repo's compiled `dist/` and
a component library exposing `window.<global>.*` (optionally with Storybook), and
uploads real compiled components so the Claude Design agent builds with them.
DuoVino has none of that scaffolding — it is one hand-authored `index.html` with
inline CSS/JS. There is nothing for the converter to compile or upload. This
document is therefore the appropriate deliverable: the canonical reference for
DuoVino's tokens, components, and per-tab/per-mode patterns. If DuoVino is ever
refactored into a real component library with a build step, it can then be synced
to claude.ai/design and this doc becomes the spec that conversion targets.
