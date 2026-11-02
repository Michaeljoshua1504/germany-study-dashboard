import { useState } from 'react';
import { todayISO } from './dates';

// Tick the slides that were taught today; they become one dated lecture entry.
export default function SlidePicker({ slides, onSave, onCancel }) {
  const decks = [...new Set(slides.map((s) => s.deck))];
  const [deck, setDeck] = useState(decks[0]);
  const [picked, setPicked] = useState(() => new Set());
  const [upTo, setUpTo] = useState('');
  const [date, setDate] = useState(todayISO());
  const [title, setTitle] = useState(null); // null = built from the picked slides
  const [busy, setBusy] = useState(false);

  const visible = slides.filter((s) => s.deck === deck).sort((a, b) => a.slide_no - b.slide_no);
  const chosen = visible.filter((s) => picked.has(s.id));
  const autoTitle = chosen.length ? `${deck}: slides ${chosen[0].slide_no}-${chosen[chosen.length - 1].slide_no}` : '';
  const shownTitle = title ?? autoTitle;

  function changeDeck(d) {
    setDeck(d);
    setPicked(new Set());
    setUpTo('');
  }

  // "Taught up to slide 30" ticks every remaining slide up to that number.
  function changeUpTo(value) {
    setUpTo(value);
    const n = Number(value);
    setPicked(new Set(n ? visible.filter((s) => s.slide_no <= n).map((s) => s.id) : []));
  }

  function toggle(id) {
    const next = new Set(picked);
    if (!next.delete(id)) next.add(id);
    setPicked(next);
  }

  async function submit(e) {
    e.preventDefault();
    const content = chosen.map((s) => `SLIDE ${s.slide_no}: ${s.title}${s.content ? `\n${s.content}` : ''}`).join('\n\n');
    setBusy(true);
    const ok = await onSave({
      ids: chosen.map((s) => s.id),
      fields: { title: shownTitle.trim(), content, note_date: date || todayISO() },
    });
    if (!ok) setBusy(false);
  }

  return (
    <form className="item-form" onSubmit={submit}>
      <p className="mp-muted">Tick the slides that were taught. They become one lecture on the date you pick.</p>
      {decks.length > 1 && (
        <select className="field" value={deck} onChange={(e) => changeDeck(e.target.value)} aria-label="Slide deck">
          {decks.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      )}
      <div className="item-form-row">
        <label className="item-form-date">
          <span>Date</span>
          <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="item-form-date">
          <span>Taught up to slide</span>
          <input
            className="field"
            type="number"
            min={visible[0]?.slide_no}
            max={visible[visible.length - 1]?.slide_no}
            value={upTo}
            onChange={(e) => changeUpTo(e.target.value)}
          />
        </label>
        <label className="item-form-grow">
          <span>Title</span>
          <input className="field" value={shownTitle} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <ul className="slide-pick" aria-label="Slides not taught yet">
        {visible.map((s) => (
          <li key={s.id}>
            <label>
              <input type="checkbox" checked={picked.has(s.id)} onChange={() => toggle(s.id)} />
              <span className="slide-no">{s.slide_no}</span>
              <span>{s.title}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="item-form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy || !chosen.length || !shownTitle.trim()}>
          {busy ? 'Saving…' : chosen.length ? `Add ${chosen.length} ${chosen.length === 1 ? 'slide' : 'slides'} as a lecture` : 'Pick slides first'}
        </button>
      </div>
    </form>
  );
}
