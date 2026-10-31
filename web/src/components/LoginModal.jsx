import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginModal.css';

export default function LoginModal({ onClose }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      onClose();
    } catch (err) {
      setError(err.message || 'Could not log in.');
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <h2 id="login-title">Log in</h2>
        <label className="modal-label" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          className="field"
          type="email"
          autoComplete="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="modal-label" htmlFor="login-password">Password</label>
        <input
          id="login-password"
          className="field"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="modal-error" role="alert">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Logging in…' : 'Log in'}
          </button>
        </div>
      </form>
    </div>
  );
}
