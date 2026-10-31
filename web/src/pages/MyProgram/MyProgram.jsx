import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import SubjectList from './SubjectList';
import SubjectDetail from './SubjectDetail';
import './MyProgram.css';

export default function MyProgram({ onOpenLogin }) {
  const { user, loading } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setSubjects([]);
      setSelectedId(null);
      return;
    }
    let cancelled = false;
    supabase
      .from('subjects')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) return setError(err.message);
        setError('');
        setSubjects(data);
        setSelectedId((cur) => cur ?? data[0]?.id ?? null);
      });
    return () => { cancelled = true; };
  }, [user]);

  async function addSubject(name, term) {
    const { data, error: err } = await supabase
      .from('subjects')
      .insert({ user_id: user.id, name, term: term || null })
      .select()
      .single();
    if (err) return setError(err.message);
    setSubjects((prev) => [...prev, data]);
    setSelectedId(data.id);
  }

  async function deleteSubject(id) {
    const { error: err } = await supabase.from('subjects').delete().eq('id', id);
    if (err) return setError(err.message);
    const rest = subjects.filter((s) => s.id !== id);
    setSubjects(rest);
    setSelectedId(rest[0]?.id ?? null);
  }

  if (loading) return null;

  if (!user) {
    return (
      <div className="mp-gate">
        <h1>My Program</h1>
        <p className="mp-muted">Log in to see your subjects, lectures and homework.</p>
        <button type="button" className="btn-primary" onClick={onOpenLogin}>Log in</button>
      </div>
    );
  }

  const selected = subjects.find((s) => s.id === selectedId);

  return (
    <div className="mp">
      <SubjectList subjects={subjects} selectedId={selectedId} onSelect={setSelectedId} onAdd={addSubject} />
      <main className="mp-main">
        {error && <p className="mp-error" role="alert">{error}</p>}
        {selected ? (
          <SubjectDetail key={selected.id} subject={selected} onDelete={deleteSubject} />
        ) : (
          <p className="mp-muted">Add a subject to get started.</p>
        )}
      </main>
    </div>
  );
}
