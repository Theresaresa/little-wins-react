// src/App.jsx
import React from 'react';
import ActivityCard from './components/ActivityCard';
import './App.css';

const example = { title: 'Kurze Übung', description: 'Atme tief ein und aus.' };

export default function App() {
  return (
    <main className="page">
      <h1>Little Wins — React Test</h1>
      <ActivityCard activity={example} />
    </main>
  );
}
