// ─── University metadata for submitted cards ───
const UNI_META = {
  hof: {
    title: 'Hof University — MEng Software Engineering',
    sub: 'MEng Software Engineering for Industrial Applications · Hof',
    fit: 'Strong Fit ⭐', fitClass: 'green',
    tuition: '€3,300/sem', deadline: '31 May 2026',
    applyVia: 'Direct Hof portal (Primuss)',
    link: 'https://www3.primuss.de/cgi-bin/bew_anmeldung_v2/index.pl?FH=fhh&Portal=1&Language=en',
    deadlineKey: '2026-05-31',
    sems: 4, tuitionNum: 3300, semFeeNum: 150, livingNum: 900
  },
  fulda: {
    title: 'Fulda University of Applied Sciences',
    sub: 'MSc Global Software Development · Fulda',
    fit: 'Good Fit ✅', fitClass: 'blue',
    tuition: 'Free', deadline: '31 May 2026',
    applyVia: 'uni-assist',
    link: 'https://www.uni-assist.de/en',
    deadlineKey: '2026-05-31',
    sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 925
  },
  koblenz: {
    title: 'University of Koblenz',
    sub: 'MSc Web and Data Science · Koblenz',
    fit: 'Good Fit ✅', fitClass: 'blue',
    tuition: 'Free', deadline: '15 June 2026',
    applyVia: 'uni-assist',
    link: 'https://www.uni-assist.de/en',
    deadlineKey: '2026-06-15',
    sems: 4, tuitionNum: 0, semFeeNum: 290, livingNum: 992
  },
  siegen: {
    title: 'University of Siegen',
    sub: 'MSc Computer Science · Siegen',
    fit: 'Good Fit ✅', fitClass: 'blue',
    tuition: 'Free', deadline: 'No fixed deadline',
    applyVia: 'Direct Siegen portal',
    link: 'http://www.master-cs.eti.uni-siegen.de/',
    deadlineKey: null,
    sems: 4, tuitionNum: 0, semFeeNum: 320, livingNum: 875
  },
  chemnitz: {
    title: 'Chemnitz University of Technology',
    sub: 'MSc Web Engineering · Chemnitz',
    fit: 'Strong Fit ⭐', fitClass: 'green',
    tuition: 'Free', deadline: '15 July 2026',
    applyVia: 'eduapplication.de',
    link: 'https://www.eduapplication.de/',
    deadlineKey: '2026-07-15',
    sems: 4, tuitionNum: 0, semFeeNum: 330, livingNum: 970
  },
  rheinmain: {
    title: 'RheinMain University of Applied Sciences',
    sub: 'MEng AI & Advanced IT · Rüsselsheim',
    fit: 'Good Fit ✅', fitClass: 'blue',
    tuition: 'Free', deadline: '15 July 2026',
    applyVia: 'uni-assist',
    link: 'https://www.uni-assist.de/en',
    deadlineKey: '2026-07-15',
    sems: 3, tuitionNum: 0, semFeeNum: 370, livingNum: 950
  },
  frankfurt: {
    title: 'Frankfurt University of Applied Sciences',
    sub: 'MSc High Integrity Systems · Frankfurt',
    fit: 'Good Fit ✅', fitClass: 'blue',
    tuition: 'Free', deadline: '15 October 2026',
    applyVia: 'uni-assist',
    link: 'https://www.uni-assist.de/en',
    deadlineKey: '2026-10-15',
    sems: 4, tuitionNum: 0, semFeeNum: 360, livingNum: 1000
  },
  kiel: {
    title: 'Kiel University of Applied Sciences',
    sub: 'MSc Computer Science · Kiel',
    fit: 'Conditional ⚠️', fitClass: 'amber',
    tuition: 'Free', deadline: '15 September 2026',
    applyVia: 'uni-assist',
    link: 'https://www.uni-assist.de/en',
    deadlineKey: '2026-09-15',
    sems: 3, tuitionNum: 0, semFeeNum: 378, livingNum: 992
  }
};

// ─── Document checklist data ───
const SHARED_DOCS = [
  'Valid passport (18+ months validity remaining)',
  'Passport-size biometric photographs',
  'APS Certificate (Akademische Prüfstelle) — ✓ already obtained',
  'IELTS certificate (6.5) — confirm it won\'t expire before intake',
  '10th & 12th marksheets',
  "Bachelor's degree certificate + provisional certificate",
  'Semester-wise transcripts / consolidated marksheet (CGPA 7.18)',
  'Updated CV / résumé',
  'Statement of Purpose / Letter of Motivation (tailored per university)',
  '2 Letters of Recommendation (academic or professional)',
  'Work experience certificates / relieving letters (3+ yrs)',
  'uni-assist VPD / university application form',
  'Application fee payment receipt (where applicable)'
];
const UNI_EXTRA_DOCS = {
  hof: ['Proof of 3+ years relevant work experience'],
  fulda: ['Goethe-Zertifikat A1 German certificate — ⚠️ still pending, book in Hyderabad'],
  koblenz: ['Project / work sample — your blockchain forensic evidence management project (used to resolve uni-assist app #3589260)'],
  siegen: [],
  chemnitz: ['Letter of Motivation — still to write'],
  rheinmain: ['Letter of Motivation — still to write'],
  frankfurt: [],
  kiel: ['GRE General score report — register & take the test']
};

// ─── Submitted state (localStorage) ───
function getSubmitted() {
  try { return JSON.parse(localStorage.getItem('submitted_unis') || '{}'); } catch(e) { return {}; }
}
function saveSubmitted(data) {
  localStorage.setItem('submitted_unis', JSON.stringify(data));
}

// ─── Mark a uni as submitted ───
function markSubmitted(key) {
  const data = getSubmitted();
  data[key] = { submittedOn: new Date().toISOString() };
  saveSubmitted(data);
  applySubmittedState();
  refreshPipelineUI();
}

// ─── Undo submitted ───
function undoSubmitted(key) {
  const data = getSubmitted();
  delete data[key];
  saveSubmitted(data);
  applySubmittedState();
  refreshPipelineUI();
}

// ─── Apply submitted state to deadline cards ───
function applySubmittedState() {
  const data = getSubmitted();
  Object.keys(UNI_META).forEach(key => {
    const card = document.getElementById('deadline-card-' + key);
    const submitBtn = document.getElementById('submit-btn-' + key);
    const undoBtn = document.getElementById('undo-btn-' + key);
    if (!card) return;
    if (data[key]) {
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

// ═══════════════ PIPELINE (multi-stage status tracker) ═══════════════
const STAGE_ORDER = ['not_started','submitted','interview','decision','accepted','visa','enrolled'];
const STAGE_LABELS = { not_started:'Not Started', submitted:'Submitted', interview:'Interview', decision:'Decision', accepted:'Accepted 🎉', rejected:'Rejected', visa:'Visa Process', enrolled:'Enrolled 🎓' };

function getPipelineExtra() {
  try { return JSON.parse(localStorage.getItem('gsd_pipeline') || '{}'); } catch(e) { return {}; }
}
function savePipelineExtra(d) {
  localStorage.setItem('gsd_pipeline', JSON.stringify(d));
}
function getStage(key) {
  const extra = getPipelineExtra();
  if (extra[key] && extra[key].stage) return extra[key].stage;
  const sub = getSubmitted();
  return sub[key] ? 'submitted' : 'not_started';
}
function setStage(key, stage, extraFields) {
  const d = getPipelineExtra();
  d[key] = Object.assign({}, d[key], extraFields || {}, { stage });
  savePipelineExtra(d);
}
function moveToInterview(key) { setStage(key, 'interview'); refreshPipelineUI(); }
function moveToDecision(key) { setStage(key, 'decision'); refreshPipelineUI(); }
function setDecision(key, result) {
  setStage(key, result === 'accepted' ? 'accepted' : 'rejected', result === 'accepted' ? { offerType: 'unconditional' } : {});
  refreshPipelineUI();
}
function startVisaProcess(key) { setStage(key, 'visa'); refreshPipelineUI(); }
function markEnrolled(key) { setStage(key, 'enrolled'); refreshPipelineUI(); }
function undoStage(key) {
  const cur = getStage(key);
  if (cur === 'rejected') {
    setStage(key, 'decision');
  } else {
    const idx = STAGE_ORDER.indexOf(cur);
    if (idx <= 1) {
      undoSubmitted(key);
      const d = getPipelineExtra(); delete d[key]; savePipelineExtra(d);
      return;
    } else {
      setStage(key, STAGE_ORDER[idx - 1]);
    }
  }
  refreshPipelineUI();
}
function setOfferField(key, field, value) {
  const d = getPipelineExtra();
  d[key] = Object.assign({}, d[key], { [field]: value });
  savePipelineExtra(d);
  renderAccepted();
}
function refreshPipelineUI() {
  renderPipeline();
  renderAccepted();
  updateSubmittedBadge();
  updateAcceptedBadge();
}

function renderPipeline() {
  const grid = document.getElementById('submitted-cards-grid');
  const empty = document.getElementById('submitted-empty');
  if (!grid) return;
  const started = Object.keys(UNI_META).filter(k => getStage(k) !== 'not_started');
  if (started.length === 0) {
    empty.style.display = 'block';
    grid.innerHTML = '';
    return;
  }
  empty.style.display = 'none';
  const extraAll = getPipelineExtra();
  grid.innerHTML = started.map(key => {
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
    else if (stage === 'accepted') actions = `<button class="pipeline-btn primary" onclick="startVisaProcess('${key}')">🛫 Start Visa Process</button>`;
    else if (stage === 'visa') actions = `<button class="pipeline-btn primary" onclick="markEnrolled('${key}')">🎉 Mark Enrolled</button>`;
    else if (stage === 'enrolled') actions = `<span style="font-size:11px;color:#1a6b3c;font-weight:700;">🎓 Enrolled — congratulations!</span>`;
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
        <div style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:8px;">
          <button class="undo-btn" style="display:inline-flex;margin:0;" onclick="undoStage('${key}')">↩ Undo last step</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ─── Update Pipeline nav badge: count of applications in progress ───
function updateSubmittedBadge() {
  const count = Object.keys(UNI_META).filter(k => getStage(k) !== 'not_started').length;
  const badge = document.getElementById('submitted-count-badge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline'; }
  else { badge.style.display = 'none'; }
}

// ═══════════════ ACCEPTED OFFERS TABLE ═══════════════
function updateAcceptedBadge() {
  const count = Object.keys(UNI_META).filter(k => ['accepted','visa','enrolled'].includes(getStage(k))).length;
  const badge = document.getElementById('accepted-count-badge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline'; }
  else { badge.style.display = 'none'; }
}
function renderAccepted() {
  const acceptedKeys = Object.keys(UNI_META).filter(k => ['accepted','visa','enrolled'].includes(getStage(k)));
  const empty = document.getElementById('accepted-empty');
  const wrap = document.getElementById('accepted-table-wrap');
  const note = document.getElementById('accepted-note');
  const tbody = document.getElementById('accepted-table-body');
  if (!empty || !wrap || !tbody) return;
  if (acceptedKeys.length === 0) {
    empty.style.display = 'block'; wrap.style.display = 'none'; note.style.display = 'none';
    return;
  }
  empty.style.display = 'none'; wrap.style.display = 'block'; note.style.display = 'block';
  const extraAll = getPipelineExtra();
  tbody.innerHTML = acceptedKeys.map(key => {
    const m = UNI_META[key];
    const stage = getStage(key);
    const extra = extraAll[key] || {};
    const offerType = extra.offerType || 'unconditional';
    const acceptBy = extra.acceptBy || '';
    let timeLeft = '—';
    if (acceptBy) {
      const d = daysLeft(acceptBy);
      timeLeft = d < 0 ? '<span class="pill red">Past due</span>' : d <= 7 ? `<span class="pill red">${d}d left</span>` : d <= 21 ? `<span class="pill amber">${d}d left</span>` : `<span class="pill blue">${d}d left</span>`;
    }
    let nextBtn = '';
    if (stage === 'accepted') nextBtn = `<button class="pipeline-btn primary" onclick="startVisaProcess('${key}')">🛫 Start Visa</button>`;
    else if (stage === 'visa') nextBtn = `<button class="pipeline-btn primary" onclick="markEnrolled('${key}')">🎉 Mark Enrolled</button>`;
    else nextBtn = `<span style="font-size:11px;color:#1a6b3c;font-weight:700;">🎓 Enrolled</span>`;
    return `
    <tr>
      <td>${m.title}</td>
      <td>${m.sub.split('·')[0].trim()}</td>
      <td><span class="pill green">${STAGE_LABELS[stage]}</span></td>
      <td><select onchange="setOfferField('${key}','offerType',this.value)" style="border:1px solid #d3d1c7;border-radius:6px;padding:4px 6px;font-size:11px;">
            <option value="unconditional" ${offerType === 'unconditional' ? 'selected' : ''}>Unconditional</option>
            <option value="conditional" ${offerType === 'conditional' ? 'selected' : ''}>Conditional</option>
          </select></td>
      <td><input type="date" value="${acceptBy}" onchange="setOfferField('${key}','acceptBy',this.value)" style="border:1px solid #d3d1c7;border-radius:6px;padding:4px 6px;font-size:11px;"></td>
      <td>${timeLeft}</td>
      <td>${nextBtn}</td>
    </tr>`;
  }).join('');
}

// ═══════════════ GENERIC CHECKLIST PERSISTENCE (Documents + Visa tabs) ═══════════════
function loadChecks() {
  try { return JSON.parse(localStorage.getItem('gsd_checks') || '{}'); } catch(e) { return {}; }
}
function saveCheck(el) {
  const d = loadChecks();
  d[el.id] = el.checked;
  localStorage.setItem('gsd_checks', JSON.stringify(d));
  const item = el.closest('.checklist-item');
  if (item) item.classList.toggle('checked', el.checked);
  updateDocProgress();
  updateVisaProgress();
}
function restoreChecks() {
  const d = loadChecks();
  document.querySelectorAll('.persist-check').forEach(el => {
    if (Object.prototype.hasOwnProperty.call(d, el.id)) el.checked = !!d[el.id];
    const item = el.closest('.checklist-item');
    if (item) item.classList.toggle('checked', el.checked);
  });
  updateDocProgress();
  updateVisaProgress();
}
function updateDocProgress() {
  Object.keys(UNI_META).forEach(key => {
    const card = document.querySelector('.doc-card[data-doc-group="' + key + '"]');
    if (!card) return;
    const boxes = card.querySelectorAll('input[type="checkbox"]');
    const total = boxes.length;
    const checked = card.querySelectorAll('input[type="checkbox"]:checked').length;
    const pct = total ? Math.round((checked / total) * 100) : 0;
    const fill = document.getElementById('docprog-fill-' + key);
    const pctEl = document.getElementById('docprog-pct-' + key);
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
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
function uniShortName(key) {
  return UNI_META[key].title.split(' — ')[0].replace(' University of Applied Sciences', '').replace(' University of Technology', '').replace('University of ', '');
}
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

// ═══════════════ NOTES (per-university journal) ═══════════════
function loadNotes() {
  try { return JSON.parse(localStorage.getItem('gsd_notes') || '{}'); } catch(e) { return {}; }
}
function saveNote(el) {
  const d = loadNotes();
  d[el.id] = el.value;
  localStorage.setItem('gsd_notes', JSON.stringify(d));
  const indicator = document.getElementById('saved-' + el.id);
  if (indicator) {
    indicator.classList.add('show');
    clearTimeout(indicator._t);
    indicator._t = setTimeout(() => indicator.classList.remove('show'), 1500);
  }
}
function restoreNotes() {
  const d = loadNotes();
  document.querySelectorAll('.persist-note').forEach(el => {
    if (d[el.id] !== undefined) el.value = d[el.id];
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
      <div class="notes-saved" id="saved-${id}">✓ Saved</div>
    </div>`;
  }).join('');
}

// ═══════════════ THEME TOGGLE ═══════════════
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

// ═══════════════ COST & BUDGET CALCULATOR ═══════════════
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

// ─── Utility: days from today ───
function daysLeft(deadlineStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const deadline = new Date(deadlineStr + 'T00:00:00');
  return Math.round((deadline - today) / 86400000);
}
function badgeClass(d) {
  if (d < 0) return 'gray'; if (d <= 14) return 'red'; if (d <= 30) return 'amber'; return 'blue';
}
function statusLabel(d) {
  if (d < 0) return ['closed', '❌ Closed'];
  if (d === 0) return ['open', '🔴 TODAY'];
  return ['open', '✅ Open'];
}
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
  document.getElementById('today-display').textContent =
    'Today: ' + today.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  document.getElementById('deadlines-sub').textContent =
    'Countdown calculated from today — ' +
    today.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) + '. Always verify on official sites.';
  const submitted = getSubmitted();
  const urgent = Object.entries(deadlines)
    .filter(([k]) => !submitted[k])
    .map(([k, d]) => ({ key: k, days: daysLeft(d) }))
    .filter(x => x.days >= 0 && x.days <= 14)
    .sort((a, b) => a.days - b.days);
  const urgencyEl = document.getElementById('urgency-note');
  if (urgent.length === 0) {
    urgencyEl.innerHTML = '<strong>ℹ️ No deadlines within the next 14 days.</strong> Check the cards above for upcoming dates.';
  } else {
    const names = { hof:'Hof', fulda:'Fulda', koblenz:'Koblenz', chemnitz:'Chemnitz', rheinmain:'RheinMain', frankfurt:'Frankfurt', kiel:'Kiel' };
    const list = urgent.map(x => `<strong>${names[x.key]}</strong> (${x.days === 0 ? 'today' : x.days + ' days'})`).join(', ');
    urgencyEl.innerHTML = `<strong>🔥 Most urgent right now:</strong> ${list}. Submit these applications immediately.`;
  }
  document.querySelectorAll('.rec-days[data-deadline]').forEach(el => {
    const d = daysLeft(el.dataset.deadline);
    if (d < 0) { el.textContent = 'deadline passed'; el.style.color = '#999'; }
    else if (d === 0) { el.textContent = 'TODAY'; el.style.color = '#c0392b'; el.style.fontWeight = '700'; }
    else { el.textContent = d + ' day' + (d===1?'':'s') + ' left'; el.style.color = d<=14?'#c0392b':d<=30?'#8a5500':'#1a4b8c'; el.style.fontWeight = d<=14?'700':'600'; }
  });
}

// ─── Tab switching ───
function showTab(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  if (el) el.classList.add('active');
}

// ─── Filter rows + search (Overview tab) ───
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

// ─── Sortable Overview table headers ───
let sortState = {};
function sortOverview(key) {
  const tbody = document.querySelector('#tab-overview tbody');
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr[data-fit]'));
  const dir = sortState[key] === 'asc' ? 'desc' : 'asc';
  sortState = {};
  sortState[key] = dir;
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

// ─── Init ───
initTheme();
updateAll();
applySubmittedState();
renderDocChecklist();
renderNotesGrid();
restoreChecks();
restoreNotes();
renderPipeline();
renderAccepted();
updateSubmittedBadge();
updateAcceptedBadge();
initCalculator();