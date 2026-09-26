// ═══════════════ CONTENT LOADER (Level 3) ═══════════════
// Fetches protected HTML sections from Supabase table after login.
// Uses page_sections table — no Storage dependency.

let _contentLoaded = false;

async function loadProtectedContent() {
  if (_contentLoaded) return;
  if (!sbClient) return;

  const { data: sections, error } = await sbClient
    .from("page_sections")
    .select("section_key, html_content");

  if (error || !sections || sections.length === 0) {
    console.error("Failed to load protected content:", error?.message);
    return;
  }

  sections.forEach(({ section_key, html_content }) => {
    const tab = document.getElementById("tab-" + section_key);
    if (!tab) return;

    const placeholder = tab.querySelector(".content-placeholder");
    if (placeholder) placeholder.remove();

    const container = document.createElement("div");
    container.className = "protected-content";
    container.innerHTML = html_content;
    tab.appendChild(container);

    // <script> tags inserted via innerHTML do NOT execute automatically (browser security behavior) —
    // manually re-create and run each one so injected JS (e.g. Travel Prep filters/progress) actually works
    container.querySelectorAll("script").forEach(oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  });

  _contentLoaded = true;

  if (typeof initVisaGalleryAccordion === "function") initVisaGalleryAccordion();
  if (typeof updatePhaseRings         === "function") updatePhaseRings();
  if (typeof restoreChecks            === "function") restoreChecks();
  if (typeof updateVisaProgress       === "function") updateVisaProgress();
}
