// ═══════════════ DUOLINGO MODE SWITCHER ═══════════════
function switchDuoMode(mode) {
  duoActiveMode = mode;
  ['notes','words','sentences'].forEach(m => {
    const btn = document.getElementById('duo-mode-' + m);
    const pane = document.getElementById('duo-pane-' + m);
    if (btn) btn.classList.toggle('active', m === mode);
    if (pane) pane.style.display = m === mode ? 'block' : 'none';
  });
}

