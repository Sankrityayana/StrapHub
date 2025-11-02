import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLessons() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', level: 'beginner', content: '' });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/api/lessons');
      setLessons(data);
    } catch (e) { setError(e?.response?.data?.message || e.message); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/lessons', form);
      setForm({ title: '', summary: '', level: 'beginner', content: '' });
      await load();
    } catch (e) { setError(e?.response?.data?.message || e.message); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this lesson?')) return;
    try { await api.delete(`/api/lessons/${id}`); await load(); } catch (e) { alert(e?.response?.data?.message || e.message); }
  };

  if (user?.role !== 'admin') return <div className="alert alert-danger">Admins only.</div>;

  return (
    <div>
      <h2 className="mb-3">Admin: Lessons</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Create Lesson</h6>
              <form onSubmit={save}>
                <div className="mb-2">
                  <label className="form-label">Title</label>
                  <input className="form-control" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Summary</label>
                  <input className="form-control" value={form.summary} onChange={(e)=>setForm({...form,summary:e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Level</label>
                  <select className="form-select" value={form.level} onChange={(e)=>setForm({...form,level:e.target.value})}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Content (HTML)</label>
                  <textarea rows={6} className="form-control" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})}></textarea>
                </div>
                <button className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Lessons</h6>
              <ul className="list-group">
                {lessons.map(l => (
                  <li key={l._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{l.title}</div>
                      <div className="small text-muted">{l.level}</div>
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(l._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
