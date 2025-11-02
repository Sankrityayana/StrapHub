import User from '../models/User.js';

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeLesson = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { 'progress.lessonsCompleted': req.params.lessonId } },
      { new: true }
    ).select('-password');
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uncompleteLesson = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { 'progress.lessonsCompleted': req.params.lessonId } },
      { new: true }
    ).select('-password');
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeProject = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { 'progress.projectsCompleted': req.params.projectId } },
      { new: true }
    ).select('-password');
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uncompleteProject = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { 'progress.projectsCompleted': req.params.projectId } },
      { new: true }
    ).select('-password');
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
