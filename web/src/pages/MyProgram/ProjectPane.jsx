import { useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';
import { countdown, safeUrl, todayISO } from './dates';

const MILESTONE_FIELDS = [
  { name: 'title', label: 'Milestone', required: true, placeholder: 'Requirements document' },
  { name: 'due_date', label: 'Due', type: 'date', width: 'sm' },
];

const DETAIL_FIELDS = [
  { name: 'team', label: 'Team members', placeholder: 'Names, separated by commas' },
  { name: 'repo_url', label: 'Repository link', placeholder: 'https://github.com/…' },
];

const validateDetails = (v) => (!v.repo_url?.trim() || safeUrl(v.repo_url) ? '' : 'Enter a valid web link (http or https).');

// Team, repo and milestones for project-style courses.
export default function ProjectPane({ subject, milestones, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingDetails, setEditingDetails] = useState(false);
  const [today] = useState(todayISO);

  const done = milestones.filter((m) => m.done).length;
  const pct = milestones.length ? Math.round((done / milestones.length) * 100) : 0;
  const sorted = [...milestones].sort(
    (a, b) => Number(a.done) - Number(b.done) || (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999'),
  );
  const repo = safeUrl(subject.repo_url);

  return (
    <div>
      <h3 className="pane-subhead first">Project details</h3>
      {editingDetails ? (
        <FieldForm
          fields={DETAIL_FIELDS}
          initial={subject}
          validate={validateDetails}
          onCancel={() => setEditingDetails(false)}
          onSave={async (v) => {
            const ok = await api.updateSubject(subject.id, { team: v.team, repo_url: v.repo_url ? safeUrl(v.repo_url) : null });
            if (ok) setEditingDetails(false);
            return ok;
          }}
        />
      ) : (
        <div className="project-details">
          <p><span className="mp-muted">Team</span> {subject.team || <em className="mp-muted">not set</em>}</p>
          <p>
            <span className="mp-muted">Repository</span>{' '}
            {repo ? <a href={repo} target="_blank" rel="noopener noreferrer">{repo.replace(/^https?:\/\//, '')} ↗</a> : <em className="mp-muted">not set</em>}
          </p>
          <button type="button" className="btn-ghost" onClick={() => setEditingDetails(true)}>Edit details</button>
        </div>
      )}

      <div className="pane-head spaced">
        <h3>Milestones</h3>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add milestone</button>}
      </div>

      {milestones.length > 0 && (
        <div className="progress" aria-label={`${pct}% of milestones done`}>
          <div className="progress-bar"><div style={{ width: `${pct}%` }} /></div>
          <span className="mp-muted">{done} / {milestones.length} done · {pct}%</span>
        </div>
      )}

      {adding && (
        <FieldForm
          fields={MILESTONE_FIELDS}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('milestones', subject.id, v);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {milestones.length === 0 && !adding && (
        <p className="empty">No milestones yet. Break the project into steps with dates — for example proposal, prototype, final report, presentation.</p>
      )}

      <ul className="hw-list">
        {sorted.map((m, i) =>
          editingId === m.id ? (
            <li key={m.id}>
              <FieldForm
                fields={MILESTONE_FIELDS}
                initial={m}
                onCancel={() => setEditingId(null)}
                onSave={async (v) => {
                  const ok = await api.updateItem('milestones', m.id, v);
                  if (ok) setEditingId(null);
                  return ok;
                }}
              />
            </li>
          ) : (
            <li key={m.id} className={`hw-item rise${m.done ? ' is-done' : ''}`} style={{ '--i': i }}>
              <input
                type="checkbox"
                checked={!!m.done}
                onChange={() => api.updateItem('milestones', m.id, { done: !m.done })}
                aria-label={`Mark "${m.title}" ${m.done ? 'not done' : 'done'}`}
              />
              <div className="hw-main">
                <div className="entry-head">
                  <strong>{m.title}</strong>
                  <RowActions onEdit={() => setEditingId(m.id)} onDelete={() => api.deleteItem('milestones', m.id)} />
                </div>
                {m.due_date && (() => {
                  const c = countdown(m.due_date, today, { done: m.done });
                  return <span className={`chip ${c.tone}`}>{c.text}</span>;
                })()}
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
