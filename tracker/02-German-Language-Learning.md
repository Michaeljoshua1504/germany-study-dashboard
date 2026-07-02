# Tracker File 2 — German Language Learning

*This file contains everything related to Mikey's German language learning — curriculum, teaching format, session rules, progress, and dashboard German section setup. Nothing about the dashboard code or university applications belongs here.*

---

## CURRENT STATUS

- **Level:** A1 beginner, self-taught, no official certificate yet
- **Day 1 status:** Not started yet
- **Next session:** Day 1 — Pronunciation & The German Alphabet, Hour 1
- **Note:** A1 certificate is not required for English-taught programs or the German student visa. Learning German is for genuine integration and long-term career reasons in Germany.

---

## 31-DAY CURRICULUM — 4 PHASES

| Phase | Days | Focus |
|---|---|---|
| Phase 1 — Foundations | Days 1–7 | Alphabet, pronunciation, basic grammar, greetings, numbers |
| Phase 2 — Your World | Days 8–14 | Family, home, daily routine, food, shopping |
| Phase 3 — Out in the World | Days 15–21 | Travel, directions, public transport, appointments |
| Phase 4 — Getting Things Done | Days 22–31 | Work, formal German, university/job vocabulary, bureaucracy |

### Day-by-Day Plan (Phase 1 detail)

| Day | Topic |
|---|---|
| Day 1 | Pronunciation & The German Alphabet |
| Day 2 | Greetings & Introductions |
| Day 3 | Numbers, Dates & Time |
| Day 4 | Articles & Gender (der/die/das) |
| Day 5 | Basic Sentence Structure |
| Day 6 | Common Verbs (sein, haben, machen) |
| Day 7 | Phase 1 Review & Mini Test |

---

## TEACHING SESSION FORMAT

Every day follows this structure:

- **Hour 1:** Text lesson — new grammar or vocabulary concept explained clearly with examples
- **Hour 2:** Written practice with live correction from Claude
- **Hour 3:** Speaking practice — roleplay, pronunciation drilling
- **Hour 4 (occasional):** Review of previous days when needed

**Rules:**
- Never move to the next Hour until Mikey confirms the current one is done
- Never mark a Day as complete unless Mikey explicitly says "Day X is done"
- If Mikey seems unsure of content, do a quick test before moving forward
- Keep explanations simple and practical — Mikey is A1, not a linguist

---

## SUPPLEMENTARY RESOURCES

- **Duolingo** — daily vocabulary reps, logged in the dashboard's Duolingo Practice section. Good for maintaining streaks between structured sessions.
- **DW Learn German (learngerman.dw.com)** — "Nico's Weg" course (A1→B1, story-driven, free). Use for extra reading/listening practice between structured sessions — not a replacement for Hour 3 speaking practice.
- **Goethe Institut Bangalore** — where an A1 certificate exam can be booked if Mikey decides to formalize later. Not currently required for anything in the pipeline.

---

## DASHBOARD — GERMAN SECTION SETUP

The dashboard has a dedicated German language section with three sub-tabs:
- **Learn** — lesson content delivery
- **My Notes & Progress** — teaching notes and level tracking
- **Duolingo Practice** — daily practice log

### Supabase Tables

**german_progress** — tracks completion and notes per lesson/day
- Always upsert with all three fields together: `completed`, `note_text`, `teaching_notes`
- Never do separate sequential upsert calls for the same row

**duolingo_log** — logs daily Duolingo practice sessions
- A duplicate-entry bug was previously fixed here

### Outstanding SQL (run once if not already done)
```sql
ALTER TABLE german_progress ADD COLUMN IF NOT EXISTS teaching_notes TEXT DEFAULT '';
```

### UI Rules
- No browser popups (`confirm()` / `alert()`) in the German section — inline only, same as the rest of the site

---

## AFTER EACH SESSION

1. Update the **CURRENT STATUS** section at the top of this file with the day and hour completed
2. Write a brief session note: what was taught, what Mikey found easy/hard, anything to revisit
3. Since Claude cannot write back to Project files automatically — generate a fresh copy of this file with updated status for Mikey to re-upload to the Project

---

*Created: 2 Jul 2026. Covers: German curriculum, teaching format, session rules, progress tracking, dashboard German section Supabase setup.*
