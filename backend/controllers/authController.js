import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const genToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '7d' }
  );

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const user = await User.create({ name, email, password });
    const token = genToken(user);
    const userOut = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: { lessonsCompleted: [], projectsCompleted: [] },
    };
    res.status(201).json({ user: userOut, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = genToken(user);
    const userOut = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: user.progress || { lessonsCompleted: [], projectsCompleted: [] },
    };
    res.json({ user: userOut, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
