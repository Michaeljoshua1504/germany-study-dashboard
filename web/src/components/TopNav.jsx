import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './TopNav.css';

export const TABS = [
  { id: 'my-program', label: 'My Program', ready: true },
  { id: 'housing', label: 'Housing' },
  { id: 'admission', label: 'Admission' },
  { id: 'german', label: 'German' },
  { id: 'travel-prep', label: 'Travel Prep' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'life-tracker', label: 'Life Tracker' },
];

export default function TopNav({ activeTab, onTabChange, onOpenTodos, onOpenLogin }) {
  const { user, loading, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <span className="topnav-mark">
          <span aria-hidden="true">🇩🇪</span> Study Germany
        </span>

        <nav className="topnav-tabs" aria-label="Sections">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                className={`topnav-tab${active ? ' is-active' : ''}${tab.ready ? '' : ' is-soon'}`}
                aria-current={active ? 'page' : undefined}
                aria-disabled={tab.ready ? undefined : true}
                onClick={() => tab.ready && onTabChange?.(tab.id)}
              >
                {tab.label}
                {!tab.ready && <span className="topnav-soon">Coming soon</span>}
              </button>
            );
          })}
        </nav>

        <div className="topnav-actions">
          <button
            type="button"
            className="topnav-icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            title={theme === 'light' ? 'Dark theme' : 'Light theme'}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>

          <button
            type="button"
            className="topnav-icon"
            onClick={onOpenTodos}
            aria-label="Open to-dos"
            title="To-dos"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="2" />
              <path d="M5 8.2l2 2 4-4.4" />
            </svg>
          </button>

          {!loading &&
            (user ? (
              <button type="button" className="topnav-auth" onClick={signOut} title={user.email}>
                Log out
              </button>
            ) : (
              <button type="button" className="topnav-auth" onClick={onOpenLogin}>
                Log in
              </button>
            ))}
        </div>
      </div>
    </header>
  );
}
