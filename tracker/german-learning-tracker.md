# German Language Learning — Curriculum, Rules & Live Tracker

*This file contains everything about Mikey's German language learning: curriculum plan, teaching rules, session format, Supabase setup, live progress tracker, and session history. Updated after every German lesson.*

---

## CURRENT STATUS

- **Level:** A1 beginner, no official certificate yet
- **Last completed day:** None yet — starting Day 1
- **Next session:** Day 1 — Pronunciation & The German Alphabet, Hour 1
- **Phase:** 1 — Foundations
- **Total days completed:** 0 of 31
- **Hours logged:** 0

---

## HANDOFF NOTE (Auto-updated — do not edit manually)

```
STATUS: clear
LAST UPDATED: 30 Jun 2026
CURRENT DAY: 1 — Pronunciation & The German Alphabet (not yet started)
CONTEXT: Day 1 has not been taught yet. Infrastructure session on 30 Jun built the tracker, fixed Day 1/2/6 content mismatches on the dashboard, relabeled Week→Phase throughout the Learn tab, and built a Full Teaching Notes section per day card on the dashboard.
WHAT'S BEEN COVERED THIS DAY SO FAR: Nothing. Day 1 lesson itself has not started.
NEXT STEP: Start Day 1 — Pronunciation & The German Alphabet. Teach live in chat (Hour 1 lesson, Hour 2 written practice, Hour 3 voice chat). When Mikey says "Day 1 is done", write Full Teaching Notes, push to dashboard via saveGermanTeachingNotes(1, text), update this file, push to GitHub.
OUTSTANDING: Run this SQL in Supabase if not already done — ALTER TABLE german_progress ADD COLUMN IF NOT EXISTS teaching_notes TEXT DEFAULT '';
```

---

## WHAT CLAUDE MUST DO AT THE START OF EVERY GERMAN SESSION

1. Fetch this file fresh from GitHub using the token in the Claude Project instructions file
2. Read **HANDOFF NOTE** and **CURRENT STATUS** first — these tell you exactly where to start
3. If STATUS is `active` — announce: *"We were mid-lesson on Day X — [context]. Picking up from there."* Continue exactly from WHAT'S BEEN COVERED SO FAR
4. If STATUS is `clear` — announce: *"Starting Day X — [topic]. Here's how today works..."* Then begin teaching live using the 4-hour structure below
5. **Never mark a day ✅ Done until Mikey explicitly says "Day X is done"** — never assume from context alone
6. When "Day X is done" is received:
   - Write Full Teaching Notes for that day (what was taught, examples used, questions asked, corrections made, what clicked/didn't) — use ### headings and **bold** key terms so it renders cleanly on the dashboard
   - Call `saveGermanTeachingNotes(day_number, notes_text)` to push notes to the dashboard Learn tab
   - Update this file: mark the day ✅ Done, add Session History row, update Current Status and Handoff Note
   - Push updated file to GitHub

---

## CORE TEACHING PRINCIPLES (Never Change These)

- **Claude is the teacher, not a self-study reference.** Every lesson is taught live in conversation.
- **One day, one lesson, full understanding before moving on.** No skipping ahead.
- **Grammar first in plain English, before drilling vocabulary.** Mikey should understand *why* a sentence is built the way it is.
- **Every lesson uses real-life examples from Mikey's situation** — his move to Germany, his job at EXEDOS, daily life — not generic textbook sentences.
- **Voice chat is mandatory for speaking and listening practice.** Reading/writing alone does not complete a day. Claude asks questions in German, listens to spoken answers, corrects pronunciation.
- **Honest pacing, always.** If Mikey is behind schedule, Claude says so plainly and adjusts.
- **A1 in substance, not just by exam technicality.** Real goal: Mikey genuinely understanding and using A1-level German — not rushing to fake-pass a test.

### A Day Is Only ✅ Done When ALL of These Are True
1. Grammar point explained and Mikey could restate it in his own words
2. Written practice task completed
3. Short voice chat check — Mikey answered questions out loud in German
4. Mikey explicitly says **"Day X is done"**

---

## TEACHING SESSION FORMAT (Every Day)

- **Hour 1:** Text lesson — new grammar/vocabulary concept explained with real-life examples from Mikey's life
- **Hour 2:** Written practice with live correction from Claude
- **Hour 3:** Voice chat — speaking and listening practice, questions in German, pronunciation correction
- **Hour 4 (some days):** Spaced repetition of past vocab, short quiz on prior days

After every 7 days (Day 7, 14, 21, 31) — Phase Review + Voice Test. Run a spoken conversation covering everything from that phase. Actually test by speaking German and expecting German responses.

---

## 31-DAY CURRICULUM

### Phase 1 — Foundations (Days 1–7, Jul 1–7)
Sounds and structure of German: alphabet, pronunciation, numbers, basic sentence shape, verb "sein". By the end Mikey can greet someone, introduce himself, and say where he's from.

| Day | Date | Topic | Status | Session Notes |
|---|---|---|---|---|
| 1 | 1 Jul | Pronunciation & The German Alphabet | ⬜ Not started | |
| 2 | 2 Jul | Greetings, Politeness & Introducing Yourself (du vs Sie) | ⬜ Not started | |
| 3 | 3 Jul | Numbers 0–100 | ⬜ Not started | |
| 4 | 4 Jul | The Verb "sein" (to be) — Full Mastery | ⬜ Not started | |
| 5 | 5 Jul | Nationality, Country & City | ⬜ Not started | |
| 6 | 6 Jul | Basic Sentence Structure & First W-Questions | ⬜ Not started | |
| 7 | 7 Jul | Phase 1 Review + Voice Test | ⬜ Not started | |

### Phase 2 — Your World (Days 8–14, Jul 8–14)
Verb "haben", family vocabulary, daily routine, days of the week, telling time, possessives. By the end Mikey can describe his day and family in German.

| Day | Date | Topic | Status | Session Notes |
|---|---|---|---|---|
| 8 | 8 Jul | Family Members & Noun Gender (der/die/das) | ⬜ Not started | |
| 9 | 9 Jul | The Verb "haben" (to have) — Full Mastery | ⬜ Not started | |
| 10 | 10 Jul | Daily Routine — Part 1 (Morning, Separable Verbs) | ⬜ Not started | |
| 11 | 11 Jul | Daily Routine — Part 2 (Work & Evening) | ⬜ Not started | |
| 12 | 12 Jul | Days of the Week & Time Expressions ("am") | ⬜ Not started | |
| 13 | 13 Jul | Possessive Pronouns (mein, dein, sein) | ⬜ Not started | |
| 14 | 14 Jul | Phase 2 Review + Voice Test | ⬜ Not started | |

### Phase 3 — Out in the World (Days 15–21, Jul 15–21)
Food and shopping vocabulary, Akkusativ case, polite requests, directions, basic adjectives. By the end Mikey can shop, order, and navigate a city in German.

| Day | Date | Topic | Status | Session Notes |
|---|---|---|---|---|
| 15 | 15 Jul | Food & Drink Vocabulary | ⬜ Not started | |
| 16 | 16 Jul | The Accusative Case (Akkusativ) — Intro | ⬜ Not started | |
| 17 | 17 Jul | At the Supermarket — Shopping Phrases & "möchten" | ⬜ Not started | |
| 18 | 18 Jul | Asking & Giving Directions | ⬜ Not started | |
| 19 | 19 Jul | Prepositions of Place (in, auf, neben, unter) | ⬜ Not started | |
| 20 | 20 Jul | Adjectives — Describing Things | ⬜ Not started | |
| 21 | 21 Jul | Phase 3 Review + Voice Test | ⬜ Not started | |

### Phase 4 — Getting Things Done (Days 22–31, Jul 22–31)
Transport, health, weather, modal verbs, question words, connectors. By the end Mikey can handle real situations and we run full mock practice for the A1 checkpoint.

| Day | Date | Topic | Status | Session Notes |
|---|---|---|---|---|
| 22 | 22 Jul | Transport & Getting Around | ⬜ Not started | |
| 23 | 23 Jul | Booking & Travel Phrases | ⬜ Not started | |
| 24 | 24 Jul | Health & Body Parts ("Mir tut... weh") | ⬜ Not started | |
| 25 | 25 Jul | Weather & Seasons | ⬜ Not started | |
| 26 | 26 Jul | Modal Verbs — können & müssen | ⬜ Not started | |
| 27 | 27 Jul | Asking Questions — W-Fragen | ⬜ Not started | |
| 28 | 28 Jul | Connectors — und, aber, oder, weil | ⬜ Not started | |
| 29 | 29 Jul | Mock Listening & Reading Practice | ⬜ Not started | |
| 30 | 30 Jul | Mock Speaking & Writing Practice | ⬜ Not started | |
| 31 | 31 Jul | Final Review — A1 Checkpoint | ⬜ Not started | |

---

## SUPPLEMENTARY RESOURCES

- **Duolingo** — daily vocabulary reps, logged in dashboard Duolingo Practice section
- **DW Learn German (learngerman.dw.com)** — "Nico's Weg" course (A1→B1, story-driven, free). Good for reading/listening practice between structured sessions — not a replacement for Hour 3 voice practice
- **Goethe Institut Bangalore** — where an A1 exam can be booked if Mikey decides to formalize later; not currently required for anything in the pipeline

---

## DASHBOARD — GERMAN SECTION TECHNICAL NOTES

- **German Language tab:** Top-level nav → 🇩🇪 German Language → 3 sub-tabs: 📚 Learn / 📝 My Notes & Progress / 🦉 Duolingo Practice
- **Teaching notes saved via:** `saveGermanTeachingNotes(day, text)` in script.js → upserts to `german_progress` table in Supabase with `teaching_notes` column
- **Supabase client variable:** `sbClient` (not `supabase` — renamed to avoid CDN global scope clash)
- **Supabase tables:**
  - `german_progress` — columns: day_num, completed, note_text, teaching_notes. Always upsert all three fields together — never separate sequential calls
  - `duolingo_log` — columns: id, entry_date, entry_text, streak. Duplicate-entry bug was previously fixed
- **Outstanding SQL (run once if not already done):**
  ```sql
  ALTER TABLE german_progress ADD COLUMN IF NOT EXISTS teaching_notes TEXT DEFAULT '';
  ```
- **No browser popups** anywhere in the German section — no `confirm()` or `alert()` — all confirmations handled inline

---

## SESSION HISTORY

| Session | Date | Day(s) Covered | Key Concepts |
|---|---|---|---|
| — | — | — | — |

---

## MINDSET MOMENTS (Great Questions Asked)

| Date | Question / Situation | Why It Matters |
|---|---|---|
| — | — | — |

---

## NOTES & CORRECTIONS LOG

- **30 Jun 2026:** Tracker file created. Confirmed pacing plan — 3–4 hrs/day across 31 days (93–124 total hours), within real A1 range (80–200 hrs typically cited). Speaking/listening via live voice chat with Claude. Goal: A1 in substance by July 31 — exam attempt to be revisited in August.
- **30 Jun 2026 (later):** Fixed Day 1/2 swap and Day 6 topic mismatch between tracker and dashboard Learn tab. Relabeled "Week" → "Phase" throughout Learn tab UI. Added Full Teaching Notes section to each day's card on Learn tab — collapsed by default, shows 📋 Taught badge once filled.
- **2 Jul 2026:** This file merged from `german-learning-tracker.md` + `02-German-Language-Learning.md` into one single file. `02-German-Language-Learning.md` deleted from tracker folder.

---

*Last updated: 2 Jul 2026. 0 of 31 days taught. Day 1 starts next session.*
