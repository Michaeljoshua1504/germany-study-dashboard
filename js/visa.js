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

  // Support both old .checklist-item and new .cl-item styles
  const oldItem = el.closest('.checklist-item');
  if (oldItem) oldItem.classList.toggle('checked', el.checked);

  const newItem = el.closest('.cl-item');
  if (newItem) {
    if (el.checked) {
      // Save original priority class so we can restore if unchecked
      if (!newItem.dataset.origClass) {
        const pc = ['cl-critical','cl-important','cl-optional'].find(c => newItem.classList.contains(c));
        if (pc) newItem.dataset.origClass = pc;
      }
      newItem.classList.remove('cl-critical','cl-important','cl-optional');
      newItem.classList.add('cl-done');
      const chip = newItem.querySelector('.cl-chip');
      if (chip) { chip.className = 'cl-chip chip-done'; chip.textContent = 'Done'; }
    } else {
      newItem.classList.remove('cl-done');
      const orig = newItem.dataset.origClass;
      if (orig) newItem.classList.add(orig);
      // Restore chip text/class from data attribute if set
      const chip = newItem.querySelector('.cl-chip');
      if (chip && newItem.dataset.origChipClass && newItem.dataset.origChipText) {
        chip.className = 'cl-chip ' + newItem.dataset.origChipClass;
        chip.textContent = newItem.dataset.origChipText;
      }
    }
  }

  updateDocProgress(); updateVisaProgress(); if(typeof updatePhaseRings==="function") updatePhaseRings();
}

function restoreChecks() {
  document.querySelectorAll('.persist-check').forEach(el => {
    if (Object.prototype.hasOwnProperty.call(checksData, el.id)) {
      el.checked = !!checksData[el.id];
    }

    // Old style
    const oldItem = el.closest('.checklist-item');
    if (oldItem) oldItem.classList.toggle('checked', el.checked);

    // New style — save original chip info before restoring
    const newItem = el.closest('.cl-item');
    if (newItem) {
      const chip = newItem.querySelector('.cl-chip');
      if (chip && !newItem.dataset.origChipClass) {
        newItem.dataset.origChipClass = [...chip.classList].find(c => c.startsWith('chip-') && c !== 'chip-done') || '';
        newItem.dataset.origChipText = chip.textContent.trim();
      }
      if (el.checked) {
        if (!newItem.dataset.origClass) {
          const pc = ['cl-critical','cl-important','cl-optional'].find(c => newItem.classList.contains(c));
          if (pc) newItem.dataset.origClass = pc;
        }
        newItem.classList.remove('cl-critical','cl-important','cl-optional');
        newItem.classList.add('cl-done');
        if (chip) { chip.className = 'cl-chip chip-done'; chip.textContent = 'Done'; }
      }
    }
  });
  updateDocProgress(); updateVisaProgress();
  updatePhaseHeaders();
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



/* ── Gallery phase-ring progress ── */
function updatePhaseRings() {
  document.querySelectorAll('.visa-gallery .phase').forEach(phase => {
    const boxes = phase.querySelectorAll('input[type="checkbox"]');
    if (!boxes.length) return;
    const total = boxes.length;
    const checked = phase.querySelectorAll('input[type="checkbox"]:checked').length;
    const pct = checked / total;
    const circle = phase.querySelector('.phase-ring-fill');
    const counter = phase.querySelector('.phase-counter');
    if (circle) {
      const circumference = 94.25;
      circle.style.strokeDashoffset = circumference - (pct * circumference);
      // Color the ring by completion
      if (pct === 1) { circle.style.stroke = '#1D9E75'; }
      else if (pct > 0.5) { circle.style.stroke = '#E09B20'; }
      else { circle.style.stroke = phase.classList.contains('phase-critical') ? '#E24B4A' :
             phase.classList.contains('phase-done') ? '#1D9E75' : '#E09B20'; }
    }
    if (counter) {
      counter.textContent = checked + '/' + total;
      counter.classList.toggle('all-done', checked === total);
    }
  });
}

// Patch saveCheck to also update rings
const _origSaveCheck = typeof saveCheck !== 'undefined' ? saveCheck : null;

/* ── Gallery accordion: only one phase open at a time ── */
function initVisaGalleryAccordion() {
  const gallery = document.querySelector('.visa-gallery');
  if (!gallery) return;
  gallery.addEventListener('click', function(e) {
    const summary = e.target.closest('summary');
    if (!summary) return;
    const clickedPhase = summary.closest('.phase');
    if (!clickedPhase) return;
    // Close all others
    gallery.querySelectorAll('.phase[open]').forEach(p => {
      if (p !== clickedPhase) p.removeAttribute('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVisaGalleryAccordion();
  updatePhaseRings();
  // Re-run after localStorage checks are applied
  setTimeout(updatePhaseRings, 300);
});
