import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const PALETTE = ['#d4a017', '#3b82c4', '#2f9e6b', '#7c5cbf', '#d9731f', '#2a9d9f', '#c2457a', '#6b7a8f'];

export const STARTER_SUBJECTS = [
  'German A1',
  'Advanced Programming',
  'Software Engineering',
  'Non-relational Databases',
  'Project Management',
  'Practical Studies',
];

// Per-subject collections beyond notes. key -> table.
export const ITEM_TABLES = {
  exams: 'subject_exams',
  resources: 'subject_resources',
  questions: 'subject_questions',
  sessions: 'subject_study_sessions',
  cards: 'subject_flashcards',
  milestones: 'subject_milestones',
};
const EMPTY_ITEMS = Object.fromEntries(Object.keys(ITEM_TABLES).map((k) => [k, []]));

// Everything the My Program tab needs: subjects, their notes (lectures,
// homework, notes), the per-subject collections, subject-tagged to-dos, and
// the mutations.
export function useProgramData() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [items, setItems] = useState(EMPTY_ITEMS);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const keys = Object.keys(ITEM_TABLES);
    Promise.all([
      supabase.from('subjects').select('*').order('created_at', { ascending: true }),
      supabase.from('subject_notes').select('*').order('created_at', { ascending: false }),
      supabase.from('todos').select('*').eq('context_type', 'subject').order('created_at', { ascending: false }),
      ...keys.map((k) => supabase.from(ITEM_TABLES[k]).select('*').order('created_at', { ascending: false })),
    ]).then(([s, n, t, ...rest]) => {
      if (cancelled) return;
      const err = [s, n, t, ...rest].find((r) => r.error)?.error;
      setError(err ? err.message : '');
      setSubjects(s.data ?? []);
      setNotes(n.data ?? []);
      setTodos(t.data ?? []);
      setItems(Object.fromEntries(keys.map((k, i) => [k, rest[i].data ?? []])));
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, [user]);

  // Runs a Supabase call; reports its error, returns the row (or null).
  const run = useCallback(async (query) => {
    const { data, error: err } = await query;
    if (err) {
      setError(err.message);
      return null;
    }
    setError('');
    return data ?? true;
  }, []);

  /* ── Subjects ─────────────────────────────────────────── */
  async function addSubject(name, term) {
    const row = await run(
      supabase
        .from('subjects')
        .insert({ user_id: user.id, name, term: term || null, color: PALETTE[subjects.length % PALETTE.length] })
        .select()
        .single(),
    );
    if (row) setSubjects((prev) => [...prev, row]);
    return row;
  }

  // One at a time so created_at keeps the order of the list.
  async function addStarterSubjects() {
    const have = new Set(subjects.map((s) => s.name));
    const added = [];
    for (const [i, name] of STARTER_SUBJECTS.entries()) {
      if (have.has(name)) continue;
      const row = await run(
        supabase
          .from('subjects')
          .insert({ user_id: user.id, name, color: PALETTE[i % PALETTE.length] })
          .select()
          .single(),
      );
      if (!row) break;
      added.push(row);
    }
    setSubjects((prev) => [...prev, ...added]);
    return added[0] ?? null;
  }

  async function updateSubject(id, patch) {
    if (!(await run(supabase.from('subjects').update(patch).eq('id', id)))) return false;
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    return true;
  }

  async function deleteSubject(id) {
    if (!(await run(supabase.from('subjects').delete().eq('id', id)))) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    setNotes((prev) => prev.filter((n) => n.subject_id !== id));
    setTodos((prev) => prev.filter((t) => t.context_id !== id));
    setItems((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k, rows]) => [k, rows.filter((r) => r.subject_id !== id)])),
    );
  }

  /* ── Lectures / homework / notes ──────────────────────── */
  async function addNote(subjectId, type, fields) {
    const row = await run(
      supabase
        .from('subject_notes')
        .insert({ user_id: user.id, subject_id: subjectId, type, ...fields })
        .select()
        .single(),
    );
    if (row) setNotes((prev) => [row, ...prev]);
    return !!row;
  }

  async function updateNote(id, patch) {
    const full = { ...patch, updated_at: new Date().toISOString() };
    if (!(await run(supabase.from('subject_notes').update(full).eq('id', id)))) return false;
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...full } : n)));
    return true;
  }

  async function deleteNote(id) {
    if (!(await run(supabase.from('subject_notes').delete().eq('id', id)))) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  /* ── Generic per-subject collections (see ITEM_TABLES) ── */
  async function addItem(key, subjectId, fields) {
    const row = await run(
      supabase
        .from(ITEM_TABLES[key])
        .insert({ user_id: user.id, subject_id: subjectId, ...fields })
        .select()
        .single(),
    );
    if (row) setItems((prev) => ({ ...prev, [key]: [row, ...prev[key]] }));
    return !!row;
  }

  async function updateItem(key, id, patch) {
    if (!(await run(supabase.from(ITEM_TABLES[key]).update(patch).eq('id', id)))) return false;
    setItems((prev) => ({ ...prev, [key]: prev[key].map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
    return true;
  }

  async function deleteItem(key, id) {
    if (!(await run(supabase.from(ITEM_TABLES[key]).delete().eq('id', id)))) return;
    setItems((prev) => ({ ...prev, [key]: prev[key].filter((r) => r.id !== id) }));
  }

  /* ── Subject to-dos ───────────────────────────────────── */
  async function addTodo(subjectId, content) {
    const row = await run(
      supabase
        .from('todos')
        .insert({ user_id: user.id, content, context_type: 'subject', context_id: subjectId })
        .select()
        .single(),
    );
    if (row) setTodos((prev) => [row, ...prev]);
  }

  async function toggleTodo(todo) {
    const completed = !todo.completed;
    const patch = { completed, completed_at: completed ? new Date().toISOString() : null };
    if (!(await run(supabase.from('todos').update(patch).eq('id', todo.id)))) return;
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, ...patch } : t)));
  }

  async function deleteTodo(id) {
    if (!(await run(supabase.from('todos').delete().eq('id', id)))) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    subjects, notes, todos, items, loaded, error,
    addSubject, addStarterSubjects, updateSubject, deleteSubject,
    addNote, updateNote, deleteNote,
    addItem, updateItem, deleteItem,
    addTodo, toggleTodo, deleteTodo,
  };
}
