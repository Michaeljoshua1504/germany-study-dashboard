import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { TABS } from './TopNav';
import './TodoPanel.css';

// Select values look like "tab:housing" or "subject:<uuid>".
function parseContext(value) {
  const i = value.indexOf(':');
  return { context_type: value.slice(0, i), context_id: value.slice(i + 1) };
}

export default function TodoPanel({ open, onClose, activeTab }) {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [content, setContent] = useState('');
  const [context, setContext] = useState(`tab:${activeTab}`);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!user) return;
    const [t, s] = await Promise.all([
      supabase.from('todos').select('*').order('created_at', { ascending: false }),
      supabase.from('subjects').select('id, name').order('name'),
    ]);
    if (t.error || s.error) setError((t.error || s.error).message);
    else setError('');
    setTodos(t.data ?? []);
    setSubjects(s.data ?? []);
  }, [user]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function labelFor(todo) {
    if (todo.context_type === 'subject') {
      return subjects.find((s) => s.id === todo.context_id)?.name ?? 'Subject';
    }
    return TABS.find((t) => t.id === todo.context_id)?.label ?? todo.context_id;
  }

  async function add(e) {
    e.preventDefault();
    const text = content.trim();
    if (!text) return;
    const { data, error: err } = await supabase
      .from('todos')
      .insert({ user_id: user.id, content: text, ...parseContext(context) })
      .select()
      .single();
    if (err) return setError(err.message);
    setTodos((prev) => [data, ...prev]);
    setContent('');
  }

  async function toggle(todo) {
    const completed = !todo.completed;
    const patch = { completed, completed_at: completed ? new Date().toISOString() : null };
    const { error: err } = await supabase.from('todos').update(patch).eq('id', todo.id);
    if (err) return setError(err.message);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, ...patch } : t)));
  }

  async function remove(id) {
    const { error: err } = await supabase.from('todos').delete().eq('id', id);
    if (err) return setError(err.message);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  function renderItem(todo) {
    return (
      <li key={todo.id} className={`todo-item${todo.completed ? ' is-done' : ''}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggle(todo)}
          aria-label={`Mark "${todo.content}" ${todo.completed ? 'not done' : 'done'}`}
        />
        <span className="todo-text">
          {todo.content}
          <span className="todo-tag">{labelFor(todo)}</span>
        </span>
        <button type="button" className="todo-delete" onClick={() => remove(todo.id)} aria-label="Delete to-do">
          ×
        </button>
      </li>
    );
  }

  return (
    <>
      {open && <div className="todo-scrim" onClick={onClose} />}
      <aside className={`todo-panel${open ? ' is-open' : ''}`} aria-hidden={!open} aria-label="To-dos">
        <div className="todo-head">
          <h2>To-dos</h2>
          <button type="button" className="todo-close" onClick={onClose} aria-label="Close to-dos">×</button>
        </div>

        {!user ? (
          <p className="todo-empty">Log in to see your to-dos.</p>
        ) : (
          <>
            <form className="todo-form" onSubmit={add}>
              <input
                className="field"
                placeholder="Add a to-do…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="todo-form-row">
                <select
                  className="field"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  aria-label="Tag to"
                >
                  <optgroup label="Tab">
                    {TABS.map((t) => (
                      <option key={t.id} value={`tab:${t.id}`}>{t.label}</option>
                    ))}
                  </optgroup>
                  {subjects.length > 0 && (
                    <optgroup label="Subject">
                      {subjects.map((s) => (
                        <option key={s.id} value={`subject:${s.id}`}>{s.name}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <button type="submit" className="btn-primary">Add</button>
              </div>
            </form>

            {error && <p className="todo-error" role="alert">{error}</p>}

            <ul className="todo-list">{pending.map(renderItem)}</ul>
            {pending.length === 0 && <p className="todo-empty">Nothing open.</p>}

            {done.length > 0 && (
              <>
                <h3 className="todo-subhead">Done</h3>
                <ul className="todo-list">{done.map(renderItem)}</ul>
              </>
            )}
          </>
        )}
      </aside>
    </>
  );
}
