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

-- My Program v2: day-wise lecture log, homework due dates, subject colors.
-- All additive and idempotent.
alter table subject_notes add column if not exists note_date date default current_date;
alter table subject_notes add column if not exists due_date date;
alter table subject_notes add column if not exists done boolean default false;
alter table subjects add column if not exists color text;

notify pgrst, 'reload schema';

-- My Program v3: exams, resources, questions, study log, flashcards,
-- project milestones, grades/credits, lecture tags. Additive and idempotent.
-- Tables are prefixed subject_ so they can't clash with the old dashboard's.
alter table subjects add column if not exists credits numeric;
alter table subjects add column if not exists grade numeric;
alter table subjects add column if not exists repo_url text;
alter table subjects add column if not exists team text;
alter table subject_notes add column if not exists exam_relevant boolean default false;
alter table subject_notes add column if not exists revise boolean default false;
alter table subject_notes add column if not exists important boolean default false;

create table if not exists subject_exams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  kind text default 'exam',
  due_date date not null,
  result text,
  created_at timestamptz default now()
);

create table if not exists subject_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  url text not null,
  kind text default 'link',
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists subject_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  question text not null,
  answer text,
  resolved boolean default false,
  created_at timestamptz default now()
);

create table if not exists subject_study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  session_date date default current_date,
  minutes integer not null check (minutes > 0),
  topic text,
  created_at timestamptz default now()
);

create table if not exists subject_flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  term text not null,
  definition text not null,
  known boolean default false,
  last_reviewed timestamptz,
  created_at timestamptz default now()
);

create table if not exists subject_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  due_date date,
  done boolean default false,
  created_at timestamptz default now()
);

do $$
declare t text;
begin
  foreach t in array array[
    'subject_exams', 'subject_resources', 'subject_questions',
    'subject_study_sessions', 'subject_flashcards', 'subject_milestones'
  ] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "Users manage own %s" on %I', t, t);
    execute format(
      'create policy "Users manage own %s" on %I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t, t
    );
  end loop;
end $$;

notify pgrst, 'reload schema';

-- Course slide summaries: pick the slides that were taught and the Lectures
-- tab turns them into one dated lecture (lecture_id marks a slide as used).
create table if not exists subject_slides (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  deck text not null,
  slide_no int not null,
  title text not null,
  content text,
  lecture_id uuid references subject_notes(id) on delete set null,
  created_at timestamptz default now(),
  unique (subject_id, deck, slide_no)
);
alter table subject_slides enable row level security;
drop policy if exists "Users manage own subject_slides" on subject_slides;
create policy "Users manage own subject_slides" on subject_slides
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

notify pgrst, 'reload schema';

-- Key dates and timetable shown at the top of each subject's overview.
create table if not exists subject_schedule (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) default auth.uid(),
  subject_id uuid references subjects(id) on delete cascade,
  event_date date not null,
  title text not null,
  kind text not null default 'deadline' check (kind in ('class', 'deadline', 'presentation')),
  at_time text,
  details text,
  done boolean default false,
  created_at timestamptz default now(),
  unique (subject_id, kind, event_date, title)
);
alter table subject_schedule enable row level security;
drop policy if exists "Users manage own subject_schedule" on subject_schedule;
create policy "Users manage own subject_schedule" on subject_schedule
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

notify pgrst, 'reload schema';
