import { useState } from 'react';
import NoteSection from './NoteSection';

const SECTIONS = [
  { type: 'lecture', label: 'Lectures' },
  { type: 'homework', label: 'Homework' },
  { type: 'note', label: 'Notes' },
];

export default function SubjectDetail({ subject, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="subject-detail">
      <header className="subject-detail-head">
        <div>
          <h1>{subject.name}</h1>
          {subject.term && <p className="mp-muted">{subject.term}</p>}
        </div>
        {confirming ? (
          <span className="subject-confirm">
            Delete this subject and all its notes?
            <button type="button" className="btn-ghost" onClick={() => setConfirming(false)}>Keep</button>
            <button type="button" className="btn-danger" onClick={() => onDelete(subject.id)}>Delete</button>
          </span>
        ) : (
          <button type="button" className="btn-ghost" onClick={() => setConfirming(true)}>Delete subject</button>
        )}
      </header>

      {SECTIONS.map((s) => (
        <NoteSection key={`${subject.id}-${s.type}`} subjectId={subject.id} type={s.type} label={s.label} />
      ))}
    </div>
  );
}
