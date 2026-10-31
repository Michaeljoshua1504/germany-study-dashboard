import { useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';

const FIELDS = [
  { name: 'question', label: 'Question', type: 'textarea', required: true, rows: 3, placeholder: 'What did you not understand?' },
  { name: 'answer', label: 'Answer (once you know it)', type: 'textarea', rows: 3 },
];

// Things to ask the professor, tutor or classmates; resolve them as you learn.
export default function QuestionsPane({ subject, questions, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const open = questions.filter((q) => !q.resolved);
  const resolved = questions.filter((q) => q.resolved);

  function renderQ(q, i) {
    if (editingId === q.id) {
      return (
        <li key={q.id}>
          <FieldForm
            fields={FIELDS}
            initial={q}
            onCancel={() => setEditingId(null)}
            onSave={async (v) => {
              const ok = await api.updateItem('questions', q.id, v);
              if (ok) setEditingId(null);
              return ok;
            }}
          />
        </li>
      );
    }
    return (
      <li key={q.id} className={`hw-item rise${q.resolved ? ' is-done' : ''}`} style={{ '--i': i }}>
        <input
          type="checkbox"
          checked={!!q.resolved}
          onChange={() => api.updateItem('questions', q.id, { resolved: !q.resolved })}
          aria-label={`Mark question ${q.resolved ? 'open' : 'resolved'}`}
        />
        <div className="hw-main">
          <div className="entry-head">
            <strong className="q-text">{q.question}</strong>
            <RowActions onEdit={() => setEditingId(q.id)} onDelete={() => api.deleteItem('questions', q.id)} />
          </div>
          {q.answer && <p className="entry-body q-answer"><span>Answer</span> {q.answer}</p>}
        </div>
      </li>
    );
  }

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{open.length} open · {resolved.length} resolved</p>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add question</button>}
      </div>

      {adding && (
        <FieldForm
          fields={FIELDS}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('questions', subject.id, v);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {questions.length === 0 && !adding && (
        <p className="empty">No questions yet. Write down what confuses you during a lecture — bring the open ones to office hours.</p>
      )}

      <ul className="hw-list">{open.map(renderQ)}</ul>
      {resolved.length > 0 && (
        <>
          <h3 className="pane-subhead">Resolved</h3>
          <ul className="hw-list">{resolved.map(renderQ)}</ul>
        </>
      )}
    </div>
  );
}
