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


