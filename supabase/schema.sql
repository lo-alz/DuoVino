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
