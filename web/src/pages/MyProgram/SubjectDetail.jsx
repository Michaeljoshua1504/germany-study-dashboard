import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Overview from './Overview';
import LectureLog from './LectureLog';
import HomeworkList from './HomeworkList';
import NotesPane from './NotesPane';
import Flashcards from './Flashcards';
import QuestionsPane from './QuestionsPane';
import ResourcesPane from './ResourcesPane';
import ExamsPane from './ExamsPane';
import ProjectPane from './ProjectPane';
import StudyPane from './StudyPane';
import FieldForm from './FieldForm';
import { todayISO } from './dates';

const RENAME_FIELDS = [
  { name: 'name', label: 'Subject name', required: true },
  { name: 'term', label: 'Term', width: 'sm', placeholder: 'WS 2026/27' },
];

export default function SubjectDetail({ subject, notes, todos, slides, data, api, onDelete }) {
  const [tab, setTab] = useState('overview');
  const [confirming, setConfirming] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [today] = useState(todayISO);

  const lectures = notes.filter((n) => n.type === 'lecture');
  const homework = notes.filter((n) => n.type === 'homework');
  const plain = notes.filter((n) => n.type === 'note');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'lectures', label: 'Lectures', count: lectures.length },
    { id: 'notes', label: 'Notes', count: plain.length },
    { id: 'cards', label: 'Cards', count: data.cards.filter((c) => !c.known).length },
    { id: 'questions', label: 'Questions', count: data.questions.filter((q) => !q.resolved).length },
    { id: 'resources', label: 'Resources', count: data.resources.filter((r) => !r.read).length },
    { id: 'homework', label: 'Homework', count: homework.filter((h) => !h.done).length },
    { id: 'exams', label: 'Exams', count: data.exams.filter((e) => e.due_date >= today).length },
    { id: 'project', label: 'Project', count: data.milestones.filter((m) => !m.done).length },
    { id: 'study', label: 'Study log' },
  ];

  // Slide the pill under the active tab. Set straight on the element (no
  // state) so it moves smoothly; re-measured when counts change a tab's width.
  const barRef = useRef(null);
  const pillRef = useRef(null);
  const sizes = tabs.map((t) => t.count).join(',');
  function placePill() {
    const bar = barRef.current;
    const active = bar?.querySelector('[aria-selected="true"]');
    if (!active || !pillRef.current) return;
    pillRef.current.style.width = `${active.offsetWidth}px`;
    pillRef.current.style.transform = `translateX(${active.offsetLeft}px)`;
    const outside = active.offsetLeft < bar.scrollLeft || active.offsetLeft + active.offsetWidth > bar.scrollLeft + bar.clientWidth;
    if (outside) bar.scrollTo({ left: active.offsetLeft - 24, behavior: 'smooth' });
  }
  useLayoutEffect(placePill, [tab, sizes]);
  useEffect(() => {
    window.addEventListener('resize', placePill);
    return () => window.removeEventListener('resize', placePill);
  }, []);

  return (
    <div className="subject-detail" style={{ '--subject': subject.color || 'var(--red)' }}>
      <header className="subject-detail-head">
        {renaming ? (
          <div className="rename">
            <FieldForm
              fields={RENAME_FIELDS}
              initial={subject}
              onCancel={() => setRenaming(false)}
              onSave={async (v) => {
                const ok = await api.updateSubject(subject.id, { name: v.name, term: v.term });
                if (ok) setRenaming(false);
                return ok;
              }}
            />
          </div>
        ) : (
          <>
            <div>
              <h1>{subject.name}</h1>
              {subject.term && <p className="mp-muted">{subject.term}</p>}
            </div>
            {confirming ? (
              <span className="subject-confirm">
                Delete this subject and everything in it?
                <button type="button" className="btn-ghost" onClick={() => setConfirming(false)}>Keep</button>
                <button type="button" className="btn-danger" onClick={() => onDelete(subject.id)}>Delete</button>
              </span>
            ) : (
              <span className="head-actions">
                <button type="button" className="btn-ghost" onClick={() => setRenaming(true)}>Rename</button>
                <button type="button" className="btn-ghost" onClick={() => setConfirming(true)}>Delete</button>
              </span>
            )}
          </>
        )}
      </header>

      <div className="detail-tabs" role="tablist" ref={barRef}>
        <span className="tab-pill" ref={pillRef} aria-hidden="true" />
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`detail-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.count > 0 && <span className="detail-tab-count">{t.count}</span>}
          </button>
        ))}
      </div>

      <div className="pane" key={tab} role="tabpanel">
        {tab === 'overview' && <Overview subject={subject} notes={notes} todos={todos} data={data} api={api} onGo={setTab} />}
        {tab === 'lectures' && <LectureLog subjectId={subject.id} lectures={lectures} slides={slides} api={api} />}
        {tab === 'notes' && <NotesPane subjectId={subject.id} notes={plain} api={api} />}
        {tab === 'cards' && <Flashcards subject={subject} cards={data.cards} api={api} />}
        {tab === 'questions' && <QuestionsPane subject={subject} questions={data.questions} api={api} />}
        {tab === 'resources' && <ResourcesPane subject={subject} resources={data.resources} api={api} />}
        {tab === 'homework' && <HomeworkList subjectId={subject.id} homework={homework} api={api} />}
        {tab === 'exams' && <ExamsPane subject={subject} exams={data.exams} api={api} />}
        {tab === 'project' && <ProjectPane subject={subject} milestones={data.milestones} api={api} />}
        {tab === 'study' && <StudyPane subject={subject} sessions={data.sessions} api={api} />}
      </div>
    </div>
  );
}
