import { useState } from 'react';
import { todayISO } from './dates';
import { TAGS } from './Tags';

const COPY = {
  lecture: { title: 'Topic', body: 'What was covered, key points, questions…' },
  homework: { title: 'Assignment', body: 'Details, links, requirements…' },
  note: { title: 'Title', body: 'Write your note…' },
};

// Add/edit form shared by lectures, homework and notes.
export default function ItemForm({ type, initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [noteDate, setNoteDate] = useState(initial?.note_date ?? todayISO());
  const [dueDate, setDueDate] = useState(initial?.due_date ?? '');
  const [tags, setTags] = useState({ exam_relevant: !!initial?.exam_relevant, revise: !!initial?.revise });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const copy = COPY[type];

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return setError(`${copy.title} is required.`);
    const fields = { title: title.trim(), content: content.trim() };
    if (type === 'lecture') fields.note_date = noteDate || todayISO();
    if (type === 'homework') fields.due_date = dueDate || null;
    if (type !== 'homework') Object.assign(fields, tags);
    setBusy(true);
    const ok = await onSave(fields);
    if (!ok) setBusy(false); // failed: the page shows the error, keep the form
  }

  return (
    <form className="item-form" onSubmit={submit}>
      <div className="item-form-row">
        {type === 'lecture' && (
          <label className="item-form-date">
            <span>Date</span>
            <input className="field" type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} />
          </label>
        )}
        {type === 'homework' && (
          <label className="item-form-date">
            <span>Due</span>
            <input className="field" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
        )}
        <label className="item-form-grow">
          <span>{copy.title}</span>
          <input className="field" autoFocus value={title} onChange={(e) => { setTitle(e.target.value); setError(''); }} />
        </label>
      </div>
      <textarea
        className="field"
        rows={5}
        placeholder={copy.body}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {type !== 'homework' && (
        <div className="tag-picks">
          {TAGS.map((t) => (
            <label key={t.key}>
              <input type="checkbox" checked={tags[t.key]} onChange={(e) => setTags({ ...tags, [t.key]: e.target.checked })} />
              {t.label}
            </label>
          ))}
        </div>
      )}
      {error && <p className="mp-error" role="alert">{error}</p>}
      <div className="item-form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  );
}
