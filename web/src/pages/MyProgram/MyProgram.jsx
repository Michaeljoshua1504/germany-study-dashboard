import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProgramData } from '../../hooks/useProgramData';
import SubjectList from './SubjectList';
import SubjectDetail from './SubjectDetail';
import './MyProgram.css';

export default function MyProgram({ onOpenLogin }) {
  const { user, loading } = useAuth();
  const program = useProgramData();
  const { subjects, notes, todos, items, slides, loaded, error } = program;
  const [selectedId, setSelectedId] = useState(null);
  const [seeding, setSeeding] = useState(false);

  if (loading) return null;

  if (!user) {
    return (
      <div className="mp-gate rise">
        <span className="hero-emoji" aria-hidden="true">🎓</span>
        <h1>My Program</h1>
        <p className="mp-muted">Log in to see your subjects, lectures and homework.</p>
        <button type="button" className="btn-primary" onClick={onOpenLogin}>Log in</button>
      </div>
    );
  }

  const selected = subjects.find((s) => s.id === selectedId) ?? subjects[0];

  async function addSubject(name, term) {
    const row = await program.addSubject(name, term);
    if (row) setSelectedId(row.id);
  }

  async function seed() {
    setSeeding(true);
    const first = await program.addStarterSubjects();
    if (first) setSelectedId(first.id);
    setSeeding(false);
  }

  async function deleteSubject(id) {
    await program.deleteSubject(id);
    setSelectedId(null);
  }

  let main;
  if (!loaded) {
    main = <div className="skeleton" aria-busy="true"><span /><span /><span /></div>;
  } else if (selected) {
    main = (
      <SubjectDetail
        key={selected.id}
        subject={selected}
        notes={notes.filter((n) => n.subject_id === selected.id)}
        todos={todos.filter((t) => t.context_id === selected.id)}
        slides={slides.filter((s) => s.subject_id === selected.id)}
        data={Object.fromEntries(Object.entries(items).map(([k, rows]) => [k, rows.filter((r) => r.subject_id === selected.id)]))}
        api={program}
        onDelete={deleteSubject}
      />
    );
  } else {
    main = (
      <div className="mp-start rise">
        <span className="hero-emoji" aria-hidden="true">🗂️</span>
        <h1>Set up your program</h1>
        <p className="mp-muted">Start with your six courses, or add your own from the left.</p>
        <button type="button" className="btn-primary" onClick={seed} disabled={seeding}>
          {seeding ? 'Adding…' : 'Add my 6 subjects'}
        </button>
      </div>
    );
  }

  return (
    <div className="mp">
      <SubjectList subjects={subjects} notes={notes} selectedId={selected?.id} onSelect={setSelectedId} onAdd={addSubject} />
      <main className="mp-main">
        {error && <p className="mp-error" role="alert">{error}</p>}
        {main}
      </main>
    </div>
  );
}
