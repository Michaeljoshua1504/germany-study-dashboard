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

  // ── SECTION A: FOCUS STRIP — driven by next_steps Supabase table ──
  renderNextStepsStrip(gerCompleted, colorMap, chipBg, chipTx);

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

  // ── SECTION C: WHAT'S NEXT — driven by next_steps Supabase table ──
  renderNextStepsTable(colorMap);
}

// ═══════════════ 8a. NEXT STEPS — DB-DRIVEN ═══════════════

let nextStepsData = []; // loaded from Supabase next_steps table



async function loadNextSteps() {
  if (!sbClient) { nextStepsData = []; return; }
  try {
    const { data, error } = await sbClient.from('next_steps').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    nextStepsData = data || [];
  } catch (e) {
    console.warn('next_steps table not ready:', e.message);
    nextStepsData = [];
  }
}

function renderNextStepsStrip(gerCompleted, colorMap, chipBg, chipTx) {
  const focusEl = document.getElementById('focus-strip');
  if (!focusEl) return;
  const items = nextStepsData.filter(s => !s.done && (s.section === 'focus' || s.section === 'both'));

  // Always append computed German day item
  if (gerCompleted < 31) {
    const next = Math.min(gerCompleted + 1, 31);
    items.push({ urgency:'blue', text:`German Day ${next}`, detail:`Continue your A1 curriculum (${gerCompleted}/31 days done)`, chip:'In progress', _computed:true });
  }

  const editBtn = isLoggedIn() ? `<button onclick="openStepsManager()" style="float:right;margin-top:-2px;font-size:11px;padding:3px 10px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;">✏️ Edit</button>` : '';

  focusEl.innerHTML = (editBtn ? `<div style="overflow:hidden;margin-bottom:6px;">${editBtn}</div>` : '') +
    items.map(item => `
      <div class="focus-item">
        <div class="focus-dot" style="background:${colorMap[item.urgency] || '#378ADD'};"></div>
        <div class="focus-text"><strong>${item.text}</strong>${item.detail ? ' — ' + item.detail : ''}</div>
        <div class="focus-chip" style="background:${(chipBg||{})[item.urgency]||'#E6F1FB'};color:${(chipTx||{})[item.urgency]||'#185FA5'};">${item.chip || ''}</div>
      </div>`).join('') || '<div style="padding:12px;color:var(--muted);font-size:13px;">All steps complete! 🎉</div>';
}

function renderNextStepsTable(colorMap) {
  const nextTable = document.getElementById('dash-next-table');
  if (!nextTable) return;
  const rows = nextStepsData.filter(s => !s.done && (s.section === 'action' || s.section === 'both'));
  nextTable.innerHTML =
    `<div class="next-header"><span class="next-name" style="flex:2;">Next action</span><span class="next-dl">By when</span></div>` +
    (rows.length ? rows.map(r => `
      <div class="next-row">
        <div class="next-dot" style="background:${colorMap[r.urgency]||'#378ADD'};flex-shrink:0;"></div>
        <div class="next-action" style="flex:2;">${r.text}${r.detail ? ' — ' + r.detail : ''}</div>
        <div class="next-dl">${r.chip || ''}</div>
      </div>`).join('')
    : '<div style="padding:12px;color:var(--muted);font-size:13px;">All done! 🎉</div>');
}

// ── Step Manager (logged-in only) ──
function openStepsManager() {
  let overlay = document.getElementById('steps-manager-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'steps-manager-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9000;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div style="background:var(--card);border-radius:16px;padding:28px;width:min(96vw,620px);max-height:80vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.25);position:relative;">
        <button onclick="closeStepsManager()" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:20px;cursor:pointer;color:var(--text);">✕</button>
        <div style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:16px;">✏️ Manage Next Steps</div>
        <div id="steps-list"></div>
        <div style="margin-top:18px;border-top:1px solid var(--border);padding-top:16px;">
          <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:10px;">Add new step</div>
          <input id="ns-text" placeholder="Step title" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;margin-bottom:6px;">
          <input id="ns-detail" placeholder="Detail (optional)" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;margin-bottom:6px;">
          <div style="display:flex;gap:8px;margin-bottom:10px;">
            <input id="ns-chip" placeholder="Chip label (e.g. 30 Sep)" style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;">
            <select id="ns-urgency" style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;">
              <option value="amber">🟡 Amber</option>
              <option value="blue" selected>🔵 Blue</option>
              <option value="red">🔴 Red</option>
              <option value="green">🟢 Green</option>
            </select>
            <select id="ns-section" style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;">
              <option value="both" selected>Both strips</option>
              <option value="focus">Next Steps only</option>
              <option value="action">Action Plan only</option>
            </select>
          </div>
          <button onclick="addNextStep()" style="background:#1a73e8;color:#fff;border:none;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;width:100%;">+ Add Step</button>
        </div>
        <div id="ns-msg" style="font-size:12px;color:var(--muted);margin-top:8px;text-align:center;"></div>
      </div>`;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  renderStepsList();
}

function closeStepsManager() {
  const overlay = document.getElementById('steps-manager-overlay');
  if (overlay) overlay.style.display = 'none';
}

function renderStepsList() {
  const list = document.getElementById('steps-list');
  if (!list) return;
  const colorMap = { red:'#E24B4A', amber:'#BA7517', blue:'#378ADD', green:'#1D9E75' };
  list.innerHTML = nextStepsData.map((s, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">
      <div style="width:10px;height:10px;border-radius:50%;background:${colorMap[s.urgency]||'#378ADD'};flex-shrink:0;${s.done?'opacity:0.35':''}"></div>
      <div style="flex:1;font-size:13px;color:var(--text);${s.done?'text-decoration:line-through;opacity:0.5':''}"><strong>${s.text}</strong>${s.detail?' — '+s.detail:''}</div>
      <div style="font-size:11px;color:var(--muted);white-space:nowrap;">${s.chip||''}</div>
      ${!s.done ? `<button onclick="markStepDone(${i})" title="Mark done" style="background:#e6f3ea;border:none;border-radius:6px;padding:4px 8px;font-size:12px;cursor:pointer;color:#1D9E75;">✓ Done</button>` : ''}
      <button onclick="deleteStep(${i})" title="Delete" style="background:#fbe9e9;border:none;border-radius:6px;padding:4px 8px;font-size:12px;cursor:pointer;color:#c0392b;">🗑</button>
    </div>`).join('') || '<div style="color:var(--muted);font-size:13px;padding:8px 0;">No steps yet.</div>';
}

async function addNextStep() {
  const text    = document.getElementById('ns-text').value.trim();
  const detail  = document.getElementById('ns-detail').value.trim();
  const chip    = document.getElementById('ns-chip').value.trim();
  const urgency = document.getElementById('ns-urgency').value;
  const section = document.getElementById('ns-section').value;
  const msg     = document.getElementById('ns-msg');
  if (!text) { msg.textContent = 'Step title is required.'; return; }
  const newStep = { text, detail, chip, urgency, section, done: false, sort_order: nextStepsData.length + 1 };
  if (sbClient) {
    const { data, error } = await sbClient.from('next_steps').insert([newStep]).select();
    if (error) { msg.textContent = 'Error: ' + error.message; return; }
    nextStepsData.push(data[0]);
  } else {
    nextStepsData.push(newStep);
  }
  ['ns-text','ns-detail','ns-chip'].forEach(id => document.getElementById(id).value = '');
  msg.textContent = '✅ Step added!';
  setTimeout(() => { if(msg) msg.textContent=''; }, 2000);
  renderStepsList();
  refreshDashboardStrips();
}

async function markStepDone(index) {
  const step = nextStepsData[index];
  if (!step) return;
  if (sbClient && step.id) {
    await sbClient.from('next_steps').update({ done: true }).eq('id', step.id);
  }
  nextStepsData[index].done = true;
  renderStepsList();
  refreshDashboardStrips();
}

async function deleteStep(index) {
  const step = nextStepsData[index];
  if (!step) return;
  if (sbClient && step.id) {
    await sbClient.from('next_steps').delete().eq('id', step.id);
  }
  nextStepsData.splice(index, 1);
  renderStepsList();
  refreshDashboardStrips();
}

function refreshDashboardStrips() {
  const colorMap = { red:'#E24B4A', amber:'#BA7517', blue:'#378ADD', green:'#1D9E75' };
  const chipBg   = { red:'#FCEBEB', amber:'#FAEEDA', blue:'#E6F1FB', green:'#EAF3DE' };
  const chipTx   = { red:'#A32D2D', amber:'#854F0B', blue:'#185FA5', green:'#3B6D11' };
  renderNextStepsStrip(germanCompletedCount(), colorMap, chipBg, chipTx);
  renderNextStepsTable(colorMap);
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

