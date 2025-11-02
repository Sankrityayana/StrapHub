import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

export default function Dashboard() {
  const { user, refreshMe } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      refreshMe?.();
      try {
        const [lRes, pRes] = await Promise.all([
          api.get('/api/lessons'),
          api.get('/api/projects'),
        ]);
        setLessons(lRes.data);
        setProjects(pRes.data);
      } catch {}
    })();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Dashboard</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user?.name || user?.email}</h5>
          <p className="card-text text-muted">Use the navigation to continue learning, practicing, or building projects.</p>
          {user?.role === 'admin' && (
            <div className="alert alert-warning">Admin: Consider adding an Admin panel for lesson management.</div>
          )}
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title">Completed Lessons</h6>
              <ul className="mb-0">
                {(user?.progress?.lessonsCompleted||[]).map(id => (
                  <li key={id}>{lessons.find(l=>l._id===id)?.title || id}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title">Completed Projects</h6>
              <ul className="mb-0">
                {(user?.progress?.projectsCompleted||[]).map(id => (
                  <li key={id}>{projects.find(p=>p._id===id)?.title || id}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
