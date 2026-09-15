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

