import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setProjects(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Projects</h2>
      <p className="text-muted">Build guided mini-projects to practice Bootstrap.</p>
      {loading && <div className="alert alert-info">Loading projects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}
