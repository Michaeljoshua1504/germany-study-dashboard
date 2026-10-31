import { useState } from 'react';

const initials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// Binder-tab list; the selected subject's tab "opens" into the detail pane.
export default function SubjectList({ subjects, notes, selectedId, onSelect, onAdd }) {
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

  // German scale (1.0 best): average weighted by ECTS; unweighted subjects count as 1.
  const graded = subjects.filter((s) => s.grade != null);
  const weight = (s) => Number(s.credits) || 1;
  const avg = graded.length
    ? graded.reduce((sum, s) => sum + Number(s.grade) * weight(s), 0) / graded.reduce((sum, s) => sum + weight(s), 0)
    : null;
  const ects = graded.filter((s) => Number(s.grade) <= 4).reduce((sum, s) => sum + (Number(s.credits) || 0), 0);

  return (
    <nav className="subject-list" aria-label="Subjects">
      <h2 className="subject-list-title">Subjects</h2>
      <ul>
        {subjects.map((s, i) => {
          const open = notes.filter((n) => n.subject_id === s.id && n.type === 'homework' && !n.done).length;
          return (
            <li key={s.id} className="rise" style={{ '--i': i }}>
              <button
                type="button"
                className={`subject-tab${s.id === selectedId ? ' is-selected' : ''}`}
                style={{ '--subject': s.color || 'var(--red)' }}
                aria-current={s.id === selectedId ? 'true' : undefined}
                onClick={() => onSelect(s.id)}
              >
                <span className="subject-avatar" aria-hidden="true">{initials(s.name)}</span>
                <span className="subject-tab-text">
                  <span className="subject-tab-name">{s.name}</span>
                  {s.term && <span className="subject-tab-term">{s.term}</span>}
                </span>
                {open > 0 && <span className="subject-tab-badge" title={`${open} open homework`}>{open}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {avg != null && (
        <div className="program-summary">
          <div><strong>{avg.toFixed(2)}</strong><span title="German scale: 1.0 is best">average</span></div>
          <div><strong>{ects}</strong><span>ECTS passed</span></div>
        </div>
      )}

      {adding ? (
        <form className="subject-form" onSubmit={submit}>
          <input className="field" placeholder="Subject name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          <input className="field" placeholder="Term (optional)" value={term} onChange={(e) => setTerm(e.target.value)} />
          <div className="item-form-actions">
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
