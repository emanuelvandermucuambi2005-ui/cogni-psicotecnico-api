create table if not exists profiles (
  id uuid primary key,
  name text not null,
  email text unique not null,
  created_at timestamptz not null default now()
);
create table if not exists progress (
  user_id uuid primary key references profiles(id) on delete cascade,
  xp integer not null default 0,
  answered integer not null default 0,
  correct integer not null default 0,
  streak integer not null default 0,
  updated_at timestamptz not null default now()
);
create table if not exists session_results (
  id uuid primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  test_id text not null,
  score integer not null default 0,
  xp integer not null default 0,
  correct integer not null default 0,
  answered integer not null default 0,
  started_at timestamptz not null,
  finished_at timestamptz
);
create index if not exists session_results_user_id_idx on session_results(user_id);
