import { useState } from 'react';
import { parseBulk } from './links';

// Paste many links at once, one per line. Optional titles: "Week 1 | https://…"
// or "Week 1 https://…". Titles and types are detected when you leave them out.
export default function BulkLinks({ existingUrls, kinds, onSave, onCancel }) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState('Auto');
  const [busy, setBusy] = useState(false);

  const rows = parseBulk(text, existingUrls);
  const ok = rows.filter((r) => !r.error);

  async function save() {
    setBusy(true);
    const done = await onSave(
      ok.map((r) => ({
        title: r.title,
        url: r.info.href,
        kind: kind === 'Auto' ? r.info.suggestedKind ?? 'Link' : kind,
      })),
    );
    if (!done) setBusy(false);
  }

  return (
    <div className="item-form">
      <label>
        <span>Paste links, one per line</span>
        <textarea
          className="field bulk-text"
          rows={6}
          autoFocus
          placeholder={'https://youtu.be/…\nWeek 1 slides | https://drive.google.com/file/d/…\nhttps://example.com/lecture2.pdf'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <label className="bulk-kind">
        <span>Type for all</span>
        <select className="field" value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="Auto">Auto-detect</option>
          {kinds.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>

      {rows.length > 0 && (
        <ul className="bulk-preview" aria-label="Detected links">
          {rows.map((r, i) => (
            <li key={i} className={r.error ? 'has-error' : ''}>
              <span aria-hidden="true">{r.info?.icon ?? '⚠️'}</span>
              <span className="bulk-title">{r.error && !r.info ? r.line : r.title}</span>
              {r.info && <span className="chip">{r.info.source}</span>}
              {r.error && <span className="chip late">{r.error}</span>}
            </li>
          ))}
        </ul>
      )}

      <div className="item-form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn-primary" disabled={!ok.length || busy} onClick={save}>
          {busy ? 'Saving…' : ok.length ? `Add ${ok.length} ${ok.length === 1 ? 'link' : 'links'}` : 'Add links'}
        </button>
      </div>
    </div>
  );
}
