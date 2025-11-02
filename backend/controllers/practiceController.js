// Simple in-memory challenges and validators

const challenges = [
  {
    id: 'grid-3-cols',
    title: '3-column responsive grid',
    prompt: 'Create a responsive grid with a row containing three columns using col-12 col-md-4.',
    validate(html) {
      const errors = [];
      if (!/class\s*=\s*"[^"]*row[^"]*"/i.test(html)) errors.push('Missing .row');
      const colMatches = html.match(/class\s*=\s*"[^"]*col-12[^"]*col-md-4[^"]*"/gi) || [];
      if (colMatches.length < 3) errors.push('Need at least 3 columns with col-12 col-md-4');
      return { pass: errors.length === 0, errors };
    },
  },
  {
    id: 'navbar',
    title: 'Responsive navbar',
    prompt: 'Build a navbar with .navbar, .navbar-expand, and a .navbar-toggler.',
    validate(html) {
      const errors = [];
      if (!/class\s*=\s*"[^"]*navbar[^"]*"/i.test(html)) errors.push('Missing .navbar');
      if (!/class\s*=\s*"[^"]*navbar-expand[^"]*"/i.test(html)) errors.push('Missing .navbar-expand-*');
      if (!/class\s*=\s*"[^"]*navbar-toggler[^"]*"/i.test(html)) errors.push('Missing .navbar-toggler');
      return { pass: errors.length === 0, errors };
    },
  },
];

export const listChallenges = (req, res) => {
  res.json(challenges.map(({ id, title, prompt }) => ({ id, title, prompt })));
};

export const validateChallenge = (req, res) => {
  const { challengeId, html } = req.body || {};
  const ch = challenges.find((c) => c.id === challengeId);
  if (!ch) return res.status(404).json({ message: 'Challenge not found' });
  if (typeof html !== 'string' || html.trim().length === 0) return res.status(400).json({ message: 'Provide HTML to validate' });
  const result = ch.validate(html);
  res.json({ challengeId, ...result });
};
