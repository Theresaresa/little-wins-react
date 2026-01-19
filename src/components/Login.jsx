import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password })
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => 'Login fehlgeschlagen');
        throw new Error(txt || 'Login fehlgeschlagen');
      }
      const data = await res.json();
      const token = data.token || data.accessToken;
      if (!token) throw new Error('Kein Token erhalten');
      localStorage.setItem('lw_token', token);
      onLogin(); // inform parent
    } catch (err) {
      setError(err.message || 'Fehler beim Login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <div style={{ marginBottom: 8 }}>
        <label>
          Benutzername oder Email<br />
          <input value={identity} onChange={e => setIdentity(e.target.value)} required />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Passwort<br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>Fehler: {error}</div>}
      <button type="submit" disabled={loading}>{loading ? '...lädt' : 'Login'}</button>
    </form>
  );
}