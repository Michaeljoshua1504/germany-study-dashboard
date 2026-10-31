import { useState } from 'react';

// Binder-tab style list; the selected subject's tab "opens" into the detail pane.
export default function SubjectList({ subjects, selectedId, onSelect, onAdd }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [term, setTerm] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await onAdd(name.trim(), term.trim());
    setName('');
    setTerm('');
    setAdding(false);
  }

  return (
    <nav className="subject-list" aria-label="Subjects">
      <ul>
        {subjects.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={`subject-tab${s.id === selectedId ? ' is-selected' : ''}`}
              aria-current={s.id === selectedId ? 'true' : undefined}
              onClick={() => onSelect(s.id)}
            >
              <span className="subject-tab-name">{s.name}</span>
              {s.term && <span className="subject-tab-term">{s.term}</span>}
            </button>
          </li>
        ))}
      </ul>

      {subjects.length === 0 && !adding && <p className="mp-muted subject-empty">No subjects yet.</p>}

      {adding ? (
        <form className="subject-form" onSubmit={submit}>
          <input className="field" placeholder="Subject name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          <input className="field" placeholder="Term (e.g. WS 2026/27)" value={term} onChange={(e) => setTerm(e.target.value)} />
          <div className="note-form-actions">
            <button type="button" className="btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Add</button>
          </div>
        </form>
      ) : (
        <button type="button" className="btn-ghost subject-add" onClick={() => setAdding(true)}>+ New subject</button>
      )}
    </nav>
  );
}
