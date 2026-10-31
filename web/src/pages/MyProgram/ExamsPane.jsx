import { useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';
import { countdown, formatDay, todayISO } from './dates';

export const EXAM_KINDS = ['Exam', 'Quiz', 'Project', 'Presentation', 'Other'];

const FIELDS = [
  { name: 'title', label: 'Title', required: true, placeholder: 'Final exam' },
  { name: 'kind', label: 'Type', type: 'select', width: 'sm', default: 'Exam', options: EXAM_KINDS.map((k) => ({ value: k, label: k })) },
  { name: 'due_date', label: 'Date', type: 'date', required: true, width: 'sm' },
  { name: 'result', label: 'Result (optional)', placeholder: 'e.g. 1.7 or 85%', width: 'sm' },
];

// German scale: 1.0 is best, 4.0 is the pass mark, 5.0 is a fail.
function GradePanel({ subject, api }) {
  const [credits, setCredits] = useState(subject.credits ?? '');
  const [grade, setGrade] = useState(subject.grade ?? '');
  const [saved, setSaved] = useState(false);

  async function save(e) {
    e.preventDefault();
    const ok = await api.updateSubject(subject.id, {
      credits: credits === '' ? null : Number(credits),
      grade: grade === '' ? null : Number(grade),
    });
    setSaved(ok);
    if (ok) setTimeout(() => setSaved(false), 1800);
  }

  return (
    <form className="grade-panel" onSubmit={save}>
      <label>
        <span>ECTS credits</span>
        <input className="field" type="number" min="0" step="0.5" value={credits} onChange={(e) => { setCredits(e.target.value); setSaved(false); }} />
      </label>
      <label>
        <span>Final grade (1.0 best)</span>
        <input className="field" type="number" min="1" max="5" step="0.1" value={grade} onChange={(e) => { setGrade(e.target.value); setSaved(false); }} />
      </label>
      <button type="submit" className="btn-primary">{saved ? 'Saved ✓' : 'Save'}</button>
    </form>
  );
}

export default function ExamsPane({ subject, exams, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [today] = useState(todayISO);

  const upcoming = exams.filter((e) => e.due_date >= today).sort((a, b) => a.due_date.localeCompare(b.due_date));
  const past = exams.filter((e) => e.due_date < today).sort((a, b) => b.due_date.localeCompare(a.due_date));

  function renderExam(e, i) {
    if (editingId === e.id) {
      return (
        <li key={e.id}>
          <FieldForm
            fields={FIELDS}
            initial={e}
            onCancel={() => setEditingId(null)}
            onSave={async (v) => {
              const ok = await api.updateItem('exams', e.id, v);
              if (ok) setEditingId(null);
              return ok;
            }}
          />
        </li>
      );
    }
    const c = countdown(e.due_date, today, { prefix: '', far: 'days', past: 'ago' });
    return (
      <li key={e.id} className="exam-item rise" style={{ '--i': i }}>
        <div className="exam-date">
          <strong>{new Date(`${e.due_date}T00:00`).getDate()}</strong>
          <span>{new Date(`${e.due_date}T00:00`).toLocaleDateString(undefined, { month: 'short' })}</span>
        </div>
        <div className="hw-main">
          <div className="entry-head">
            <strong>{e.title}</strong>
            <RowActions onEdit={() => setEditingId(e.id)} onDelete={() => api.deleteItem('exams', e.id)} />
          </div>
          <span className="mp-muted">{e.kind} · {formatDay(e.due_date)}</span>{' '}
          <span className={`chip ${c.tone}`}>{c.text}</span>
          {e.result && <span className="chip result">Result: {e.result}</span>}
        </div>
      </li>
    );
  }

  return (
    <div>
      <h3 className="pane-subhead first">Credits and grade</h3>
      <GradePanel subject={subject} api={api} />

      <div className="pane-head spaced">
        <h3>Exams and deadlines</h3>
        {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add</button>}
      </div>

      {adding && (
        <FieldForm
          fields={FIELDS}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('exams', subject.id, v);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      )}

      {exams.length === 0 && !adding && (
        <p className="empty">No exams or deadlines yet. Add the exam date as soon as you know it — the countdown shows on the overview.</p>
      )}

      <ul className="hw-list">{upcoming.map(renderExam)}</ul>
      {past.length > 0 && (
        <>
          <h3 className="pane-subhead">Past</h3>
          <ul className="hw-list">{past.map(renderExam)}</ul>
        </>
      )}
    </div>
  );
}
