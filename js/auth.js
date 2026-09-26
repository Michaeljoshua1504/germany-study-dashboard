// ═══════════════ 9. AUTH SYSTEM (Supabase Auth) ═══════════════

let _authUser = null; // holds the current Supabase user object

function isLoggedIn() {
  return !!_authUser;
}

function applyAuthState() {
  const loggedIn = isLoggedIn();

  // Show/hide auth-gated tabs (topbar + sub-nav)
  document.querySelectorAll('.topbar-tab.auth-only, .tab.auth-only').forEach(el => {
    el.style.display = loggedIn ? '' : 'none';
  });

  // Show/hide login/logout buttons
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  if (loginBtn) loginBtn.style.display = loggedIn ? 'none' : '';
  if (logoutBtn) logoutBtn.style.display = loggedIn ? '' : 'none';

  // ── SECURITY: Hide sensitive content from guests ──
  // Auth-required tabs: hide real content, show lock placeholder when logged out
  const authTabs = ['tab-dashboard', 'tab-university', 'tab-visa', 'tab-my-room', 'tab-travel'];
  authTabs.forEach(tabId => {
    const tab = document.getElementById(tabId);
    if (!tab) return;
    const placeholder = document.getElementById(tabId + '-placeholder');
    // All direct children except the placeholder
    Array.from(tab.children).forEach(child => {
      if (child.id === tabId + '-placeholder') return;
      child.style.display = loggedIn ? '' : 'none';
    });
    if (placeholder) placeholder.style.display = loggedIn ? 'none' : 'block';
  });

  // If guest — lock view to Housing only
  const housingTabBtn = document.getElementById('tab-btn-housing');
  if (!loggedIn) {
    document.querySelectorAll('.topbar-tab').forEach(t => t.classList.remove('active'));
    if (housingTabBtn) housingTabBtn.classList.add('active');
    document.querySelectorAll('.sub-nav').forEach(nav => nav.style.display = 'none');
    const housingNav = document.getElementById('nav-housing');
    if (housingNav) housingNav.style.display = 'flex';
    showTab('housing-rooms', housingNav ? housingNav.querySelector('.tab') : null);
  }
}

function openLoginModal() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('visible');
  setTimeout(() => {
    const u = document.getElementById('login-username');
    if (u) u.focus();
  }, 80);
}

function closeLoginModal() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.remove('visible');
  const errEl = document.getElementById('login-error');
  const uEl = document.getElementById('login-username');
  const pEl = document.getElementById('login-password');
  if (errEl) errEl.textContent = '';
  if (uEl) uEl.value = '';
  if (pEl) pEl.value = '';
}

function loginKeydown(e) {
  if (e.key === 'Enter') attemptLogin();
}

async function attemptLogin() {
  const email = (document.getElementById('login-username').value || '').trim();
  const pass  = (document.getElementById('login-password').value || '').trim();
  const errEl = document.getElementById('login-error');
  const btn   = document.querySelector('.login-submit');

  if (!email || !pass) {
    errEl.textContent = 'Please enter your email and password.';
    return;
  }

  // Show loading state
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true; }
  errEl.textContent = '';

  try {
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    _authUser = data.user;
    closeLoginModal();
    await loadProtectedContent();
    applyAuthState();
    // Switch to Dashboard tab after login
    const dashboardTabEl = document.getElementById('tab-btn-dashboard');
    if (dashboardTabEl) showMainTab('dashboard', dashboardTabEl);
  } catch (err) {
    errEl.textContent = 'Incorrect email or password.';
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  } finally {
    if (btn) { btn.textContent = 'Unlock Dashboard →'; btn.disabled = false; }
  }
}

async function doLogout() {
  if (sbClient) await sbClient.auth.signOut();
  _authUser = null;
  applyAuthState();
}

// Restore session on page load if Supabase already has one
async function initAuth() {
  if (!sbClient) { applyAuthState(); return; }
  const { data } = await sbClient.auth.getSession();
  if (data?.session?.user) {
    _authUser = data.session.user;
    await loadProtectedContent();
  }
  applyAuthState();

  // Keep _authUser in sync if session expires or user logs in elsewhere
  sbClient.auth.onAuthStateChange((_event, session) => {
    _authUser = session?.user || null;
    applyAuthState();
  });
}

// Close modal if overlay background is clicked
document.getElementById('login-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeLoginModal();
});

// ═══════════════ 10. INIT ═══════════════
initTheme();
renderDocChecklist();
renderNotesGrid();
initCalculator();
renderGermanTab();
renderArchive();

// Init auth first (restores session if already logged in), then fetch cloud data
initAuth().then(() => {
  fetchAllCloudData().then(() => {
    updateAll();
  });
});
