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
    programPage: 'https://www.hof-university.com', cityName: 'Hof', cityEmoji: '🏭', housingCost: '€350–550', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: 'Paid internship (yr 3–4) ~€800–1,200/mo offsets tuition', costLevel: 'Low (€900/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★★☆ Good (via internship)', transport: 'Regional train; Nuremberg 1.5 hr', rent: '€350–550/mo', companies: 'SAP, IBM, Siemens, Continental, JPM' },
  fulda: { title: 'Fulda University of Applied Sciences', sub: 'MSc Global Software Development · Fulda', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '31 May 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-05-31', sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 925,
    programPage: 'https://www.hs-fulda.de/en/studyprogramme/global-software-development-msc', cityName: 'Fulda', cityEmoji: '🏫', housingCost: '€400–500', insurance: '~€120', scholarship: 'Deutschlandstipendium', scholarshipLink: 'https://www.hs-fulda.de/en/studieren/my-studies/finance-studies/scholarships/deutschlandstipendium', eligNote: 'Eligible after enrolment — competitive', costLevel: 'Low-Medium (€925/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate', transport: 'Train to Frankfurt ~1 hr', rent: '€400–500/mo', companies: 'Krones, regional IT firms' },
  koblenz: { title: 'University of Koblenz', sub: 'MSc Web and Data Science · Koblenz', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 June 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-06-15', sems: 4, tuitionNum: 0, semFeeNum: 290, livingNum: 992,
    programPage: 'https://www.uni-koblenz.de/en/degree-programs/web-and-data-science-master-of-science', cityName: 'Koblenz', cityEmoji: '🌉', housingCost: '€350–500', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: 'DAAD FIT4SukCESS funded career support programme', costLevel: 'Medium (€992/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★★☆ Good (near Frankfurt/Cologne)', transport: 'Train; Frankfurt 1 hr; Cologne 1 hr', rent: '€350–500/mo', companies: 'Historic Rhine valley, UNESCO heritage' },
  siegen: { title: 'University of Siegen', sub: 'MSc Computer Science · Siegen', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: 'No fixed deadline', applyVia: 'Direct Siegen portal', link: 'http://www.master-cs.eti.uni-siegen.de/', deadlineKey: null, sems: 4, tuitionNum: 0, semFeeNum: 320, livingNum: 875,
    programPage: 'http://www.master-cs.eti.uni-siegen.de/', cityName: 'Siegen', cityEmoji: '⚒️', housingCost: '€270–450', insurance: '~€120', scholarship: 'Deutschlandstipendium', scholarshipLink: 'https://www.sff.uni-siegen.de/index.html.en?lang=en', eligNote: 'Eligible — apply after admission', costLevel: 'Low-Medium (€875/mo)', costLevelClass: 'green', housingDifficulty: 'Easy', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate (Cologne 1 hr)', transport: 'Train; Cologne 1.5 hr', rent: '€270–450/mo', companies: 'FIT in Siegen DAAD-funded programme' },
  chemnitz: { title: 'Chemnitz University of Technology', sub: 'MSc Web Engineering · Chemnitz', fit: 'Strong Fit ⭐', fitClass: 'green', tuition: 'Free', deadline: '15 July 2026', applyVia: 'eduapplication.de', link: 'https://www.eduapplication.de/', deadlineKey: '2026-07-15', sems: 4, tuitionNum: 0, semFeeNum: 330, livingNum: 970,
    programPage: 'https://www.tu-chemnitz.de', cityName: 'Chemnitz', cityEmoji: '⚙️', housingCost: '€270–350', insurance: '~€120', scholarship: 'Yes — DAAD + internal', scholarshipLink: 'https://www.tu-chemnitz.de/international/incoming/stipendien/index.php.en', eligNote: 'Eligible — apply after admission', costLevel: 'Low (€970/mo incl. transport)', costLevelClass: 'green', housingDifficulty: 'Easy — very affordable', housingDifficultyClass: 'green', jobMarket: '★★★☆☆ Moderate', transport: 'Tram + train; Dresden 1 hr', rent: '€270–350/mo', companies: 'VW, BMW plants nearby, mid-size tech' },
  rheinmain: { title: 'RheinMain University of Applied Sciences', sub: 'MEng AI & Advanced IT · Rüsselsheim', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 July 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-07-15', sems: 3, tuitionNum: 0, semFeeNum: 370, livingNum: 950,
    programPage: 'https://www.hs-rm.de/en/international/from-abroad/international-students/studium/english-masters-programs', cityName: 'Rüsselsheim (near Frankfurt)', cityEmoji: '🏘️', housingCost: '€400–600', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'Medium (€950/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★★★ Excellent (via Frankfurt)', transport: 'S-Bahn to Frankfurt 20 min', rent: '€450–650/mo', companies: 'Opel, T-Systems, Fraport, all Frankfurt tech' },
  frankfurt: { title: 'Frankfurt University of Applied Sciences', sub: 'MSc High Integrity Systems · Frankfurt', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 October 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-10-15', sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 1000,
    programPage: 'https://www.frankfurt-university.de/en/', cityName: 'Frankfurt am Main', cityEmoji: '🏙️', housingCost: '€500–800', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'High (€1,000+/mo)', costLevelClass: 'amber', housingDifficulty: 'Hard — very high demand', housingDifficultyClass: 'red', jobMarket: '★★★★★ Best in Germany', transport: 'Excellent U-Bahn + S-Bahn', rent: '€600–900/mo', companies: 'SAP, AWS, Google, Deutsche Bank, T-Systems' },
  kiel: { title: 'Kiel University of Applied Sciences', sub: 'MSc Computer Science · Kiel', fit: 'Conditional ⚠️', fitClass: 'amber', tuition: 'Free', deadline: '15 September 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-09-15', sems: 3, tuitionNum: 0, semFeeNum: 378, livingNum: 992,
    programPage: 'https://www.haw-kiel.de/en/degree-courses/courses/computer-science', cityName: 'Kiel', cityEmoji: '🌊', housingCost: '€400–600', insurance: '~€120', scholarship: null, scholarshipLink: null, eligNote: '—', costLevel: 'Medium (€992/mo)', costLevelClass: 'blue', housingDifficulty: 'Moderate', housingDifficultyClass: 'blue', jobMarket: '★★★☆☆ Moderate (Hamburg 1.5 hr)', transport: 'Good local; Hamburg 1.5 hr', rent: '€400–600/mo', companies: 'Beautiful coastal city, Baltic Sea' }
};

const SHARED_DOCS = [ 'Valid passport (18+ months validity remaining)', 'Passport-size biometric photographs', 'APS Certificate (Akademische Prüfstelle) — ✓ already obtained', 'IELTS certificate (6.5) — confirm it won\'t expire before intake', '10th & 12th marksheets', "Bachelor's degree certificate + provisional certificate", 'Semester-wise transcripts / consolidated marksheet (CGPA 7.18)', 'Updated CV / résumé', 'Statement of Purpose / Letter of Motivation (tailored per university)', '2 Letters of Recommendation (academic or professional)', 'Work experience certificates / relieving letters (3+ yrs)', 'uni-assist VPD / university application form', 'Application fee payment receipt (where applicable)' ];
const UNI_EXTRA_DOCS = { hof: ['Proof of 3+ years relevant work experience'], fulda: ['Goethe-Zertifikat A1 German certificate — ⚠️ still pending, book in Hyderabad'], koblenz: ['Project / work sample — your blockchain forensic evidence management project (used to resolve uni-assist app #3589260)'], siegen: [], chemnitz: ['Letter of Motivation — still to write'], rheinmain: ['Letter of Motivation — still to write'], frankfurt: [], kiel: ['GRE General score report — register & take the test'] };


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
      renderUniDetail();
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
function refreshPipelineUI() { renderDashboard(); renderPipeline(); renderAccepted(); updateSubmittedBadge(); updateAcceptedBadge(); renderUniSidebar(); renderUniDetail(); updateAllDocToggleLabels(); }

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
  const grid = document.getElementById('submitted-cards-grid');
  const section = document.getElementById('inprogress-section');
  if (!grid) return;
  // In-progress = submitted, interview, decision, rejected (accepted/visa/enrolled live in renderAccepted)
  const started = Object.keys(UNI_META).filter(k => {
    const s = getStage(k);
    return s !== 'not_started' && !['accepted','visa','enrolled'].includes(s);
  });

  if (started.length === 0) {
    if (section) section.style.display = 'none';
    grid.innerHTML = '';
  } else {
    if (section) section.style.display = 'block';
    grid.innerHTML = started.map(key => buildPipelineCard(key)).join('');
  }
  updateAppsEmptyState();
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
    if (section) section.style.display = 'none';
    grid.innerHTML = '';
    updateAppsEmptyState();
    return;
  }

  if (section) section.style.display = 'block';

  grid.innerHTML = acceptedKeys.map(key => {
    const m = UNI_META[key];
    const stage = getStage(key);
    const extra = pipelineData[key] || {};
    const offerType = extra.offer_type || 'unconditional';
    const acceptBy = extra.accept_by || '';

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
        <div class="pipeline-actions">${nextBtn}</div>
        <div style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:8px;">
          <button class="docs-toggle-btn" onclick="toggleDocsPanel('${key}')">📄 Documents <span id="docs-pct-${key}"></span></button>
        </div>
        <div class="docs-inline-panel" id="docs-panel-${key}" style="display:none;"></div>
      </div>
    </div>`;
  }).join('');

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
  german: 'learn'
};

function showMainTab(mainTabId, el) {
  document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
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
  document.getElementById('today-display').textContent = 'Today: ' + today.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  renderDashboard();
  renderUniSidebar();
  renderUniDetail();
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

function renderDashboard() {
  const grid = document.getElementById('dash-grid');
  if (!grid) return;

  const FIT_ACCENT = { hof:'#1D9E75', chemnitz:'#1D9E75', fulda:'#378ADD', rheinmain:'#378ADD', koblenz:'#378ADD', siegen:'#378ADD', frankfurt:'#378ADD', kiel:'#BA7517' };
  const FIT_BG    = { hof:'#e6f4ec', chemnitz:'#e6f4ec', fulda:'#e6f0fb', rheinmain:'#e6f0fb', koblenz:'#e6f0fb', siegen:'#e6f0fb', frankfurt:'#e6f0fb', kiel:'#fef3e0' };

  grid.innerHTML = UNI_ORDER.map(key => {
    const m = UNI_META[key];
    const stage = getStage(key);
    const dl = m.deadlineKey ? daysLeft(m.deadlineKey) : null;
    const accent = FIT_ACCENT[key];
    const fitBg  = FIT_BG[key];

    // Deadline pill
    let dlPill = '<span class="dash-pill gray">No fixed deadline</span>';
    if (dl !== null) {
      if (dl < 0) dlPill = '<span class="dash-pill closed">Deadline passed</span>';
      else if (dl === 0) dlPill = '<span class="dash-pill urgent">TODAY!</span>';
      else if (dl <= 14) dlPill = `<span class="dash-pill urgent">🔥 ${dl}d left</span>`;
      else if (dl <= 30) dlPill = `<span class="dash-pill soon">${dl} days left</span>`;
      else dlPill = `<span class="dash-pill ok">${dl} days left</span>`;
    }

    // Stage pill
    const stageColors = { not_started:'gray', submitted:'blue', interview:'amber', decision:'amber', accepted:'green', rejected:'red', visa:'green', enrolled:'green' };
    const stagePill = `<span class="dash-pill ${stageColors[stage] || 'gray'}">${STAGE_LABELS[stage] || 'Not Started'}</span>`;

    // Tuition
    const tuitionStr = m.tuitionNum > 0 ? `<span class="dash-pill amber">€${m.tuitionNum.toLocaleString()}/sem</span>` : '<span class="dash-pill green">Free</span>';

    return `
    <div class="dash-card" style="border-top:3px solid ${accent};" onclick="openUniDetail('${key}')">
      <div class="dash-card-top">
        <div>
          <div class="dash-uni-name">${m.title}</div>
          <div class="dash-uni-prog">${m.sub}</div>
        </div>
        <div class="dash-fit-badge" style="background:${fitBg};color:${accent};">${m.fit.replace(' ⭐','').replace(' ✅','').replace(' ⚠️','')}</div>
      </div>
      <div class="dash-card-mid">
        <div class="dash-meta-row">
          <span class="dash-meta-label">Deadline</span>
          <span>${m.deadlineKey ? new Date(m.deadlineKey+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : 'Rolling'}</span>
          ${dlPill}
        </div>
        <div class="dash-meta-row">
          <span class="dash-meta-label">Status</span>
          ${stagePill}
        </div>
        <div class="dash-meta-row">
          <span class="dash-meta-label">Tuition</span>
          ${tuitionStr}
          <span class="dash-pill gray">€${m.livingNum}/mo living</span>
        </div>
      </div>
      <div class="dash-card-footer">
        <a href="${m.link}" target="_blank" class="dash-apply-btn" onclick="event.stopPropagation()">Apply →</a>
        ${stage === 'not_started' ? `<button class="dash-submit-btn" onclick="event.stopPropagation();markSubmitted('${key}')">✅ Mark Submitted</button>` : `<button class="dash-submit-btn submitted" onclick="event.stopPropagation();undoSubmitted('${key}')">↩ Undo Submit</button>`}
      </div>
    </div>`;
  }).join('');

  // Stat cards
  const subCount = Object.keys(UNI_META).filter(k => getStage(k) !== 'not_started').length;
  const accCount = Object.keys(UNI_META).filter(k => ['accepted','visa','enrolled'].includes(getStage(k))).length;
  const now = new Date();
  const monthEnd = new Date(now.getFullYear(), now.getMonth()+1, 0);
  const dlThisMonth = Object.values(deadlines).filter(d => { const dd = new Date(d+'T00:00:00'); return dd >= now && dd <= monthEnd; }).length;
  const s = document.getElementById('stat-submitted'); if (s) s.textContent = subCount;
  const a = document.getElementById('stat-accepted');  if (a) a.textContent = accCount;
  const dl2 = document.getElementById('stat-deadlines'); if (dl2) dl2.textContent = dlThisMonth;

  // Alert strip
  const alertEl = document.getElementById('dash-alert');
  if (alertEl) {
    const urgent = Object.entries(deadlines)
      .filter(([k]) => getStage(k) === 'not_started')
      .map(([k,d]) => ({key:k, days:daysLeft(d)}))
      .filter(x => x.days >= 0 && x.days <= 14)
      .sort((a,b) => a.days - b.days);
    if (urgent.length > 0) {
      const names = { hof:'Hof UAS', fulda:'Fulda UAS', koblenz:'Koblenz', chemnitz:'Chemnitz TU', rheinmain:'RheinMain UAS', frankfurt:'Frankfurt UAS', kiel:'Kiel UAS', siegen:'Siegen' };
      alertEl.style.display = 'flex';
      alertEl.innerHTML = `<span>🔥 <strong>Urgent:</strong> ${urgent.map(x=>`${names[x.key]} (${x.days===0?'today':x.days+'d'})`).join(' · ')}</span>`;
    } else {
      alertEl.style.display = 'none';
    }
  }
}

// ═══════════════ 8b. UNIVERSITIES TAB RENDERER ═══════════════

let selectedUni = 'hof';

function renderUniSidebar() {
  const sidebar = document.getElementById('uni-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = UNI_ORDER.map(key => {
    const m = UNI_META[key];
    const active = key === selectedUni ? 'active' : '';
    const stage = getStage(key);
    const dl = m.deadlineKey ? daysLeft(m.deadlineKey) : null;
    const urgentDot = (dl !== null && dl >= 0 && dl <= 14 && stage === 'not_started') ? '<span class="uni-side-dot"></span>' : '';
    return `
    <div class="uni-side-item ${active}" onclick="selectUni('${key}')">
      <div class="uni-side-name">${m.cityEmoji} ${m.cityName.split(' ')[0]} ${urgentDot}</div>
      <div class="uni-side-sub">${m.sub.split('·')[0].trim()}</div>
    </div>`;
  }).join('');
}

function selectUni(key) {
  selectedUni = key;
  renderUniSidebar();
  renderUniDetail();
}

function renderUniDetail() {
  const panel = document.getElementById('uni-detail');
  if (!panel) return;

  const m = UNI_META[selectedUni];
  const d = admissionData[selectedUni];
  const stage = getStage(selectedUni);
  const dl = m.deadlineKey ? daysLeft(m.deadlineKey) : null;

  let dlBadge = '<span class="dash-pill gray">No fixed deadline</span>';
  if (dl !== null) {
    if (dl < 0) dlBadge = '<span class="dash-pill closed">Deadline passed</span>';
    else if (dl <= 14) dlBadge = `<span class="dash-pill urgent">🔥 ${dl}d left</span>`;
    else if (dl <= 30) dlBadge = `<span class="dash-pill soon">${dl} days left</span>`;
    else dlBadge = `<span class="dash-pill ok">${dl} days left</span>`;
  }

  const stageColors = { not_started:'gray', submitted:'blue', interview:'amber', decision:'amber', accepted:'green', rejected:'red', visa:'green', enrolled:'green' };
  const stagePill = `<span class="dash-pill ${stageColors[stage] || 'gray'}">${STAGE_LABELS[stage] || 'Not Started'}</span>`;

  let elig = '<div class="adm-loading" style="padding:1.5rem;">⏳ Loading eligibility data…</div>';
  if (d) {
    elig = `
      <div class="adm-row"><div class="adm-label">🎤 IELTS</div><div class="adm-val">${d.ielts_req} ${IELTS_PILL[d.ielts_status]||''}</div></div>
      <div class="adm-row"><div class="adm-label">🇩🇪 German</div><div class="adm-val">${d.german_req}</div></div>
      <div class="adm-row"><div class="adm-label">📝 GRE</div><div class="adm-val">${d.gre_req} ${GRE_PILL[d.gre_status]||''}</div></div>
      <div class="adm-row"><div class="adm-label">🎓 Min Grade</div><div class="adm-val">${d.min_grade}</div></div>
      <div class="adm-row"><div class="adm-label">💼 Internship</div><div class="adm-val">${d.internship}</div></div>
      <div class="adm-row adm-row-focus"><div class="adm-label">📚 Focus</div><div class="adm-val adm-focus-text">${d.program_focus}</div></div>
      ${d.special_req ? `<div class="adm-special"><span class="adm-special-label">📌 Note</span>${d.special_req}</div>` : ''}
    `;
  }

  panel.innerHTML = `
    <div class="uni-detail-header">
      <div>
        <div class="uni-detail-title">${m.title}</div>
        <div class="uni-detail-sub">${m.sub}</div>
      </div>
      <div class="dash-fit-badge" style="background:${m.fitClass==='green'?'#e6f4ec':m.fitClass==='amber'?'#fef3e0':'#e6f0fb'};color:${m.fitClass==='green'?'#1a6b3c':m.fitClass==='amber'?'#8a5500':'#1a4b8c'};">${m.fit}</div>
    </div>

    <div class="uni-detail-pills">
      ${dlBadge} ${stagePill}
      ${m.tuitionNum > 0 ? `<span class="dash-pill amber">€${m.tuitionNum.toLocaleString()}/sem tuition</span>` : '<span class="dash-pill green">Free tuition</span>'}
    </div>

    <div class="uni-detail-actions">
      <a href="${m.link}" target="_blank" class="dash-apply-btn">Apply via ${m.applyVia} →</a>
      <a href="${m.programPage}" target="_blank" class="uni-secondary-btn">Programme Page ↗</a>
      ${stage === 'not_started' ? `<button class="dash-submit-btn" onclick="markSubmitted('${selectedUni}')">✅ Mark Submitted</button>` : `<button class="dash-submit-btn submitted" onclick="undoSubmitted('${selectedUni}')">↩ Undo Submit</button>`}
    </div>

    <div class="uni-detail-grid">
      <div class="uni-detail-card">
        <div class="uni-detail-card-title">🎯 Eligibility</div>
        ${elig}
      </div>

      <div class="uni-detail-card">
        <div class="uni-detail-card-title">💶 Costs</div>
        <div class="adm-row"><div class="adm-label">Tuition</div><div class="adm-val">${m.tuition}</div></div>
        <div class="adm-row"><div class="adm-label">Sem. Fee</div><div class="adm-val">€${m.semFeeNum}/sem</div></div>
        <div class="adm-row"><div class="adm-label">Living</div><div class="adm-val">€${m.livingNum}/mo</div></div>
        <div class="adm-row"><div class="adm-label">Housing</div><div class="adm-val">${m.housingCost}/mo</div></div>
        <div class="adm-row"><div class="adm-label">Insurance</div><div class="adm-val">${m.insurance}/mo</div></div>
        <div class="adm-row"><div class="adm-label">Scholarship</div><div class="adm-val">${m.scholarship ? (m.scholarshipLink ? `<a href="${m.scholarshipLink}" target="_blank">${m.scholarship} ↗</a>` : m.scholarship) : 'None listed'}</div></div>
        ${m.eligNote && m.eligNote !== '—' ? `<div class="adm-special"><span class="adm-special-label">📌 Note</span>${m.eligNote}</div>` : ''}
      </div>

      <div class="uni-detail-card">
        <div class="uni-detail-card-title">${m.cityEmoji} ${m.cityName}</div>
        <div class="adm-row"><div class="adm-label">Cost Level</div><div class="adm-val"><span class="pill ${m.costLevelClass}">${m.costLevel}</span></div></div>
        <div class="adm-row"><div class="adm-label">Housing</div><div class="adm-val"><span class="pill ${m.housingDifficultyClass}">${m.housingDifficulty}</span></div></div>
        <div class="adm-row"><div class="adm-label">Job Market</div><div class="adm-val">${m.jobMarket}</div></div>
        <div class="adm-row"><div class="adm-label">Transport</div><div class="adm-val">${m.transport}</div></div>
        <div class="adm-row"><div class="adm-label">Rent</div><div class="adm-val">${m.rent}</div></div>
        <div class="adm-row adm-row-focus"><div class="adm-label">Companies</div><div class="adm-val adm-focus-text">${m.companies}</div></div>
      </div>
    </div>
  `;
}

function openUniDetail(key) {
  selectedUni = key;
  showTab('universities', document.querySelector('.tab[onclick*="universities"]'));
  renderUniSidebar();
  renderUniDetail();
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

function todayDateStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
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
  const streakEl = document.getElementById('duo-streak-' + localId);
  if (!dateEl || !textEl) return;

  const entry_date = dateEl.value || todayDateStr();
  const entry_text = textEl.value.trim();
  const streak = streakEl && streakEl.value ? parseInt(streakEl.value, 10) : null;

  if (!entry_text) {
    alert('Write something about what you practiced before saving.');
    return;
  }

  const idx = duolingoEntries.findIndex(e => e.id === localId);
  if (idx === -1) return;

  if (sbClient) {
    const isNew = duolingoEntries[idx]._isNew;

    if (isNew) {
      // New entry — insert (no id yet)
      sbClient.from('duolingo_log').insert({ entry_date, entry_text, streak }).select().then(({ data, error }) => {
        if (error) { console.error('Failed to save Duolingo entry:', error.message); return; }
        if (data && data[0]) {
          duolingoEntries[idx] = data[0];
          duolingoEditingId = null;
          renderDuolingoLog();
        }
      });
    } else {
      // Existing entry — update by id, never insert
      sbClient.from('duolingo_log').update({ entry_date, entry_text, streak }).eq('id', localId).select().then(({ data, error }) => {
        if (error) { console.error('Failed to update Duolingo entry:', error.message); return; }
        if (data && data[0]) {
          duolingoEntries[idx] = data[0];
          duolingoEditingId = null;
          renderDuolingoLog();
        }
      });
    }
  } else {
    duolingoEntries[idx] = { ...duolingoEntries[idx], entry_date, entry_text, streak, _isNew: false };
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

function deleteDuolingoEntry(id) {
  if (!confirm('Delete this entry? This cannot be undone.')) return;
  duolingoEntries = duolingoEntries.filter(e => e.id !== id);
  renderDuolingoLog();
  const isTemp = typeof id === 'string' && id.startsWith('temp-');
  if (sbClient && !isTemp) {
    sbClient.from('duolingo_log').delete().eq('id', id).then(({error}) => {
      if (error) console.error('Failed to delete Duolingo entry:', error.message);
    });
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

  const streakEl = document.getElementById('duo-stat-streak');
  if (streakEl) {
    const withStreak = duolingoEntries.filter(e => !e._isNew && e.streak != null).sort((a,b) => b.entry_date.localeCompare(a.entry_date));
    streakEl.textContent = withStreak.length ? withStreak[0].streak : '0';
  }
}

function renderDuolingoLog() {
  const list = document.getElementById('duolingo-log-list');
  const empty = document.getElementById('duolingo-empty');
  if (!list) return;

  if (duolingoEntries.length === 0) {
    if (empty) empty.style.display = 'block';
    list.innerHTML = '';
    updateDuolingoStats();
    return;
  }
  if (empty) empty.style.display = 'none';

  const sorted = [...duolingoEntries].sort((a,b) => {
    if (a._isNew) return -1;
    if (b._isNew) return 1;
    return b.entry_date.localeCompare(a.entry_date);
  });

  list.innerHTML = sorted.map(e => {
    const isEditing = e._isNew || duolingoEditingId === e.id;
    const dateLabel = e.entry_date ? new Date(e.entry_date + 'T00:00:00').toLocaleDateString('en-GB',{weekday:'short', day:'numeric', month:'short', year:'numeric'}) : '';

    if (isEditing) {
      return `
      <div class="duo-entry-card editing">
        <div class="duo-entry-edit-row">
          <input type="date" id="duo-date-${e.id}" value="${e.entry_date || todayDateStr()}" class="duo-date-input">
          <input type="number" id="duo-streak-${e.id}" placeholder="Streak (optional)" value="${e.streak ?? ''}" class="duo-streak-input" min="0">
        </div>
        <textarea id="duo-text-${e.id}" class="ger-note-textarea" style="min-height:80px;" placeholder="What did you practice today? New words, a lesson you found tricky, anything...">${e.entry_text || ''}</textarea>
        <div class="duo-entry-actions">
          <button class="dash-apply-btn" onclick="saveDuolingoEntry('${e.id}')">💾 Save Entry</button>
          <button class="uni-secondary-btn" onclick="cancelDuolingoEdit('${e.id}')">Cancel</button>
        </div>
      </div>`;
    }

    return `
    <div class="duo-entry-card">
      <div class="duo-entry-header">
        <span class="duo-entry-date">${dateLabel}</span>
        ${e.streak != null ? `<span class="dash-pill amber">🔥 ${e.streak} day streak</span>` : ''}
        <div class="duo-entry-actions-inline">
          <button class="duo-icon-btn" onclick="editDuolingoEntry('${e.id}')" title="Edit">✏️</button>
          <button class="duo-icon-btn" onclick="deleteDuolingoEntry('${e.id}')" title="Delete">🗑️</button>
        </div>
      </div>
      <div class="duo-entry-text">${e.entry_text}</div>
    </div>`;
  }).join('');

  updateDuolingoStats();
}


// ═══════════════ 9. INIT ═══════════════
initTheme();
renderDocChecklist();
renderNotesGrid();
initCalculator();
renderGermanTab();

// Fetch from cloud to boot the app
fetchAllCloudData().then(() => {
  updateAll();
});