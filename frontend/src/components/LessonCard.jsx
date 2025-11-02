import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LessonCard({ lesson, onMarkComplete }) {
  const { user } = useAuth();
  const completed = !!user?.progress?.lessonsCompleted?.includes?.(lesson._id);
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{lesson.title}</h5>
          <p className="card-text text-muted">{lesson.summary}</p>
          {lesson.tags?.length > 0 && (
            <div className="mt-2">
              {lesson.tags.map((t) => (
                <span key={t} className="badge bg-secondary me-1">{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <small className="text-muted">Level: {lesson.level}</small>
          <div className="d-flex gap-2">
            <Link to={`/learn/${lesson._id}`} className="btn btn-sm btn-outline-info">View</Link>
            {user && (
              <button className={`btn btn-sm ${completed ? 'btn-success' : 'btn-outline-success'}`} onClick={() => onMarkComplete?.(lesson)}>
                {completed ? 'Completed' : 'Mark complete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
