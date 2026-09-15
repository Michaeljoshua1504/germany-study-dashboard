// ═══════════════ 1. SUPABASE SETUP & LOCAL CACHE ═══════════════

const SUPABASE_URL = 'https://epndekpwxngjozytlcmy.supabase.co'; // <-- PASTE YOUR URL HERE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbmRla3B3eG5nam96eXRsY215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzgxNTIsImV4cCI6MjA5ODMxNDE1Mn0.WtNsEgvw6ezTJN4ACVYB6Mcv57hABo0FGMC2nRamLiA'; // <-- PASTE YOUR ANON KEY HERE

let sbClient = null;
try {
  if (!window.supabase) throw new Error("Supabase library is missing. Did you add the script tag to index.html?");
  // Only create the client if the URL looks like a real URL to prevent crashing
  if (SUPABASE_URL.startsWith('http')) {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: window.localStorage,
        persistSession: true,
        detectSessionInUrl: false,
        storageKey: 'gsd-auth-token'
      }
    });
  } else {
    console.warn("Waiting for valid Supabase URL to be entered.");
  }
} catch (err) {
  console.error("Database Setup Error:", err);
}

// Local cache to keep the UI lightning fast
let pipelineData = {};
let checksData = {};
let notesData = {};
let admissionData = {};

// ─── University metadata ───
const UNI_META = {
  hof: { title: 'Hof University — MEng Software Engineering', sub: 'MEng Software Engineering for Industrial Applications · Hof', fit: 'Strong Fit ⭐', fitClass: 'green', tuition: '€3,300/sem', deadline: '31 May 2026', applyVia: 'Direct Hof portal (Primuss)', link: 'https://www3.primuss.de/cgi-bin/bew_anmeldung_v2/index.pl?FH=fhh&Portal=1&Language=en', deadlineKey: '2026-05-31', sems: 4, tuitionNum: 3300, semFeeNum: 150, livingNum: 900,
    programPage: 'https://www.hof-university.com', cityName: 'Hof', cityEmoji: '🏭', housingCost: '€350–550', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: 'Paid internship (yr 3–4) ~€800–1,200/mo offsets tuition', costLevel: 'Low (€900/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★★☆ Good (via internship)', transport: 'Regional train; Nuremberg 1.5 hr', rent: '€350–550/mo', companies: 'SAP, IBM, Siemens, Continental, JPM',
    secureDeadline: '2026-08-31', secureSteps: ['Log in to the PRIMUSS portal with your applicant credentials', 'Click "Application for Enrollment"', 'Click "To Payment (ePayment)" to confirm your intent to enroll', 'Pay €3,448.22 total (€3,300 tuition + €148.22 admin fee) via MasterCard, Visa, or PayPal', 'Contact a statutory health insurance provider (e.g. TK, AOK) — they must notify Hof directly, do not send proof yourself', 'Upload your photo under "Application Progress" in Primuss for your Campus Card'] },
  fulda: { title: 'Fulda University of Applied Sciences', sub: 'MSc Global Software Development · Fulda', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '31 May 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-05-31', sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 925,
    programPage: 'https://www.hs-fulda.de/en/studyprogramme/global-software-development-msc', cityName: 'Fulda', cityEmoji: '🏫', housingCost: '€400–500', insurance: '~€120', scholarship: 'Deutschlandstipendium', scholarshipLink: 'https://www.hs-fulda.de/en/studieren/my-studies/finance-studies/scholarships/deutschlandstipendium', eligNote: 'Eligible after enrolment — competitive', costLevel: 'Low-Medium (€925/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate', transport: 'Train to Frankfurt ~1 hr', rent: '€400–500/mo', companies: 'Krones, regional IT firms',
    secureDeadline: null, secureSteps: [] },
  koblenz: { title: 'University of Koblenz', sub: 'MSc Web and Data Science · Koblenz', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 June 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-06-15', sems: 4, tuitionNum: 0, semFeeNum: 290, livingNum: 992,
    programPage: 'https://www.uni-koblenz.de/en/degree-programs/web-and-data-science-master-of-science', cityName: 'Koblenz', cityEmoji: '🌉', housingCost: '€350–500', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: 'DAAD FIT4SukCESS funded career support programme', costLevel: 'Medium (€992/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★★☆ Good (near Frankfurt/Cologne)', transport: 'Train; Frankfurt 1 hr; Cologne 1 hr', rent: '€350–500/mo', companies: 'Historic Rhine valley, UNESCO heritage',
    secureDeadline: null, secureSteps: [] },
  siegen: { title: 'University of Siegen', sub: 'MSc Computer Science · Siegen', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: 'No fixed deadline', applyVia: 'Direct Siegen portal', link: 'http://www.master-cs.eti.uni-siegen.de/', deadlineKey: null, sems: 4, tuitionNum: 0, semFeeNum: 320, livingNum: 875,
    programPage: 'http://www.master-cs.eti.uni-siegen.de/', cityName: 'Siegen', cityEmoji: '⚒️', housingCost: '€270–450', insurance: '~€120', scholarship: 'Deutschlandstipendium', scholarshipLink: 'https://www.sff.uni-siegen.de/index.html.en?lang=en', eligNote: 'Eligible — apply after admission', costLevel: 'Low-Medium (€875/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate (Cologne 1 hr)', transport: 'Train; Cologne 1.5 hr', rent: '€270–450/mo', companies: 'FIT in Siegen DAAD-funded programme',
    secureDeadline: null, secureSteps: [] },
  chemnitz: { title: 'Chemnitz University of Technology', sub: 'MSc Web Engineering · Chemnitz', fit: 'Strong Fit ⭐', fitClass: 'green', tuition: 'Free', deadline: '15 July 2026', applyVia: 'eduapplication.de', link: 'https://www.eduapplication.de/', deadlineKey: '2026-07-15', sems: 4, tuitionNum: 0, semFeeNum: 330, livingNum: 970,
    programPage: 'https://www.tu-chemnitz.de', cityName: 'Chemnitz', cityEmoji: '⚙️', housingCost: '€270–350', insurance: '~€120', scholarship: 'Yes — DAAD + internal', scholarshipLink: 'https://www.tu-chemnitz.de/international/incoming/stipendien/index.php.en', eligNote: 'Eligible — apply after admission', costLevel: 'Low (€970/mo incl. transport)', costLevelClass: 'green', housingDifficulty: 'Easy — very affordable', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate', transport: 'Tram + train; Dresden 1 hr', rent: '€270–350/mo', companies: 'VW, BMW plants nearby, mid-size tech',
    secureDeadline: null, secureSteps: [] },
  rheinmain: { title: 'RheinMain University of Applied Sciences', sub: 'MEng AI & Advanced IT · Rüsselsheim', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 July 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-07-15', sems: 3, tuitionNum: 0, semFeeNum: 370, livingNum: 950,
    programPage: 'https://www.hs-rm.de/en/international/from-abroad/international-students/studium/english-masters-programs', cityName: 'Rüsselsheim (near Frankfurt)', cityEmoji: '🏘️', housingCost: '€400–600', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'Medium (€950/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★★★ Excellent (via Frankfurt)', transport: 'S-Bahn to Frankfurt 20 min', rent: '€450–650/mo', companies: 'Opel, T-Systems, Fraport, all Frankfurt tech',
    secureDeadline: null, secureSteps: [] },
  frankfurt: { title: 'Frankfurt University of Applied Sciences', sub: 'MSc High Integrity Systems · Frankfurt', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 October 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-10-15', sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 1000,
    programPage: 'https://www.frankfurt-university.de/en/', cityName: 'Frankfurt am Main', cityEmoji: '🏙️', housingCost: '€500–800', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'High (€1,000+/mo)', costLevelClass: 'amber', housingDifficulty: 'Hard — very high demand', housingDifficultyClass: 'red', jobMarket: '★★★★★ Best in Germany', transport: 'Excellent U-Bahn + S-Bahn', rent: '€600–900/mo', companies: 'SAP, AWS, Google, Deutsche Bank, T-Systems',
    secureDeadline: null, secureSteps: [] },
  kiel: { title: 'Kiel University of Applied Sciences', sub: 'MSc Computer Science · Kiel', fit: 'Conditional ⚠️', fitClass: 'amber', tuition: 'Free', deadline: '15 September 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-09-15', sems: 3, tuitionNum: 0, semFeeNum: 378, livingNum: 992,
    programPage: 'https://www.haw-kiel.de/en/degree-courses/courses/computer-science', cityName: 'Kiel', cityEmoji: '🌊', housingCost: '€400–600', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'Medium (€992/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★☆☆ Moderate (Hamburg 1.5 hr)', transport: 'Good local; Hamburg 1.5 hr', rent: '€400–600/mo', companies: 'Beautiful coastal city, Baltic Sea',
    secureDeadline: null, secureSteps: [] }
};

const SHARED_DOCS = [ 'Valid passport (18+ months validity remaining)', 'Passport-size biometric photographs', 'APS Certificate (Akademische Prüfstelle) — ✓ already obtained', 'IELTS certificate (6.5) — confirm it won\'t expire before intake', '10th & 12th marksheets', "Bachelor's degree certificate + provisional certificate", 'Semester-wise transcripts / consolidated marksheet (CGPA 7.18)', 'Updated CV / résumé', 'Statement of Purpose / Letter of Motivation (tailored per university)', '2 Letters of Recommendation (academic or professional)', 'Work experience certificates / relieving letters (3+ yrs)', 'uni-assist VPD / university application form', 'Application fee payment receipt (where applicable)' ];
const UNI_EXTRA_DOCS = { hof: ['Proof of 3+ years relevant work experience'], fulda: ['Goethe-Zertifikat A1 German certificate — ⚠️ still pending, book in Hyderabad'], koblenz: ['Project / work sample — your blockchain forensic evidence management project (used to resolve uni-assist app #3589260)'], siegen: [], chemnitz: ['Application forwarded to TU Chemnitz faculty for subject review — awaiting official admission decision (App No. 1774012 via EduApplication, confirmed 4 Jul 2026)'], rheinmain: ['Letter of Motivation — still to write'], frankfurt: [], kiel: ['GRE General score report — register & take the test'] };


// ═══════════════ 2. INITIAL BOOTLOADER ═══════════════
async function fetchAllCloudData() {
  const dot = document.getElementById('db-dot');
  const text = document.getElementById('db-text');

  if (!sbClient) {
    if (dot) dot.className = 'status-dot offline';
    if (text) text.textContent = 'Offline Mode (Local Storage)';
    return; // Safely exit if DB isn't connected yet
  }

  try {
    // Fetch Pipeline
    const { data: pipeline, error: e1 } = await sbClient.from('admission_pipeline').select('*');
    if (e1) throw new Error(e1.message);
    pipeline?.forEach(row => pipelineData[row.uni_key] = row);

    // Fetch Checklists
    const { data: checks, error: e2 } = await sbClient.from('admission_checklists').select('*');
    if (e2) throw new Error(e2.message);
    checks?.forEach(row => checksData[row.check_id] = row.is_checked);

    // Fetch Notes
    const { data: notes, error: e3 } = await sbClient.from('admission_notes').select('*');
    if (e3) throw new Error(e3.message);
    notes?.forEach(row => notesData[row.uni_key] = row.note_text);

    // Hydrate core UI — pipeline, checklists, notes
    applySubmittedState();
    restoreChecks();
    restoreNotes();
    refreshPipelineUI();

    // Fetch Admission Requirements — isolated so it can't crash the main fetch
    try {
      const { data: admission, error: e4 } = await sbClient.from('admission_requirements').select('*');
      if (e4) throw new Error(e4.message);
      admission?.forEach(row => admissionData[row.uni_key] = row);
      renderAdmission();
      renderHofProfile();
    } catch (admErr) {
      console.warn('admission_requirements table not ready yet:', admErr.message);
    }

    // Fetch German Progress — isolated so it can't crash the main fetch
    try {
      const { data: german, error: e5 } = await sbClient.from('german_progress').select('*');
      if (e5) throw new Error(e5.message);
      german?.forEach(row => germanProgress[row.day_num] = { completed: row.completed, note_text: row.note_text, teaching_notes: row.teaching_notes || '' });
      renderGermanTab();
    } catch (gerErr) {
      console.warn('german_progress table not ready yet:', gerErr.message);
    }

    // Fetch Duolingo Log — isolated so it can't crash the main fetch
    try {
      const { data: duo, error: e6 } = await sbClient.from('duolingo_log').select('*').order('entry_date', { ascending: false });
      if (e6) throw new Error(e6.message);
      duolingoEntries = duo || [];
      renderDuolingoLog();
    } catch (duoErr) {
      console.warn('duolingo_log table not ready yet:', duoErr.message);
    }

    // Fetch Duo Words
    try {
      const { data: dw, error: ew } = await sbClient.from('duo_words').select('*').order('created_at', { ascending: false });
      if (ew) throw new Error(ew.message);
      duoWords = dw || [];
      renderDuoWords();
    } catch (dwErr) {
      console.warn('duo_words table not ready yet:', dwErr.message);
    }

    // Fetch Duo Sentences
    try {
      const { data: ds, error: es } = await sbClient.from('duo_sentences').select('*').order('created_at', { ascending: false });
      if (es) throw new Error(es.message);
      duoSentences = ds || [];
      renderDuoSentences();
    } catch (dsErr) {
      console.warn('duo_sentences table not ready yet:', dsErr.message);
    }

    // Load next steps (isolated — won't crash main fetch)
    try {
      await loadNextSteps();
      refreshDashboardStrips();
    } catch (nsErr) {
      console.warn('next_steps load error:', nsErr.message);
    }

    // SUCCESS! Make the dot green and blink
    if (dot) dot.className = 'status-dot connected';
    if (text) text.textContent = 'Connected to Supabase';

  } catch (error) {
    console.error("Critical Fetch Error:", error);
    
    // FAILED! Make the dot red
    if (dot) dot.className = 'status-dot offline';
    if (text) text.textContent = 'Supabase Connection Failed';
  }
}


