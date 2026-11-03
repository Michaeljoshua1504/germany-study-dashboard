// Turns the plain text of a lecture or note into display blocks, so long
// entries read as headings, bullet lists and short paragraphs instead of one
// wall of text. Everything stays plain text in the database.
//
//   ALL CAPS LINE       -> heading
//   "• text"            -> bullet
//   "   - text" / "   1. text" (indented) -> sub-bullet
//   "1. text"           -> numbered step
//   anything else       -> paragraph (indented lines stay indented)
// A heading is an ALL CAPS line; a trailing "(note in brackets)" may be mixed case.
export const isHeadingLine = (body) => {
  const core = body.replace(/\([^)]*\)/g, '').trim();
  return !/^[•-]/.test(body) && core === core.toUpperCase() && /[A-Z]{3}/.test(core);
};

export function parseBody(text) {
  const blocks = [];
  for (const raw of (text ?? '').split('\n')) {
    const body = raw.trim();
    if (!body) continue;
    const indent = raw.length - raw.trimStart().length;
    const num = body.match(/^(\d+[.)])\s+(.*)$/);

    if (isHeadingLine(body) || /^SLIDE \d+:/.test(body)) {
      blocks.push({ kind: 'heading', text: body });
    } else if (body.startsWith('•')) {
      blocks.push({ kind: 'item', level: 1, text: body.replace(/^•\s*/, '') });
    } else if (indent >= 2 && /^-\s/.test(body)) {
      blocks.push({ kind: 'item', level: 2, text: body.replace(/^-\s*/, '') });
    } else if (indent >= 2 && num) {
      blocks.push({ kind: 'item', level: 2, num: num[1], text: num[2] });
    } else if (num) {
      blocks.push({ kind: 'item', level: 1, num: num[1], text: num[2] });
    } else {
      blocks.push({ kind: 'para', indent: indent >= 2, text: body });
    }
  }
  return blocks;
}

// Long entries start collapsed.
export const isLong = (text) => (text ?? '').length > 650 || (text ?? '').split('\n').filter((l) => l.trim()).length > 11;

// Lecture search: every typed word must appear somewhere in the lecture. The
// hits are the lines that contain all the words (or, failing that, any of
// them), each with the section heading it sits under.
export const searchWords = (query) => query.toLowerCase().split(/\s+/).filter(Boolean);

export function findHits(note, words) {
  const content = note.content ?? '';
  if (!words.every((w) => `${note.title}\n${content}`.toLowerCase().includes(w))) return null;

  const lines = [];
  let section = '';
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (isHeadingLine(line)) section = line.replace(/^\d+[.)]\s*/, '');
    lines.push({ section: isHeadingLine(line) ? '' : section, line: line.replace(/^[•-]\s*/, '') });
  }
  const all = lines.filter((l) => words.every((w) => l.line.toLowerCase().includes(w)));
  const hits = all.length ? all : lines.filter((l) => words.some((w) => l.line.toLowerCase().includes(w)));
  return { hits };
}
