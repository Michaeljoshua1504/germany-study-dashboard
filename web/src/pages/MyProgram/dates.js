// Dates are stored as plain YYYY-MM-DD strings (Postgres `date`), so they are
// parsed as local dates here — new Date('2026-11-03') would be UTC and can
// shift a day.
const pad = (n) => String(n).padStart(2, '0');

export function toISO(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function parseISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDay(s) {
  return parseISO(s).toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatShort(s) {
  return parseISO(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

export function daysBetween(fromISO, toISOStr) {
  return Math.round((parseISO(toISOStr) - parseISO(fromISO)) / 86400000);
}

// The day a lecture/note belongs to; falls back to when the row was created.
export function dayOf(note) {
  return note.note_date || note.created_at.slice(0, 10);
}

// "Due today" / "In 3 days" / "Overdue by 2 days" chips for any dated item.
// prefix: '' for exams ("Today"), 'Due ' for homework. far: 'days' keeps
// counting in days however distant; 'date' switches to a short date past 14.
export function countdown(dateISO, today, { done = false, prefix = 'Due ', far = 'date', past = 'overdue' } = {}) {
  const d = daysBetween(today, dateISO);
  const say = (s) => (prefix ? `${prefix}${s}` : s[0].toUpperCase() + s.slice(1));
  const plural = (n) => `${n} ${n === 1 ? 'day' : 'days'}`;
  if (done) return { text: `${prefix || ''}${formatShort(dateISO)}`, tone: '', days: d };
  if (d < 0) {
    return past === 'overdue'
      ? { text: `Overdue by ${plural(-d)}`, tone: 'late', days: d }
      : { text: `${formatShort(dateISO)} · ${plural(-d)} ago`, tone: '', days: d };
  }
  if (d === 0) return { text: say('today'), tone: 'soon', days: d };
  if (d === 1) return { text: say('tomorrow'), tone: 'soon', days: d };
  if (d <= 3) return { text: say(`in ${plural(d)}`), tone: 'soon', days: d };
  if (far === 'days' || d <= 14) return { text: say(`in ${plural(d)}`), tone: '', days: d };
  return { text: say(formatShort(dateISO)), tone: '', days: d };
}

export function formatMinutes(m) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  return r ? `${h}h ${r}m` : `${h}h`;
}

// Only http(s) links are ever rendered as hrefs (blocks javascript: etc.).
export function safeUrl(input) {
  const s = (input ?? '').trim();
  if (!s) return null;
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}
