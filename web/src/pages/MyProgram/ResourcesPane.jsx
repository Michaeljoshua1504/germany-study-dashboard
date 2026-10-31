import { useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';
import { safeUrl } from './dates';

const KINDS = ['Slides', 'Paper', 'Book', 'Video', 'Course page', 'Link'];

const FIELDS = [
  { name: 'title', label: 'Title', required: true, placeholder: 'Lecture 3 slides' },
  { name: 'kind', label: 'Type', type: 'select', width: 'sm', default: 'Link', options: KINDS.map((k) => ({ value: k, label: k })) },
  { name: 'url', label: 'Link', required: true, placeholder: 'https://…' },
];

const validate = (v) => (safeUrl(v.url) ? '' : 'Enter a valid web link (http or https).');
const normalize = (v) => ({ ...v, url: safeUrl(v.url) });

export default function ResourcesPane({ subject, resources, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [kind, setKind] = useState('');

  const shown = resources.filter((r) => !kind || r.kind === kind).sort((a, b) => Number(a.read) - Number(b.read));
  const unread = resources.filter((r) => !r.read).length;
  const kindsUsed = [...new Set(resources.map((r) => r.kind))];

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{resources.length} saved · {unread} unread</p>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add resource</button>}
      </div>

      {adding && (
        <FieldForm
          fields={FIELDS}
          validate={validate}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('resources', subject.id, normalize(v));
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {kindsUsed.length > 1 && (
        <div className="tag-filter" role="group" aria-label="Filter by type">
          {['', ...kindsUsed].map((k) => (
            <button key={k} type="button" className={`tag-filter-btn${kind === k ? ' is-active' : ''}`} onClick={() => setKind(k)}>
              {k || 'All'}
            </button>
          ))}
        </div>
      )}

      {resources.length === 0 && !adding && (
        <p className="empty">Nothing saved yet. Keep slides, papers, textbooks and videos for this course here so they're one click away.</p>
      )}

      <ul className="hw-list">
        {shown.map((r, i) =>
          editingId === r.id ? (
            <li key={r.id}>
              <FieldForm
                fields={FIELDS}
                initial={r}
                validate={validate}
                onCancel={() => setEditingId(null)}
                onSave={async (v) => {
                  const ok = await api.updateItem('resources', r.id, normalize(v));
                  if (ok) setEditingId(null);
                  return ok;
                }}
              />
            </li>
          ) : (
            <li key={r.id} className={`hw-item rise${r.read ? ' is-done' : ''}`} style={{ '--i': i }}>
              <input
                type="checkbox"
                checked={!!r.read}
                onChange={() => api.updateItem('resources', r.id, { read: !r.read })}
                aria-label={`Mark "${r.title}" ${r.read ? 'unread' : 'read'}`}
              />
              <div className="hw-main">
                <div className="entry-head">
                  <span>
                    {safeUrl(r.url) ? (
                      <a href={safeUrl(r.url)} target="_blank" rel="noopener noreferrer"><strong>{r.title}</strong> ↗</a>
                    ) : (
                      <strong>{r.title}</strong>
                    )}
                  </span>
                  <RowActions onEdit={() => setEditingId(r.id)} onDelete={() => api.deleteItem('resources', r.id)} />
                </div>
                <span className="chip">{r.kind}</span>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
