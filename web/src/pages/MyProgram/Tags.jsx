// "Exam relevant" / "Revise again" flags on lectures and notes.
export const TAGS = [
  { key: 'important', label: 'Important' },
  { key: 'exam_relevant', label: 'Exam relevant' },
  { key: 'revise', label: 'Revise again' },
];

export function TagChips({ note }) {
  const on = TAGS.filter((t) => note[t.key]);
  if (!on.length) return null;
  return (
    <span className="tag-chips">
      {on.map((t) => (
        <span key={t.key} className={`tag-chip tag-${t.key}`}>{t.label}</span>
      ))}
    </span>
  );
}

// Filter bar; hidden until at least one item carries a tag.
export function TagFilter({ items, value, onChange }) {
  if (!items.some((n) => TAGS.some((t) => n[t.key]))) return null;
  const options = [{ key: '', label: 'All', count: items.length }].concat(
    TAGS.map((t) => ({ ...t, count: items.filter((n) => n[t.key]).length })),
  );
  return (
    <div className="tag-filter" role="group" aria-label="Filter by tag">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          className={`tag-filter-btn${value === o.key ? ' is-active' : ''}`}
          onClick={() => onChange(o.key)}
        >
          {o.label} <span>{o.count}</span>
        </button>
      ))}
    </div>
  );
}

export const matchTag = (note, tag) => !tag || !!note[tag];
