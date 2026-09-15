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


// ── Dynamic phase header completion indicator ──
function updatePhaseHeaders() {
  [0, 1, 2, 3, 4, 5, 6, 7].forEach(function(n) {
    var section = document.getElementById('phase-' + n);
    var tickEl  = document.getElementById('phase-' + n + '-tick');
    if (!section || !tickEl) return;
    var boxes   = section.querySelectorAll('input.cl-check');
    var total   = boxes.length;
    var checked = Array.from(boxes).filter(function(b) { return b.checked; }).length;
    if (total === 0) return;
    if (checked === total) {
      tickEl.textContent = '✅ ';
      section.classList.add('phase-done');
      section.classList.remove('phase-important');
    } else {
      tickEl.textContent = '';
      section.classList.remove('phase-done');
      // Only show amber highlight if it's a phase we're actively working through
      if (n <= 5) section.classList.add('phase-important');
    }
  });
}

function updateAll() {
  for (const [key, date] of Object.entries(deadlines)) applyCountdown(key, date);
  const today = new Date();
  const todayEl = document.getElementById('today-display');
  if (todayEl) todayEl.textContent = 'Today: ' + today.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  renderDashboard();
  renderHofProfile();
  updatePhaseHeaders();
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

