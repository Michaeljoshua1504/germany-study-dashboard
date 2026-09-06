// ═══════════════ 1. SUPABASE SETUP & LOCAL CACHE ═══════════════

const SUPABASE_URL = 'https://epndekpwxngjozytlcmy.supabase.co'; // <-- PASTE YOUR URL HERE
const SUPABASE_ANON_KEY = 'sb_publishable_1RHubw6OVdqUAS_XAcKnpg_po3SzAj5'; // <-- PASTE YOUR ANON KEY HERE

let sbClient = null;
try {
  if (!window.supabase) throw new Error("Supabase library is missing. Did you add the script tag to index.html?");
  // Only create the client if the URL looks like a real URL to prevent crashing
  if (SUPABASE_URL.startsWith('http')) {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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


// ═══════════════ 3. PIPELINE & STATUS LOGIC ═══════════════
const STAGE_ORDER = ['not_started','submitted','interview','decision','accepted','visa','enrolled'];
const STAGE_LABELS = { not_started:'Not Started', submitted:'Submitted', interview:'Interview', decision:'Decision', accepted:'Accepted 🎉', rejected:'Rejected', visa:'Visa Process', enrolled:'Enrolled 🎓' };

function getStage(key) {
  return pipelineData[key]?.stage || 'not_started';
}

function updatePipelineDB(key, extraFields = {}) {
  const payload = { uni_key: key, ...pipelineData[key], ...extraFields };
  pipelineData[key] = payload; // Update local immediately
  
  if (sbClient) {
    sbClient.from('admission_pipeline').upsert(payload).then(({error}) => {
      if (error) console.error("Failed to save pipeline to DB:", error.message);
    });
  }
}

function markSubmitted(key) {
  updatePipelineDB(key, { stage: 'submitted', submitted_on: new Date().toISOString() });
  applySubmittedState(); refreshPipelineUI();
}

function undoSubmitted(key) {
  delete pipelineData[key];
  if (sbClient) {
    sbClient.from('admission_pipeline').delete().eq('uni_key', key).then();
  }
  applySubmittedState(); refreshPipelineUI();
}

function moveToInterview(key) { updatePipelineDB(key, { stage: 'interview' }); refreshPipelineUI(); }
function moveToDecision(key) { updatePipelineDB(key, { stage: 'decision' }); refreshPipelineUI(); }
function setDecision(key, result) {
  const isAccepted = result === 'accepted';
  updatePipelineDB(key, { stage: isAccepted ? 'accepted' : 'rejected', offer_type: isAccepted ? 'unconditional' : null });
  refreshPipelineUI();
}
function startVisaProcess(key) { updatePipelineDB(key, { stage: 'visa' }); refreshPipelineUI(); }
function markEnrolled(key) { updatePipelineDB(key, { stage: 'enrolled' }); refreshPipelineUI(); }

function undoStage(key) {
  const cur = getStage(key);
  if (cur === 'rejected') {
    updatePipelineDB(key, { stage: 'decision' });
  } else {
    const idx = STAGE_ORDER.indexOf(cur);
    if (idx <= 1) { undoSubmitted(key); return; } 
    else { updatePipelineDB(key, { stage: STAGE_ORDER[idx - 1] }); }
  }
  refreshPipelineUI();
}

function setOfferField(key, field, value) {
  updatePipelineDB(key, { [field]: value });
  renderAccepted();
}

// ─── UI renderers for Pipeline ───
function refreshPipelineUI() { renderDashboard(); renderPipeline(); renderRejected(); renderAccepted(); renderHofProfile(); updateSubmittedBadge(); updateAllDocToggleLabels(); }

function applySubmittedState() {
  Object.keys(UNI_META).forEach(key => {
    const card = document.getElementById('deadline-card-' + key);
    const submitBtn = document.getElementById('submit-btn-' + key);
    const undoBtn = document.getElementById('undo-btn-' + key);
    if (!card) return;
    
    if (pipelineData[key] && pipelineData[key].stage !== 'not_started') {
      card.style.display = 'none';
      if (submitBtn) { submitBtn.textContent = '✅ Submitted'; submitBtn.classList.add('submitted-state'); }
      if (undoBtn) undoBtn.style.display = 'inline-flex';
    } else {
      card.style.display = '';
      if (submitBtn) { submitBtn.textContent = '✅ Mark as Submitted'; submitBtn.classList.remove('submitted-state'); }
      if (undoBtn) undoBtn.style.display = 'none';
    }
  });
}

function renderPipeline() {
  // Non-Hof in-progress unis no longer shown in main pipeline — archived
  const section = document.getElementById('inprogress-section');
  if (section) section.style.display = 'none';
  updateAppsEmptyState();
}

function renderRejected() {
  // Rejected section hidden — all non-Hof unis moved to archive panel in renderArchive()
  const section = document.getElementById('rejected-section');
  if (section) section.style.display = 'none';
}

function renderArchive() {
  const panel = document.getElementById('archive-panel');
  if (!panel) return;
  const outcomeColor = { 'Rejected':'#a01c1c', 'Not applied':'#888' };
  const outcomeBg    = { 'Rejected':'#fde8e8', 'Not applied':'#f0eee8' };
  panel.innerHTML = `
    <div style="margin-top:14px;border:1px solid #e0ded6;border-radius:10px;overflow:hidden;background:#fff;">
      <div style="padding:10px 16px;background:#f9f8f5;border-bottom:1px solid #e0ded6;font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.05em;">
        Past Applications — archived
      </div>
      ${ARCHIVED_UNIS.map(u => `
        <div style="display:flex;align-items:center;padding:10px 16px;border-bottom:1px solid #f5f3ee;gap:12px;">
          <div style="flex:1;">
            <div style="font-size:12.5px;font-weight:600;color:#14213c;">${u.name}</div>
            <div style="font-size:11px;color:#888;">${u.program}</div>
          </div>
          <span style="font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:10px;background:${outcomeBg[u.outcome]};color:${outcomeColor[u.outcome]};white-space:nowrap;">${u.outcome}</span>
        </div>`).join('')}
    </div>`;
}

function buildPipelineCard(key) {
  const m = UNI_META[key];
  const stage = getStage(key);
  const curForStepper = stage === 'rejected' ? 'decision' : stage;
  const curIdx = STAGE_ORDER.indexOf(curForStepper);

  const stepperHtml = STAGE_ORDER.map((s, i) => {
    let cls = 'stage-step';
    if (stage === 'rejected' && s === 'decision') cls += ' rejected-step';
    else if (i < curIdx) cls += ' done';
    else if (i === curIdx) cls += ' current';
    return `<span class="${cls}">${STAGE_LABELS[s]}</span>`;
  }).join('');

  let actions = '';
  if (stage === 'submitted') actions = `<button class="pipeline-btn primary" onclick="moveToInterview('${key}')">📞 Interview Scheduled</button><button class="pipeline-btn ghost" onclick="moveToDecision('${key}')">📨 Skip to Decision</button>`;
  else if (stage === 'interview') actions = `<button class="pipeline-btn primary" onclick="moveToDecision('${key}')">📨 Decision Received</button>`;
  else if (stage === 'decision') actions = `<button class="pipeline-btn accept" onclick="setDecision('${key}','accepted')">✅ Accepted</button><button class="pipeline-btn reject" onclick="setDecision('${key}','rejected')">❌ Rejected</button>`;
  else if (stage === 'rejected') actions = `<span style="font-size:11px;color:#a01c1c;font-weight:700;">This one said no — onward to the next.</span>`;

  return `
  <div class="card" id="pipeline-card-${key}">
    <div class="card-header">
      <div class="card-title">${m.title}</div>
      <div class="card-sub">${m.sub}</div>
      <div class="badges"><span class="badge ${m.fitClass}">${m.fit}</span></div>
    </div>
    <div class="card-body">
      <div class="stage-stepper">${stepperHtml}</div>
      <div class="pipeline-actions">${actions}</div>
      <div style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:8px;display:flex;justify-content:space-between;align-items:center;">
        <button class="docs-toggle-btn" onclick="toggleDocsPanel('${key}')">📄 Documents <span id="docs-pct-${key}"></span></button>
        <button class="undo-btn" style="display:inline-flex;margin:0;" onclick="undoStage('${key}')">↩ Undo last step</button>
      </div>
      <div class="docs-inline-panel" id="docs-panel-${key}" style="display:none;"></div>
    </div>
  </div>`;
}

function updateSubmittedBadge() {
  const count = Object.keys(UNI_META).filter(k => getStage(k) !== 'not_started').length;
  const badge = document.getElementById('submitted-count-badge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline'; }
  else { badge.style.display = 'none'; }
}

function updateAcceptedBadge() {
  const count = Object.keys(UNI_META).filter(k => ['accepted','visa','enrolled'].includes(getStage(k))).length;
  const badge = document.getElementById('accepted-count-badge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline'; }
  else { badge.style.display = 'none'; }
}

function renderAccepted() {
  const acceptedKeys = Object.keys(UNI_META).filter(k => ['accepted','visa','enrolled'].includes(getStage(k)));
  const grid = document.getElementById('accepted-cards-grid');
  const section = document.getElementById('accepted-section');
  if (!grid) return;

  if (acceptedKeys.length === 0) {
    grid.innerHTML = '';
    updateAppsEmptyState();
    return;
  }

  grid.innerHTML = acceptedKeys.map(key => {
    const m = UNI_META[key];
    const stage = getStage(key);
    const extra = pipelineData[key] || {};
    const offerType = extra.offer_type || 'unconditional';
    const acceptBy = extra.accept_by || m.secureDeadline || '';

    let timeLeft = '';
    if (acceptBy) {
      const d = daysLeft(acceptBy);
      timeLeft = d < 0 ? '<span class="dash-pill closed">Past due</span>' : d <= 7 ? `<span class="dash-pill urgent">${d}d left to accept</span>` : d <= 21 ? `<span class="dash-pill soon">${d}d left to accept</span>` : `<span class="dash-pill ok">${d}d left to accept</span>`;
    }

    let nextBtn = '';
    if (stage === 'accepted') nextBtn = `<button class="pipeline-btn primary" onclick="startVisaProcess('${key}')">🛫 Start Visa Process</button>`;
    else if (stage === 'visa') nextBtn = `<button class="pipeline-btn primary" onclick="markEnrolled('${key}')">🎉 Mark Enrolled</button>`;
    else nextBtn = `<span style="font-size:11px;color:#1a6b3c;font-weight:700;">🎓 Enrolled — congratulations!</span>`;

    return `
    <div class="card accepted-card" id="accepted-card-${key}">
      <div class="card-header">
        <div class="card-title">${m.title}</div>
        <div class="card-sub">${m.sub}</div>
        <div class="badges"><span class="badge green">${STAGE_LABELS[stage]}</span> ${timeLeft}</div>
      </div>
      <div class="card-body">
        <div class="offer-fields">
          <div class="offer-field">
            <label>Offer type</label>
            <select onchange="setOfferField('${key}','offer_type',this.value)">
              <option value="unconditional" ${offerType === 'unconditional' ? 'selected' : ''}>Unconditional</option>
              <option value="conditional" ${offerType === 'conditional' ? 'selected' : ''}>Conditional</option>
            </select>
          </div>
          <div class="offer-field">
            <label>Accept-by date</label>
            <input type="date" value="${acceptBy}" onchange="setOfferField('${key}','accept_by',this.value)">
          </div>
        </div>
        ${buildSecureSeatHtml(key)}
        <div class="pipeline-actions">${nextBtn}</div>
        <div style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:8px;">
          <button class="docs-toggle-btn" onclick="toggleDocsPanel('${key}')">📄 Documents <span id="docs-pct-${key}"></span></button>
        </div>
        <div class="docs-inline-panel" id="docs-panel-${key}" style="display:none;"></div>
      </div>
    </div>`;
  }).join('');

  restoreChecks();
  updateAppsEmptyState();
}

function updateAppsEmptyState() {
  const empty = document.getElementById('apps-empty');
  if (!empty) return;
  const anyStarted = Object.keys(UNI_META).some(k => getStage(k) !== 'not_started');
  empty.style.display = anyStarted ? 'none' : 'block';
}

// ─── Inline document checklist (used inside pipeline & accepted cards) ───
function docCountFromCache(key) {
  const allDocs = SHARED_DOCS.concat(UNI_EXTRA_DOCS[key] || []);
  const total = allDocs.length;
  let checked = 0;
  for (let i = 0; i < total; i++) {
    if (checksData['doc-' + key + '-' + i]) checked++;
  }
  return { checked, total };
}

function updateAllDocToggleLabels() {
  Object.keys(UNI_META).forEach(key => {
    const toggleLabel = document.getElementById('docs-pct-' + key);
    if (!toggleLabel) return;
    const { checked, total } = docCountFromCache(key);
    toggleLabel.textContent = `(${checked}/${total})`;
  });
}

function toggleDocsPanel(key) {
  const panel = document.getElementById('docs-panel-' + key);
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (isOpen) {
    panel.style.display = 'none';
  } else {
    panel.innerHTML = buildDocsPanelHtml(key);
    panel.style.display = 'block';
    restoreChecks();
  }
}

function buildSecureSeatHtml(key) {
  const m = UNI_META[key];
  const steps = m.secureSteps || [];
  const deadline = m.secureDeadline;

  if (steps.length === 0) {
    return `<div class="note-box" style="margin-top:10px;font-size:12px;">📋 Enrollment confirmation steps will appear here once you receive the official admission letter for this university.</div>`;
  }

  let deadlineHtml = '';
  if (deadline) {
    const d = daysLeft(deadline);
    const cls = d < 0 ? 'closed' : d <= 14 ? 'urgent' : d <= 30 ? 'soon' : 'ok';
    const label = d < 0 ? 'Deadline passed' : d === 0 ? '⚠️ TODAY is the deadline' : `${d} days left to confirm`;
    deadlineHtml = `<span class="dash-pill ${cls}">${label}</span>`;
  }

  const items = steps.map((step, i) => {
    const id = 'secure-' + key + '-' + i;
    return `<div class="checklist-item"><input type="checkbox" class="persist-check" id="${id}" onchange="saveCheck(this)"><label for="${id}">${step}</label></div>`;
  }).join('');

  return `
    <div class="secure-seat-block" style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
        <strong style="font-size:12px;">🔐 Secure Your Seat</strong> ${deadlineHtml}
      </div>
      ${items}
    </div>
  `;
}

function buildDocsPanelHtml(key) {
  const allDocs = SHARED_DOCS.concat(UNI_EXTRA_DOCS[key] || []);
  const items = allDocs.map((doc, i) => {
    const id = 'doc-' + key + '-' + i;
    return `<div class="checklist-item"><input type="checkbox" class="persist-check" id="${id}" onchange="saveCheck(this)"><label for="${id}">${doc}</label></div>`;
  }).join('');
  return `
    <div class="progress-row"><div class="progress-track"><div class="progress-fill" id="docprog-fill-${key}" style="width:0%;"></div></div><div class="progress-pct" id="docprog-pct-${key}">0%</div></div>
    ${items}
  `;
}


// ═══════════════ 4. CHECKLIST CLOUD SYNC ═══════════════
function saveCheck(el) {
  checksData[el.id] = el.checked; // Local update
  
  if (sbClient) {
    sbClient.from('admission_checklists')
      .upsert({ check_id: el.id, is_checked: el.checked })
      .then(({error}) => {
         if (error) console.error("Failed to save checkbox to DB:", error.message);
      });
  }
  
  const item = el.closest('.checklist-item');
  if (item) item.classList.toggle('checked', el.checked);
  updateDocProgress(); updateVisaProgress();
}

function restoreChecks() {
  document.querySelectorAll('.persist-check').forEach(el => {
    if (Object.prototype.hasOwnProperty.call(checksData, el.id)) {
      el.checked = !!checksData[el.id];
    }
    const item = el.closest('.checklist-item');
    if (item) item.classList.toggle('checked', el.checked);
  });
  updateDocProgress(); updateVisaProgress();
}

function updateDocProgress() {
  Object.keys(UNI_META).forEach(key => {
    const panel = document.getElementById('docs-panel-' + key);
    const toggleLabel = document.getElementById('docs-pct-' + key);
    if (!panel) return;
    const boxes = panel.querySelectorAll('input[type="checkbox"]');
    const total = boxes.length;
    if (!total) { if (toggleLabel) toggleLabel.textContent = ''; return; }
    const checked = panel.querySelectorAll('input[type="checkbox"]:checked').length;
    const pct = Math.round((checked / total) * 100);
    const fill = document.getElementById('docprog-fill-' + key);
    const pctEl = document.getElementById('docprog-pct-' + key);
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (toggleLabel) toggleLabel.textContent = `(${checked}/${total})`;
  });
}

function updateVisaProgress() {
  const boxes = document.querySelectorAll('#tab-visa input[type="checkbox"]');
  if (!boxes.length) return;
  const total = boxes.length;
  const checked = document.querySelectorAll('#tab-visa input[type="checkbox"]:checked').length;
  const pct = Math.round((checked / total) * 100);
  const fill = document.getElementById('visa-progress-fill');
  const pctEl = document.getElementById('visa-progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

function uniShortName(key) { return UNI_META[key].title.split(' — ')[0].replace(' University of Applied Sciences', '').replace(' University of Technology', '').replace('University of ', ''); }

function renderDocChecklist() {
  const grid = document.getElementById('doc-grid');
  if (!grid) return;
  grid.innerHTML = Object.keys(UNI_META).map(key => {
    const m = UNI_META[key];
    const allDocs = SHARED_DOCS.concat(UNI_EXTRA_DOCS[key] || []);
    const items = allDocs.map((doc, i) => {
      const id = 'doc-' + key + '-' + i;
      return `<div class="checklist-item"><input type="checkbox" class="persist-check" id="${id}" onchange="saveCheck(this)"><label for="${id}">${doc}</label></div>`;
    }).join('');
    return `
    <div class="doc-card" data-doc-group="${key}">
      <h4>${uniShortName(key)}</h4>
      <div class="doc-sub">${m.sub}</div>
      <div class="progress-row"><div class="progress-track"><div class="progress-fill" id="docprog-fill-${key}" style="width:0%;"></div></div><div class="progress-pct" id="docprog-pct-${key}">0%</div></div>
      ${items}
    </div>`;
  }).join('');
}


// ═══════════════ 5. NOTES CLOUD SYNC ═══════════════
let noteTimeout; // Debounce so we don't spam the database on every keystroke

function saveNote(el) {
  notesData[el.id] = el.value; // Local update
  
  // UI indicator
  const indicator = document.getElementById('saved-' + el.id);
  if (indicator) {
    indicator.classList.add('show');
    clearTimeout(indicator._t);
    indicator._t = setTimeout(() => indicator.classList.remove('show'), 1500);
  }
  
  // Cloud sync (waits 1 second after you stop typing to save)
  clearTimeout(noteTimeout);
  noteTimeout = setTimeout(() => {
    if (sbClient) {
    sbClient.from('admission_notes')
        .upsert({ uni_key: el.id, note_text: el.value })
        .then(({error}) => {
           if(error) console.error("Failed to save note to DB:", error.message);
        });
    }
  }, 1000);
}

function restoreNotes() {
  document.querySelectorAll('.persist-note').forEach(el => {
    if (notesData[el.id] !== undefined) el.value = notesData[el.id];
  });
}

function renderNotesGrid() {
  const grid = document.getElementById('notes-grid');
  if (!grid) return;
  grid.innerHTML = Object.keys(UNI_META).map(key => {
    const id = 'note-' + key;
    return `
    <div class="notes-card">
      <h4>${uniShortName(key)}</h4>
      <textarea class="persist-note" id="${id}" placeholder="Notes, contacts, interview prep, follow-ups…" oninput="saveNote(this)"></textarea>
      <div class="notes-saved" id="saved-${id}">✓ Saved to Cloud</div>
    </div>`;
  }).join('');
}


// ═══════════════ 6. TABS & UI NAVIGATION (BULLETPROOFED) ═══════════════

const MAIN_TAB_DEFAULTS = {
  admission: 'dashboard',
  german: 'learn',
  housing: 'housing-rooms'
};

function showMainTab(mainTabId, el) {
  document.querySelectorAll('.topbar-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.sub-nav').forEach(nav => nav.style.display = 'none');
  const targetNav = document.getElementById('nav-' + mainTabId);
  if (targetNav) targetNav.style.display = 'flex';

  // Auto-activate the first sub-tab of this main tab, so content always matches the visible nav
  const defaultSubTab = MAIN_TAB_DEFAULTS[mainTabId];
  if (defaultSubTab && targetNav) {
    const firstTabEl = targetNav.querySelector('.tab');
    showTab(defaultSubTab, firstTabEl);
  }
}

function showTab(name, el) {
  const targetSection = document.getElementById('tab-' + name);
  if (!targetSection) {
    console.error("Tab section not found:", name);
    return;
  }
  
  // Remove active state from all sections and tabs
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  
  // Apply active state to the specific section and clicked tab
  targetSection.classList.add('active');
  if (el) el.classList.add('active');
}


// ═══════════════ 7. UTILITIES & THEME ═══════════════

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  if (next === 'dark') html.setAttribute('data-theme', 'dark'); else html.removeAttribute('data-theme');
  localStorage.setItem('gsd_theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem('gsd_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = '☀️';
  }
}

function initCalculator() {
  const sel = document.getElementById('calc-uni');
  if (!sel) return;
  sel.innerHTML = Object.keys(UNI_META).map(k => `<option value="${k}">${uniShortName(k)}</option>`).join('');
  sel.value = 'hof';
  document.getElementById('calc-sems').value = UNI_META.hof.sems;
  document.getElementById('calc-living').value = UNI_META.hof.livingNum;
  sel.addEventListener('change', () => {
    const m = UNI_META[sel.value];
    document.getElementById('calc-sems').value = m.sems;
    document.getElementById('calc-living').value = m.livingNum;
    runCalculator();
  });
  runCalculator();
}

function runCalculator() {
  const sel = document.getElementById('calc-uni');
  if (!sel) return;
  const m = UNI_META[sel.value];
  if (!m) return;
  const sems = parseFloat(document.getElementById('calc-sems').value) || m.sems;
  const livingMo = parseFloat(document.getElementById('calc-living').value) || m.livingNum;
  const fx = parseFloat(document.getElementById('calc-fx').value) || 110;
  const months = sems * 6;
  const tuitionTotal = m.tuitionNum * sems;
  const semFeeTotal = m.semFeeNum * sems;
  const livingTotal = livingMo * months;
  const insuranceTotal = 120 * months;
  const visaFeeEur = 75;
  const vfsChargeEur = 1700 / fx;
  const bankFeeEur = 70;
  const flightEur = 550;
  const oneOffEur = visaFeeEur + vfsChargeEur + bankFeeEur + flightEur;
  const grandTotal = tuitionTotal + semFeeTotal + livingTotal + insuranceTotal + 11904 + oneOffEur;
  const grandTotalInr = grandTotal * fx;
  document.getElementById('calc-tuition').textContent = '€' + tuitionTotal.toLocaleString();
  document.getElementById('calc-semfee').textContent = '€' + semFeeTotal.toLocaleString();
  document.getElementById('calc-living-total').textContent = '€' + livingTotal.toLocaleString();
  document.getElementById('calc-insurance').textContent = '€' + insuranceTotal.toLocaleString();
  document.getElementById('calc-oneoff').textContent = '€' + Math.round(oneOffEur).toLocaleString();
  document.getElementById('calc-grand-total').textContent = '€' + Math.round(grandTotal).toLocaleString();
  document.getElementById('calc-grand-total-inr').textContent = '₹' + Math.round(grandTotalInr).toLocaleString('en-IN');
}

function daysLeft(deadlineStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const deadline = new Date(deadlineStr + 'T00:00:00');
  return Math.round((deadline - today) / 86400000);
}
function badgeClass(d) { if (d < 0) return 'gray'; if (d <= 14) return 'red'; if (d <= 30) return 'amber'; return 'blue'; }
function statusLabel(d) { if (d < 0) return ['closed', '❌ Closed']; if (d === 0) return ['open', '🔴 TODAY']; return ['open', '✅ Open']; }
function daysText(d) {
  if (d < 0) return 'Deadline has passed';
  if (d === 0) return '⚠️ TODAY is the last day — apply now!';
  if (d === 1) return '⚠️ 1 day left — apply TODAY';
  return d + ' days left';
}

function applyCountdown(idSuffix, deadlineStr) {
  const d = daysLeft(deadlineStr);
  const badgeEl = document.getElementById('badge-' + idSuffix);
  const statusEl = document.getElementById('status-' + idSuffix);
  const daysEl = document.getElementById('days-' + idSuffix);
  if (!badgeEl) return;
  const [statusClass, statusText] = statusLabel(d);
  const urgency = d < 0 ? '' : d <= 14 ? '🔥 ' : '';
  const daysDisplay = d < 0 ? 'Closed' : d + ' day' + (d === 1 ? '' : 's') + ' left';
  badgeEl.className = 'badge ' + badgeClass(d);
  badgeEl.textContent = urgency + daysDisplay;
  statusEl.className = 'deadline-alert ' + statusClass;
  statusEl.textContent = statusText;
  daysEl.className = 'days-live ' + (d < 0 ? 'closed' : d <= 7 ? 'urgent' : d <= 30 ? 'soon' : 'ok');
  daysEl.textContent = daysText(d);
}

const deadlines = {
  hof: '2026-05-31', fulda: '2026-05-31', koblenz: '2026-06-15',
  chemnitz: '2026-07-15', rheinmain: '2026-07-15', frankfurt: '2026-10-15', kiel: '2026-09-15',
};

function updateAll() {
  for (const [key, date] of Object.entries(deadlines)) applyCountdown(key, date);
  const today = new Date();
  const todayEl = document.getElementById('today-display');
  if (todayEl) todayEl.textContent = 'Today: ' + today.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  renderDashboard();
  renderHofProfile();
}

let currentFitFilter = 'all';
function filterRows(fit, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentFitFilter = fit;
  applyOverviewFilters();
}

function applyOverviewFilters() {
  const searchEl = document.getElementById('overview-search');
  const q = (searchEl ? searchEl.value : '').toLowerCase().trim();
  document.querySelectorAll('#tab-overview tbody tr[data-fit]').forEach(r => {
    const fitMatch = currentFitFilter === 'all' || r.dataset.fit === currentFitFilter;
    const textMatch = !q || r.textContent.toLowerCase().includes(q);
    r.style.display = (fitMatch && textMatch) ? '' : 'none';
  });
}

let sortState = {};
function sortOverview(key) {
  const tbody = document.querySelector('#tab-overview tbody');
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr[data-fit]'));
  const dir = sortState[key] === 'asc' ? 'desc' : 'asc';
  sortState = {}; sortState[key] = dir;
  rows.sort((a, b) => {
    let av, bv;
    if (key === 'name') {
      av = a.cells[0].textContent.trim().toLowerCase();
      bv = b.cells[0].textContent.trim().toLowerCase();
    } else {
      const ad = JSON.parse(a.dataset.sort || '{}');
      const bd = JSON.parse(b.dataset.sort || '{}');
      av = ad[key] !== undefined ? ad[key] : 0;
      bv = bd[key] !== undefined ? bd[key] : 0;
    }
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
  rows.forEach(r => tbody.appendChild(r));
  document.querySelectorAll('.sort-ind').forEach(el => el.textContent = '');
  const ind = document.getElementById('sort-ind-' + key);
  if (ind) ind.textContent = dir === 'asc' ? '▲' : '▼';
}

// ═══════════════ 8. DASHBOARD RENDERER ═══════════════

// Archived (non-Hof) universities with their outcomes
const ARCHIVED_UNIS = [
  { key: 'fulda',     name: 'Fulda UAS',      program: 'MSc Global Software Development',  outcome: 'Rejected' },
  { key: 'koblenz',   name: 'Koblenz',         program: 'MSc Web and Data Science',          outcome: 'Rejected' },
  { key: 'chemnitz',  name: 'TU Chemnitz',     program: 'MSc Web Engineering',               outcome: 'Rejected' },
  { key: 'rheinmain', name: 'RheinMain UAS',   program: 'MEng AI & Advanced IT',             outcome: 'Rejected' },
  { key: 'siegen',    name: 'Siegen',           program: 'MSc Computer Science',              outcome: 'Not applied' },
  { key: 'frankfurt', name: 'Frankfurt UAS',   program: 'MSc High Integrity Systems',        outcome: 'Not applied' },
  { key: 'kiel',      name: 'Kiel UAS',        program: 'MSc Computer Science',              outcome: 'Not applied' },
];

let archiveVisible = false;
function toggleArchive() {
  archiveVisible = !archiveVisible;
  const panel = document.getElementById('archive-panel');
  const btn = document.getElementById('archive-btn');
  if (panel) panel.style.display = archiveVisible ? 'block' : 'none';
  if (btn) btn.textContent = archiveVisible ? '📦 Hide Past Applications' : '📦 Past Applications (7)';
}

function renderDashboard() {
  const colorMap = { red:'#E24B4A', amber:'#BA7517', blue:'#378ADD', green:'#1D9E75' };
  const chipBg   = { red:'#FCEBEB', amber:'#FAEEDA', blue:'#E6F1FB', green:'#EAF3DE' };
  const chipTx   = { red:'#A32D2D', amber:'#854F0B', blue:'#185FA5', green:'#3B6D11' };

  // ── STAT STRIP: reframe around Hof enrollment ──
  const hofStage = getStage('hof');
  const visaBoxes = document.querySelectorAll('#tab-visa input[type="checkbox"]');
  const visaTotal = visaBoxes.length;
  const visaDone  = document.querySelectorAll('#tab-visa input[type="checkbox"]:checked').length;
  const visaPct   = visaTotal ? Math.round((visaDone / visaTotal) * 100) : 0;
  const gerCompleted = germanCompletedCount();

  const ss = document.getElementById('stat-submitted');
  const sa = document.getElementById('stat-accepted');
  const sd = document.getElementById('stat-deadlines');
  if (ss) { ss.textContent = '🎓 Enrolled'; ss.style.fontSize = '13px'; }
  if (sa) sa.textContent = visaPct + '%';
  if (sd) sd.textContent = gerCompleted + '/31';

  // Update stat labels
  const labels = document.querySelectorAll('.dash-stat-label');
  if (labels[0]) labels[0].textContent = 'Hof University';
  if (labels[1]) labels[1].textContent = 'Visa Progress';
  if (labels[2]) labels[2].textContent = 'German Days';

  // ── SECTION A: FOCUS STRIP — Hof post-enrollment next steps ──
  const focusEl = document.getElementById('focus-strip');
  if (focusEl) {
    const items = [];

    // Visa process
    if (!['visa','enrolled'].includes(hofStage)) {
      items.push({ urgency:'red', text:'<strong>Start visa application</strong> — register on digital.diplo.de/visa for digital pre-screening', chip:'Next up', chipClass:'red' });
    }

    // Blocked account
    items.push({ urgency:'amber', text:'<strong>Blocked account (Expatrio)</strong> — transfer €12,131 via Zenith Forex (Vaishnavi) to HSBC. Fund release request already raised on Avanse portal.', chip:'In progress', chipClass:'amber' });

    // TK health insurance
    items.push({ urgency:'amber', text:'<strong>TK health insurance</strong> — register with TK before arrival. TK must notify Hof electronically — required before Zugangsdaten are issued.', chip:'Pending', chipClass:'amber' });

    // Housing
    items.push({ urgency:'blue', text:'<strong>Housing offer from Hof</strong> — payment confirmation sent 28 Aug. Awaiting offer for Am Saalepark / Am Eichelberg dormitory.', chip:'Waiting', chipClass:'blue' });

    // Expatrio scholarship
    items.push({ urgency:'blue', text:'<strong>Expatrio Scholarship</strong> — submit video by <strong>30 Sep 2026</strong>. Top prize €15,000. Free to apply.', chip:'30 Sep', chipClass:'blue' });

    // German
    if (gerCompleted < 31) {
      const next = Math.min(gerCompleted + 1, 31);
      items.push({ urgency:'blue', text:`<strong>German Day ${next}</strong> — continue your A1 curriculum (${gerCompleted}/31 days done)`, chip:'In progress', chipClass:'blue' });
    }

    focusEl.innerHTML = items.map(item => `
      <div class="focus-item">
        <div class="focus-dot" style="background:${colorMap[item.urgency]};"></div>
        <div class="focus-text">${item.text}</div>
        <div class="focus-chip" style="background:${chipBg[item.chipClass]};color:${chipTx[item.chipClass]};">${item.chip}</div>
      </div>`).join('');
  }

  // ── SECTION B LEFT: Hof enrolled card ──
  const subList = document.getElementById('dash-submitted-list');
  if (subList) {
    subList.innerHTML = `
      <div style="background:linear-gradient(135deg,#e6f4ec 0%,#f0f9f4 100%);border:1.5px solid #a8d8bc;border-radius:10px;padding:14px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div style="font-size:14px;font-weight:700;color:#14213c;">🏭 Hof University</div>
          <span class="badge green" style="font-size:11px;padding:3px 10px;">🎓 Enrolled</span>
        </div>
        <div style="font-size:11.5px;color:#555;margin-bottom:10px;">MEng Software Engineering for Industrial Applications · WS 2026/27</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11.5px;">
          <div><span style="color:#888;">Matrikelnummer</span><br><strong>00417126</strong></div>
          <div><span style="color:#888;">Semester starts</span><br><strong>October 1, 2026</strong></div>
          <div><span style="color:#888;">Tuition paid</span><br><strong>€3,448.22 ✅</strong></div>
          <div><span style="color:#888;">Housing</span><br><strong>Awaiting offer</strong></div>
        </div>
        <div style="margin-top:10px;padding-top:8px;border-top:1px solid #c8e6d4;font-size:11px;color:#1a6b3c;font-weight:600;">
          📬 Zugangsdaten expected before Oct 1 — check email
        </div>
      </div>`;
  }

  // ── SECTION B RIGHT: German snapshot ──
  const words = germanWordCount();
  const pct = Math.round((gerCompleted / 31) * 100);
  const nextDay = Math.min(gerCompleted + 1, 31);
  const el_days  = document.getElementById('dash-ger-days');  if (el_days)  el_days.textContent  = gerCompleted + '/31';
  const el_words = document.getElementById('dash-ger-words'); if (el_words) el_words.textContent = words;
  const el_pct   = document.getElementById('dash-ger-pct');   if (el_pct)   el_pct.textContent   = pct + '%';
  const el_fill  = document.getElementById('dash-ger-fill');  if (el_fill)  el_fill.style.width  = Math.max(pct, 2) + '%';
  const el_next  = document.getElementById('dash-ger-next');  if (el_next)  el_next.textContent  = gerCompleted >= 31 ? 'Complete! 🎉' : `Day ${nextDay}`;

  // ── SECTION C: WHAT'S NEXT — Hof only ──
  const nextTable = document.getElementById('dash-next-table');
  if (nextTable) {
    const rows = [
      { urgency:'red',   action:'Complete visa application — register at digital.diplo.de/visa',        dl:'ASAP' },
      { urgency:'amber', action:'Transfer €12,131 to Expatrio blocked account via Zenith Forex',        dl:'Before visa appt' },
      { urgency:'amber', action:'Register with TK health insurance — they notify Hof electronically',   dl:'Before Oct 1' },
      { urgency:'blue',  action:'Wait for Hof dormitory offer (payment confirmation sent 28 Aug)',       dl:'Pending' },
      { urgency:'blue',  action:'Submit Expatrio Scholarship video',                                     dl:'30 Sep 2026' },
      { urgency:'blue',  action:'Apply for Deutschlandstipendium at Hof after semester starts',         dl:'After Oct 1' },
    ];
    nextTable.innerHTML =
      `<div class="next-header"><span class="next-name" style="flex:2;">Next action</span><span class="next-dl">By when</span></div>` +
      rows.map(r => `
        <div class="next-row">
          <div class="next-dot" style="background:${colorMap[r.urgency]};flex-shrink:0;"></div>
          <div class="next-action" style="flex:2;">${r.action}</div>
          <div class="next-dl">${r.dl}</div>
        </div>`).join('');
  }
}

// ═══════════════ 8b. UNIVERSITIES TAB RENDERER ═══════════════

// ═══════════════ 8b. HOF PROFILE RENDERER ═══════════════

function renderHofProfile() {
  const col = document.getElementById('uni-profile-col');
  if (!col) return;

  const m = UNI_META['hof'];
  const d = admissionData['hof'];

  let eligRows = '<div class="adm-loading" style="padding:1rem 0;">⏳ Loading…</div>';
  if (d) {
    eligRows = `
      <div class="adm-row"><div class="adm-label">🎤 IELTS</div><div class="adm-val">${d.ielts_req} ${IELTS_PILL[d.ielts_status]||''}</div></div>
      <div class="adm-row"><div class="adm-label">🇩🇪 German</div><div class="adm-val">${d.german_req}</div></div>
      <div class="adm-row"><div class="adm-label">📝 GRE</div><div class="adm-val">${d.gre_req} ${GRE_PILL[d.gre_status]||''}</div></div>
      <div class="adm-row"><div class="adm-label">🎓 Min Grade</div><div class="adm-val">${d.min_grade}</div></div>
      <div class="adm-row"><div class="adm-label">💼 Internship</div><div class="adm-val">${d.internship}</div></div>
      <div class="adm-row adm-row-focus"><div class="adm-label">📚 Focus</div><div class="adm-val adm-focus-text">${d.program_focus}</div></div>
      ${d.special_req ? `<div class="adm-special"><span class="adm-special-label">📌 Note</span>${d.special_req}</div>` : ''}
    `;
  }

  col.innerHTML = `
    <div class="uni-profile-block">
      <div class="uni-profile-block-title">🎯 Eligibility</div>
      ${eligRows}
    </div>

    <div class="uni-profile-block">
      <div class="uni-profile-block-title">💶 Costs</div>
      <div class="adm-row"><div class="adm-label">Tuition</div><div class="adm-val">${m.tuition}/sem</div></div>
      <div class="adm-row"><div class="adm-label">Sem. Fee</div><div class="adm-val">€${m.semFeeNum}/sem</div></div>
      <div class="adm-row"><div class="adm-label">Living</div><div class="adm-val">€${m.livingNum}/mo</div></div>
      <div class="adm-row"><div class="adm-label">Housing</div><div class="adm-val">${m.housingCost}/mo</div></div>
      <div class="adm-row"><div class="adm-label">Insurance</div><div class="adm-val">${m.insurance}/mo</div></div>
      <div class="adm-special"><span class="adm-special-label">📌 Note</span>${m.eligNote}</div>
    </div>

    <div class="uni-profile-block">
      <div class="uni-profile-block-title">${m.cityEmoji} ${m.cityName}</div>
      <div class="adm-row"><div class="adm-label">Cost Level</div><div class="adm-val"><span class="pill ${m.costLevelClass}">${m.costLevel}</span></div></div>
      <div class="adm-row"><div class="adm-label">Housing</div><div class="adm-val"><span class="pill ${m.housingDifficultyClass}">${m.housingDifficulty}</span></div></div>
      <div class="adm-row"><div class="adm-label">Job Market</div><div class="adm-val">${m.jobMarket}</div></div>
      <div class="adm-row"><div class="adm-label">Transport</div><div class="adm-val">${m.transport}</div></div>
      <div class="adm-row"><div class="adm-label">Rent</div><div class="adm-val">${m.rent}</div></div>
      <div class="adm-row adm-row-focus"><div class="adm-label">Companies</div><div class="adm-val adm-focus-text">${m.companies}</div></div>
    </div>

    <div class="uni-profile-block" style="grid-column: 1 / -1;">
      <div class="uni-profile-block-title">📅 WS 2026/27 — Key Dates & Timeline</div>
      <div class="adm-row"><div class="adm-label">Orientation</div><div class="adm-val">Sep 24 – Oct 4, 2026</div></div>
      <div class="adm-row"><div class="adm-label">Introduction Days</div><div class="adm-val">Oct 1 + 2, 2026</div></div>
      <div class="adm-row"><div class="adm-label">Semester 1 Starts</div><div class="adm-val">Oct 1, 2026</div></div>
      <div class="adm-row"><div class="adm-label">Lectures Start</div><div class="adm-val">Oct 5, 2026</div></div>
      <div class="adm-row"><div class="adm-label">Semester 2</div><div class="adm-val">Mar 15, 2027</div></div>
      <div class="adm-row"><div class="adm-label">Semester 3</div><div class="adm-val">Oct 1, 2027</div></div>
      <div class="adm-row"><div class="adm-label">Semester 4</div><div class="adm-val">Mar 15, 2028</div></div>
      <div class="adm-special"><span class="adm-special-label">🖥️ Hybrid Mode</span>Hybrid teaching until Oct 31, 2026. From Nov 2 — on-campus only. If visa is delayed, you can start online from India. Attendance is mandatory in some modules — catch up on anything missed.</div>
      <div class="adm-special"><span class="adm-special-label">💰 Internship Income</span>Semesters 3 & 4 are the industry phase. Internships are usually paid ~€1,000/month — covers fees and part of living costs during year 2.</div>
    </div>

    <div style="grid-column: 1 / -1; display:flex;gap:8px;flex-wrap:wrap;">
      <a href="${m.link}" target="_blank" class="dash-apply-btn" style="font-size:12px;padding:7px 14px;">PRIMUSS Portal ↗</a>
      <a href="${m.programPage}" target="_blank" class="uni-secondary-btn" style="font-size:12px;padding:7px 14px;">Programme Page ↗</a>
    </div>
  `;
}



const UNI_ORDER = ['hof','chemnitz','fulda','rheinmain','koblenz','siegen','frankfurt','kiel'];

const IELTS_PILL = {
  match:  '<span class="pill amber">⚠️ Exact match</span>',
  above:  '<span class="pill green">✅ You exceed this</span>',
  verify: '<span class="pill red">🔍 Verify required</span>'
};
const GRE_PILL = {
  required:     '<span class="pill red">⚠️ Required</span>',
  not_required: '<span class="pill green">✅ Not required</span>'
};
const CHANCE_PILL = {
  high:   '<span class="adm-chance high">High ✅</span>',
  medium: '<span class="adm-chance medium">Medium ⚠️</span>',
  low:    '<span class="adm-chance low">Low ❌</span>'
};
const DIFF_PILL = {
  low:          '<span class="pill green">Low</span>',
  'low-medium': '<span class="pill amber">Low–Medium</span>',
  medium:       '<span class="pill amber">Medium</span>'
};

const FIT_BORDER = {
  hof:       'green',
  chemnitz:  'green',
  fulda:     'blue',
  rheinmain: 'blue',
  koblenz:   'blue',
  siegen:    'blue',
  frankfurt: 'blue',
  kiel:      'amber'
};

function renderAdmission() {
  const grid = document.getElementById('admission-grid');
  if (!grid) return;

  const keys = Object.keys(admissionData);
  if (keys.length === 0) {
    grid.innerHTML = '<div class="adm-loading">⏳ Loading admission data from database…</div>';
    return;
  }

  const sorted = UNI_ORDER.filter(k => admissionData[k])
    .concat(keys.filter(k => !UNI_ORDER.includes(k)));

  grid.innerHTML = sorted.map(key => {
    const d = admissionData[key];
    const meta = UNI_META[key] || {};
    const borderColor = FIT_BORDER[key] || 'blue';

    return `
    <div class="adm-card adm-border-${borderColor}">
      <div class="adm-card-header">
        <div class="adm-uni-name">${meta.title || key}</div>
        <div class="adm-uni-sub">${meta.sub || ''}</div>
        <div class="adm-footer-pills">
          ${DIFF_PILL[d.difficulty] || d.difficulty}
          ${CHANCE_PILL[d.your_chance] || d.your_chance}
        </div>
      </div>
      <div class="adm-card-body">
        <div class="adm-row">
          <div class="adm-label">🎤 IELTS</div>
          <div class="adm-val">${d.ielts_req} ${IELTS_PILL[d.ielts_status] || ''}</div>
        </div>
        <div class="adm-row">
          <div class="adm-label">🇩🇪 German</div>
          <div class="adm-val">${d.german_req}</div>
        </div>
        <div class="adm-row">
          <div class="adm-label">📝 GRE</div>
          <div class="adm-val">${d.gre_req} ${GRE_PILL[d.gre_status] || ''}</div>
        </div>
        <div class="adm-row">
          <div class="adm-label">🎓 Min Grade</div>
          <div class="adm-val">${d.min_grade}</div>
        </div>
        <div class="adm-row">
          <div class="adm-label">💼 Internship</div>
          <div class="adm-val">${d.internship}</div>
        </div>
        <div class="adm-row adm-row-focus">
          <div class="adm-label">📚 Program Focus</div>
          <div class="adm-val adm-focus-text">${d.program_focus}</div>
        </div>
        ${d.special_req ? `
        <div class="adm-special">
          <span class="adm-special-label">📌 Note</span>
          ${d.special_req}
        </div>` : ''}
      </div>
    </div>`;
  }).join('');
}

// ═══════════════ 10. GERMAN A1 CURRICULUM (1–31 July 2026) ═══════════════

let germanProgress = {}; // { [day]: { completed: bool, note_text: string } }

const GERMAN_WEEKS = [
  { num: 1, title: 'Phase 1 — Foundations', range: 'Days 1–7', dates: 'Jul 1–7' },
  { num: 2, title: 'Phase 2 — Your World', range: 'Days 8–14', dates: 'Jul 8–14' },
  { num: 3, title: 'Phase 3 — Out in the World', range: 'Days 15–21', dates: 'Jul 15–21' },
  { num: 4, title: 'Phase 4 — Getting Things Done', range: 'Days 22–31', dates: 'Jul 22–31' }
];

const GERMAN_DAYS = {
  1: { week:1, date:'1 Jul', topic:'Pronunciation & The German Alphabet', grammar:'German has 4 extra letters: ä, ö, ü (umlauts) and ß (eszett, sounds like "ss"). Every letter is pronounced — there are no silent letters like in English.',
    vocab:[['A, Ä','ah, eh','ah / air-ish'],['O, Ö','oh, ooh-eh','oh / "ur" sound'],['U, Ü','oo, ueh','oo / "ew" sound'],['ß (Eszett)','sharp s','ss'],['W','v sound','vee'],['V','f sound','fow'],['Z','ts sound','tset'],['J','y sound','yot']],
    practice:'Practice saying your name letter by letter in German pronunciation. Say "schön" (beautiful) and "schon" (already) — notice the ö difference.' },
  2: { week:1, date:'2 Jul', topic:'Greetings, Politeness & Introducing Yourself', grammar:'Personal pronoun "ich" (I) + verb "sein" (to be): ich bin = I am. German sentences are Subject + Verb, just like English at this stage. This day also introduces du vs Sie — the informal and formal ways to say "you".',
    vocab:[['Hallo','Hello','HAH-loh'],['Guten Morgen','Good morning','GOO-ten MOR-gen'],['Guten Tag','Good day / Hello','GOO-ten TAHK'],['Guten Abend','Good evening','GOO-ten AH-bent'],['Tschüss','Bye (informal)','chooss'],['Auf Wiedersehen','Goodbye (formal)','owf VEE-der-zayn'],['Ich bin...','I am...','ikh bin'],['Wie heißt du?','What is your name? (informal)','vee HYSST doo']],
    practice:'Write 2 sentences: greet someone, then introduce yourself. Example: "Guten Tag! Ich bin Michael."' },
  3: { week:1, date:'3 Jul', topic:'Numbers 0–20', grammar:'Numbers 13–19 are built by adding "-zehn" to the base number (drei+zehn = dreizehn = 13). This pattern repeats at every ten, so learning the base numbers unlocks the whole system.',
    vocab:[['null, eins, zwei','0, 1, 2','nool, eyenss, tsvy'],['drei, vier, fünf','3, 4, 5','dry, feer, fewnf'],['sechs, sieben, acht','6, 7, 8','zex, ZEE-ben, ahkt'],['neun, zehn','9, 10','noyn, tsayn'],['elf, zwölf','11, 12','elf, tsverlf'],['zwanzig','20','TSVAHN-tsikh']],
    practice:'Count from 0 to 20 out loud. Then write down your phone number in German digits.' },
  4: { week:1, date:'4 Jul', topic:'Nationality & Where You\'re From', grammar:'"Ich komme aus..." = I come from... Use "aus" (from) + country name. Most country names don\'t need "der/die/das" (the) in front — just say "aus Indien", "aus Deutschland".',
    vocab:[['Ich komme aus...','I come from...','ikh KOM-meh ows'],['Indien','India','IN-dee-en'],['Deutschland','Germany','DOYTCH-lahnt'],['Woher kommst du?','Where are you from?','vo-HAIR komst doo'],['Ich bin Inder.','I am Indian (male).','ikh bin IN-der'],['die Stadt','the city','dee shtaht'],['das Land','the country','dahss lahnt']],
    practice:'Write: "Ich komme aus Indien. Ich bin aus Bangalore." (I come from India. I am from Bangalore.)' },
  5: { week:1, date:'5 Jul', topic:'The Verb "sein" (to be) — Full Conjugation', grammar:'"Sein" is irregular and used constantly. ich bin / du bist / er-sie-es ist / wir sind / ihr seid / sie-Sie sind. Memorize this table — it\'s the single most useful verb in German.',
    vocab:[['ich bin','I am','ikh bin'],['du bist','you are (informal)','doo bisst'],['er/sie/es ist','he/she/it is','air/zee/ess isst'],['wir sind','we are','veer zint'],['ihr seid','you all are','eer zyte'],['sie/Sie sind','they/You(formal) are','zee zint']],
    practice:'Fill in: "___ bin müde" (I am tired), "Du ___ nett" (You are nice), "Wir ___ Studenten" (We are students).' },
  6: { week:1, date:'6 Jul', topic:'Basic Sentence Structure & First W-Questions', grammar:'German statements follow Subject-Verb-Object (S-V-O), same as English: "Ich bin Michael." (I am Michael.) For yes/no questions, the verb simply moves to the very front: "Bist du müde?" (Are you tired?). For W-questions, the question word comes first, then the verb: "Wie heißt du?" (What is your name?) — was (what), wer (who), wo (where) are your first three.',
    vocab:[['Was?','What?','vahss'],['Wer?','Who?','vair'],['Wo?','Where?','voh'],['Bist du...?','Are you...?','bisst doo'],['Kommst du...?','Are you coming...?','komst doo'],['Danke','Thank you','DAHN-keh'],['Bitte','Please / You\'re welcome','BIT-teh']],
    practice:'Turn 3 statements into yes/no questions by moving the verb to the front: "Du bist müde." → "Bist du müde?" Then write one W-question using "wo": "Wo wohnst du?" (Where do you live?)' },
  7: { week:1, date:'7 Jul', topic:'Phase 1 Review + Voice Test', grammar:'Review: sein conjugation, the alphabet & pronunciation, numbers 0–20, greetings & du/Sie, nationality, sentence structure & W-questions. No new grammar today — consolidate everything from Phase 1, then a live voice check covering all of it.',
    vocab:[['Wiederholung','Review','vee-der-HOH-loong'],['die Woche','the week','dee VOH-kheh'],['das Wort','the word','dahss vort'],['der Satz','the sentence','dair zahts'],['üben','to practice','EW-ben']],
    practice:'Self-test: introduce yourself fully out loud — name, nationality, city — using only what you learned this week. No notes allowed.' },

  8: { week:2, date:'8 Jul', topic:'Family Members', grammar:'German nouns have gender: der (masculine), die (feminine), das (neuter). Family words follow biological gender mostly: der Vater (father), die Mutter (mother). Memorize the article WITH the noun, not separately.',
    vocab:[['die Familie','the family','dee fah-MEE-lee-eh'],['der Vater','the father','dair FAH-ter'],['die Mutter','the mother','dee MOOT-ter'],['der Bruder','the brother','dair BROO-der'],['die Schwester','the sister','dee SHVESS-ter'],['die Eltern','the parents','dee EL-tern'],['das Kind','the child','dahss kint']],
    practice:'Write 3 sentences about your own family using "Mein Vater ist..." / "Meine Mutter ist..." (My father is.../My mother is...).' },
  9: { week:2, date:'9 Jul', topic:'The Verb "haben" (to have)', grammar:'"Haben" is the second essential irregular verb. ich habe / du hast / er-sie-es hat / wir haben / ihr habt / sie-Sie haben. Used for possession and many fixed expressions (e.g. "Ich habe Hunger" = I am hungry, literally "I have hunger").',
    vocab:[['ich habe','I have','ikh HAH-beh'],['du hast','you have','doo hahst'],['er/sie hat','he/she has','air/zee haht'],['wir haben','we have','veer HAH-ben'],['Ich habe Hunger.','I am hungry.','ikh HAH-beh HOON-ger'],['Ich habe Durst.','I am thirsty.','ikh HAH-beh doorst']],
    practice:'Translate: "I have a brother and a sister." → "Ich habe einen Bruder und eine Schwester."' },
  10: { week:2, date:'10 Jul', topic:'Daily Routine — Part 1 (Morning)', grammar:'Separable verbs: some German verbs split, with the prefix moving to the end. "aufstehen" (to get up) → "Ich stehe um 7 Uhr auf." (I get up at 7 o\'clock.) This feels strange at first but becomes natural with practice.',
    vocab:[['aufstehen','to get up','OWF-shtay-en'],['frühstücken','to have breakfast','FREW-shtew-ken'],['sich duschen','to shower','zikh DOO-shen'],['die Uhr','the clock/o\'clock','dee oor'],['um... Uhr','at... o\'clock','oom oor'],['jeden Tag','every day','YAY-den tahk']],
    practice:'Write your real morning routine in German using "Ich stehe um ___ Uhr auf. Ich frühstücke um ___ Uhr."' },
  11: { week:2, date:'11 Jul', topic:'Daily Routine — Part 2 (Work & Evening)', grammar:'Time expressions use "um" for clock time (um 9 Uhr) and "am" for days (am Montag). Word order: time expressions usually come right after the verb in a simple sentence.',
    vocab:[['arbeiten','to work','AR-by-ten'],['die Arbeit','the work/job','dee AR-byte'],['nach Hause gehen','to go home','nahkh HOW-zeh GAY-en'],['schlafen','to sleep','SHLAH-fen'],['der Abend','the evening','dair AH-bent'],['die Nacht','the night','dee nahkht']],
    practice:'Write 3 sentences about your work day using "Ich arbeite...", and one about going to sleep "Ich schlafe um... Uhr."' },
  12: { week:2, date:'12 Jul', topic:'Days of the Week & "am"', grammar:'Days of the week are always capitalized and masculine (der Montag). To say "on Monday" use "am Montag" (am = an + dem, a contraction you\'ll see often in German).',
    vocab:[['Montag','Monday','MOHN-tahk'],['Dienstag','Tuesday','DEENS-tahk'],['Mittwoch','Wednesday','MIT-vokh'],['Donnerstag','Thursday','DON-ners-tahk'],['Freitag','Friday','FRY-tahk'],['Samstag/Sonnabend','Saturday','ZAHMS-tahk'],['Sonntag','Sunday','ZON-tahk']],
    practice:'Write what you do on 3 different days: "Am Montag arbeite ich. Am Samstag schlafe ich lange."' },
  13: { week:2, date:'13 Jul', topic:'Possessive Pronouns (mein, dein, sein)', grammar:'"Mein" (my) changes ending based on the noun\'s gender: mein Vater (my father - masc.), meine Mutter (my mother - fem.), mein Kind (my child - neuter). This is your first taste of German adjective endings.',
    vocab:[['mein/meine','my (masc/fem)','mine / MY-neh'],['dein/deine','your (masc/fem)','dine / DY-neh'],['sein/seine','his (masc/fem)','zine / ZY-neh'],['ihr/ihre','her (masc/fem)','eer / EE-reh'],['unser/unsere','our (masc/fem)','OON-zer / OON-zeh-reh']],
    practice:'Translate: "My father, your mother, his sister, our family" → "Mein Vater, deine Mutter, seine Schwester, unsere Familie."' },
  14: { week:2, date:'14 Jul', topic:'Phase 2 Review + Voice Test', grammar:'Review: haben conjugation, separable verbs (aufstehen), days of the week, possessive pronouns. Try building longer sentences combining time + routine + family.',
    vocab:[['das Leben','the life','dahss LAY-ben'],['der Alltag','the everyday routine','dair AHL-tahk'],['zusammen','together','tsoo-ZAH-men'],['wissen','to know (a fact)','VISS-en'],['verstehen','to understand','fair-SHTAY-en']],
    practice:'Write a 5-sentence paragraph about a typical day: wake-up time, breakfast, work, family, sleep — all in German.' },

  15: { week:3, date:'15 Jul', topic:'Food & Drink Vocabulary', grammar:'Food nouns also carry gender: der Apfel (the apple - masc.), die Banane (the banana - fem.), das Brot (the bread - neuter). There\'s no shortcut — gender must be memorized per word, so always learn the article together with the noun.',
    vocab:[['das Brot','the bread','dahss broht'],['der Käse','the cheese','dair KAY-zeh'],['die Milch','the milk','dee milkh'],['das Wasser','the water','dahss VAH-ser'],['der Kaffee','the coffee','dair KAH-feh'],['der Apfel','the apple','dair AHP-fel'],['das Gemüse','the vegetables','dahss geh-MEW-zeh'],['das Fleisch','the meat','dahss flysh']],
    practice:'Write a shopping list of 5 foods using "Ich brauche..." (I need...): "Ich brauche Brot, Käse, Milch..."' },
  16: { week:3, date:'16 Jul', topic:'The Accusative Case (Akkusativ) — Intro', grammar:'German has cases that change articles based on a noun\'s role in the sentence. The Accusative is used for direct objects. Only the masculine "der" changes → "den": "Ich sehe den Mann" (I see the man). Feminine/neuter/plural stay the same as Nominativ.',
    vocab:[['den (masc. Akk.)','the (masc. object)','dayn'],['Ich sehe...','I see...','ikh ZAY-eh'],['Ich kaufe...','I buy...','ikh KOW-feh'],['Ich möchte...','I would like...','ikh MERKH-teh'],['einen (masc. Akk.)','a (masc. object)','EYE-nen']],
    practice:'Translate: "I buy a bread (der Brot... wait, das Brot)." Correct version: "Ich kaufe das Brot." Now try: "I see the man." → "Ich sehe den Mann."' },
  17: { week:3, date:'17 Jul', topic:'At the Supermarket — Shopping Phrases', grammar:'"Möchten" (would like) is a polite modal verb, more polite than "wollen" (want). "Ich möchte..." + noun is the standard polite way to ask for something in shops, cafes, restaurants.',
    vocab:[['Ich möchte...','I would like...','ikh MERKH-teh'],['Was kostet das?','How much does that cost?','vahss KOSS-tet dahss'],['Das macht... Euro.','That comes to... euros.','dahss mahkt OY-roh'],['der Supermarkt','the supermarket','dair ZOO-per-markt'],['die Kasse','the checkout','dee KAH-seh'],['bar bezahlen','to pay cash','bar beh-TSAH-len']],
    practice:'Write a 4-line shop dialogue: ask for an item politely, ask the price, respond, say thank you and goodbye.' },
  18: { week:3, date:'18 Jul', topic:'Asking & Giving Directions', grammar:'"Wo ist...?" (Where is...?) is the key question. Direction words like "links" (left), "rechts" (right), "geradeaus" (straight ahead) come at the end of simple instruction sentences.',
    vocab:[['Wo ist...?','Where is...?','voh isst'],['links','left','links'],['rechts','right','rekhts'],['geradeaus','straight ahead','geh-RAH-deh-ows'],['die Straße','the street','dee SHTRAH-seh'],['die Ecke','the corner','dee EK-keh'],['in der Nähe','nearby','in dair NAY-eh']],
    practice:'Write directions from your home to a nearby shop using "Gehen Sie geradeaus... dann links..." (Go straight... then left...).' },
  19: { week:3, date:'19 Jul', topic:'Prepositions of Place (in, auf, neben, unter)', grammar:'Common place prepositions: in (in), auf (on), neben (next to), unter (under), vor (in front of), hinter (behind). These take Dativ case when describing a fixed position — for now, just learn the meanings; the case rules come later in A2.',
    vocab:[['in','in','in'],['auf','on','owf'],['neben','next to','NAY-ben'],['unter','under','OON-ter'],['vor','in front of','for'],['hinter','behind','HIN-ter'],['zwischen','between','TSVISH-en']],
    practice:'Describe where 3 objects are in your room using these prepositions: "Das Buch ist auf dem Tisch." (The book is on the table.)' },
  20: { week:3, date:'20 Jul', topic:'Adjectives — Describing Things', grammar:'Basic adjectives come before the noun (groß = big → "ein großes Haus") or after "sein" with no ending change (das Haus ist groß = the house is big). After "sein", adjectives never change — much simpler than adjectives before nouns.',
    vocab:[['groß','big','grohss'],['klein','small','kline'],['gut','good','goot'],['schlecht','bad','shlekht'],['schön','beautiful','shern'],['neu','new','noy'],['alt','old','ahlt'],['teuer','expensive','TOY-er'],['billig','cheap','BIL-likh']],
    practice:'Describe 4 things using "ist" + adjective: "Mein Haus ist groß. Mein Auto ist alt." etc.' },
  21: { week:3, date:'21 Jul', topic:'Phase 3 Review + Voice Test', grammar:'Review: food vocab, Akkusativ basics (den/einen), shopping phrases, directions, prepositions of place, simple adjectives. This phase introduced your first grammatical case — re-read Day 16 if "den" vs "der" still feels unclear.',
    vocab:[['einkaufen','to go shopping','EYEN-kow-fen'],['der Weg','the way/path','dair vayk'],['die Richtung','the direction','dee RIKH-toong'],['beschreiben','to describe','beh-SHRY-ben']],
    practice:'Write a short story (5–6 sentences): you go to the supermarket, buy 3 food items, ask for directions to the checkout, and describe one item using an adjective.' },

  22: { week:4, date:'22 Jul', topic:'Transport & Getting Around', grammar:'"Mit dem/der" (by/with the) is used for transport: mit dem Bus (by bus), mit der Bahn (by train). "Dem" is the Dativ form of masculine/neuter "der/das" — another small case shift to recognize, not yet to fully master.',
    vocab:[['der Bus','the bus','dair booss'],['die Bahn / der Zug','the train','dee bahn / dair tsook'],['das Auto','the car','dahss OW-toh'],['das Fahrrad','the bicycle','dahss FAHR-raht'],['mit dem Bus','by bus','mit daym booss'],['der Bahnhof','the train station','dair BAHN-hohf'],['die Haltestelle','the (bus) stop','dee HAHL-teh-shtel-leh']],
    practice:'Write how you usually travel: "Ich fahre mit dem Bus zur Arbeit." (I travel by bus to work.) Try 2 more transport sentences.' },
  23: { week:4, date:'23 Jul', topic:'Booking & Travel Phrases', grammar:'"Ich möchte einen/eine/ein... buchen" = I would like to book a... Remember the Akkusativ pattern from Day 16: einen (masc.), eine (fem.), ein (neuter) — the gender of the noun decides the ending.',
    vocab:[['die Fahrkarte','the ticket','dee FAHR-kar-teh'],['buchen','to book','BOO-khen'],['der Flug','the flight','dair flook'],['die Ankunft','the arrival','dee AHN-koonft'],['die Abfahrt','the departure','dee AHP-fahrt'],['Hin und zurück','Round trip','hin oont tsoo-REWK'],['Einfach','One-way','EYEN-fahkh']],
    practice:'Write a short dialogue booking a train ticket: state destination, ask one-way or return, ask the price.' },
  24: { week:4, date:'24 Jul', topic:'Health & Body Parts', grammar:'"Mir tut... weh" = my... hurts (literally "to me hurts the..."). This is a Dativ construction — "mir" (to me) + body part + "tut weh". Very common phrase pattern worth memorizing as a fixed chunk.',
    vocab:[['der Kopf','the head','dair kopf'],['der Bauch','the stomach','dair bowkh'],['der Arm','the arm','dair arm'],['das Bein','the leg','dahss byne'],['Mir tut der Kopf weh.','My head hurts.','meer toot dair kopf vay'],['krank','sick','krahnk'],['der Arzt / die Ärztin','the doctor (m/f)','dair artst / dee ERTST-in']],
    practice:'Write 3 sentences: say you are sick, say what hurts using "Mir tut... weh", say you need a doctor.' },
  25: { week:4, date:'25 Jul', topic:'Weather & Seasons', grammar:'Weather sentences use the impersonal "es" (it): "Es regnet" (It is raining), "Es ist kalt" (It is cold). "Es" here doesn\'t refer to a specific object — it\'s a grammatical placeholder, same idea as English "it" in "it is raining".',
    vocab:[['das Wetter','the weather','dahss VET-ter'],['Es regnet.','It is raining.','ess RAYG-net'],['Es schneit.','It is snowing.','ess shnyte'],['Es ist kalt.','It is cold.','ess isst kahlt'],['Es ist warm.','It is warm.','ess isst varm'],['die Sonne','the sun','dee ZON-neh'],['der Winter / der Sommer','winter / summer','VIN-ter / ZOM-mer']],
    practice:'Describe today\'s actual weather in German, then write one sentence each for your favorite season and why.' },
  26: { week:4, date:'26 Jul', topic:'Modal Verbs — können & müssen', grammar:'Modal verbs (können = can, müssen = must) push the main verb to the end of the sentence in infinitive form: "Ich kann Deutsch sprechen" (I can speak German) — kann is conjugated, sprechen stays infinitive at the end.',
    vocab:[['ich kann','I can','ikh kahn'],['du kannst','you can','doo kahnst'],['ich muss','I must','ikh mooss'],['du musst','you must','doo moosst'],['können','can / to be able to','KER-nen'],['müssen','must / to have to','MEW-ssen']],
    practice:'Translate: "I can speak German" and "I must work tomorrow" → "Ich kann Deutsch sprechen." / "Ich muss morgen arbeiten."' },
  27: { week:4, date:'27 Jul', topic:'Asking Questions — W-Fragen', grammar:'German question words (W-Fragen) all start with W: was (what), wer (who), wo (where), wann (when), warum (why), wie (how). The verb comes immediately after the question word — second position, just like in normal statements.',
    vocab:[['Was?','What?','vahss'],['Wer?','Who?','vair'],['Wo?','Where?','voh'],['Wann?','When?','vahn'],['Warum?','Why?','vah-ROOM'],['Wie?','How?','vee'],['Wie viel?','How much?','vee feel']],
    practice:'Write 6 questions, one for each W-word, about your own life: "Wo wohnst du?" "Wann arbeitest du?" etc.' },
  28: { week:4, date:'28 Jul', topic:'Cumulative Review — Sentences & Connectors', grammar:'"Und" (and), "aber" (but), "oder" (or), "weil" (because) connect ideas. "Weil" is special — it pushes the verb to the very end of its clause: "Ich lerne Deutsch, weil ich nach Deutschland gehe." (I learn German because I go to Germany.)',
    vocab:[['und','and','oont'],['aber','but','AH-ber'],['oder','or','OH-der'],['weil','because','vyle'],['denn','because (no word-order change)','den'],['auch','also','owkh']],
    practice:'Write 3 sentences using und/aber/weil to connect ideas about your German learning goal and your move to Germany.' },
  29: { week:4, date:'29 Jul', topic:'Mock Listening & Reading Practice', grammar:'No new grammar — today is active practice. Read your Day 1–28 notes out loud, then try following a short German audio (a children\'s story, slow-German podcast, or Goethe-Institut A1 sample audio) and pick out words you recognize.',
    vocab:[['hören','to listen','HER-ren'],['lesen','to read','LAY-zen'],['das Beispiel','the example','dahss buy-SHPEEL'],['die Übung','the exercise','dee EW-boong'],['die Prüfung','the exam','dee PREW-foong']],
    practice:'Find one short German audio or video clip (2–3 min) online and write down 5 words you recognized from this month\'s vocabulary.' },
  30: { week:4, date:'30 Jul', topic:'Mock Speaking & Writing Practice', grammar:'No new grammar — simulate the Goethe A1 exam\'s speaking and writing sections. Speaking: introduce yourself fully (name, origin, profession, family). Writing: fill out a simple form and write a short personal message.',
    vocab:[['der Beruf','the profession','dair beh-ROOF'],['der Wohnort','the place of residence','dair VOHN-ort'],['das Formular','the form','dahss for-moo-LAR'],['unterschreiben','to sign','OON-ter-shry-ben']],
    practice:'Record yourself (voice memo) speaking for 1 minute introducing yourself fully. Then write a 5-sentence message to a friend about your German learning month.' },
  31: { week:4, date:'31 Jul', topic:'Final Review — A1 Checkpoint', grammar:'Full month review: sein & haben conjugations, Akkusativ basics (den/einen), modal verbs (können/müssen), W-questions, connectors (und/aber/weil). If any of these still feel shaky, that\'s your focus list for the first week in A2.',
    vocab:[['geschafft!','done it! / made it!','geh-SHAHFT'],['der Erfolg','the success','dair air-FOLK'],['weitermachen','to keep going','VY-ter-mah-khen'],['die nächste Stufe','the next level (A2)','dee NEKH-steh SHTOO-feh']],
    practice:'Write one full paragraph (8–10 sentences) about yourself in German — name, origin, family, daily routine, what you can do, and why you\'re learning German. This is your A1 checkpoint — compare it to Day 1 and see how far you\'ve come.' }
};

function germanDayNum() {
  const today = new Date();
  const start = new Date('2026-07-01T00:00:00');
  const end = new Date('2026-07-31T23:59:59');
  if (today < start) return 0;
  if (today > end) return 31;
  return Math.floor((today - start) / 86400000) + 1;
}

function germanWordCount() {
  let total = 0;
  Object.keys(GERMAN_DAYS).forEach(d => {
    if (germanProgress[d] && germanProgress[d].completed) total += GERMAN_DAYS[d].vocab.length;
  });
  return total;
}

function germanCompletedCount() {
  return Object.keys(GERMAN_DAYS).filter(d => germanProgress[d] && germanProgress[d].completed).length;
}

function updateGermanStats() {
  const dayNum = germanDayNum();
  const completed = germanCompletedCount();
  const words = germanWordCount();
  const pct = Math.round((completed / 31) * 100);

  const dayLabel = dayNum === 0 ? 'Not started' : dayNum > 31 ? 'Complete!' : `Day ${dayNum}`;
  ['ger-stat-day','ger-stat-day-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = dayLabel; });
  ['ger-stat-completed','ger-stat-completed-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = completed + '/31'; });
  ['ger-stat-words','ger-stat-words-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = words; });
  ['ger-stat-pct','ger-stat-pct-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = pct + '%'; });

  const fill = document.getElementById('ger-progress-fill');
  const pctEl = document.getElementById('ger-progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

function toggleGermanDay(day) {
  const current = germanProgress[day]?.completed || false;
  germanProgress[day] = { ...(germanProgress[day] || {}), completed: !current };
  if (sbClient) {
    sbClient.from('german_progress').upsert({
      day_num: day,
      completed: !current,
      note_text: germanProgress[day].note_text || '',
      teaching_notes: germanProgress[day].teaching_notes || ''
    }).then(({error}) => {
      if (error) console.error('Failed to save German progress:', error.message);
    });
  }
  renderGermanWeeks();
  updateGermanStats();
}

function saveGermanTeachingNotes(day, text) {
  germanProgress[day] = { ...(germanProgress[day] || {}), teaching_notes: text };
  if (sbClient) {
    sbClient.from('german_progress').upsert({
      day_num: day,
      completed: germanProgress[day].completed || false,
      note_text: germanProgress[day].note_text || '',
      teaching_notes: text
    }).then(({error}) => {
      if (error) console.error('Failed to save German teaching notes:', error.message);
      else { renderGermanWeeks(); }
    });
  } else {
    renderGermanWeeks();
  }
}

function renderGermanWeeks() {
  const container = document.getElementById('german-weeks');
  if (!container) return;
  const todayNum = germanDayNum();

  container.innerHTML = GERMAN_WEEKS.map(week => {
    const dayKeys = Object.keys(GERMAN_DAYS).filter(d => GERMAN_DAYS[d].week === week.num).map(Number).sort((a,b)=>a-b);
    const daysHtml = dayKeys.map(d => {
      const lesson = GERMAN_DAYS[d];
      const isDone = germanProgress[d]?.completed || false;
      const isToday = d === todayNum;
      const teachingNotes = germanProgress[d]?.teaching_notes || '';
      const wasTaught = teachingNotes.trim().length > 0;
      const vocabRows = lesson.vocab.map(([de, en, pron]) => `
        <div class="vocab-row"><span class="vocab-de">${de}</span><span class="vocab-en">${en}</span><span class="vocab-pron">${pron}</span></div>
      `).join('');

      return `
      <div class="ger-day-card ${isDone ? 'done' : ''} ${isToday ? 'today' : ''}">
        <div class="ger-day-header" onclick="toggleGermanDayOpen(${d})">
          <div class="ger-day-num">Day ${d}</div>
          <div class="ger-day-topic">
            <div class="ger-day-title">${lesson.topic}</div>
            <div class="ger-day-date">${lesson.date}${isToday ? ' · Today' : ''}${wasTaught ? ' · <span class="ger-taught-badge">📋 Taught</span>' : ''}</div>
          </div>
          <input type="checkbox" class="ger-day-check" ${isDone ? 'checked' : ''} onclick="event.stopPropagation();toggleGermanDay(${d})">
        </div>
        <div class="ger-day-body" id="ger-day-body-${d}" style="display:none;">
          <div class="ger-day-section-label">📖 Grammar Point (Lesson Plan)</div>
          <div class="ger-grammar-text">${lesson.grammar}</div>
          <div class="ger-day-section-label">🗂️ Vocabulary</div>
          <div class="vocab-table">${vocabRows}</div>
          <div class="ger-day-section-label">✍️ Practice</div>
          <div class="ger-practice-text">${lesson.practice}</div>

          <div class="ger-day-section-label">📋 Full Teaching Notes — What We Actually Covered</div>
          <div class="ger-teaching-notes" id="ger-teaching-notes-${d}">${wasTaught ? formatTeachingNotes(teachingNotes) : '<span class="ger-notes-placeholder">Not taught yet. Once this lesson is taught live, the full session writeup will appear here.</span>'}</div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="ger-week-block">
      <div class="ger-week-title">${week.title} <span class="ger-week-range">${week.range} · ${week.dates}</span></div>
      <div class="ger-days-list">${daysHtml}</div>
    </div>`;
  }).join('');
}

function formatTeachingNotes(text) {
  // Lightweight markdown-ish rendering: **bold**, line breaks, and simple "### " headers
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .split('\n')
    .map(line => {
      if (line.startsWith('### ')) return `<div class="ger-notes-heading">${line.slice(4)}</div>`;
      if (line.trim() === '') return '<br>';
      return `<p>${line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('');
}

function toggleGermanDayOpen(day) {
  const body = document.getElementById('ger-day-body-' + day);
  if (!body) return;
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function renderGermanNotesGrid() {
  const grid = document.getElementById('german-notes-grid');
  if (!grid) return;
  const dayKeys = Object.keys(GERMAN_DAYS).map(Number).sort((a,b)=>a-b);

  grid.innerHTML = dayKeys.map(d => {
    const lesson = GERMAN_DAYS[d];
    const noteVal = germanProgress[d]?.note_text || '';
    const isDone = germanProgress[d]?.completed || false;
    return `
    <div class="ger-note-card ${isDone ? 'done' : ''}">
      <div class="ger-note-header">
        <span class="ger-note-day">Day ${d}</span>
        <span class="ger-note-topic">${lesson.topic}</span>
        ${isDone ? '<span class="dash-pill green">✓ Done</span>' : ''}
      </div>
      <textarea class="ger-note-textarea" id="ger-note-${d}" placeholder="What did you find hard? Write your own example sentences, doubts, anything..." oninput="saveGermanNote(${d}, this.value)">${noteVal}</textarea>
      <div class="note-saved-indicator" id="ger-note-saved-${d}">✓ Saved</div>
    </div>`;
  }).join('');
}

let germanNoteTimeout;
function saveGermanNote(day, value) {
  germanProgress[day] = { ...(germanProgress[day] || {}), note_text: value };
  const indicator = document.getElementById('ger-note-saved-' + day);
  if (indicator) {
    indicator.classList.add('show');
    clearTimeout(indicator._t);
    indicator._t = setTimeout(() => indicator.classList.remove('show'), 1500);
  }
  clearTimeout(germanNoteTimeout);
  germanNoteTimeout = setTimeout(() => {
    if (sbClient) {
      sbClient.from('german_progress').upsert({
        day_num: day,
        completed: germanProgress[day].completed || false,
        note_text: value,
        teaching_notes: germanProgress[day].teaching_notes || ''
      }).then(({error}) => {
        if (error) console.error('Failed to save German note:', error.message);
      });
    }
  }, 1000);
}

function renderGermanTab() {
  renderGermanWeeks();
  renderGermanNotesGrid();
  updateGermanStats();
  renderDuolingoLog();
}

// ═══════════════ 11. DUOLINGO PRACTICE LOG ═══════════════

let duolingoEntries = []; // [{ id, entry_date, entry_text, streak, created_at }]
let duolingoEditingId = null;
let duolingoSearchQuery = '';
let duoDuplicateModal = null; // holds current duplicate groups for modal

// ── WORDS & SENTENCES STATE ──
let duoWords = [];           // [{ id, word_de, meaning_en, pronunciation, category, date_learned }]
let duoSentences = [];       // [{ id, sentence_de, meaning_en, pronunciation, tag, date_learned }]
let duoWordEditingId = null;
let duoSentenceEditingId = null;
let duoWordSearch = '';
let duoSentenceSearch = '';
let duoWordFilter = 'All';
let duoSentenceFilter = 'All';
let duoActiveMode = 'notes'; // 'notes' | 'words' | 'sentences'
let duoWordConfirmDeleteId = null;
let duoSentenceConfirmDeleteId = null;

function todayDateStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// ── AUTO STREAK: count consecutive calendar days (ending today or yesterday) ──
function calcAutoStreak() {
  const saved = duolingoEntries.filter(e => !e._isNew && e.entry_date);
  if (!saved.length) return 0;
  const uniqueDates = [...new Set(saved.map(e => e.entry_date))].sort().reverse();
  const today = todayDateStr();
  const yesterday = (() => { const d = new Date(); d.setDate(d.getDate()-1); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })();
  // streak must anchor on today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i-1] + 'T00:00:00');
    const curr = new Date(uniqueDates[i] + 'T00:00:00');
    const diff = Math.round((prev - curr) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

// ── DUPLICATE DETECTION: extract meaningful words (3+ chars) from text ──
function extractWords(text) {
  return text.toLowerCase().match(/\b[a-zäöüß]{3,}\b/g) || [];
}

// Find which saved entries share words with the current typing text
function findDuplicateHints(typingText, excludeId) {
  if (!typingText || typingText.trim().length < 3) return [];
  const typedWords = new Set(extractWords(typingText));
  if (typedWords.size === 0) return [];
  const matches = [];
  for (const e of duolingoEntries) {
    if (e._isNew || e.id === excludeId) continue;
    const entryWords = extractWords(e.entry_text);
    const shared = entryWords.filter(w => typedWords.has(w));
    if (shared.length >= 1) {
      matches.push({ entry: e, sharedWords: [...new Set(shared)] });
    }
  }
  return matches;
}

// ── FIND ALL DUPLICATE GROUPS across all saved entries (for the modal) ──
function findAllDuplicateGroups() {
  const saved = duolingoEntries.filter(e => !e._isNew);
  // Build inverted index: word → entries that contain it
  const wordMap = {};
  for (const e of saved) {
    const words = new Set(extractWords(e.entry_text));
    for (const w of words) {
      if (!wordMap[w]) wordMap[w] = [];
      wordMap[w].push(e.id);
    }
  }
  // Find pairs/groups that share 2+ words
  const pairScores = {};
  for (const [word, ids] of Object.entries(wordMap)) {
    if (ids.length < 2) continue;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i+1; j < ids.length; j++) {
        const key = [ids[i], ids[j]].sort().join('||');
        if (!pairScores[key]) pairScores[key] = { ids: [ids[i], ids[j]], words: [] };
        pairScores[key].words.push(word);
      }
    }
  }
  // Only return pairs with 2+ shared words
  return Object.values(pairScores).filter(p => p.words.length >= 2).map(p => ({
    entries: p.ids.map(id => saved.find(e => e.id === id)).filter(Boolean),
    sharedWords: p.words
  }));
}

function addDuolingoEntry() {
  const tempId = 'temp-' + Date.now();
  duolingoEntries.unshift({ id: tempId, entry_date: todayDateStr(), entry_text: '', streak: null, _isNew: true });
  duolingoEditingId = tempId;
  renderDuolingoLog();
  setTimeout(() => {
    const ta = document.getElementById('duo-text-' + tempId);
    if (ta) ta.focus();
  }, 50);
}

function saveDuolingoEntry(localId) {
  const dateEl = document.getElementById('duo-date-' + localId);
  const textEl = document.getElementById('duo-text-' + localId);
  if (!dateEl || !textEl) return;

  const entry_date = dateEl.value || todayDateStr();
  const entry_text = textEl.value.trim();

  if (!entry_text) {
    const ta = document.getElementById('duo-text-' + localId);
    if (ta) {
      ta.style.border = '1.5px solid #e05555';
      ta.placeholder = '⚠️ Write something before saving...';
      ta.focus();
      setTimeout(() => { ta.style.border = ''; ta.placeholder = 'What did you practice today? New words, a lesson you found tricky, anything...'; }, 2500);
    }
    return;
  }

  const idx = duolingoEntries.findIndex(e => e.id === localId);
  if (idx === -1) return;

  if (sbClient) {
    const isNew = duolingoEntries[idx]._isNew;
    if (isNew) {
      sbClient.from('duolingo_log').insert({ entry_date, entry_text, streak: null }).select().then(({ data, error }) => {
        if (error) { console.error('Failed to save Duolingo entry:', error.message); return; }
        if (data && data[0]) {
          duolingoEntries[idx] = data[0];
          duolingoEditingId = null;
          renderDuolingoLog();
        }
      });
    } else {
      sbClient.from('duolingo_log').update({ entry_date, entry_text }).eq('id', localId).select().then(({ data, error }) => {
        if (error) { console.error('Failed to update Duolingo entry:', error.message); return; }
        if (data && data[0]) {
          duolingoEntries[idx] = data[0];
          duolingoEditingId = null;
          renderDuolingoLog();
        }
      });
    }
  } else {
    duolingoEntries[idx] = { ...duolingoEntries[idx], entry_date, entry_text, _isNew: false };
    duolingoEditingId = null;
    renderDuolingoLog();
  }
}

function editDuolingoEntry(id) {
  duolingoEditingId = id;
  renderDuolingoLog();
}

function cancelDuolingoEdit(id) {
  const entry = duolingoEntries.find(e => e.id === id);
  if (entry && entry._isNew) {
    duolingoEntries = duolingoEntries.filter(e => e.id !== id);
  }
  duolingoEditingId = null;
  renderDuolingoLog();
}

let duoConfirmDeleteId = null;

function deleteDuolingoEntry(id) {
  duoConfirmDeleteId = id;
  renderDuolingoLog();
}

function confirmDeleteDuolingo(id) {
  duoConfirmDeleteId = null;
  duolingoEntries = duolingoEntries.filter(e => e.id !== id);
  renderDuolingoLog();
  const isTemp = typeof id === 'string' && id.startsWith('temp-');
  if (sbClient && !isTemp) {
    sbClient.from('duolingo_log').delete().eq('id', id).then(({error}) => {
      if (error) console.error('Failed to delete Duolingo entry:', error.message);
    });
  }
}

function cancelDeleteDuolingo() {
  duoConfirmDeleteId = null;
  renderDuolingoLog();
}

// ── SEARCH ──
function duoSetSearch(val) {
  duolingoSearchQuery = val.toLowerCase().trim();
  renderDuolingoLog();
}

function duoClearSearch() {
  duolingoSearchQuery = '';
  const inp = document.getElementById('duo-search-input');
  if (inp) inp.value = '';
  renderDuolingoLog();
}

// ── UNDO MERGE STATE ──
let duoUndoState = null; // { keepId, keepOrigText, keepOrigDate, deletedEntry, timer, commitFn }
let duoUndoInterval = null;

function duoCommitMerge() {
  if (!duoUndoState) return;
  clearInterval(duoUndoInterval);
  const { keepId, mergedText, mergedDate, deletedEntry } = duoUndoState;
  if (sbClient) {
    const isTemp1 = typeof keepId === 'string' && keepId.startsWith('temp-');
    const isTemp2 = typeof deletedEntry.id === 'string' && deletedEntry.id.startsWith('temp-');
    if (!isTemp1) sbClient.from('duolingo_log').update({ entry_date: mergedDate, entry_text: mergedText }).eq('id', keepId);
    if (!isTemp2) sbClient.from('duolingo_log').delete().eq('id', deletedEntry.id);
  }
  duoUndoState = null;
  // Hide undo toast
  const toast = document.getElementById('duo-undo-toast');
  if (toast) toast.style.display = 'none';
}

function duoUndoMerge() {
  if (!duoUndoState) return;
  clearInterval(duoUndoInterval);
  const { keepId, keepOrigText, keepOrigDate, deletedEntry } = duoUndoState;
  // Restore the kept entry to its original text
  const keepIdx = duolingoEntries.findIndex(e => e.id === keepId);
  if (keepIdx !== -1) {
    duolingoEntries[keepIdx] = { ...duolingoEntries[keepIdx], entry_text: keepOrigText, entry_date: keepOrigDate };
  }
  // Re-insert the deleted entry
  duolingoEntries.push(deletedEntry);
  duoUndoState = null;
  const toast = document.getElementById('duo-undo-toast');
  if (toast) toast.style.display = 'none';
  renderDuolingoLog();
}

function duoStartUndoCountdown() {
  let secs = 60;
  const toast = document.getElementById('duo-undo-toast');
  const counter = document.getElementById('duo-undo-counter');
  const bar = document.getElementById('duo-undo-bar');
  if (!toast) return;
  toast.style.display = 'flex';
  if (counter) counter.textContent = secs;
  if (bar) bar.style.width = '100%';
  duoUndoInterval = setInterval(() => {
    secs--;
    if (counter) counter.textContent = secs;
    if (bar) bar.style.width = (secs / 60 * 100) + '%';
    if (secs <= 0) {
      clearInterval(duoUndoInterval);
      duoCommitMerge();
    }
  }, 1000);
}

// ── UNMERGE: split an entry that has [Merged from ...] marker back into two ──
function unmergeEntry(id) {
  const entry = duolingoEntries.find(e => e.id === id);
  if (!entry) return;
  const MARKER = /\[Merged from ([^\]]+):\]/;
  const match = entry.entry_text.match(MARKER);
  if (!match) { alert('No merge marker found in this entry.'); return; }

  const splitIdx = entry.entry_text.indexOf(match[0]);
  const part1 = entry.entry_text.slice(0, splitIdx).trim();
  // Everything after the marker line
  const afterMarker = entry.entry_text.slice(splitIdx + match[0].length).trim();

  // Parse the original date from the marker text (e.g. "1 Jul 2026")
  let part2Date = entry.entry_date; // fallback
  try {
    const parsedDate = new Date(match[1]);
    if (!isNaN(parsedDate)) {
      part2Date = parsedDate.getFullYear() + '-' +
        String(parsedDate.getMonth()+1).padStart(2,'0') + '-' +
        String(parsedDate.getDate()).padStart(2,'0');
    }
  } catch(e) {}

  if (!part1 || !afterMarker) { alert('Could not split — one of the parts is empty.'); return; }

  // Update kept entry with part1 only
  const keepIdx = duolingoEntries.findIndex(e => e.id === id);
  if (keepIdx !== -1) {
    duolingoEntries[keepIdx] = { ...duolingoEntries[keepIdx], entry_text: part1 };
  }

  // Create a new entry for part2
  const tempId = 'unmerged-' + Date.now();
  const newEntry = { id: tempId, entry_date: part2Date, entry_text: afterMarker, streak: null, _isNew: true, _unmergedFrom: id };
  duolingoEntries.push(newEntry);

  // Persist to Supabase
  if (sbClient) {
    const isTemp = typeof id === 'string' && id.startsWith('temp-');
    if (!isTemp) sbClient.from('duolingo_log').update({ entry_text: part1 }).eq('id', id);
    sbClient.from('duolingo_log').insert({ entry_date: part2Date, entry_text: afterMarker, streak: null }).select().then(({ data, error }) => {
      if (!error && data && data[0]) {
        const idx2 = duolingoEntries.findIndex(e => e.id === tempId);
        if (idx2 !== -1) {
          duolingoEntries[idx2] = data[0];
        }
        renderDuolingoLog();
      }
    });
  }

  renderDuolingoLog();
}

// ── MERGE MODAL ──
function openDuplicateModal() {
  const groups = findAllDuplicateGroups();
  if (!groups.length) { alert('No duplicates found!'); return; }
  duoDuplicateModal = groups;
  const overlay = document.getElementById('duo-dup-overlay');
  const body = document.getElementById('duo-dup-body');
  if (!overlay || !body) return;

  body.innerHTML = groups.map((g, gi) => {
    const e1 = g.entries[0], e2 = g.entries[1];
    if (!e1 || !e2) return '';
    const d1 = e1.entry_date ? new Date(e1.entry_date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '';
    const d2 = e2.entry_date ? new Date(e2.entry_date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '';

    // Split each entry text into individual lines for selective merge
    const lines1 = e1.entry_text.split('\n').map(l => l.trim()).filter(Boolean);
    const lines2 = e2.entry_text.split('\n').map(l => l.trim()).filter(Boolean);

    const makeLineCheckboxes = (lines, entryId, side) => lines.map((line, li) =>
      `<label class="duo-merge-line">
        <input type="checkbox" id="duo-merge-${entryId}-${li}" data-entry="${entryId}" data-side="${side}" data-line="${li}" data-text="${line.replace(/"/g,'&quot;')}" checked>
        <span>${line}</span>
      </label>`
    ).join('');

    return `
    <div class="duo-dup-group" id="duo-dup-group-${gi}">
      <div class="duo-dup-shared">🔗 Shared words: <strong>${g.sharedWords.slice(0,8).join(', ')}</strong></div>
      <div style="font-size:12px;color:#888;margin-bottom:8px;">✅ Tick the lines you want to keep in the merged entry. Untick lines to exclude them.</div>
      <div class="duo-dup-entries">
        <div class="duo-dup-entry">
          <div class="duo-dup-date">📅 ${d1}</div>
          <div class="duo-merge-lines">${makeLineCheckboxes(lines1, e1.id, 'e1')}</div>
        </div>
        <div class="duo-dup-entry">
          <div class="duo-dup-date">📅 ${d2}</div>
          <div class="duo-merge-lines">${makeLineCheckboxes(lines2, e2.id, 'e2')}</div>
        </div>
      </div>
      <div class="duo-dup-actions">
        <button class="dash-apply-btn" style="font-size:12px;padding:6px 14px;" onclick="mergeDuoEntries(${gi},'${e1.id}','${e2.id}')">🔀 Merge selected lines</button>
        <button class="uni-secondary-btn" style="font-size:12px;padding:6px 14px;" onclick="dismissDupGroup(${gi})">✅ Keep both</button>
      </div>
    </div>`;
  }).join('<hr style="border:none;border-top:1px solid var(--border);margin:12px 0;">');

  overlay.style.display = 'flex';
}

function closeDuplicateModal() {
  const overlay = document.getElementById('duo-dup-overlay');
  if (overlay) overlay.style.display = 'none';
  duoDuplicateModal = null;
}

function mergeDuoEntries(groupIdx, e1id, e2id) {
  if (!duoDuplicateModal || !duoDuplicateModal[groupIdx]) return;
  const g = duoDuplicateModal[groupIdx];
  const e1 = g.entries.find(e => e.id === e1id);
  const e2 = g.entries.find(e => e.id === e2id);
  if (!e1 || !e2) return;

  // Collect only the checked lines, preserving order: e1 lines first, then e2 lines
  const getCheckedLines = (entryId) => {
    const boxes = document.querySelectorAll(`input[data-entry="${entryId}"]`);
    const lines = [];
    boxes.forEach(cb => { if (cb.checked) lines.push(cb.getAttribute('data-text')); });
    return lines;
  };

  const linesFromE1 = getCheckedLines(e1id);
  const linesFromE2 = getCheckedLines(e2id);

  if (linesFromE1.length === 0 && linesFromE2.length === 0) {
    alert('Select at least one line to merge!');
    return;
  }

  const mergedDate = e1.entry_date < e2.entry_date ? e1.entry_date : e2.entry_date;
  const d2label = new Date(e2.entry_date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
  const mergedText = [
    ...linesFromE1,
    linesFromE2.length ? `\n[Merged from ${d2label}:]` : '',
    ...linesFromE2
  ].filter(Boolean).join('\n');

  // Save originals for undo
  const keepOrigText = e1.entry_text;
  const keepOrigDate = e1.entry_date;
  const deletedEntry = { ...e2 };

  // Apply in memory immediately
  const keepIdx = duolingoEntries.findIndex(e => e.id === e1id);
  if (keepIdx !== -1) {
    duolingoEntries[keepIdx] = { ...duolingoEntries[keepIdx], entry_date: mergedDate, entry_text: mergedText };
  }
  duolingoEntries = duolingoEntries.filter(e => e.id !== e2id);

  // Set undo state — Supabase write is DEFERRED by 60s
  if (duoUndoState) duoCommitMerge(); // commit any previous pending merge first
  duoUndoState = { keepId: e1id, mergedText, mergedDate, keepOrigText, keepOrigDate, deletedEntry };
  duoStartUndoCountdown();

  // Remove this group from modal
  duoDuplicateModal.splice(groupIdx, 1);
  const grpEl = document.getElementById('duo-dup-group-' + groupIdx);
  if (grpEl) {
    grpEl.innerHTML = '<div style="color:#2ea84f;font-weight:600;padding:10px 0;">✅ Merged! You have 60s to undo.</div>';
    setTimeout(() => { if (duoDuplicateModal && duoDuplicateModal.length === 0) closeDuplicateModal(); }, 1200);
  }
  renderDuolingoLog();
}

function dismissDupGroup(groupIdx) {
  if (!duoDuplicateModal) return;
  duoDuplicateModal.splice(groupIdx, 1);
  const grpEl = document.getElementById('duo-dup-group-' + groupIdx);
  if (grpEl) {
    grpEl.innerHTML = '<div style="color:#888;font-size:13px;padding:8px 0;">Kept both — dismissed.</div>';
  }
  if (duoDuplicateModal.length === 0) {
    setTimeout(closeDuplicateModal, 600);
  }
}

function updateDuolingoStats() {
  const total = duolingoEntries.filter(e => !e._isNew).length;
  const entriesEl = document.getElementById('duo-stat-entries');
  if (entriesEl) entriesEl.textContent = total;

  const lastEl = document.getElementById('duo-stat-lastdate');
  if (lastEl) {
    const sorted = duolingoEntries.filter(e => !e._isNew).sort((a,b) => b.entry_date.localeCompare(a.entry_date));
    lastEl.textContent = sorted.length ? new Date(sorted[0].entry_date + 'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : '—';
  }

  // Show/hide duplicate button
  const dupBtn = document.getElementById('duo-dup-btn');
  if (dupBtn) {
    const groups = findAllDuplicateGroups();
    dupBtn.style.display = groups.length > 0 ? 'inline-flex' : 'none';
    dupBtn.textContent = `🔍 ${groups.length} Duplicate${groups.length !== 1 ? 's' : ''} Found`;
  }
}

function renderDuolingoLog() {
  const list = document.getElementById('duolingo-log-list');
  const empty = document.getElementById('duolingo-empty');
  if (!list) return;

  const realEntries = duolingoEntries.filter(e => !e._isNew);
  const newEntries = duolingoEntries.filter(e => e._isNew);

  // Apply search filter (only to saved entries, not the new editing card)
  let filtered = realEntries;
  if (duolingoSearchQuery) {
    filtered = realEntries.filter(e =>
      (e.entry_text || '').toLowerCase().includes(duolingoSearchQuery) ||
      (e.entry_date || '').includes(duolingoSearchQuery)
    );
  }

  const allVisible = [...newEntries, ...filtered];

  if (allVisible.length === 0 && newEntries.length === 0) {
    if (empty) empty.style.display = duolingoSearchQuery ? 'none' : 'block';
    list.innerHTML = duolingoSearchQuery
      ? `<div style="text-align:center;padding:24px;color:#888;font-size:14px;">No entries match "<strong>${duolingoSearchQuery}</strong>"</div>`
      : '';
    updateDuolingoStats();
    return;
  }
  if (empty) empty.style.display = 'none';

  const sorted = [
    ...newEntries,
    ...filtered.sort((a,b) => b.entry_date.localeCompare(a.entry_date))
  ];

  list.innerHTML = sorted.map(e => {
    const isEditing = e._isNew || duolingoEditingId === e.id;
    const dateLabel = e.entry_date ? new Date(e.entry_date + 'T00:00:00').toLocaleDateString('en-GB',{weekday:'short', day:'numeric', month:'short', year:'numeric'}) : '';

    if (isEditing) {
      return `
      <div class="duo-entry-card editing">
        <div class="duo-entry-edit-row">
          <input type="date" id="duo-date-${e.id}" value="${e.entry_date || todayDateStr()}" class="duo-date-input">
        </div>
        <textarea id="duo-text-${e.id}" class="ger-note-textarea" style="min-height:80px;" placeholder="What did you practice today? New words, a lesson you found tricky, anything..."
          oninput="duoCheckDuplicateHint('${e.id}', this.value)"
        >${e.entry_text || ''}</textarea>
        <div id="duo-hint-${e.id}" class="duo-dup-hint" style="display:none;"></div>
        <div class="duo-entry-actions">
          <button class="dash-apply-btn" onclick="saveDuolingoEntry('${e.id}')">💾 Save Entry</button>
          <button class="uni-secondary-btn" onclick="cancelDuolingoEdit('${e.id}')">Cancel</button>
        </div>
      </div>`;
    }

    const hasMergeMarker = e.entry_text && e.entry_text.includes('[Merged from');
    const streak = calcAutoStreak();
    const streakBadge = (streak > 0)
      ? `<span class="duo-streak-badge">🔥 ${streak} day streak</span>`
      : '';
    // Render entry text as structured line rows if lines contain = or –
    const rawText = e.entry_text || '';
    const lines = rawText.split('\n').filter(l => l.trim());
    const hasStructure = lines.some(l => /=|–|-/.test(l));
    let entryBody;
    if (hasStructure) {
      entryBody = `<div class="duo-entry-lines">${lines.map(line => {
        const sep = line.includes('=') ? '=' : line.includes('–') ? '–' : '-';
        const parts = line.split(sep);
        if (parts.length >= 2) {
          const de = parts[0].trim();
          const en = parts.slice(1).join(sep).trim();
          return `<div class="duo-line-row"><span class="duo-line-de">${de}</span><span class="duo-line-sep">=</span><span class="duo-line-en">${en}</span></div>`;
        }
        return `<div class="duo-line-row"><span class="duo-line-en">${line}</span></div>`;
      }).join('')}</div>`;
    } else {
      entryBody = `<div class="duo-entry-text">${rawText}</div>`;
    }
    return `
    <div class="duo-entry-card">
      <div class="duo-entry-header">
        <span class="duo-entry-date">${dateLabel}</span>
        ${streakBadge}
        ${hasMergeMarker ? `<span class="dash-pill" style="background:#e8f0fe;color:#1a4b8c;font-size:10px;cursor:pointer;" onclick="unmergeEntry('${e.id}')" title="Split this merged entry back into two">✂️ Unmerge</span>` : ''}
        <div class="duo-entry-actions-inline">
          ${duoConfirmDeleteId === e.id
            ? `<span style="font-size:12px;color:#e05555;font-weight:600;margin-right:6px;">Delete?</span>
               <button class="duo-icon-btn" onclick="confirmDeleteDuolingo('${e.id}')" title="Yes, delete" style="color:#e05555;">✅</button>
               <button class="duo-icon-btn" onclick="cancelDeleteDuolingo()" title="Cancel">❌</button>`
            : `<button class="duo-icon-btn" onclick="editDuolingoEntry('${e.id}')" title="Edit">✏️</button>
               <button class="duo-icon-btn" onclick="deleteDuolingoEntry('${e.id}')" title="Delete">🗑️</button>`
          }
        </div>
      </div>
      ${entryBody}
    </div>`;
  }).join('');

  updateDuolingoStats();
}

// Called live as user types in the new/edit textarea
function duoCheckDuplicateHint(editingId, typedText) {
  const hintEl = document.getElementById('duo-hint-' + editingId);
  if (!hintEl) return;
  const hints = findDuplicateHints(typedText, editingId);
  if (!hints.length) {
    hintEl.style.display = 'none';
    hintEl.innerHTML = '';
    return;
  }
  hintEl.style.display = 'block';
  hintEl.innerHTML = `<div class="duo-hint-title">⚠️ Similar words found in existing entries:</div>` +
    hints.slice(0,3).map(h => {
      const d = h.entry.entry_date ? new Date(h.entry.entry_date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '';
      const preview = h.entry.entry_text.length > 100 ? h.entry.entry_text.slice(0,100)+'…' : h.entry.entry_text;
      return `<div class="duo-hint-item">
        <span class="duo-hint-date">${d}</span>
        <span class="duo-hint-words">Shared: ${h.sharedWords.slice(0,5).join(', ')}</span>
        <span class="duo-hint-preview">${preview}</span>
      </div>`;
    }).join('');
}

// ═══════════════ DUOLINGO MODE SWITCHER ═══════════════
function switchDuoMode(mode) {
  duoActiveMode = mode;
  ['notes','words','sentences'].forEach(m => {
    const btn = document.getElementById('duo-mode-' + m);
    const pane = document.getElementById('duo-pane-' + m);
    if (btn) btn.classList.toggle('active', m === mode);
    if (pane) pane.style.display = m === mode ? 'block' : 'none';
  });
}

// ═══════════════ DUO WORDS MODULE ═══════════════
const WORD_CATEGORIES = ['Noun','Verb','Adjective','Article','Pronoun','Adverb','Umlaut','Phrase','Other'];

function duoWordDuplicateCheck(wordDe, excludeId) {
  if (!wordDe || wordDe.trim().length < 1) return null;
  const lower = wordDe.trim().toLowerCase();
  return duoWords.find(w => w.id !== excludeId && w.word_de && w.word_de.toLowerCase() === lower) || null;
}

function addDuoWord() {
  const tempId = 'wtemp-' + Date.now();
  duoWords.unshift({ id: tempId, word_de: '', meaning_en: '', pronunciation: '', category: 'Other', date_learned: todayDateStr(), _isNew: true });
  duoWordEditingId = tempId;
  renderDuoWords();
  setTimeout(() => { const el = document.getElementById('dw-de-' + tempId); if (el) el.focus(); }, 50);
}

function saveDuoWord(id) {
  const wordDe   = (document.getElementById('dw-de-' + id)?.value || '').trim();
  const meaningEn = (document.getElementById('dw-en-' + id)?.value || '').trim();
  const pronunciation = (document.getElementById('dw-pr-' + id)?.value || '').trim();
  const category = document.getElementById('dw-cat-' + id)?.value || 'Other';
  const dateLearned = document.getElementById('dw-date-' + id)?.value || todayDateStr();

  if (!wordDe) { const el = document.getElementById('dw-de-' + id); if (el) { el.style.border='1.5px solid #e05555'; el.focus(); setTimeout(()=>el.style.border='',2000); } return; }
  if (!meaningEn) { const el = document.getElementById('dw-en-' + id); if (el) { el.style.border='1.5px solid #e05555'; el.focus(); setTimeout(()=>el.style.border='',2000); } return; }

  const idx = duoWords.findIndex(w => w.id === id);
  if (idx === -1) return;
  const isNew = duoWords[idx]._isNew;
  const payload = { word_de: wordDe, meaning_en: meaningEn, pronunciation, category, date_learned: dateLearned };

  if (sbClient) {
    const action = isNew
      ? sbClient.from('duo_words').insert(payload).select()
      : sbClient.from('duo_words').update(payload).eq('id', id).select();
    action.then(({ data, error }) => {
      if (error) { console.error('duo_words save error:', error.message); return; }
      if (data && data[0]) { duoWords[idx] = data[0]; duoWordEditingId = null; renderDuoWords(); updateDuolingoStats(); }
    });
  } else {
    duoWords[idx] = { ...duoWords[idx], ...payload, _isNew: false };
    duoWordEditingId = null; renderDuoWords(); updateDuolingoStats();
  }
}

function editDuoWord(id) { duoWordEditingId = id; renderDuoWords(); }

function cancelDuoWordEdit(id) {
  if (duoWords.find(w => w.id === id)?._isNew) duoWords = duoWords.filter(w => w.id !== id);
  duoWordEditingId = null; renderDuoWords();
}

function deleteDuoWord(id) { duoWordConfirmDeleteId = id; renderDuoWords(); }

function confirmDeleteDuoWord(id) {
  duoWordConfirmDeleteId = null;
  duoWords = duoWords.filter(w => w.id !== id);
  renderDuoWords(); updateDuolingoStats();
  if (sbClient && !id.startsWith('wtemp-')) sbClient.from('duo_words').delete().eq('id', id);
}

function cancelDeleteDuoWord() { duoWordConfirmDeleteId = null; renderDuoWords(); }

function renderDuoWords() {
  const list = document.getElementById('duo-words-list');
  if (!list) return;

  let items = duoWords.filter(w => !w._isNew);
  if (duoWordSearch) {
    const q = duoWordSearch.toLowerCase();
    items = items.filter(w =>
      (w.word_de||'').toLowerCase().includes(q) ||
      (w.meaning_en||'').toLowerCase().includes(q) ||
      (w.pronunciation||'').toLowerCase().includes(q)
    );
  }
  if (duoWordFilter !== 'All') items = items.filter(w => w.category === duoWordFilter);

  const newItems = duoWords.filter(w => w._isNew);
  const all = [...newItems, ...items];

  // update stats
  const wCount = document.getElementById('duo-stat-words');
  if (wCount) wCount.textContent = duoWords.filter(w=>!w._isNew).length;

  if (!all.length && !newItems.length) {
    list.innerHTML = `<div class="duo-empty-mode"><div style="font-size:32px;margin-bottom:8px;">📖</div><p>No words yet. Click <strong>+ Add Word</strong> to start your word bank.</p></div>`;
    return;
  }

  list.innerHTML = all.map(w => {
    const isEditing = w._isNew || duoWordEditingId === w.id;
    if (isEditing) {
      const dup = duoWordDuplicateCheck(w.word_de, w.id);
      return `
      <div class="duo-item-card editing">
        <div class="duo-item-edit-grid">
          <div class="duo-field-group">
            <label class="duo-field-label">🇩🇪 German Word *</label>
            <input id="dw-de-${w.id}" class="duo-field-input" placeholder="e.g. Hungrig" value="${w.word_de||''}"
              oninput="checkDuoWordDup('${w.id}',this.value)">
            <div id="dw-dup-${w.id}" class="duo-dup-inline" style="display:${dup?'block':'none'}">${dup?`⚠️ Already saved: <strong>${dup.word_de}</strong> = ${dup.meaning_en}`:''}</div>
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">🇬🇧 Meaning *</label>
            <input id="dw-en-${w.id}" class="duo-field-input" placeholder="e.g. Hungry" value="${w.meaning_en||''}">
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">🔊 Pronunciation</label>
            <input id="dw-pr-${w.id}" class="duo-field-input" placeholder='e.g. "HOONG-rikh"' value="${w.pronunciation||''}">
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">🏷️ Category</label>
            <select id="dw-cat-${w.id}" class="duo-field-select">
              ${WORD_CATEGORIES.map(c=>`<option value="${c}" ${(w.category||'Other')===c?'selected':''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">📅 Date Learned</label>
            <input type="date" id="dw-date-${w.id}" class="duo-field-input" value="${w.date_learned||todayDateStr()}">
          </div>
        </div>
        <div class="duo-item-actions">
          <button class="dash-apply-btn" onclick="saveDuoWord('${w.id}')">💾 Save Word</button>
          <button class="uni-secondary-btn" onclick="cancelDuoWordEdit('${w.id}')">Cancel</button>
        </div>
      </div>`;
    }

    const catColor = { Noun:'#e8f0fe', Verb:'#e6f9ee', Adjective:'#fff3cd', Article:'#fce8e8', Pronoun:'#f3e8ff', Adverb:'#e8f8ff', Umlaut:'#fff0e0', Phrase:'#e8f5e9', Other:'#f4f4f4' };
    const catText  = { Noun:'#1a4b8c', Verb:'#1a6b3a', Adjective:'#856404', Article:'#9b1c1c', Pronoun:'#5b1a8c', Adverb:'#0d6b8c', Umlaut:'#8c4e00', Phrase:'#1a5c2e', Other:'#555' };
    return `
    <div class="duo-item-card">
      <div class="duo-item-header">
        <span class="duo-item-de">${w.word_de}</span>
        <span class="duo-item-cat" style="background:${catColor[w.category]||'#f4f4f4'};color:${catText[w.category]||'#555'}">${w.category}</span>
        <div class="duo-entry-actions-inline">
          ${duoWordConfirmDeleteId === w.id
            ? `<span class="duo-del-confirm">Delete?</span>
               <button class="duo-icon-btn" onclick="confirmDeleteDuoWord('${w.id}')" style="color:#e05555;">✅</button>
               <button class="duo-icon-btn" onclick="cancelDeleteDuoWord()">❌</button>`
            : `<button class="duo-icon-btn" onclick="editDuoWord('${w.id}')" title="Edit">✏️</button>
               <button class="duo-icon-btn" onclick="deleteDuoWord('${w.id}')" title="Delete">🗑️</button>`}
        </div>
      </div>
      <div class="duo-item-meaning">= ${w.meaning_en}</div>
      ${w.pronunciation ? `<div class="duo-item-pronunciation">🔊 ${w.pronunciation}</div>` : ''}
      <div class="duo-item-meta">📅 ${w.date_learned ? new Date(w.date_learned+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : ''}</div>
    </div>`;
  }).join('');
}

function checkDuoWordDup(id, val) {
  const dup = duoWordDuplicateCheck(val, id);
  const el = document.getElementById('dw-dup-' + id);
  if (!el) return;
  if (dup) { el.style.display = 'block'; el.innerHTML = `⚠️ Already saved: <strong>${dup.word_de}</strong> = ${dup.meaning_en}`; }
  else { el.style.display = 'none'; el.innerHTML = ''; }
}

function duoWordSetSearch(val) { duoWordSearch = val.toLowerCase().trim(); renderDuoWords(); }
function duoWordClearSearch() { duoWordSearch = ''; const el = document.getElementById('duo-word-search'); if (el) el.value = ''; renderDuoWords(); }
function duoWordSetFilter(val) { duoWordFilter = val; renderDuoWords(); }

// ═══════════════ DUO SENTENCES MODULE ═══════════════
const SENTENCE_TAGS = ['General','Greeting','Food','Family','Travel','Question','Work','Numbers','Time','Other'];

function duoSentenceDuplicateCheck(sentDe, excludeId) {
  if (!sentDe || sentDe.trim().length < 3) return null;
  const lower = sentDe.trim().toLowerCase();
  return duoSentences.find(s => s.id !== excludeId && s.sentence_de && s.sentence_de.toLowerCase() === lower) || null;
}

function addDuoSentence() {
  const tempId = 'stemp-' + Date.now();
  duoSentences.unshift({ id: tempId, sentence_de: '', meaning_en: '', pronunciation: '', tag: 'General', date_learned: todayDateStr(), _isNew: true });
  duoSentenceEditingId = tempId;
  renderDuoSentences();
  setTimeout(() => { const el = document.getElementById('ds-de-' + tempId); if (el) el.focus(); }, 50);
}

function saveDuoSentence(id) {
  const sentDe  = (document.getElementById('ds-de-' + id)?.value || '').trim();
  const meaningEn = (document.getElementById('ds-en-' + id)?.value || '').trim();
  const pronunciation = (document.getElementById('ds-pr-' + id)?.value || '').trim();
  const tag = document.getElementById('ds-tag-' + id)?.value || 'General';
  const dateLearned = document.getElementById('ds-date-' + id)?.value || todayDateStr();

  if (!sentDe) { const el = document.getElementById('ds-de-' + id); if (el) { el.style.border='1.5px solid #e05555'; el.focus(); setTimeout(()=>el.style.border='',2000); } return; }
  if (!meaningEn) { const el = document.getElementById('ds-en-' + id); if (el) { el.style.border='1.5px solid #e05555'; el.focus(); setTimeout(()=>el.style.border='',2000); } return; }

  const idx = duoSentences.findIndex(s => s.id === id);
  if (idx === -1) return;
  const isNew = duoSentences[idx]._isNew;
  const payload = { sentence_de: sentDe, meaning_en: meaningEn, pronunciation, tag, date_learned: dateLearned };

  if (sbClient) {
    const action = isNew
      ? sbClient.from('duo_sentences').insert(payload).select()
      : sbClient.from('duo_sentences').update(payload).eq('id', id).select();
    action.then(({ data, error }) => {
      if (error) { console.error('duo_sentences save error:', error.message); return; }
      if (data && data[0]) { duoSentences[idx] = data[0]; duoSentenceEditingId = null; renderDuoSentences(); updateDuolingoStats(); }
    });
  } else {
    duoSentences[idx] = { ...duoSentences[idx], ...payload, _isNew: false };
    duoSentenceEditingId = null; renderDuoSentences(); updateDuolingoStats();
  }
}

function editDuoSentence(id) { duoSentenceEditingId = id; renderDuoSentences(); }

function cancelDuoSentenceEdit(id) {
  if (duoSentences.find(s => s.id === id)?._isNew) duoSentences = duoSentences.filter(s => s.id !== id);
  duoSentenceEditingId = null; renderDuoSentences();
}

function deleteDuoSentence(id) { duoSentenceConfirmDeleteId = id; renderDuoSentences(); }

function confirmDeleteDuoSentence(id) {
  duoSentenceConfirmDeleteId = null;
  duoSentences = duoSentences.filter(s => s.id !== id);
  renderDuoSentences(); updateDuolingoStats();
  if (sbClient && !id.startsWith('stemp-')) sbClient.from('duo_sentences').delete().eq('id', id);
}

function cancelDeleteDuoSentence() { duoSentenceConfirmDeleteId = null; renderDuoSentences(); }

function renderDuoSentences() {
  const list = document.getElementById('duo-sentences-list');
  if (!list) return;

  let items = duoSentences.filter(s => !s._isNew);
  if (duoSentenceSearch) {
    const q = duoSentenceSearch.toLowerCase();
    items = items.filter(s =>
      (s.sentence_de||'').toLowerCase().includes(q) ||
      (s.meaning_en||'').toLowerCase().includes(q) ||
      (s.pronunciation||'').toLowerCase().includes(q)
    );
  }
  if (duoSentenceFilter !== 'All') items = items.filter(s => s.tag === duoSentenceFilter);

  const newItems = duoSentences.filter(s => s._isNew);
  const all = [...newItems, ...items];

  const sCount = document.getElementById('duo-stat-sentences');
  if (sCount) sCount.textContent = duoSentences.filter(s=>!s._isNew).length;

  if (!all.length && !newItems.length) {
    list.innerHTML = `<div class="duo-empty-mode"><div style="font-size:32px;margin-bottom:8px;">💬</div><p>No sentences yet. Click <strong>+ Add Sentence</strong> to start building your sentence bank.</p></div>`;
    return;
  }

  list.innerHTML = all.map(s => {
    const isEditing = s._isNew || duoSentenceEditingId === s.id;
    if (isEditing) {
      const dup = duoSentenceDuplicateCheck(s.sentence_de, s.id);
      return `
      <div class="duo-item-card editing">
        <div class="duo-item-edit-grid">
          <div class="duo-field-group" style="grid-column:1/-1">
            <label class="duo-field-label">🇩🇪 German Sentence *</label>
            <input id="ds-de-${s.id}" class="duo-field-input" placeholder="e.g. Ich bin hungrig" value="${s.sentence_de||''}"
              oninput="checkDuoSentDup('${s.id}',this.value)">
            <div id="ds-dup-${s.id}" class="duo-dup-inline" style="display:${dup?'block':'none'}">${dup?`⚠️ Already saved: <strong>${dup.sentence_de}</strong>`:''}</div>
          </div>
          <div class="duo-field-group" style="grid-column:1/-1">
            <label class="duo-field-label">🇬🇧 English Meaning *</label>
            <input id="ds-en-${s.id}" class="duo-field-input" placeholder="e.g. I am hungry" value="${s.meaning_en||''}">
          </div>
          <div class="duo-field-group" style="grid-column:1/-1">
            <label class="duo-field-label">🔊 Pronunciation Tip</label>
            <input id="ds-pr-${s.id}" class="duo-field-input" placeholder='e.g. "ikh bin HOONG-rikh" — "Ich" sounds like "ikh" not "ick"' value="${s.pronunciation||''}">
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">🏷️ Tag</label>
            <select id="ds-tag-${s.id}" class="duo-field-select">
              ${SENTENCE_TAGS.map(t=>`<option value="${t}" ${(s.tag||'General')===t?'selected':''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="duo-field-group">
            <label class="duo-field-label">📅 Date Learned</label>
            <input type="date" id="ds-date-${s.id}" class="duo-field-input" value="${s.date_learned||todayDateStr()}">
          </div>
        </div>
        <div class="duo-item-actions">
          <button class="dash-apply-btn" onclick="saveDuoSentence('${s.id}')">💾 Save Sentence</button>
          <button class="uni-secondary-btn" onclick="cancelDuoSentenceEdit('${s.id}')">Cancel</button>
        </div>
      </div>`;
    }

    const tagColor = { General:'#f4f4f4', Greeting:'#e6f9ee', Food:'#fff3cd', Family:'#fce8e8', Travel:'#e8f0fe', Question:'#f3e8ff', Work:'#e8f5e9', Numbers:'#fff0e0', Time:'#e8f8ff', Other:'#f4f4f4' };
    const tagText  = { General:'#555', Greeting:'#1a6b3a', Food:'#856404', Family:'#9b1c1c', Travel:'#1a4b8c', Question:'#5b1a8c', Work:'#1a5c2e', Numbers:'#8c4e00', Time:'#0d6b8c', Other:'#555' };
    return `
    <div class="duo-item-card">
      <div class="duo-item-header">
        <span class="duo-item-de" style="font-size:14px;">${s.sentence_de}</span>
        <span class="duo-item-cat" style="background:${tagColor[s.tag]||'#f4f4f4'};color:${tagText[s.tag]||'#555'}">${s.tag}</span>
        <div class="duo-entry-actions-inline">
          ${duoSentenceConfirmDeleteId === s.id
            ? `<span class="duo-del-confirm">Delete?</span>
               <button class="duo-icon-btn" onclick="confirmDeleteDuoSentence('${s.id}')" style="color:#e05555;">✅</button>
               <button class="duo-icon-btn" onclick="cancelDeleteDuoSentence()">❌</button>`
            : `<button class="duo-icon-btn" onclick="editDuoSentence('${s.id}')" title="Edit">✏️</button>
               <button class="duo-icon-btn" onclick="deleteDuoSentence('${s.id}')" title="Delete">🗑️</button>`}
        </div>
      </div>
      <div class="duo-item-meaning">= ${s.meaning_en}</div>
      ${s.pronunciation ? `<div class="duo-item-pronunciation">🔊 ${s.pronunciation}</div>` : ''}
      <div class="duo-item-meta">📅 ${s.date_learned ? new Date(s.date_learned+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : ''}</div>
    </div>`;
  }).join('');
}

function checkDuoSentDup(id, val) {
  const dup = duoSentenceDuplicateCheck(val, id);
  const el = document.getElementById('ds-dup-' + id);
  if (!el) return;
  if (dup) { el.style.display = 'block'; el.innerHTML = `⚠️ Already saved: <strong>${dup.sentence_de}</strong>`; }
  else { el.style.display = 'none'; el.innerHTML = ''; }
}

function duoSentSetSearch(val) { duoSentenceSearch = val.toLowerCase().trim(); renderDuoSentences(); }
function duoSentClearSearch() { duoSentenceSearch = ''; const el = document.getElementById('duo-sent-search'); if (el) el.value = ''; renderDuoSentences(); }
function duoSentSetFilter(val) { duoSentenceFilter = val; renderDuoSentences(); }


// ═══════════════ 9. AUTH SYSTEM (Supabase Auth) ═══════════════

let _authUser = null; // holds the current Supabase user object

function isLoggedIn() {
  return !!_authUser;
}

function applyAuthState() {
  const loggedIn = isLoggedIn();
  // Show/hide auth-gated tabs (topbar + sub-nav)
  document.querySelectorAll('.topbar-tab.auth-only, .tab.auth-only').forEach(el => {
    el.style.display = loggedIn ? '' : 'none';
  });
  // Show/hide login/logout buttons
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  if (loginBtn) loginBtn.style.display = loggedIn ? 'none' : '';
  if (logoutBtn) logoutBtn.style.display = loggedIn ? '' : 'none';

  // If guest — lock view to Housing only
  const housingTabBtn = document.getElementById('tab-btn-housing');
  if (!loggedIn) {
    document.querySelectorAll('.topbar-tab').forEach(t => t.classList.remove('active'));
    if (housingTabBtn) housingTabBtn.classList.add('active');
    document.querySelectorAll('.sub-nav').forEach(nav => nav.style.display = 'none');
    const housingNav = document.getElementById('nav-housing');
    if (housingNav) housingNav.style.display = 'flex';
    showTab('housing-rooms', housingNav ? housingNav.querySelector('.tab') : null);
  }
}

function openLoginModal() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('visible');
  setTimeout(() => {
    const u = document.getElementById('login-username');
    if (u) u.focus();
  }, 80);
}

function closeLoginModal() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.remove('visible');
  const errEl = document.getElementById('login-error');
  const uEl = document.getElementById('login-username');
  const pEl = document.getElementById('login-password');
  if (errEl) errEl.textContent = '';
  if (uEl) uEl.value = '';
  if (pEl) pEl.value = '';
}

function loginKeydown(e) {
  if (e.key === 'Enter') attemptLogin();
}

async function attemptLogin() {
  const email = (document.getElementById('login-username').value || '').trim();
  const pass  = (document.getElementById('login-password').value || '').trim();
  const errEl = document.getElementById('login-error');
  const btn   = document.querySelector('.login-submit');

  if (!email || !pass) {
    errEl.textContent = 'Please enter your email and password.';
    return;
  }

  // Show loading state
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true; }
  errEl.textContent = '';

  try {
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    _authUser = data.user;
    closeLoginModal();
    applyAuthState();
    // Switch to Admission tab after login
    const admissionTabEl = document.querySelector('.topbar-tab.auth-only');
    if (admissionTabEl) showMainTab('admission', admissionTabEl);
  } catch (err) {
    errEl.textContent = 'Incorrect email or password.';
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  } finally {
    if (btn) { btn.textContent = 'Unlock Dashboard →'; btn.disabled = false; }
  }
}

async function doLogout() {
  if (sbClient) await sbClient.auth.signOut();
  _authUser = null;
  applyAuthState();
}

// Restore session on page load if Supabase already has one
async function initAuth() {
  if (!sbClient) { applyAuthState(); return; }
  const { data } = await sbClient.auth.getSession();
  if (data?.session?.user) {
    _authUser = data.session.user;
  }
  applyAuthState();

  // Keep _authUser in sync if session expires or user logs in elsewhere
  sbClient.auth.onAuthStateChange((_event, session) => {
    _authUser = session?.user || null;
    applyAuthState();
  });
}

// Close modal if overlay background is clicked
document.getElementById('login-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeLoginModal();
});

// ═══════════════ 10. INIT ═══════════════
initTheme();
renderDocChecklist();
renderNotesGrid();
initCalculator();
renderGermanTab();
renderArchive();

// Init auth first (restores session if already logged in), then fetch cloud data
initAuth().then(() => {
  fetchAllCloudData().then(() => {
    updateAll();
  });
});
