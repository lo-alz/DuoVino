# DuoVino — project rules for Claude

DuoVino is a WSET wine-study web app. The entire app is ONE file: `index.html`
(vanilla JS; every view is a template-string function). It is ~350k tokens —
NEVER read it whole. Grep for anchors, then Read with offset/limit, and make
surgical edits.

## ABSOLUTE RULE #1 — elegant text presentation (the owner keeps having to repeat this)

We present information elegantly. We never dump prose. Concretely, in ANY UI text
or template you write or touch:

- **NEVER string multiple ideas on one line** — no `idea; idea; idea`, no
  `X — continuation with new info`, no `A · B · C · D` run-ons for content.
- Multiple pieces of information ⇒ **separate lines, bullet list, small grid, or
  cards**. One idea per line.
- **No inline `→` chains in prose.** Causality/mechanism belongs in the
  Factor/Mechanism/Effect/Style table (`chainTable`) or stacked lines.
- **Comparisons and tiers** (grading bands, yield ladders, quality levels,
  X vs Y): render as **side-by-side cards or rows** (`.chain .cc` grid,
  `.gstatgrid .stat`, chips), never a single sentence.
- Long meta-notes under buttons/sections: break into short stacked lines or a
  small definition grid (label + value), not a paragraph.
- Example of what NOT to ship: `Bands: Distinction ≥75 · Merit 65–74 · Pass
  55–64 · Fail 45–54 · Unclassified <45` on one line. Ship a 5-row/5-chip band
  scale instead.
- A shared helper `fmtClauses()` exists (post-redesign) to split `; ` run-ons at
  display time — use it for any authored prose you render.

## Design system — reuse, never invent

- Use ONLY existing CSS classes and tokens: `.panel`, `.qcard`, `.qbtn`, `.chip`,
  `.tag`, `.opt`, `.revealbox`, `.chain`, `.gbul`, `.summary`, `.sgrid`,
  `.eyebrow`, `.sec-h`, `.cmptxt`/`.cmptxt sm`, `glass()`, and the CSS custom
  properties (`--gold`, `--garnet`, `--rose`, `--green-l`, `--azul`, `--panel*`,
  `--line*`, `--disp/--body/--mono`).
- New CSS only when strictly necessary, built from existing tokens, matching the
  established look. The React design-system mirror lives in `design-system/src`
  (+ its `duovino.css`); keep it conceptually in sync.
- Charts can never be empty: 100% of one category = a full graph.
- Topic-tinted elements follow the topic's majority wine colour (e.g. the
  mastery glass fills gold for white-wine regions like Chablis).
- Regions are illustrated with embedded mini-maps (Carto tiles + pin) —
  `cmpMiniMap()` / `openMapPreview()`.

## Mandatory validation before any commit

```
python3 -c "import re;html=open('index.html').read();s=re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',html,re.S);open('/tmp/_v.js','w').write(max(s,key=len))" && node --check /tmp/_v.js
```
Must pass clean. Serverless functions: `node --check netlify/functions/*.mjs`.

## Repo facts

- Branch: `claude/website-build-deploy-lhml5o` (deploys via GitHub Pages
  workflow on push; Netlify also builds — functions live at
  `https://duovino.netlify.app/.netlify/functions/*`, needed because GitHub
  Pages is static).
- Auth: email-identity via Supabase `accounts` table (magic link only for new
  emails). Admin view: SHA-256-gated in Settings.
- Data blobs (`TOPICS`, `GRAPES`, `KKP`, `EXAMS`, `MAPPTS`) sit inside
  index.html — format display-side; avoid mass-rewriting data.
- Commit messages end with the repo's `Co-Authored-By:` + `Claude-Session:`
  trailers (copy from `git log -1 --format=%B`). Never create a PR unless asked.
