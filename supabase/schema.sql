-- ===========================================================================
-- DuoVino — per-user study progress
-- Run this ONCE in your Supabase project:
--   Supabase dashboard → SQL Editor → New query → paste all of this → Run
-- ===========================================================================

-- One row per user, holding their whole mastery map as JSON.
create table if not exists public.progress (
  user_id    uuid        primary key references auth.users(id) on delete cascade,
  mastery    jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row-Level Security: every user can touch ONLY their own row.
alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own"
  on public.progress for select
  using ( auth.uid() = user_id );

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own"
  on public.progress for insert
  with check ( auth.uid() = user_id );

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own"
  on public.progress for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- ===========================================================================
-- Email-keyed accounts — lightweight identity + progress sync + admin list.
-- The app uses the email as the identity (magic link sent ONLY for brand-new
-- emails; returning emails sign in instantly). Progress syncs by email, and
-- the Settings → Admin view lists registered emails.
-- NOTE: this table is intentionally readable/writable with the anon key (no
-- passwords); keep only non-sensitive study progress here.
-- ===========================================================================
create table if not exists public.accounts (
  email      text        primary key,
  mastery    jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.accounts enable row level security;

drop policy if exists "accounts_select_all" on public.accounts;
create policy "accounts_select_all" on public.accounts for select using ( true );

drop policy if exists "accounts_insert_all" on public.accounts;
create policy "accounts_insert_all" on public.accounts for insert with check ( true );

drop policy if exists "accounts_update_all" on public.accounts;
create policy "accounts_update_all" on public.accounts for update using ( true ) with check ( true );
