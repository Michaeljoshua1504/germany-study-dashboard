import { useState } from 'react';

// Small config-driven form used by exams, resources, questions, study
// sessions, flashcards and milestones.
//   fields: [{ name, label, type: text|textarea|date|number|select, required,
//              placeholder, options, default, width: 'sm'|'grow'|'full', min, max, step }]
//   validate(values) -> error string | ''   (optional extra check)
//   onSave(values) -> Promise<boolean>
export default function FieldForm({ fields, initial, onSave, onCancel, validate, submitLabel = 'Save' }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((f) => {
        const d = typeof f.default === 'function' ? f.default() : f.default;
        return [f.name, initial?.[f.name] ?? d ?? ''];
      }),
    ),
  );
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (name, v) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    setError('');
  };

  async function submit(e) {
    e.preventDefault();
    const missing = fields.find((f) => f.required && !String(values[f.name]).trim());
    if (missing) return setError(`${missing.label} is required.`);
    const custom = validate?.(values);
    if (custom) return setError(custom);

    const out = {};
    for (const f of fields) {
      const raw = values[f.name];
      if (f.type === 'number') out[f.name] = raw === '' ? null : Number(raw);
      else if (f.type === 'date') out[f.name] = raw || null;
      else if (f.type === 'select') out[f.name] = raw;
      else out[f.name] = String(raw).trim() || (f.required ? '' : null);
    }
    setBusy(true);
    const ok = await onSave(out);
    if (!ok) setBusy(false); // failed: the page shows the error, keep the form
  }

  function control(f, first) {
    const common = {
      autoFocus: first,
      className: 'field',
      value: values[f.name],
      onChange: (e) => set(f.name, e.target.value),
    };
    if (f.type === 'textarea') return <textarea {...common} rows={f.rows ?? 4} placeholder={f.placeholder} />;
    if (f.type === 'select') {
      return (
        <select {...common}>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    }
    return (
      <input
        {...common}
        type={f.type ?? 'text'}
        placeholder={f.placeholder}
        min={f.min}
        max={f.max}
        step={f.step}
      />
    );
  }

  return (
    <form className="item-form" onSubmit={submit}>
      <div className="item-form-row">
        {fields.map((f, i) => (
          <label key={f.name} className={`ff-${f.width ?? (f.type === 'textarea' ? 'full' : 'grow')}`}>
            <span>{f.label}</span>
            {control(f, i === 0)}
          </label>
        ))}
      </div>
      {error && <p className="mp-error" role="alert">{error}</p>}
      <div className="item-form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}

