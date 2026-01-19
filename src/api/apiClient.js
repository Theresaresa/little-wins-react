const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export async function apiFetch(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  });
  if (!res.ok) throw new Error('API Fehler');
  return res.json();
}
