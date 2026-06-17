# Cellar — WSET D3 study app (multi-user / Supabase build)

A single self-contained web app for studying the WSET Diploma D3 (still wines of the
world), built around a "Lattice" learning method. This build adds **accounts + cloud
sync** so multiple people each keep their own progress, synced across their devices.

- **Frontend:** one static file, `index.html` (no build step, no framework server).
- **Backend:** **Supabase** — handles sign-in (email magic link) and a Postgres table
  that stores each user's progress. There is no custom server to run.
- **Offline:** progress is also cached in the browser's `localStorage`, so the app keeps
  working offline and re-syncs to Supabase when back online.

If the two Supabase keys below are left unfilled, the app still runs perfectly as a
single-device, no-account app (localStorage only). Filling them in turns on accounts.

---

## What needs a human (≈5 min, in the Supabase dashboard)

These steps require logging into Supabase and can't be automated from code:

1. **Create a project** at https://supabase.com → *New project* (free tier is fine).
2. **Run the schema:** open *SQL Editor → New query*, paste all of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the
   `progress` table and the row-level-security policies (each user only sees their own row).
3. **Get the two keys:** *Project Settings → API*. Copy:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - the **`anon` / `public`** API key (a long JWT — this one is safe to ship publicly;
     row-level security is what protects the data).
4. **Allow your site URL for auth:** *Authentication → URL Configuration*:
   - set **Site URL** to your deployed URL (you'll have it after deploying — see below),
   - add that same URL under **Redirect URLs**.
   (For first deploy you can paste a placeholder and update it once the URL exists.)

## Paste the keys into the app

In **`index.html`**, near the very top of the main `<script>`, there is a clearly marked
block. Replace the two placeholder strings only:

```js
const SUPABASE_URL      = "https://YOUR-PROJECT-REF.supabase.co";   // ← Project URL
const SUPABASE_ANON_KEY = "YOUR-PUBLIC-ANON-KEY";                   // ← anon / public key
```

Leave the rest of that block untouched. That's the only edit the app needs.

## Deploy (static hosting)

The app is one static file, so any static host works. Pick one:

- **Netlify / Vercel / Cloudflare Pages:** create a new site from this repo. No build
  command; the publish/output directory is the repo root (`.`). `netlify.toml` already
  sets this for Netlify.
- **GitHub Pages:** push to GitHub, then *Settings → Pages →* deploy from the `main`
  branch, root folder.

After the first deploy you'll have a live URL. Go back to **Supabase →
Authentication → URL Configuration** and make sure that URL is set as the **Site URL** and
listed under **Redirect URLs**, or the email login link won't return to the app.

---

## For Claude Code (running on the user's machine)

You can do everything except the human-only Supabase-dashboard steps above. Suggested run:

1. `git init` (if needed), add these files, and commit.
2. Make sure the two constants in `index.html` are filled with the user's Supabase
   **Project URL** and **anon key** (ask the user for them — they come from the Supabase
   dashboard, *Project Settings → API*).
3. Create the GitHub repo and push (use the user's `gh`/git credentials), e.g.
   `gh repo create <name> --public --source . --push`.
4. Deploy via the host's CLI if the user has one configured, e.g. `vercel --prod` or
   `netlify deploy --prod`, or connect the repo in the host's dashboard.
5. Tell the user the live URL and remind them to add it to Supabase's **Site URL** +
   **Redirect URLs** (Authentication → URL Configuration).

Do **not** commit any service-role key or `.env` secrets. Only the `anon`/public key
belongs in `index.html`, and that key is designed to be public.

---

## How sync works (for reference)

- Mastery is a small map of `knowledge-point-id → level (0–3)`.
- On every change it's written to `localStorage` immediately, and (when signed in)
  upserted to the Supabase `progress` table after a short debounce.
- On sign-in, the local and cloud maps are **merged by taking the higher level per point**,
  so progress made offline (or on another device before syncing) is never lost.
- Sign-in is an email **magic link**. Auth only works on the deployed `https://` site, not
  when opening `index.html` directly from disk (`file://`), because the magic link has to
  redirect back to a real web origin.

## Files

```
index.html              the app (paste your 2 Supabase keys near the top)
supabase/schema.sql     run once in the Supabase SQL editor
netlify.toml            static deploy config (Netlify)
.gitignore
README.md               this file
```
