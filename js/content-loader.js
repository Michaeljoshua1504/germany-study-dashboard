// ═══════════════ CONTENT LOADER (Level 3 — Storage Edition) ═══════════════
// Fetches protected HTML sections from Supabase Storage after login.
// Uses Storage REST API — no PostgREST / table dependency.

let _contentLoaded = false;

const STORAGE_SECTIONS = [
  { key: "visa",    file: "visa.html"    },
  { key: "my-room", file: "my-room.html" },
];

async function loadProtectedContent() {
  if (_contentLoaded) return;
  if (!sbClient) return;

  let anyLoaded = false;

  for (const { key, file } of STORAGE_SECTIONS) {
    try {
      const { data, error } = await sbClient.storage
        .from("page-content")
        .download(file);

      if (error) {
        console.error(`Storage fetch failed for ${file}:`, error.message);
        continue;
      }

      const html = await data.text();

      const tab = document.getElementById("tab-" + key);
      if (!tab) continue;

      const placeholder = tab.querySelector(".content-placeholder");
      if (placeholder) placeholder.remove();

      const container = document.createElement("div");
      container.className = "protected-content";
      container.innerHTML = html;
      tab.appendChild(container);

      anyLoaded = true;

    } catch (err) {
      console.error(`Unexpected error loading ${file}:`, err);
    }
  }

  if (!anyLoaded) return;
  _contentLoaded = true;

  if (typeof initVisaGalleryAccordion === "function") initVisaGalleryAccordion();
  if (typeof updatePhaseRings         === "function") updatePhaseRings();
  if (typeof restoreChecks            === "function") restoreChecks();
  if (typeof updateVisaProgress       === "function") updateVisaProgress();
}
