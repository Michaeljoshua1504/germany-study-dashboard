# Tracker File 1 — Dashboard, Admissions & Applications Reference

*This file contains Mikey's profile, university shortlist, application status, LOM status, admission details, and visa steps. Session-start instructions and credentials are in the Claude Project instructions file.*

---

## THE 8 SHORTLISTED UNIVERSITIES

| University | Program | City | Tuition | Fit | Status | Apply Via | Deadline |
|---|---|---|---|---|---|---|---|
| Hof UAS | MEng Software Engineering for Industrial Applications | Hof | €3,300/sem + €148.22 admin | 9/10 | ✅ **ADMITTED — confirm & pay by 31 Aug 2026** | Primuss portal | Was 31 May 2026 |
| RheinMain UAS | MEng AI & Advanced IT | Rüsselsheim | Free | 7/10 | ⏳ Decision pending — **#1 preference** | uni-assist | 15 Jul 2026 |
| Chemnitz TU | MSc Web Engineering | Chemnitz | Free | 9/10 | ⏳ Decision pending | eduapplication.de | 15 Jul 2026 |
| Koblenz Uni | MSc Web and Data Science | Koblenz | Free | 6/10 | ⏳ Deadline passed — status uncertain | uni-assist | Was 15 Jun 2026 |
| Fulda UAS | MSc Global Software Development | Fulda | Free | 7/10 | ✅ Submitted | uni-assist | Was 31 May 2026 |
| Siegen Uni | MSc Computer Science | Siegen | Free | 6/10 | ⏳ LOM to write | Direct portal | No fixed deadline |
| Frankfurt UAS | MSc High Integrity Systems | Frankfurt | Free | 7/10 | ⏳ Apply via uni-assist | uni-assist | 15 Oct 2026 |
| Kiel UAS | MSc Computer Science | Kiel | Free | 9/10 (GRE needed) | ⏳ Needs GRE first | uni-assist | 15 Sep 2026 |

---

## MIKEY'S PROFILE

- **Full name:** Padamuthum Michael Joshua
- **DOB:** REDACTED-DOB | **Nationality:** Indian | **Based in:** Bangalore, Karnataka
- **Email:** REDACTED-EMAIL | **Phone:** +91-REDACTED-PHONE
- **LinkedIn:** linkedin.com/in/padamuthummichaeljoshua | **GitHub:** github.com/Michaeljoshua1504
- **Mac mini username:** adminrags

### Academic
- B.Tech Computer Science Engineering — BIT Institute of Technology, AP (JNTUA affiliated), 2018–2022
- 68.65% / CGPA 7.18 / First Class / German grade ~2.9 (Modified Bavarian Formula)
- 176 total credits (JNTUA system)
- Final year project: Blockchain Technology in Forensic Evidence Management

### English & Languages
- IELTS: 6.5 overall (L 6.5, R 6.5, W 6.0, S 6.5)
- German: A1 beginner, actively learning, no certificate yet — not required for English-taught programs or the visa
- Telugu: native speaker

### Professional
- **Role:** Software Developer at EXEDOS Consultancy Services Pvt Ltd — Jan 2023 to present (3+ years)
- **Work:** Websites from scratch, UI/UX design (web + mobile), REST API + Firebase, Flutter (team contributor), Git/GitHub, debugging, testing, deployment assistance
- **DevOps:** Docker, Docker Compose, Nginx, GitHub Actions, CI/CD — personal projects only, never described as professional experience

### Certifications
- MTA — Introduction to Programming using Python (Credly verified)

### Personal Background
- First in family to attend university
- Parents are BC Christian pastors in Hindupur, Andhra Pradesh
- Church Technical Lead for media and sound (ongoing)

### Career Goal
- **Target role:** DevOps Engineer in Germany — CI/CD automation, container orchestration, cloud infrastructure
- **Target cities:** Frankfurt (#1), Berlin, Munich, Hamburg
- **Path:** Job Seeker Visa (18 months post-graduation) → EU Blue Card

---

## APPLICATION & LOM STATUS

### Documents
- ✅ APS Certificate
- ✅ IELTS Certificate
- ✅ Degree Certificate + all mark sheets
- ✅ Experience Letter from EXEDOS
- ✅ CV (Tabellarischer Lebenslauf)

### Letters of Motivation
- ✅ Hof MEng — Final, submitted
- ✅ Fulda MSc — Final, submitted
- ✅ Chemnitz MSc — Final, ready to submit
- ✅ Koblenz MSc — Final, ready to submit
- ❌ RheinMain MEng — Not yet written
- ❌ Siegen MSc — Not yet written

### LOM Structure (all universities follow this)
- **Para 1 (same all):** Personal story — first in family, parents as pastors, conviction that work should matter beyond yourself
- **Para 2 (same all):** Journey — blockchain project, EXEDOS 3+ years, Docker/CI/CD personal projects, DevOps Engineer goal
- **Para 3 (DIFFERENT per uni):** Why this specific university — specific modules, internship, career support
- **Para 4 (same all):** Closing — build technical depth, professional footing, DevOps Engineer in Germany

---

## HOF ADMISSION — SECURE YOUR SEAT

- **Admission type:** Unconditional
- **Confirmation deadline:** 31 August 2026
- **Steps (from official admission letter):**
  1. Log in to PRIMUSS portal
  2. Click "Application for Enrollment"
  3. Click "To Payment (ePayment)"
  4. Pay €3,448.22 total (€3,300 tuition + €148.22 admin) via MasterCard / Visa / PayPal only
  5. Contact statutory health insurance provider (TK/AOK) — they notify Hof directly; do not send proof yourself
  6. Upload photo for Campus Card under "Application Progress" in Primuss
- **Orientation (partly mandatory):** starts 24 September 2026
- **Semester starts:** 1 October 2026 (hybrid until 31 Oct, then on-campus only)

---

## VISA STEPS

- **Consulate:** German Consulate General, Bengaluru (covers Karnataka & Kerala)
- **Step 1 — CSP pre-screening:** Register at digital.diplo.de/visa → complete questionnaire → upload documents for digital pre-screening → wait for pre-approval. This must happen before any VFS booking.
- **Step 2 — VFS Bangalore:** After CSP pre-approval, CSP generates the VFS booking link. Book earliest available slot.
- **Can start now using Hof admission letter (university-agnostic):**
  - Health insurance: Register with TK or AOK as incoming student — they notify Hof directly
  - Blocked account: Open with Fintiba or Expatrio, deposit €11,904 (€992/month × 12)
- **No A1 German certificate required** for English-taught programs or for the visa

---

## DASHBOARD TECHNICAL NOTES

- **Live site:** michaeljoshua1504.github.io/germany-study-dashboard
- **Stack:** HTML5 / CSS3 / Vanilla JS + Docker + Nginx (local) + GitHub Actions CI/CD + GitHub Pages + Supabase
- **Supabase client variable:** `sbClient` (not `supabase` — renamed to avoid CDN global scope clash)

### Supabase Credentials
- **URL:** `https://epndekpwxngjozytlcmy.supabase.co`
- **Publishable key:** `sb_publishable_1RHubw6OVdqUAS_XAcKnpg_po3SzAj5` — use for DB queries only
- **Legacy anon JWT key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbmRla3B3eG5nam96eXRsY215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzgxNTIsImV4cCI6MjA5ODMxNDE1Mn0.WtNsEgvw6ezTJN4ACVYB6Mcv57hABo0FGMC2nRamLiA`
- ⚠️ **IMPORTANT:** Always use the legacy anon JWT for storage uploads — the `sb_publishable_` key returns 403 on all storage endpoints
- **Storage bucket:** `housing-images` (public, already created)
- **Storage upload pattern:** `POST /storage/v1/object/housing-images/{filename}` with headers `Authorization: Bearer {legacy_jwt}`, `Content-Type: image/jpeg`, `x-upsert: true`

### page_sections Table (Protected Content)
- **Table:** `page_sections` — stores visa and my-room tab HTML content
- **Columns:** `id`, `section_key` (unique), `html_content`, `updated_at`
- **RLS:** Enabled — only authenticated users can SELECT
- **section_keys:** `visa`, `my-room`
- **How content loads:** After login → `content-loader.js` fetches from table → injects into tab
- **File:** `js/content-loader.js` — reads from `page_sections` table via PostgREST

### Automated Content Update Pipeline
- **How it works:** I push SQL to `supabase/update.sql` → GitHub Action triggers → executes SQL against Supabase → table updated automatically
- **Workflow file:** `.github/workflows/update-supabase.yml`
- **Trigger:** any push to `main` that changes `supabase/update.sql`
- **GitHub Secrets required:**
  - `SUPABASE_ACCESS_TOKEN` — Supabase Personal Access Token (Full access, scoped to Germany-Dashboard project, expires 2030-01-01)
  - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (sb_secret_...)
  - `SUPABASE_URL` — `https://epndekpwxngjozytlcmy.supabase.co`
- **Mikey does zero manual work** — just tell Claude what to update, Claude pushes the SQL, Action runs it
- **Content files NOT in repo** — visa.html and my-room.html were removed from public repo for security; content lives only in Supabase table
- **URL:** `https://epndekpwxngjozytlcmy.supabase.co`
- **Publishable key:** `sb_publishable_1RHubw6OVdqUAS_XAcKnpg_po3SzAj5` — use for DB queries only
- **Legacy anon JWT key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbmRla3B3eG5nam96eXRsY215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzgxNTIsImV4cCI6MjA5ODMxNDE1Mn0.WtNsEgvw6ezTJN4ACVYB6Mcv57hABo0FGMC2nRamLiA`
- ⚠️ **IMPORTANT:** Always use the legacy anon JWT for storage uploads — the `sb_publishable_` key returns 403 on all storage endpoints
- **Storage bucket:** `housing-images` (public, already created)
- **Storage upload pattern:** `POST /storage/v1/object/housing-images/{filename}` with headers `Authorization: Bearer {legacy_jwt}`, `Content-Type: image/jpeg`, `x-upsert: true`

### Travel Prep Tab
- New top-level tab added: "🧳 Travel Prep" — flat tab, no sub-nav, always visible (not auth-gated, same as Housing)
- **Section id:** `tab-travel` — activated via `showMainTab('travel', this)`
- **ui.js patched:** `showMainTab()` now handles flat tabs with no `nav-<id>` sub-nav by directly activating `tab-<id>` — needed because Travel Prep has no sub-tabs
- **Structure:** categories as `.home-card` blocks, each containing `.cl-item` checklist rows (reused from the existing priority-checklist CSS in `housing.css` — `cl-critical`/`cl-important`/`cl-optional`/`cl-done` + `.cl-chip`)
- **Content location (SECURITY):** as of the 2nd pass, moved OFF hardcoded HTML — now lives only in Supabase `page_sections` table, `section_key = 'travel'`, same protected pattern as `visa` and `my-room`. index.html only has an empty auth-gated placeholder (`data-auth-required="true"`, `#tab-travel-placeholder`). Topbar button is `auth-only` + `style="display:none"` (hidden until login), matching Admission/German tabs — no longer publicly visible like Housing. `content-loader.js` needed ZERO changes — it already loops over all `page_sections` rows generically and injects by `section_key`.
- **To update travel content going forward:** push a full replacement via `supabase/update.sql` (`INSERT ... ON CONFLICT (section_key) DO UPDATE SET html_content = ...`), same automated pipeline as everything else in Supabase. Never re-add travel content directly to index.html.
- **Checkbox IDs:** pattern `travel-<category>-<item>` (e.g. `travel-bags-transitz`) — persisted via the existing generic `saveCheck()` / `checksData` / `admission_checklists` Supabase table (same mechanism as visa checklists, just new ID namespace)
- **Progress pills:** each category header shows a live `checked/total` count via `updateTravelProgress()`, a small inline `<script>` block at the end of the `tab-travel` div in index.html
- **Categories currently in place:** Bags & Backpacks, Packing Materials, Electronics & Adapters, Money & Financial, Documents & Photos, Medicines & Pharmacy, Groceries & Kitchen, Eyewear, Winter Clothing, Shoes
- **To add a new item to a category:** find the matching `.home-card` block in `index.html` under `id="tab-travel"`, copy an existing `.cl-item` block, give it a unique id, done
- **Flight context baked into content:** Qatar Airways, 7kg cabin limit (bag + personal item combined), Oct 4 2026 departure, Student Club extra checked baggage (not cabin)

### Housing Tab
- Housing tab added to dashboard (3rd tab in top nav, between German and Life Tracker)
- Sub-tab: Room Finder (`tab-housing-rooms`)
- Batch 1: 8 properties, 84 images currently embedded as base64 in index.html (~34MB)
- **Migration in progress:** moving images to Supabase `housing-images` bucket → rebuild tab with public URLs → index.html will shrink to ~50KB
- Supabase public image URL pattern: `https://epndekpwxngjozytlcmy.supabase.co/storage/v1/object/public/housing-images/{filename}`
- **Checklist persistence:** `.persist-check` class + unique `id` per checkbox + `saveCheck(el)` function + `checksData` object
- **german_progress upserts:** always include all three fields together — `completed`, `note_text`, `teaching_notes`
- **No browser popups** anywhere — no `confirm()` or `alert()` — all confirmations handled inline
- **University IDs** (never rename): `hof`, `fulda`, `koblenz`, `siegen`, `chemnitz`, `rheinmain`, `kiel`, `frankfurt`
- **UNI_META** in `script.js`: central per-university data object; now includes `secureSteps[]` and `secureDeadline` fields — Hof fully populated from admission letter, others empty until their letters arrive
- **Secure Your Seat feature:** auto-appears on Accepted cards with per-university enrollment checklist + live deadline countdown pill + auto-filled accept-by date

---

*Created: 2 Jul 2026. Reference data for dashboard sessions and application assistance.*
