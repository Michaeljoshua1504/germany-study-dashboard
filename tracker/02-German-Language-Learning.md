# Claude Project Instructions — German Language Learning

*(File 2 of 2 — Mikey's German learning journey, curriculum, and progress tracking. For dashboard code and application status, see File 1: Dashboard-and-Application-Instructions.md)*

---

## WHAT THIS FILE IS FOR

Mikey is learning German from scratch (currently A1, no certificate) as part of his preparation to study and work in Germany. This file tracks his curriculum, teaching format, current progress, and the technical setup for the German section of his dashboard. Use this as the source of truth for German teaching sessions — don't ask Mikey to re-explain where he left off.

---

## CURRENT STATUS

- **Level:** A1 beginner, self-taught, no official certificate yet
- **Last session completed:** Day 1 — Pronunciation & The German Alphabet, Hour 1 delivered (phonetic consistency, letter sound differences W/V/Z/J/S, special characters ä/ö/ü/ß, ei/ie combinations, sch, ch variants)
- **Next up:** Day 1, Hours 2–3, then Day 2 onward
- **Note on certification:** an A1 certificate is *not* required for English-taught Master's programs or for the German student visa — this is being learned for genuine integration and long-term career reasons, not as an admission requirement.

---

## CURRICULUM STRUCTURE — 31-DAY, 4-PHASE PLAN

| Phase | Days | Focus |
|---|---|---|
| Phase 1 — Foundations | 1–7 | Alphabet, pronunciation, basic grammar, greetings, numbers |
| Phase 2 — Your World | 8–14 | Family, home, daily routine, food, shopping |
| Phase 3 — Out in the World | 15–21 | Travel, directions, public transport, appointments |
| Phase 4 — Getting Things Done | 22–31 | Work, formal German, bureaucracy, university/job-related vocabulary |

---

## TEACHING SESSION FORMAT (follow for every day)

- **Hour 1:** Text lesson — new grammar/vocabulary concept explained
- **Hour 2:** Written practice with live correction
- **Hour 3:** Speaking practice (roleplay, pronunciation drilling)
- **Hour 4 (occasional):** Review of previous days

After each session, write teaching notes into the tracker file (see Tools & Resources below) so the next session can pick up exactly where it left off.

---

## SUPPLEMENTARY RESOURCES

- **Duolingo** — daily vocabulary reps, logged in the dashboard's Duolingo Practice section
- **DW Learn German (learngerman.dw.com)** — free, structured supplement via "Nico's Weg" course (A1→B1 story-driven course), good for extra reading/listening practice between structured sessions. Self-study only — doesn't replace live speaking practice, which Hour 3 sessions are meant to cover.
- **Goethe Institut Bangalore** — where an A1 certificate exam could eventually be booked, if Mikey decides to formalize the level later (not currently required for anything in his pipeline)

---

## DASHBOARD — GERMAN LANGUAGE SECTION

Lives within the dashboard alongside the Admission Phase tabs. Structure:
- **Learn** — lesson content delivery
- **My Notes & Progress** — teaching notes + level tracking
- **Duolingo Practice** — daily practice log

### Backend (Supabase)
- `german_progress` table — tracks completion state, notes, and teaching notes per day/topic. Upsert calls must always include all three fields: `completed`, `note_text`, `teaching_notes`.
- `duolingo_log` table — logs daily Duolingo practice sessions. A duplicate-entry bug was previously fixed here.
- `tracker/german-learning-tracker.md` in the repo — the canonical teaching notes file, updated after each session.

### Outstanding setup (run once, if not already done)
```sql
ALTER TABLE german_progress ADD COLUMN IF NOT EXISTS teaching_notes TEXT DEFAULT '';
```
Also confirm `duolingo_log` table exists (see schema note above) — create if missing.

### UI notes
- No browser popups (`confirm()`/`alert()`) anywhere on the dashboard, including the German section — all confirmations must be handled inline, matching the rest of the site.

---

## HOW CLAUDE SHOULD RUN A GERMAN SESSION

1. Check this file for the current Day/Hour to resume from.
2. If unsure or the tracker seems out of date, ask Mikey directly rather than assuming.
3. Deliver the session in the Hour 1–4 format above.
4. At the end, summarize what was covered and update the **CURRENT STATUS** section of this file (or note it for Mikey to update, if Claude can't write back to Project files directly — see note below).
5. If Mikey wants this synced to the actual dashboard database, use the Supabase upsert pattern for `german_progress` (all three fields together) rather than separate sequential calls.

**Note on updating this file:** Claude cannot write changes back into Project knowledge files automatically — files here are read-only references. After each session, Claude should tell Mikey what changed so he can manually update this file's CURRENT STATUS section, or Claude can generate a fresh copy of this file with status updated for Mikey to re-upload.

---

*File split from original combined instructions file: 2 Jul 2026.*
*This file replaces the absence of a dedicated German-learning section in the original combined instructions — content compiled from session history and dashboard architecture notes.*
