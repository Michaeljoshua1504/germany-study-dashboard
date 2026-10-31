import { useState } from 'react';
import FieldForm from './FieldForm';
import BulkLinks from './BulkLinks';
import RowActions from './RowActions';
import { parseLink } from './links';

const KINDS = ['Slides', 'Paper', 'Book', 'Video', 'Course page', 'Link'];

const FIELDS = [
  { name: 'url', label: 'Link', required: true, placeholder: 'Paste a YouTube, Drive, OneDrive or any web link' },
  { name: 'title', label: 'Title (optional)', placeholder: 'Detected from the link if empty', width: 'grow' },
  { name: 'kind', label: 'Type', type: 'select', width: 'sm', default: 'Auto', options: [{ value: 'Auto', label: 'Auto-detect' }, ...KINDS.map((k) => ({ value: k, label: k }))] },
];

const validate = (v) => (parseLink(v.url) ? '' : 'Enter a valid web link (http or https) with a domain.');

function normalize(v) {
  const info = parseLink(v.url);
  return {
    url: info.href,
    title: v.title || info.title,
    kind: v.kind === 'Auto' ? info.suggestedKind ?? 'Link' : v.kind,
  };
}

// Inline player/previewer. The src is always an embed URL that links.js built
// from a validated ID on a fixed host, never the pasted URL itself.
function Embed({ info, title, onClose }) {
  return (
    <div className={`embed embed-${info.embedType}`}>
      <iframe
        src={info.embed}
        title={title}
        loading="lazy"
        allow="fullscreen; picture-in-picture; encrypted-media; autoplay"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
      />
      <button type="button" className="btn-ghost embed-close" onClick={onClose}>Close preview</button>
    </div>
  );
}

export default function ResourcesPane({ subject, resources, api }) {
  const [mode, setMode] = useState(null); // null | 'one' | 'many'
  const [editingId, setEditingId] = useState(null);
  const [openId, setOpenId] = useState(null); // resource whose preview is open
  const [kind, setKind] = useState('');

  const shown = resources.filter((r) => !kind || r.kind === kind).sort((a, b) => Number(a.read) - Number(b.read));
  const unread = resources.filter((r) => !r.read).length;
  const kindsUsed = [...new Set(resources.map((r) => r.kind))];

  return (
    <div>
      <div className="pane-head">
        <p className="mp-muted">{resources.length} saved · {unread} unread</p>
        {!mode && (
          <span className="pane-head-actions">
            <button type="button" className="btn-ghost" onClick={() => setMode('many')}>+ Add several</button>
            <button type="button" className="btn-primary" onClick={() => setMode('one')}>+ Add resource</button>
          </span>
        )}
      </div>

      {mode === 'one' && (
        <FieldForm
          fields={FIELDS}
          validate={validate}
          onCancel={() => setMode(null)}
          onSave={async (v) => {
            const ok = await api.addItem('resources', subject.id, normalize(v));
            if (ok) setMode(null);
            return ok;
          }}
        />
      )}
      {mode === 'many' && (
        <BulkLinks
          existingUrls={resources.map((r) => r.url)}
          kinds={KINDS}
          onCancel={() => setMode(null)}
          onSave={async (rows) => {
            const ok = await api.addItems('resources', subject.id, rows);
            if (ok) setMode(null);
            return ok;
          }}
        />
      )}

      {kindsUsed.length > 1 && (
        <div className="tag-filter" role="group" aria-label="Filter by type">
          {['', ...kindsUsed].map((k) => (
            <button key={k} type="button" className={`tag-filter-btn${kind === k ? ' is-active' : ''}`} onClick={() => setKind(k)}>
              {k || 'All'}
            </button>
          ))}
        </div>
      )}

      {resources.length === 0 && !mode && (
        <p className="empty">Nothing saved yet. Paste links to slides, PDFs, papers and videos from YouTube, Google Drive or OneDrive — use “Add several” to paste a whole list at once.</p>
      )}

      <ul className="hw-list">
        {shown.map((r, i) => {
          if (editingId === r.id) {
            return (
              <li key={r.id}>
                <FieldForm
                  fields={FIELDS}
                  initial={r}
                  validate={validate}
                  onCancel={() => setEditingId(null)}
                  onSave={async (v) => {
                    const ok = await api.updateItem('resources', r.id, normalize(v));
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              </li>
            );
          }
          const info = parseLink(r.url);
          const open = openId === r.id && info?.embed;
          return (
            <li key={r.id} className={`hw-item res-item rise${r.read ? ' is-done' : ''}`} style={{ '--i': i }}>
              <input
                type="checkbox"
                checked={!!r.read}
                onChange={() => api.updateItem('resources', r.id, { read: !r.read })}
                aria-label={`Mark "${r.title}" ${r.read ? 'unread' : 'read'}`}
              />
              <div className="hw-main">
                <div className="entry-head">
                  <span className="res-title">
                    <span className="res-icon" aria-hidden="true">{info?.icon ?? '🔗'}</span>
                    {info ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer"><strong>{r.title}</strong> ↗</a>
                    ) : (
                      <strong>{r.title}</strong>
                    )}
                  </span>
                  <RowActions onEdit={() => setEditingId(r.id)} onDelete={() => api.deleteItem('resources', r.id)} />
                </div>
                <span className="res-meta">
                  <span className="chip">{r.kind}</span>
                  {info && info.source !== 'Link' && <span className="chip">{info.source}</span>}
                  {info?.embed && (
                    <button type="button" className="res-preview-btn" onClick={() => setOpenId(open ? null : r.id)}>
                      {open ? '✕ Close' : info.embedType === 'video' ? '▶ Play here' : '👁 Preview here'}
                    </button>
                  )}
                </span>
                {open && <Embed info={info} title={r.title} onClose={() => setOpenId(null)} />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
