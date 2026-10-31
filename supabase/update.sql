-- My Program tab + global todo list: new tables, additive only.

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  name text not null,
  term text,
  created_at timestamptz default now()
);

create table if not exists subject_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  type text not null check (type in ('note', 'lecture', 'homework')),
  title text not null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- context_type/context_id lets one table serve todos tagged to a subject
-- (context_id = subjects.id as text) or to any other tab (context_id =
-- a tab name like 'housing', 'german', 'travel-prep').
create table if not exists todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  content text not null,
  context_type text not null check (context_type in ('subject', 'tab')),
  context_id text not null,
  completed boolean default false,
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table subjects enable row level security;
alter table subject_notes enable row level security;
alter table todos enable row level security;

drop policy if exists "Users manage own subjects" on subjects;
create policy "Users manage own subjects" on subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own subject_notes" on subject_notes;
create policy "Users manage own subject_notes" on subject_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own todos" on todos;
create policy "Users manage own todos" on todos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
