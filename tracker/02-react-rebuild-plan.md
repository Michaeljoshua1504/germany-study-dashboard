# React Rebuild — Status & Plan

Context for picking this up in a fresh Claude Code session. Read this first.

## Setup
- Branch: `react-rebuild` (off `main`)
- New app lives in `web/` (Vite + React), old static site stays untouched at repo root
- Hosting target: Vercel, root directory `web/`, deploying previews from this branch
- Backend: same Supabase project as the old site (same URL/anon key in `web/src/lib/supabase.js`), same Auth users

## Why this structure
Old site is plain HTML/CSS/JS across 6 JS files and 6 CSS files — hard to extend.
Rebuilding as React components, tab by tab, testing each against the live old
site before moving to the next. Old site (GitHub Pages / root files) keeps
running the whole time so nothing breaks mid-migration.

## Migration order
1. **My Program** (in progress — prioritized, needed now for coursework)
2. Housing
3. Admission
4. German
5. Travel Prep
6. Dashboard
7. Life Tracker (currently locked; build fresh rather than port)

## Design direction
Navy (#0d1b2a) + warm paper (#f4f1ea) + signal red (#c8102e) accent.
Revised after the first pass felt flat: rounded cards with soft shadows,
springy motion (count-up stats, sliding tab pill, animated checkboxes), a
glass nav with a German-flag stripe, and each subject carrying its own accent
colour (gradient hero, avatar, tab pill). Red stays reserved for what needs
attention. Respect `prefers-reduced-motion`. Tokens are in `web/src/index.css`.
Note: Windows doesn't render flag emoji (shows "DE") — use the SVG flag.

## Supabase: done
Tables live (pushed via `supabase/update.sql` → GitHub Action, already executed):
- `subjects` (id, user_id, name, term, created_at)
- `subject_notes` (id, user_id, subject_id, type: note|lecture|homework, title, content, created_at, updated_at)
- `todos` (id, user_id, content, context_type: subject|tab, context_id, completed, created_at, completed_at)
All RLS-secured to `auth.uid() = user_id`.

## Built so far (in `web/src/`)
- `lib/supabase.js` — Supabase client
- `contexts/AuthContext.jsx` — session state, signIn/signOut
- `contexts/ThemeContext.jsx` — light/dark toggle, persisted to localStorage
- `index.css` — design tokens, reset, base typography, shared .btn/.field classes

## Not built yet — pick up here
- `components/TopNav.jsx` — sticky navy bar: 🇩🇪 wordmark, tab nav, theme
  toggle, todo panel trigger, login/logout
- `components/LoginModal.jsx` — email/password via AuthContext
- `components/TodoPanel.jsx` — global slide-out: quick-add, tag to a subject
  or any tab via `context_type`/`context_id`, list with checkbox/delete
- `pages/MyProgram/MyProgram.jsx` — layout: SubjectList (left rail) + SubjectDetail (right)
- `pages/MyProgram/SubjectList.jsx` — binder-tab style list, fetch/add subjects
- `pages/MyProgram/SubjectDetail.jsx` — subject header + three NoteSection instances
- `pages/MyProgram/NoteSection.jsx` — reusable list+add for note/lecture/homework
- `App.jsx` / `main.jsx` — wire providers + routing (My Program is the only real
  page so far; other nav tabs can show a "coming soon" state)

## Working style notes (carry these into Claude Code)
- Decisive, direct, informal. Lead with a recommendation, not a menu of options.
- Plain-text step lists, not widget UI, when giving instructions.
- No hardcoded dashboard content — drive from Supabase.
- No `confirm()`/`alert()` popups — inline UI only.
- Sensitive data (DOB, address, phone) does NOT go through the
  `supabase/update.sql` auto-pipeline — write the SQL in chat instead and
  have Mikey paste it into the Supabase SQL Editor himself. Non-sensitive
  content (like the tables above) uses the normal pipeline.
- Filenames for Supabase uploads: ASCII only (ß→ss, ü→ue, ö→oe, ä→ae).
