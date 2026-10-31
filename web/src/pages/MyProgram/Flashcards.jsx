import { useEffect, useState } from 'react';
import FieldForm from './FieldForm';
import RowActions from './RowActions';

const FIELDS = [
  { name: 'term', label: 'Term / front', required: true, placeholder: 'der Bahnhof' },
  { name: 'definition', label: 'Definition / back', type: 'textarea', required: true, rows: 3, placeholder: 'the train station' },
];

// Click or press Space to flip; K = got it, A = again.
function Review({ cards, api, onDone }) {
  const [queue, setQueue] = useState(() => cards.map((c) => c.id));
  const [flipped, setFlipped] = useState(false);
  const [got, setGot] = useState(0);
  const total = cards.length;
  const card = cards.find((c) => c.id === queue[0]);

  async function answer(known) {
    if (!card) return;
    api.updateItem('cards', card.id, { known, last_reviewed: new Date().toISOString() });
    if (known) setGot((g) => g + 1);
    setQueue((q) => (known ? q.slice(1) : [...q.slice(1), q[0]]));
    setFlipped(false);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === ' ') { e.preventDefault(); setFlipped((f) => !f); }
      else if (flipped && e.key.toLowerCase() === 'k') answer(true);
      else if (flipped && e.key.toLowerCase() === 'a') answer(false);
      else if (e.key === 'Escape') onDone();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!card) {
    return (
      <div className="review-done rise">
        <h2>Round complete 🎉</h2>
        <p className="mp-muted">You got all {total} {total === 1 ? 'card' : 'cards'}.</p>
        <button type="button" className="btn-primary" onClick={onDone}>Back to cards</button>
      </div>
    );
  }

  return (
    <div className="review">
      <div className="review-top">
        <span className="mp-muted">{got} / {total} got it · {queue.length} left</span>
        <button type="button" className="btn-ghost" onClick={onDone}>Exit review</button>
      </div>
      <div className="review-progress"><div style={{ width: `${(got / total) * 100}%` }} /></div>
      <button type="button" className={`flip${flipped ? ' is-flipped' : ''}`} onClick={() => setFlipped((f) => !f)} aria-label="Flip card">
        <span className="flip-inner">
          <span className="flip-face">{card.term}</span>
          <span className="flip-face flip-back">{card.definition}</span>
        </span>
      </button>
      {flipped ? (
        <div className="review-actions">
          <button type="button" className="btn-ghost" onClick={() => answer(false)}>Again <kbd>A</kbd></button>
          <button type="button" className="btn-primary" onClick={() => answer(true)}>Got it <kbd>K</kbd></button>
        </div>
      ) : (
        <p className="mp-muted review-hint">Click the card or press Space to flip</p>
      )}
    </div>
  );
}

export default function Flashcards({ subject, cards, api }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formKey, setFormKey] = useState(0); // remount the form after each add so you can keep typing cards
  const [reviewing, setReviewing] = useState(null); // cards snapshot for this round

  const toLearn = cards.filter((c) => !c.known);

  if (reviewing) return <Review cards={reviewing} api={api} onDone={() => setReviewing(null)} />;

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{cards.length} cards · {cards.length - toLearn.length} known</p>
        <span className="pane-head-actions">
          {cards.length > 0 && (
            <button type="button" className="btn-ghost" onClick={() => setReviewing(toLearn.length ? toLearn : cards)}>
              {toLearn.length ? `Review ${toLearn.length} to learn` : 'Review all'}
            </button>
          )}
          {!adding && <button type="button" className="btn-primary" onClick={() => setAdding(true)}>+ Add card</button>}
        </span>
      </div>

      {adding && (
        <FieldForm
          key={formKey}
          fields={FIELDS}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const ok = await api.addItem('cards', subject.id, v);
            if (ok) setFormKey((k) => k + 1);
            return ok;
          }}
          submitLabel="Add card"
        />
      )}

      {cards.length === 0 && !adding && (
        <p className="empty">No cards yet. Add key terms, definitions, formulas or vocabulary, then drill them in review mode.</p>
      )}

      <div className="note-grid">
        {[...cards].reverse().map((c, i) =>
          editingId === c.id ? (
            <div key={c.id} className="note-grid-wide">
              <FieldForm
                fields={FIELDS}
                initial={c}
                onCancel={() => setEditingId(null)}
                onSave={async (v) => {
                  const ok = await api.updateItem('cards', c.id, v);
                  if (ok) setEditingId(null);
                  return ok;
                }}
              />
            </div>
          ) : (
            <article key={c.id} className="note-card rise" style={{ '--i': i }}>
              <div className="entry-head">
                <strong>{c.term}</strong>
                <RowActions onEdit={() => setEditingId(c.id)} onDelete={() => api.deleteItem('cards', c.id)} />
              </div>
              <p className="entry-body">{c.definition}</p>
              <label className="known-toggle">
                <input type="checkbox" checked={!!c.known} onChange={() => api.updateItem('cards', c.id, { known: !c.known })} />
                Known
              </label>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
