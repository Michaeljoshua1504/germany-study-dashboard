import { useState } from 'react';
import ItemForm from './ItemForm';
import RowActions from './RowActions';
import { countdown, todayISO } from './dates';

export function dueInfo(hw, today) {
  return hw.due_date ? countdown(hw.due_date, today, { done: hw.done }) : null;
}

// Soonest due first; undated last.
export function byDue(a, b) {
  if (!a.due_date !== !b.due_date) return a.due_date ? -1 : 1;
  return (a.due_date ?? '').localeCompare(b.due_date ?? '') || a.created_at.localeCompare(b.created_at);
}

export default function HomeworkList({ subjectId, homework, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [today] = useState(todayISO);

  const open = homework.filter((h) => !h.done).sort(byDue);
  const done = homework.filter((h) => h.done).sort(byDue);

  function renderItem(h, i) {
    if (editingId === h.id) {
      return (
        <li key={h.id}>
          <ItemForm
            type="homework"
            initial={h}
            onCancel={() => setEditingId(null)}
            onSave={async (f) => {
              const ok = await api.updateNote(h.id, f);
              if (ok) setEditingId(null);
              return ok;
            }}
          />
        </li>
      );
    }
    const due = dueInfo(h, today);
    return (
      <li key={h.id} className={`hw-item rise${h.done ? ' is-done' : ''}`} style={{ '--i': i }}>
        <input
          type="checkbox"
          checked={!!h.done}
          onChange={() => api.updateNote(h.id, { done: !h.done })}
          aria-label={`Mark "${h.title}" ${h.done ? 'not done' : 'done'}`}
        />
        <div className="hw-main">
          <div className="entry-head">
            <strong>{h.title}</strong>
            <RowActions onEdit={() => setEditingId(h.id)} onDelete={() => api.deleteNote(h.id)} />
          </div>
          {due && <span className={`chip ${due.tone}`}>{due.text}</span>}
          {h.content && <p className="entry-body">{h.content}</p>}
        </div>
      </li>
    );
  }

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{open.length} open · {done.length} done</p>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add homework</button>}
      </div>

      {adding && (
        <ItemForm
          type="homework"
          onCancel={() => setAdding(false)}
          onSave={async (f) => {
            const ok = await api.addNote(subjectId, 'homework', f);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {homework.length === 0 && !adding && (
        <p className="empty">No homework yet. Add assignments with a due date and they'll show up on the overview, soonest first.</p>
      )}

      <ul className="hw-list">{open.map(renderItem)}</ul>

      {done.length > 0 && (
        <>
          <h3 className="pane-subhead">Done</h3>
          <ul className="hw-list">{done.map(renderItem)}</ul>
        </>
      )}
    </div>
  );
}
