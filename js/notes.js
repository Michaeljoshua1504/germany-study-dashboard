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


