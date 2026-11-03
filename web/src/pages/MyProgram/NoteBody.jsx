import { useState } from 'react';
import Highlight from './Highlight';
import { isLong, parseBody } from './noteText';

// Readable body for lectures and notes: headings, bullets, and a
// "Show more / Show less" toggle for long entries. Pass open + onToggle to let
// the parent control it (the notes grid widens an opened card). `words`
// highlights search matches; `alwaysOpen` shows everything without the toggle.
export default function NoteBody({ text, open, onToggle, words, alwaysOpen = false }) {
  const [own, setOwn] = useState(false);
  if (!text) return null;

  const long = isLong(text) && !alwaysOpen;
  const expanded = !long || (open ?? own);
  const toggle = () => (onToggle ? onToggle(!expanded) : setOwn(!expanded));

  // Group consecutive bullets into one list.
  const parts = [];
  for (const b of parseBody(text)) {
    const last = parts[parts.length - 1];
    if (b.kind === 'item' && last?.kind === 'list') last.items.push(b);
    else if (b.kind === 'item') parts.push({ kind: 'list', items: [b] });
    else parts.push(b);
  }

  return (
    <div className="nb-wrap">
      <div className={`nb${expanded ? '' : ' is-clamped'}`}>
        {parts.map((p, i) => {
          if (p.kind === 'heading') return <h4 key={i} className="nb-h"><Highlight text={p.text} words={words} /></h4>;
          if (p.kind === 'para') return <p key={i} className={p.indent ? 'nb-indent' : undefined}><Highlight text={p.text} words={words} /></p>;
          return (
            <ul key={i}>
              {p.items.map((it, j) => (
                <li key={j} className={`${it.level === 2 ? 'l2' : ''}${it.num ? ' num' : ''}`.trim() || undefined}>
                  {it.num && <span className="nb-n">{it.num}</span>}
                  <Highlight text={it.text} words={words} />
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      {long && (
        <button type="button" className="nb-more" aria-expanded={expanded} onClick={toggle}>
          {expanded ? 'Show less ▴' : 'Show more ▾'}
        </button>
      )}
    </div>
  );
}
