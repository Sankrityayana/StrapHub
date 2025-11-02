import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user, login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row align-items-center">
      <div className="col-lg-7">
        <h1 className="display-5 fw-bold mb-3">Learn, Practice, and Build with Bootstrap</h1>
        <p className="lead">Interactive lessons, coding challenges, and guided mini-projects to master Bootstrap 5.</p>
        <div className="d-flex gap-2">
          <a href="/learn" className="btn btn-primary btn-lg">Start Learning</a>
          <a href="/projects" className="btn btn-outline-secondary btn-lg">Explore Projects</a>
        </div>
      </div>
      <div className="col-lg-5 mt-4 mt-lg-0">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">{user ? 'Welcome back' : mode === 'login' ? 'Login' : 'Create account'}</h5>
              {!user && (
                <div className="btn-group">
                  <button className={`btn btn-sm ${mode==='login'?'btn-primary':'btn-outline-primary'}`} onClick={() => setMode('login')}>Login</button>
                  <button className={`btn btn-sm ${mode==='register'?'btn-primary':'btn-outline-primary'}`} onClick={() => setMode('register')}>Register</button>
                </div>
              )}
            </div>
            {!user ? (
              <form onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} />
                </div>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Please wait...' : (mode==='login'?'Login':'Create account')}</button>
              </form>
            ) : (
              <div className="alert alert-success mb-0">You are logged in. Go to Learn, Practice, or Projects!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
