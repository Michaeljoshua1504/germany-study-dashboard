import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

// One list of notes of a single type (note | lecture | homework) for a subject.
export default function NoteSection({ subjectId, type, label }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('subject_notes')
      .select('*')
      .eq('subject_id', subjectId)
      .eq('type', type)
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) setError(err.message);
        else setNotes(data);
      });
    return () => { cancelled = true; };
  }, [subjectId, type]);

  async function add(e) {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    const { data, error: err } = await supabase
      .from('subject_notes')
      .insert({ user_id: user.id, subject_id: subjectId, type, title: title.trim(), content: content.trim() })
      .select()
      .single();
    if (err) return setError(err.message);
    setNotes((prev) => [data, ...prev]);
    setTitle('');
    setContent('');
    setAdding(false);
  }

  function startEdit(note) {
    setEditingId(note.id);
    setDraft({ title: note.title ?? '', content: note.content ?? '' });
  }

  async function saveEdit(id) {
    const patch = { title: draft.title.trim(), content: draft.content.trim(), updated_at: new Date().toISOString() };
    const { error: err } = await supabase.from('subject_notes').update(patch).eq('id', id);
    if (err) return setError(err.message);
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
    setEditingId(null);
  }

  async function remove(id) {
    const { error: err } = await supabase.from('subject_notes').delete().eq('id', id);
    if (err) return setError(err.message);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <section className="note-section">
      <div className="note-section-head">
        <h3>{label} <span className="note-count">{notes.length}</span></h3>
        {!adding && (
          <button type="button" className="btn-ghost" onClick={() => setAdding(true)}>+ Add</button>
        )}
      </div>

      {error && <p className="mp-error" role="alert">{error}</p>}

      {adding && (
        <form className="note-form" onSubmit={add}>
          <input className="field" placeholder="Title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="field" placeholder="Details" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="note-form-actions">
            <button type="button" className="btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}

      {notes.length === 0 && !adding && <p className="mp-muted">Nothing here yet.</p>}

      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            {editingId === note.id ? (
              <div className="note-form">
                <input className="field" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <textarea className="field" value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
                <div className="note-form-actions">
                  <button type="button" className="btn-ghost" onClick={() => setEditingId(null)}>Cancel</button>
                  <button type="button" className="btn-primary" onClick={() => saveEdit(note.id)}>Save</button>
                </div>
              </div>
            ) : (
              <>
                <div className="note-item-head">
                  <strong>{note.title || 'Untitled'}</strong>
                  <span className="note-item-actions">
                    <button type="button" onClick={() => startEdit(note)}>Edit</button>
                    <button type="button" onClick={() => remove(note.id)}>Delete</button>
                  </span>
                </div>
                {note.content && <p className="note-body">{note.content}</p>}
                <time className="mp-muted" dateTime={note.created_at}>
                  {new Date(note.created_at).toLocaleDateString()}
                </time>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
