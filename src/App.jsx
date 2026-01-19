// src/App.jsx
import React, { useState, useEffect } from 'react';
import ActivitiesList from './components/ActivitiesList';
import Login from './components/Login';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('lw_token');
    setLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem('lw_token');
    setLoggedIn(false);
  }

  function handleLogin() {
    // Called after successful login in Login component
    setLoggedIn(true);
  }

  return (
    <main className="page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Little Wins — Activities</h1>
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
      </header>

      {!loggedIn ? (
        <div style={{ marginTop: 24 }}>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <ActivitiesList />
        </div>
      )}
    </main>
  );
}