// src/components/ActivitiesList.jsx
import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/apiClient';
import './ActivitiesList.css';

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [mode, setMode] = useState('Mood Booster'); // Default mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch(`/activities?mode=${encodeURIComponent(mode)}`);

        // Datenformen sicher behandeln:
        // - data might be an array
        // - or { activities: [...] }
        // - or { activity: {...} } (single item)
        // - or some other object (inspect)
        let list = [];

        if (Array.isArray(data)) {
          list = data;
        } else if (data && Array.isArray(data.activities)) {
          list = data.activities;
        } else if (data && data.activity) {
          // single activity -> wrap in array
          // Some endpoints return { activity: {...} }
          list = [data.activity];
        } else if (data && typeof data === 'object') {
          // fallback: if object has many properties that look like an activity, treat as single
          // (not ideal, but safer than crashing)
          // heuristics: if has id and title => treat as single
          if (data.id && (data.title || data.description)) {
            list = [data];
          } else {
            // unknown shape: log for debugging and set empty
            console.warn('ActivitiesList: unexpected API response shape', data);
            list = [];
          }
        } else {
          list = [];
        }

        if (!cancelled) setActivities(list);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Fehler beim Laden');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [mode]);

  return (
    <section>
      <h2>Aktivitäten</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>Modus:</label>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option>Mood Booster</option>
          <option>Relax & Reset</option>
          <option>Kindness</option>
          {/* Weitere Modes falls vorhanden */}
        </select>
      </div>

      {loading && <p>Lade Aktivitäten…</p>}
      {error && <p style={{ color: 'red' }}>Fehler: {error}</p>}

      {!loading && !error && activities.length === 0 && <p>Keine Aktivitäten gefunden.</p>}

      <ul className="activities-list">
        {activities.map(a => (
          <li key={a.id || a.title} className="activity-item">
            <strong>{a.title}</strong>
            <div className="muted">{a.mode} • Dauervorschläge: {a.duration_hints}</div>
            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}