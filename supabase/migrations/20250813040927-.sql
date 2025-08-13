-- Create table for game scores (leaderboard)
create table if not exists public.game_scores (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  score integer not null check (score >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  mode text not null default 'classic', -- classic | daily | practice
  difficulty text not null default 'normal', -- easy | normal | hard
  categories text[] not null default ARRAY['mixed']::text[],
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.game_scores enable row level security;

-- Policies: allow anyone to read leaderboard
create policy if not exists "Leaderboard is publicly readable"
  on public.game_scores
  for select
  to public
  using (true);

-- Policies: allow anonymous inserts (no auth)
create policy if not exists "Anyone can submit a score"
  on public.game_scores
  for insert
  to public
  with check (true);

-- Indexes for querying top scores and recent entries
create index if not exists idx_game_scores_score on public.game_scores (score desc);
create index if not exists idx_game_scores_created_at on public.game_scores (created_at desc);
create index if not exists idx_game_scores_mode_difficulty on public.game_scores (mode, difficulty);
