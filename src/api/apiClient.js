const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('lw_token');
}

export async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const res = await fetch(API_BASE + path, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => 'API Fehler');
    throw new Error(text || 'API Fehler');
  }
  return res.json();
}
