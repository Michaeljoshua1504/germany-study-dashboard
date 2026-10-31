import { safeUrl } from './dates.js';

// Recognises where a pasted link points (YouTube, Drive, OneDrive…), picks an
// icon, suggests a title/type, and — for a small allow-list of hosts — builds
// an embeddable player/preview URL. The embed URL is always rebuilt from a
// validated ID on a fixed host; a pasted URL is never put in an iframe as-is.
const YT_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);
const YT_ID = /^[\w-]{11}$/;
const DRIVE_ID = /^[\w-]{10,}$/;

function youtubeId(u) {
  if (u.hostname === 'youtu.be') return u.pathname.split('/')[1] ?? '';
  if (!YT_HOSTS.has(u.hostname)) return '';
  const fromPath = u.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]+)/);
  return u.searchParams.get('v') ?? fromPath?.[1] ?? '';
}

function fileTitle(u) {
  const last = decodeURIComponent(u.pathname.split('/').filter(Boolean).pop() ?? '');
  const name = last.replace(/\.[a-z0-9]{2,5}$/i, '').replace(/[_+]+/g, ' ').trim();
  return name || u.hostname.replace(/^www\./, '');
}

export function parseLink(input) {
  const href = safeUrl(input);
  if (!href) return null;
  const u = new URL(href);
  const host = u.hostname.toLowerCase();
  const path = u.pathname;
  const base = { href, source: 'Link', icon: '🔗', title: fileTitle(u), suggestedKind: null, embed: null, embedType: null };

  const yt = youtubeId(u);
  if (yt && YT_ID.test(yt)) {
    return { ...base, source: 'YouTube', icon: '▶️', title: 'YouTube video', suggestedKind: 'Video', embedType: 'video', embed: `https://www.youtube-nocookie.com/embed/${yt}` };
  }
  if (/^(www\.)?vimeo\.com$/.test(host)) {
    const id = path.match(/^\/(\d+)/)?.[1];
    return { ...base, source: 'Vimeo', icon: '🎬', title: 'Vimeo video', suggestedKind: 'Video', embedType: id ? 'video' : null, embed: id ? `https://player.vimeo.com/video/${id}` : null };
  }
  if (host === 'drive.google.com') {
    const folder = path.match(/^\/drive\/(?:u\/\d+\/)?folders\/([\w-]+)/);
    if (folder) return { ...base, source: 'Google Drive folder', icon: '📁', title: 'Drive folder' };
    const file = path.match(/^\/file\/d\/([\w-]+)/)?.[1] ?? (path === '/open' || path === '/uc' ? u.searchParams.get('id') : null);
    if (file && DRIVE_ID.test(file)) {
      return { ...base, source: 'Google Drive', icon: '📄', title: 'Drive file', embedType: 'doc', embed: `https://drive.google.com/file/d/${file}/preview` };
    }
    return { ...base, source: 'Google Drive', icon: '📄', title: 'Drive file' };
  }
  if (host === 'docs.google.com') {
    const m = path.match(/^\/(document|presentation|spreadsheets)\/d\/([\w-]+)/);
    if (m && DRIVE_ID.test(m[2])) {
      const slides = m[1] === 'presentation';
      return { ...base, source: slides ? 'Google Slides' : m[1] === 'document' ? 'Google Docs' : 'Google Sheets', icon: slides ? '🖼️' : '📄', title: slides ? 'Google Slides' : 'Google Doc', suggestedKind: slides ? 'Slides' : null, embedType: 'doc', embed: `https://docs.google.com/${m[1]}/d/${m[2]}/preview` };
    }
  }
  if (host === '1drv.ms' || host.endsWith('onedrive.live.com') || host.endsWith('sharepoint.com') || host.endsWith('office.com')) {
    return { ...base, source: 'OneDrive', icon: '☁️', title: host === '1drv.ms' ? 'OneDrive file' : fileTitle(u) };
  }
  if (host === 'dropbox.com' || host.endsWith('.dropbox.com')) return { ...base, source: 'Dropbox', icon: '📦' };
  if (host === 'github.com') return { ...base, source: 'GitHub', icon: '🐙' };
  if (/\.pdf$/i.test(path)) return { ...base, source: 'PDF', icon: '📕', suggestedKind: 'Paper' };
  if (/\.pptx?$/i.test(path)) return { ...base, source: 'PowerPoint', icon: '🖼️', suggestedKind: 'Slides' };
  return base;
}

// "Title | link", "Title link", or just a link — one per line.
export function parseBulk(text, existingUrls = []) {
  const have = new Set(existingUrls);
  const seen = new Set();
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      let title = '';
      let raw = line;
      if (line.includes('|')) {
        const i = line.lastIndexOf('|');
        title = line.slice(0, i).trim();
        raw = line.slice(i + 1).trim();
      } else if (/\s/.test(line)) {
        const i = line.search(/\s\S+$/);
        title = line.slice(0, i).replace(/[-–:]+$/, '').trim();
        raw = line.slice(i).trim();
      }
      const info = parseLink(raw);
      if (!info) return { line, error: 'Not a valid web link' };
      let error = '';
      if (have.has(info.href)) error = 'Already saved';
      else if (seen.has(info.href)) error = 'Duplicate in this list';
      seen.add(info.href);
      return { line, info, title: title || info.title, error };
    });
}
