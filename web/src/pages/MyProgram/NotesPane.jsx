import { useState } from 'react';
import ItemForm from './ItemForm';
import RowActions from './RowActions';
import NoteBody from './NoteBody';
import { isLong } from './noteText';
import { dayOf, formatShort } from './dates';
import { TagChips, TagFilter, matchTag } from './Tags';

export default function NotesPane({ subjectId, notes, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set()); // long notes shown in full

  const setOpen = (id, open) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });

  const q = query.trim().toLowerCase();
  const shown = notes.filter(
    (n) => matchTag(n, tag) && (!q || `${n.title} ${n.content ?? ''}`.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="pane-head">
        <input
          className="field notes-search"
          type="search"
          placeholder="Search notes…"
          aria-label="Search notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ New note</button>}
      </div>

      {adding && (
        <ItemForm
          type="note"
          onCancel={() => setAdding(false)}
          onSave={async (f) => {
            const ok = await api.addNote(subjectId, 'note', f);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      <TagFilter items={notes} value={tag} onChange={setTag} />

      {notes.length === 0 && !adding && (
        <p className="empty">No notes yet. Use notes for summaries, formulas, vocabulary, exam tips — anything that isn't tied to a single lecture.</p>
      )}
      {notes.length > 0 && shown.length === 0 && <p className="empty">Nothing matches.</p>}

      <div className="note-grid">
        {shown.map((n, i) =>
          editingId === n.id ? (
            <div key={n.id} className="note-grid-wide">
              <ItemForm
                type="note"
                initial={n}
                onCancel={() => setEditingId(null)}
                onSave={async (f) => {
                  const ok = await api.updateNote(n.id, f);
                  if (ok) setEditingId(null);
                  return ok;
                }}
              />
            </div>
          ) : (
            <article
              key={n.id}
              className={`note-card rise${isLong(n.content) && openIds.has(n.id) ? ' is-open' : ''}`}
              style={{ '--i': i }}
            >
              <div className="entry-head">
                <strong>{n.title}</strong>
                <TagChips note={n} />
                <RowActions onEdit={() => setEditingId(n.id)} onDelete={() => api.deleteNote(n.id)} />
              </div>
              <NoteBody text={n.content} open={openIds.has(n.id)} onToggle={(open) => setOpen(n.id, open)} />
              <time className="mp-muted" dateTime={dayOf(n)}>{formatShort(dayOf(n))}</time>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
