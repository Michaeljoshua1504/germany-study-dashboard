import { useState } from 'react';
import AnimatedNumber from './AnimatedNumber';
import { countdown, dayOf, daysBetween, formatDay, formatMinutes, parseISO, toISO, todayISO } from './dates';

export default function Overview({ subject, notes, todos, data, api, onGo }) {
  const [text, setText] = useState('');
  const [today] = useState(todayISO);

  const lectures = notes.filter((n) => n.type === 'lecture');
  const homework = notes.filter((n) => n.type === 'homework');
  const openHw = homework.filter((h) => !h.done);
  const openQuestions = data.questions.filter((q) => !q.resolved);
  const toLearn = data.cards.filter((c) => !c.known);
  const openTodos = todos.filter((t) => !t.completed);
  const doneTodos = todos.filter((t) => t.completed);
  const lastLecture = [...lectures].sort((a, b) => dayOf(b).localeCompare(dayOf(a)))[0];

  const nextExam = data.exams
    .filter((e) => e.due_date >= today)
    .sort((a, b) => a.due_date.localeCompare(b.due_date))[0];

  const weekStart = parseISO(today);
  weekStart.setDate(weekStart.getDate() - 6);
  const weekMinutes = data.sessions
    .filter((s) => s.session_date >= toISO(weekStart))
    .reduce((sum, s) => sum + s.minutes, 0);

  // Homework, exams and milestones in one date-ordered list.
  const upcoming = [
    ...openHw.filter((h) => h.due_date).map((h) => ({ id: h.id, kind: 'Homework', title: h.title, date: h.due_date, opts: {} })),
    ...data.exams.filter((e) => e.due_date >= today).map((e) => ({ id: e.id, kind: e.kind || 'Exam', title: e.title, date: e.due_date, opts: { prefix: '', far: 'days' } })),
    ...data.milestones.filter((m) => !m.done && m.due_date).map((m) => ({ id: m.id, kind: 'Milestone', title: m.title, date: m.due_date, opts: {} })),
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const stats = [
    { label: 'Lectures', icon: '🎓', value: lectures.length, tab: 'lectures' },
    { label: 'Open homework', icon: '📝', value: openHw.length, tab: 'homework', alert: openHw.some((h) => h.due_date && h.due_date < today) },
    { label: 'Open questions', icon: '❓', value: openQuestions.length, tab: 'questions' },
    nextExam
      ? { label: nextExam.title, icon: '⏳', value: `${daysBetween(today, nextExam.due_date)}d`, tab: 'exams', alert: daysBetween(today, nextExam.due_date) <= 7, small: true }
      : { label: 'Next exam', icon: '⏳', value: '–', tab: 'exams' },
    { label: 'Studied, 7 days', icon: '⏱️', value: formatMinutes(weekMinutes), tab: 'study' },
    { label: 'Cards to learn', icon: '🃏', value: toLearn.length, tab: 'cards' },
  ];

  function add(e) {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    api.addTodo(subject.id, content);
    setText('');
  }

  return (
    <div className="overview">
      <div className="stats">
        {stats.map((s, i) => (
          <button key={s.label} type="button" className="stat rise" style={{ '--i': i }} onClick={() => onGo(s.tab)}>
            <span className="stat-icon" aria-hidden="true">{s.icon}</span>
            <span className={`stat-value${s.alert ? ' is-alert' : ''}`}><AnimatedNumber value={s.value} /></span>
            <span className="stat-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="overview-cols">
        <section className="overview-block rise" style={{ '--i': 6 }}>
          <h3>Coming up</h3>
          {upcoming.length === 0 ? (
            <p className="mp-muted">Nothing scheduled. Add homework, an exam date or project milestones.</p>
          ) : (
            <ul className="mini-list">
              {upcoming.map((u) => {
                const c = countdown(u.date, today, u.opts);
                return (
                  <li key={u.kind + u.id}>
                    <span><span className="kind-tag">{u.kind}</span> {u.title}</span>
                    <span className={`chip ${c.tone}`}>{c.text}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <h3 className="overview-gap">Last lecture</h3>
          {lastLecture ? (
            <p>
              <strong>{lastLecture.title}</strong>
              <span className="mp-muted"> · {formatDay(dayOf(lastLecture))}</span>
            </p>
          ) : (
            <p className="mp-muted">Nothing logged yet.</p>
          )}
        </section>

        <section className="overview-block rise" style={{ '--i': 7 }}>
          <h3>To-dos for {subject.name}</h3>
          <form className="todo-inline" onSubmit={add}>
            <input className="field" placeholder="Add a to-do…" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit" className="btn-primary">Add</button>
          </form>
          <ul className="mini-list">
            {[...openTodos, ...doneTodos].map((t) => (
              <li key={t.id} className={t.completed ? 'is-done' : ''}>
                <label className="todo-check">
                  <input type="checkbox" checked={t.completed} onChange={() => api.toggleTodo(t)} />
                  <span>{t.content}</span>
                </label>
                <button type="button" className="icon-x" onClick={() => api.deleteTodo(t.id)} aria-label="Delete to-do">×</button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && <p className="mp-muted">Nothing to do here.</p>}
        </section>
      </div>
    </div>
  );
}
