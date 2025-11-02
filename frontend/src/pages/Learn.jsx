import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import LessonCard from '../components/LessonCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { completeLesson as completeLessonApi } from '../services/user.js';

export default function Learn() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setProgress } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/api/lessons');
        setLessons(data);
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
      <h2 className="mb-3">Learn</h2>
      <p className="text-muted">Browse lessons and dive into Bootstrap 5 concepts.</p>
      {loading && <div className="alert alert-info">Loading lessons...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {lessons.map((l) => (
          <LessonCard key={l._id} lesson={l} onMarkComplete={async (lesson) => {
            try {
              const prog = await completeLessonApi(lesson._id);
              setProgress(prog);
            } catch (e) {
              alert(e?.response?.data?.message || e.message);
            }
          }} />
        ))}
      </div>
    </div>
  );
}
