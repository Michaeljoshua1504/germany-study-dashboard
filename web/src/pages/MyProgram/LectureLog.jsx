import { useState } from 'react';
import ItemForm from './ItemForm';
import RowActions from './RowActions';
import { dayOf, formatDay } from './dates';
import { TagChips, TagFilter, matchTag } from './Tags';

// Day-wise lecture log: entries grouped under their date, newest day first.
export default function LectureLog({ subjectId, lectures, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tag, setTag] = useState('');

  const days = new Map();
  lectures
    .filter((l) => matchTag(l, tag))
    .slice()
    .sort((a, b) => dayOf(b).localeCompare(dayOf(a)) || b.created_at.localeCompare(a.created_at))
    .forEach((l) => {
      const d = dayOf(l);
      days.set(d, [...(days.get(d) ?? []), l]);
    });

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{lectures.length} {lectures.length === 1 ? 'lecture' : 'lectures'} logged</p>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Log lecture</button>}
      </div>

      {adding && (
        <ItemForm
          type="lecture"
          onCancel={() => setAdding(false)}
          onSave={async (f) => {
            const ok = await api.addNote(subjectId, 'lecture', f);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      <TagFilter items={lectures} value={tag} onChange={setTag} />

      {lectures.length === 0 && !adding && (
        <p className="empty">No lectures logged yet. After each class, add what you covered — it builds a day-by-day record you can revise from.</p>
      )}

      <div className="timeline">
        {[...days.entries()].map(([day, items], g) => (
          <section key={day} className="timeline-day rise" style={{ '--i': g }}>
            <h3 className="timeline-date">{formatDay(day)}</h3>
            {items.map((l) =>
              editingId === l.id ? (
                <ItemForm
                  key={l.id}
                  type="lecture"
                  initial={l}
                  onCancel={() => setEditingId(null)}
                  onSave={async (f) => {
                    const ok = await api.updateNote(l.id, f);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <article key={l.id} className="entry">
                  <div className="entry-head">
                    <strong>{l.title}</strong>
                    <TagChips note={l} />
                    <RowActions onEdit={() => setEditingId(l.id)} onDelete={() => api.deleteNote(l.id)} />
                  </div>
                  {l.content && <p className="entry-body">{l.content}</p>}
                </article>
              ),
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
