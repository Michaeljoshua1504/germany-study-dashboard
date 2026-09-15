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


