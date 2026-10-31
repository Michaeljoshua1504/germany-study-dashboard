import { useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';
import { formatDay, formatMinutes, parseISO, toISO, todayISO } from './dates';

const FIELDS = [
  { name: 'session_date', label: 'Date', type: 'date', width: 'sm', default: () => todayISO() },
  { name: 'minutes', label: 'Minutes', type: 'number', required: true, min: 1, step: 5, width: 'sm', placeholder: '45' },
  { name: 'topic', label: 'What did you study?', placeholder: 'Normalization exercises' },
];

const validate = (v) => (Number(v.minutes) >= 1 ? '' : 'Minutes must be at least 1.');

// Self-study outside lectures, with a last-7-days chart.
export default function StudyPane({ subject, sessions, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [today] = useState(todayISO);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = parseISO(today);
    d.setDate(d.getDate() - (6 - i));
    const iso = toISO(d);
    const minutes = sessions.filter((s) => s.session_date === iso).reduce((sum, s) => sum + s.minutes, 0);
    return { iso, minutes, label: d.toLocaleDateString(undefined, { weekday: 'short' }) };
  });
  const week = days.reduce((sum, d) => sum + d.minutes, 0);
  const total = sessions.reduce((sum, s) => sum + s.minutes, 0);
  const max = Math.max(60, ...days.map((d) => d.minutes));
  const sorted = [...sessions].sort((a, b) => b.session_date.localeCompare(a.session_date) || b.created_at.localeCompare(a.created_at));

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">Self-study outside of lectures</p>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Log session</button>}
      </div>

      {adding && (
        <FieldForm
          fields={FIELDS}
          validate={validate}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('sessions', subject.id, v);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      <div className="study-summary">
        <div><strong>{formatMinutes(week)}</strong><span>last 7 days</span></div>
        <div><strong>{formatMinutes(total)}</strong><span>all time</span></div>
        <div><strong>{sessions.length}</strong><span>sessions</span></div>
      </div>

      <div className="bars" role="img" aria-label={`Study time over the last 7 days: ${formatMinutes(week)} in total`}>
        {days.map((d) => (
          <div key={d.iso} className="bar-col" title={`${formatDay(d.iso)}: ${formatMinutes(d.minutes)}`}>
            <div className="bar-track">
              <div className="bar" style={{ height: `${(d.minutes / max) * 100}%` }} />
            </div>
            <span>{d.label}</span>
          </div>
        ))}
      </div>

      {sessions.length === 0 && !adding && (
        <p className="empty">No sessions yet. Log the time you study on your own — the chart shows which subjects get too little attention.</p>
      )}

      <ul className="hw-list">
        {sorted.map((s) =>
          editingId === s.id ? (
            <li key={s.id}>
              <FieldForm
                fields={FIELDS}
                initial={s}
                validate={validate}
                onCancel={() => setEditingId(null)}
                onSave={async (v) => {
                  const ok = await api.updateItem('sessions', s.id, v);
                  if (ok) setEditingId(null);
                  return ok;
                }}
              />
            </li>
          ) : (
            <li key={s.id} className="hw-item">
              <div className="hw-main">
                <div className="entry-head">
                  <span>
                    <strong>{formatMinutes(s.minutes)}</strong>
                    {s.topic && <span> · {s.topic}</span>}
                  </span>
                  <RowActions onEdit={() => setEditingId(s.id)} onDelete={() => api.deleteItem('sessions', s.id)} />
                </div>
                <span className="mp-muted">{formatDay(s.session_date)}</span>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
