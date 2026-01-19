// src/components/ActivityCard.jsx
import React from 'react';
import './ActivityCard.css';

export default function ActivityCard({ activity }) {
  if (!activity) return null;
  return (
    <article className="card">
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
    </article>
  );
}
