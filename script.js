// ─── Data ───
const UNI_META = {
  hof: { title: 'Hof University', sub: 'MEng Software Engineering', fit: 'Strong Fit ⭐', fitClass: 'green', tuition: '€3,300/sem', deadline: '31 May 2026', applyVia: 'Direct Hof portal', link: 'https://www3.primuss.de/', deadlineKey: '2026-05-31' },
  fulda: { title: 'Fulda UAS', sub: 'MSc Global Software Dev', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '31 May 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-05-31' },
  koblenz: { title: 'Koblenz Uni', sub: 'MSc Web and Data Science', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 June 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-06-15' },
  siegen: { title: 'Siegen Uni', sub: 'MSc Computer Science', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: 'No fixed deadline', applyVia: 'Direct Siegen portal', link: 'http://www.master-cs.eti.uni-siegen.de/', deadlineKey: null },
  chemnitz: { title: 'Chemnitz TU', sub: 'MSc Web Engineering', fit: 'Strong Fit ⭐', fitClass: 'green', tuition: 'Free', deadline: '15 July 2026', applyVia: 'eduapplication.de', link: 'https://www.eduapplication.de/', deadlineKey: '2026-07-15' },
  rheinmain: { title: 'RheinMain UAS', sub: 'MEng AI & Advanced IT', fit: 'Good Fit ✅', fitClass: 'blue', tuition: 'Free', deadline: '15 July 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-07-15' },
  kiel: { title: 'Kiel UAS', sub: 'MSc Computer Science', fit: 'Conditional ⚠️', fitClass: 'amber', tuition: 'Free', deadline: '15 September 2026', applyVia: 'uni-assist', link: 'https://www.uni-assist.de/en', deadlineKey: '2026-09-15' }
};

// ─── Theme Management ───
function initTheme() {
  const isDark = localStorage.getItem('theme') === 'dark';
  if (isDark) document.body.classList.add('dark-mode');
}
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ─── Submission Logic ───
function getSubmitted() {
  try { return JSON.parse(localStorage.getItem('submitted_unis') || '{}'); } catch(e) { return {}; }
}
function saveSubmitted(data) { localStorage.setItem('submitted_unis', JSON.stringify(data)); }
function markSubmitted(key) {
  const data = getSubmitted();
  data[key] = { submittedOn: new Date().toISOString() };
  saveSubmitted(data); applySubmittedState(); updateSubmittedBadge(); renderSubmittedCards();
}
function undoSubmitted(key) {
  const data = getSubmitted();
  delete data[key];
  saveSubmitted(data); applySubmittedState(); updateSubmittedBadge(); renderSubmittedCards();
}

function applySubmittedState() {
  const data = getSubmitted();
  Object.keys(UNI_META).forEach(key => {
    const card = document.getElementById(`deadline-card-${key}`);
    const submitBtn = document.getElementById(`submit-btn-${key}`);
    const undoBtn = document.getElementById(`undo-btn-${key}`);
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

function renderSubmittedCards() {
  const data = getSubmitted();
  const grid = document.getElementById('submitted-cards-grid');
  const empty = document.getElementById('submitted-empty');
  const footer = document.getElementById('submitted-footer');
  const keys = Object.keys(data);
  if (keys.length === 0) { empty.style.display = 'block'; grid.innerHTML = ''; footer.style.display = 'none'; return; }
  empty.style.display = 'none'; footer.style.display = 'block';
  
  grid.innerHTML = keys.map(key => {
    const m = UNI_META[key];
    const d = data[key];
    const submittedDate = new Date(d.submittedOn).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
    return `
    <div class="card submitted-card" id="submitted-card-${key}">
      <div class="card-header">
        <span class="submitted-ribbon">✅ SUBMITTED</span>
        <div class="card-title">${m.title}</div>
        <div class="card-sub">${m.sub}</div>
        <div class="badges" style="margin-top:6px;"><span class="badge ${m.fitClass}">${m.fit}</span></div>
      </div>
      <div class="card-body">
        <div class="detail-row"><span class="detail-label">Submitted on:</span><span class="detail-val" style="font-weight:600;color:#1a6b3c;">📅 ${submittedDate}</span></div>
        <div class="detail-row"><span class="detail-label">Portal:</span><span class="detail-val"><a href="${m.link}" target="_blank">${m.applyVia} ↗</a></span></div>
        <div style="margin-top:10px;border-top:1px solid #f0ede6;padding-top:10px;">
          <button class="undo-btn" style="margin:0;" onclick="undoSubmitted('${key}')">↩ Undo to Deadlines</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function updateSubmittedBadge() {
  const count = Object.keys(getSubmitted()).length;
  const badge = document.getElementById('submitted-count-badge');
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline'; } 
  else { badge.style.display = 'none'; }
}

// ─── Budget Calculator ───
function calculateBudget() {
  const tuition = parseInt(document.getElementById('calc-uni').value) || 0;
  const semFee = parseInt(document.getElementById('calc-semfee').value) || 0;
  const flights = parseInt(document.getElementById('calc-flights').value) || 0;
  const blockedAccount = 11208; 
  const total = tuition + semFee + flights + blockedAccount;
  document.getElementById('calc-total-display').textContent = '€' + total.toLocaleString('en-GB');
}

// ─── Checklist Logic ───
function initChecklist() {
  const saved = JSON.parse(localStorage.getItem('visa_checklist') || '{}');
  document.querySelectorAll('.chk-item input[type="checkbox"]').forEach(box => {
    if (saved[box.id]) {
      box.checked = true;
      box.closest('.chk-item').classList.add('checked');
    }
  });
}
function saveChk(el) {
  const saved = JSON.parse(localStorage.getItem('visa_checklist') || '{}');
  saved[el.id] = el.checked;
  localStorage.setItem('visa_checklist', JSON.stringify(saved));
  if (el.checked) { el.closest('.chk-item').classList.add('checked'); } 
  else { el.closest('.chk-item').classList.remove('checked'); }
}

// ─── Notes Logic ───
function initNotes() {
  const grid = document.getElementById('notes-grid-container');
  const notesData = JSON.parse(localStorage.getItem('uni_notes') || '{}');
  
  grid.innerHTML = Object.keys(UNI_META).map(key => {
    const m = UNI_META[key];
    const val = notesData[key] || '';
    return `
    <div class="card">
      <div class="card-header"><div class="card-title">${m.title}</div><div class="card-sub">Application portal credentials & LOM notes</div></div>
      <div class="card-body">
        <textarea class="note-textarea" id="note-${key}" placeholder="Add portal login details, LOM ideas, or missing document notes here..." oninput="autoSaveNote('${key}')">${val}</textarea>
        <div style="display:flex; justify-content:flex-end; margin-top:4px;">
          <span class="save-toast" id="toast-${key}">✅ Saved</span>
        </div>
      </div>
    </div>`;
  }).join('');
}
let saveTimeout;
function autoSaveNote(key) {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const notesData = JSON.parse(localStorage.getItem('uni_notes') || '{}');
    notesData[key] = document.getElementById(`note-${key}`).value;
    localStorage.setItem('uni_notes', JSON.stringify(notesData));
    
    const toast = document.getElementById(`toast-${key}`);
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2000);
  }, 500);
}

// ─── Deadlines & Dates ───
function daysLeft(deadlineStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.round((new Date(deadlineStr + 'T00:00:00') - today) / 86400000);
}
function updateAll() {
  const today = new Date();
  document.getElementById('today-display').textContent = 'Today: ' + today.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  Object.keys(UNI_META).forEach(key => {
    const dStr = UNI_META[key].deadlineKey;
    if (!dStr) return;
    const d = daysLeft(dStr);
    const badgeEl = document.getElementById(`badge-${key}`);
    const statusEl = document.getElementById(`status-${key}`);
    const daysEl = document.getElementById(`days-${key}`);
    if (badgeEl && statusEl && daysEl) {
      if (d < 0) { badgeEl.className = 'badge gray'; badgeEl.textContent = 'Closed'; statusEl.className = 'deadline-alert closed'; statusEl.textContent = '❌ Closed'; daysEl.className = 'days-live closed'; daysEl.textContent = 'Deadline passed'; }
      else { badgeEl.className = `badge ${d<=14?'red':d<=30?'amber':'blue'}`; badgeEl.textContent = `${d<=14?'🔥 ':''}${d} days left`; statusEl.className = 'deadline-alert open'; statusEl.textContent = d===0?'🔴 TODAY':'✅ Open'; daysEl.className = `days-live ${d<=7?'urgent':d<=30?'soon':'ok'}`; daysEl.textContent = d===0?'⚠️ TODAY is the last day':`${d} days left`; }
    }
  });
}

// ─── UI Routing ───
function showTab(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  if (el) el.classList.add('active');
}
function filterRows(fit, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('tbody tr[data-fit]').forEach(r => {
    r.style.display = (fit === 'all' || r.dataset.fit === fit) ? '' : 'none';
  });
}

// ─── Boot ───
initTheme();
updateAll();
applySubmittedState();
updateSubmittedBadge();
renderSubmittedCards();
calculateBudget();
initChecklist();
initNotes();