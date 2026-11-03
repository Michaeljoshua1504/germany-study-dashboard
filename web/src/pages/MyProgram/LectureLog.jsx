import { useState } from 'react';
import ItemForm from './ItemForm';
import SlidePicker from './SlidePicker';
import RowActions from './RowActions';
import NoteBody from './NoteBody';
import Highlight from './Highlight';
import { findHits, searchWords } from './noteText';
import { formatDay } from './dates';
import { TagChips, TagFilter, matchTag } from './Tags';

// Day-wise lecture log: entries grouped under their date, newest day first.
export default function LectureLog({ subjectId, lectures, slides = [], api }) {
  const [adding, setAdding] = useState(false);
  const [picking, setPicking] = useState(false);
  const left = slides.filter((s) => !s.lecture_id);
  const [editingId, setEditingId] = useState(null);
  const [tag, setTag] = useState('');
  const [closed, setClosed] = useState(() => new Set()); // minimized days
  const [query, setQuery] = useState('');
  const [fullIds, setFullIds] = useState(() => new Set()); // matched lectures shown in full
  const [moreIds, setMoreIds] = useState(() => new Set()); // matched lectures showing every hit

  const flip = (setter, id) =>
    setter((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const toggleDay = (day) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (!next.delete(day)) next.add(day);
      return next;
    });

  // Lectures with no date yet are collected under "Date not set" at the top.
  const keyOf = (l) => l.note_date || '';
  const words = searchWords(query);
  const searching = words.length > 0;
  const results = new Map(); // lecture id -> { hits } for lectures that match the search
  const shown = lectures.filter((l) => {
    if (!matchTag(l, tag)) return false;
    if (!searching) return true;
    const r = findHits(l, words);
    if (r) results.set(l.id, r);
    return !!r;
  });
  const totalHits = [...results.values()].reduce((sum, r) => sum + Math.max(1, r.hits.length), 0);
  const days = new Map();
  shown
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

      {lectures.length > 0 && (
        <div className="lecture-search">
          <input
            className="field notes-search"
            type="search"
            placeholder="Search all lectures for a word or sentence…"
            aria-label="Search lectures"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {searching && (
            <span className="search-summary" role="status">
              {results.size === 0
                ? `No lecture mentions “${query.trim()}”.`
                : `${totalHits} ${totalHits === 1 ? 'match' : 'matches'} in ${results.size} ${results.size === 1 ? 'lecture' : 'lectures'}`}
            </span>
          )}
        </div>
      )}

      <TagFilter items={lectures} value={tag} onChange={setTag} />

      {lectures.length === 0 && !adding && (
        <p className="empty">No lectures logged yet. After each class, add what you covered — it builds a day-by-day record you can revise from.</p>
      )}

      {groups.length > 1 && !searching && (
        <div className="timeline-tools">
          <button type="button" onClick={() => setClosed(new Set(groups.map(([d]) => d)))}>Minimize all</button>
          <button type="button" onClick={() => setClosed(new Set())}>Maximize all</button>
        </div>
      )}

      <div className="timeline">
        {groups.map(([day, items], g) => {
          const folded = !searching && closed.has(day) && !items.some((l) => l.id === editingId);
          return (
          <section key={day || 'undated'} className={`timeline-day rise${searching ? ' is-hit' : ''}`} style={{ '--i': g }}>
            <h3 className="timeline-date">
              <button type="button" className="timeline-toggle" aria-expanded={!folded} onClick={() => toggleDay(day)}>
                <span className={`chev${folded ? '' : ' is-open'}`} aria-hidden="true">▸</span>
                {day ? formatDay(day) : 'Date not set'}
                <span className="timeline-count">{items.length}</span>
              </button>
            </h3>
            {folded ? (
              <ul className="timeline-peek">
                {items.map((l) => (
                  <li key={l.id}>{l.title}</li>
                ))}
              </ul>
            ) : items.map((l) =>
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
                <article key={l.id} className={`entry${searching ? ' is-hit' : ''}`}>
                  <div className="entry-head">
                    <strong><Highlight text={l.title} words={words} /></strong>
                    <TagChips note={l} />
                    <RowActions onEdit={() => setEditingId(l.id)} onDelete={() => api.deleteNote(l.id)} />
                  </div>
                  {searching ? (
                    <>
                      <p className="hit-date">📅 Taught on {day ? formatDay(day) : 'a date not set yet'}</p>
                      {results.get(l.id).hits.length > 0 && (
                        <ul className="hit-list">
                          {(moreIds.has(l.id) ? results.get(l.id).hits : results.get(l.id).hits.slice(0, 5)).map((h, i) => (
                            <li key={i}>
                              {h.section && <span className="hit-where">{h.section}</span>}
                              <span><Highlight text={h.line} words={words} /></span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="hit-actions">
                        {results.get(l.id).hits.length > 5 && (
                          <button type="button" className="nb-more" onClick={() => flip(setMoreIds, l.id)}>
                            {moreIds.has(l.id) ? 'Show fewer ▴' : `Show all ${results.get(l.id).hits.length} matches ▾`}
                          </button>
                        )}
                        {l.content && (
                          <button type="button" className="nb-more" aria-expanded={fullIds.has(l.id)} onClick={() => flip(setFullIds, l.id)}>
                            {fullIds.has(l.id) ? 'Hide full lecture ▴' : 'Show full lecture ▾'}
                          </button>
                        )}
                      </div>
                      {fullIds.has(l.id) && <NoteBody text={l.content} words={words} alwaysOpen />}
                    </>
                  ) : (
                    <NoteBody text={l.content} />
                  )}
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
          );
        })}
      </div>
    </div>
  );
}
