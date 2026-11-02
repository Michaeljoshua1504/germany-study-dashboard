// Turns the plain text of a lecture or note into display blocks, so long
// entries read as headings, bullet lists and short paragraphs instead of one
// wall of text. Everything stays plain text in the database.
//
//   ALL CAPS LINE       -> heading
//   "• text"            -> bullet
//   "   - text" / "   1. text" (indented) -> sub-bullet
//   "1. text"           -> numbered step
//   anything else       -> paragraph (indented lines stay indented)
export function parseBody(text) {
  const blocks = [];
  for (const raw of (text ?? '').split('\n')) {
    const body = raw.trim();
    if (!body) continue;
    const indent = raw.length - raw.trimStart().length;
    const num = body.match(/^(\d+[.)])\s+(.*)$/);
    const isHeading = !/^[•-]/.test(body) && body === body.toUpperCase() && /[A-Z]{3}/.test(body);

    if (isHeading || /^SLIDE \d+:/.test(body)) {
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
