import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import DOMPurify from 'dompurify';
import { useAuth } from '../context/AuthContext.jsx';

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const load = async () => {
    try {
      const { data } = await api.get(`/api/lessons/${id}`);
      setLesson(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const onMarkComplete = async () => {
    try {
      await api.post(`/api/progress/lessons/${id}`);
      // naive local reflect
      user && (user.progress = user.progress || {}, user.progress.lessonsCompleted = [...new Set([...(user.progress.lessonsCompleted||[]), id])] );
      alert('Marked as completed');
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!lesson) return null;

  return (
    <div className="row">
      <div className="col-lg-8">
        <h2 className="mb-3">{lesson.title}</h2>
        <div className="mb-3 text-muted">{lesson.summary}</div>
        <div className="card">
          <div className="card-body">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lesson.content || '') }} />
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Lesson info</h6>
            <p><strong>Level:</strong> {lesson.level}</p>
            {user && <button className="btn btn-success w-100" onClick={onMarkComplete}>Mark Completed</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
