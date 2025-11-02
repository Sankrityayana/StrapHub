import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Practice() {
  const [challenges, setChallenges] = useState([]);
  const [selected, setSelected] = useState('');
  const [html, setHtml] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/practice');
        setChallenges(data);
        if (data[0]?.id) setSelected(data[0].id);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      }
    })();
  }, []);

  const onValidate = async () => {
    setResult(null);
    setError('');
    try {
      const { data } = await api.post('/api/practice/validate', { challengeId: selected, html });
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Practice</h2>
      <p className="text-muted">Pick a challenge, paste your HTML snippet, and validate against rules.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <label className="form-label">Challenge</label>
              <select className="form-select mb-2" value={selected} onChange={(e)=>setSelected(e.target.value)}>
                {challenges.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <div className="small text-muted">{challenges.find(c=>c.id===selected)?.prompt}</div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <label className="form-label">Your HTML</label>
              <textarea className="form-control" rows={10} value={html} onChange={(e)=>setHtml(e.target.value)} placeholder="&lt;div class='row'&gt;...&lt;/div&gt;"></textarea>
              <button className="btn btn-primary mt-3" onClick={onValidate}>Validate</button>
              {result && (
                <div className={`alert mt-3 ${result.pass ? 'alert-success' : 'alert-warning'}`}>
                  {result.pass ? 'All checks passed ✅' : (
                    <ul className="mb-0">{result.errors.map((er,i)=>(<li key={i}>{er}</li>))}</ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
