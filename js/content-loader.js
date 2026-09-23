// ═══════════════ CONTENT LOADER (Level 3) ═══════════════
// Fetches protected HTML sections from Supabase after login
// and injects them into the page. Source code stays clean.

let _contentLoaded = false;

async function loadProtectedContent() {
  if (_contentLoaded) return;
  if (!sbClient) return;

  const { data: sections, error } = await sbClient
    .from('page_sections')
    .select('section_key, html_content');

  if (error || !sections || sections.length === 0) {
    console.error('Failed to load protected content:', error?.message);
    return;
  }

  sections.forEach(({ section_key, html_content }) => {
    const tab = document.getElementById('tab-' + section_key);
    if (!tab) return;

    // Inject after the placeholder div
    const container = document.createElement('div');
    container.className = 'protected-content';
    container.innerHTML = html_content;
    tab.appendChild(container);
  });

  _contentLoaded = true;

  // Re-initialise Visa tab
  if (typeof initVisaGalleryAccordion === 'function') initVisaGalleryAccordion();
  if (typeof updatePhaseRings === 'function') updatePhaseRings();
  if (typeof restoreChecks === 'function') restoreChecks();
  if (typeof updateVisaProgress === 'function') updateVisaProgress();
}
