import { useState } from 'react';
import ItemForm from './ItemForm';
import SlidePicker from './SlidePicker';
import RowActions from './RowActions';
import { formatDay } from './dates';
import { TagChips, TagFilter, matchTag } from './Tags';

// Day-wise lecture log: entries grouped under their date, newest day first.
export default function LectureLog({ subjectId, lectures, slides = [], api }) {
  const [adding, setAdding] = useState(false);
  const [picking, setPicking] = useState(false);
  const left = slides.filter((s) => !s.lecture_id);
  const [editingId, setEditingId] = useState(null);
  const [tag, setTag] = useState('');

  // Lectures with no date yet are collected under "Date not set" at the top.
  const keyOf = (l) => l.note_date || '';
  const days = new Map();
  lectures
    .filter((l) => matchTag(l, tag))
    .slice()
    .sort((a, b) => keyOf(b).localeCompare(keyOf(a)) || b.created_at.localeCompare(a.created_at))
    .forEach((l) => {
      const d = keyOf(l);
      days.set(d, [...(days.get(d) ?? []), l]);
    });
  const groups = [...days.entries()].sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : 0));

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{lectures.length} {lectures.length === 1 ? 'lecture' : 'lectures'} logged</p>
        {!adding && !picking && (
          <span className="pane-head-actions">
            {left.length > 0 && (
              <button type="button" className="btn-ghost" onClick={() => setPicking(true)}>+ From slides ({left.length} left)</button>
            )}
            <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Log lecture</button>
          </span>
        )}
      </div>

      {picking && (
        <SlidePicker
          slides={left}
          onCancel={() => setPicking(false)}
          onSave={async ({ ids, fields }) => {
            const ok = await api.addLectureFromSlides(subjectId, ids, fields);
            if (ok) setPicking(false);
            return ok;
          }}
        />
      )}

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
        {groups.map(([day, items], g) => (
          <section key={day || 'undated'} className="timeline-day rise" style={{ '--i': g }}>
            <h3 className="timeline-date">{day ? formatDay(day) : 'Date not set'}</h3>
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
                  {!l.note_date && (
                    <label className="set-date">
                      <span>Set date</span>
                      <input
                        className="field"
                        type="date"
                        value=""
                        onChange={(e) => e.target.value && api.updateNote(l.id, { note_date: e.target.value })}
                      />
                    </label>
                  )}
                </article>
              ),
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
