import { useState } from 'react';
import AnimatedNumber from './AnimatedNumber';
import FieldForm from './FieldForm';
import RowActions from './RowActions';
import { countdown, daysBetween, formatDay, parseISO, todayISO } from './dates';

const KINDS = [
  { value: 'deadline', label: 'Deadline' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'class', label: 'Class' },
];
const KIND_LABEL = Object.fromEntries(KINDS.map((k) => [k.value, k.label]));

const FIELDS = [
  { name: 'title', label: 'What', required: true, placeholder: 'Upload proposal in Moodle' },
  { name: 'kind', label: 'Type', type: 'select', width: 'sm', default: 'deadline', options: KINDS },
  { name: 'event_date', label: 'Date', type: 'date', required: true, width: 'sm' },
  { name: 'at_time', label: 'Time (optional)', placeholder: '08:00 or 23:59 CET', width: 'sm' },
  { name: 'details', label: 'Details (optional)', type: 'textarea', rows: 2 },
];

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'deadlines', label: 'Deadlines' },
  { id: 'class', label: 'Classes' },
];
const matches = (e, f) => f === 'all' || (f === 'class' ? e.kind === 'class' : e.kind !== 'class');
const FIRST_ROWS = 6;

// Always-visible key dates and timetable at the top of the overview: the
// next deadline as a countdown, a progress bar, filters, and rows you can open.
export default function KeyDates({ subject, items, api }) {
  const [today] = useState(todayISO);
  const [filter, setFilter] = useState('all');
  const [showPast, setShowPast] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const sorted = [...items].sort(
    (a, b) => a.event_date.localeCompare(b.event_date) || (a.at_time ?? '').localeCompare(b.at_time ?? ''),
  );
  const upcoming = sorted.filter((e) => e.event_date >= today);
  const pastCount = sorted.length - upcoming.length;
  const pool = showPast ? sorted : upcoming;
  const filtered = pool.filter((e) => matches(e, filter));
  const rows = showAll ? filtered : filtered.slice(0, FIRST_ROWS);

  const next = upcoming.find((e) => e.kind !== 'class' && !e.done);
  const nextDays = next ? daysBetween(today, next.event_date) : 0;

  const first = sorted[0]?.event_date;
  const last = sorted[sorted.length - 1]?.event_date;
  const span = first && last ? daysBetween(first, last) : 0;
  const pct = span > 0 ? Math.max(0, Math.min(100, Math.round((daysBetween(first, today) / span) * 100))) : 0;

  const month = (d) => parseISO(d).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  function renderRow(e, i) {
    if (editingId === e.id) {
      return (
        <li key={e.id}>
          <FieldForm
            fields={FIELDS}
            initial={e}
            onCancel={() => setEditingId(null)}
            onSave={async (v) => {
              const ok = await api.updateItem('schedule', e.id, v);
              if (ok) setEditingId(null);
              return ok;
            }}
          />
        </li>
      );
    }
    const c = countdown(e.event_date, today, { prefix: '', far: 'days', past: 'ago' });
    const d = parseISO(e.event_date);
    const open = openId === e.id;
    const cls = [
      'kd-row',
      e.event_date === today && 'is-today',
      e.event_date < today && 'is-past',
      e.done && 'is-done',
      open && 'is-open',
    ].filter(Boolean).join(' ');
    return (
      <li key={e.id} className="kd-item rise" style={{ '--i': Math.min(i, 8) }}>
        <button type="button" className={cls} aria-expanded={open} onClick={() => setOpenId(open ? null : e.id)}>
          <span className="kd-date">
            <b>{d.getDate()}</b>
            <span>{d.toLocaleDateString(undefined, { month: 'short' })}</span>
          </span>
          <span className="kd-main">
            <span className="kd-title">{e.title}</span>
            <span className="kd-meta">
              {d.toLocaleDateString(undefined, { weekday: 'long' })}
              {e.at_time ? ` · ${e.at_time}` : ''}
            </span>
          </span>
          <span className="kd-side">
            <span className={`chip kd-kind kd-${e.kind}`}>{KIND_LABEL[e.kind] ?? e.kind}</span>
            <span className={`chip ${c.tone}`}>{c.text}</span>
          </span>
        </button>
        {open && (
          <div className="kd-detail">
            <span className="mp-muted">{formatDay(e.event_date)}</span>
            {e.details && <p>{e.details}</p>}
            <div className="kd-detail-actions">
              {e.kind !== 'class' && (
                <label className="todo-check">
                  <input type="checkbox" checked={!!e.done} onChange={() => api.updateItem('schedule', e.id, { done: !e.done })} />
                  <span>{e.done ? 'Done' : 'Mark as done'}</span>
                </label>
              )}
              <RowActions onEdit={() => setEditingId(e.id)} onDelete={() => api.deleteItem('schedule', e.id)} />
            </div>
          </div>
        )}
      </li>
    );
  }

  let lastMonth = '';
  const list = rows.flatMap((e, i) => {
    const m = month(e.event_date);
    const out = [];
    if (m !== lastMonth) {
      lastMonth = m;
      out.push(<li key={`m-${m}`} className="kd-month">{m}</li>);
    }
    out.push(renderRow(e, i));
    return out;
  });

  return (
    <section className="kd rise">
      <div className="kd-head">
        <h3>Key dates and timetable</h3>
        {!adding && <button type="button" className="btn-ghost" onClick={() => setAdding(true)}>+ Add date</button>}
      </div>

      {adding && (
        <FieldForm
          fields={FIELDS}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('schedule', subject.id, v);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {sorted.length === 0 && !adding && (
        <p className="mp-muted">Nothing here yet. Add deadlines, presentations and class dates for {subject.name}, and the countdown stays on this page.</p>
      )}

      {next && (
        <div className="kd-hero">
          <div className={`kd-days${nextDays <= 7 ? ' is-soon' : ''}`}>
            <AnimatedNumber value={nextDays} />
            <small>{nextDays === 1 ? 'day' : 'days'}</small>
          </div>
          <div className="kd-hero-text">
            <span className="kd-label">Next deadline</span>
            <strong>{next.title}</strong>
            <span className="mp-muted">
              {formatDay(next.event_date)}
              {next.at_time ? ` · ${next.at_time}` : ''}
            </span>
          </div>
        </div>
      )}

      {span > 0 && (
        <div className="kd-progress-wrap" title={`${pct}% of the timetable has passed`}>
          <div className="kd-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Timetable progress">
            <span style={{ width: `${pct}%` }} />
          </div>
          <span className="mp-muted">{pct}% of the timetable done</span>
        </div>
      )}

      {sorted.length > 0 && (
        <>
          <div className="tag-filter" role="group" aria-label="Filter dates">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`tag-filter-btn${filter === f.id ? ' is-active' : ''}`}
                onClick={() => { setFilter(f.id); setShowAll(false); }}
              >
                {f.label} <span>{pool.filter((e) => matches(e, f.id)).length}</span>
              </button>
            ))}
            {pastCount > 0 && (
              <button type="button" className="tag-filter-btn kd-past-toggle" aria-pressed={showPast} onClick={() => { setShowPast(!showPast); setShowAll(false); }}>
                {showPast ? 'Hide past' : `Show past (${pastCount})`}
              </button>
            )}
          </div>

          {filtered.length === 0 && <p className="mp-muted">Nothing matches.</p>}
          <ul className="kd-list">{list}</ul>
          {filtered.length > FIRST_ROWS && (
            <button type="button" className="nb-more" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show fewer ▴' : `Show all ${filtered.length} ▾`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
