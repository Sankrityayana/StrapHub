import React from 'react';

export default function ProjectCard({ project }) {
  const stepCount = project.steps?.length || 0;
  const difficultyMap = { easy: 33, medium: 66, hard: 100 };
  const progress = difficultyMap[project.difficulty] || 0;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text text-muted">Steps: {stepCount}</p>
          <div className="mb-2">
            <span className="badge bg-info text-dark me-2">{project.difficulty}</span>
          </div>
          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
