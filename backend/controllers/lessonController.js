import Lesson from '../models/Lesson.js';

export const listLessons = async (req, res) => {
  try {
    const query = {};
    if (req.query.tag) query.tags = req.query.tag;
    const lessons = await Lesson.find(query).sort({ createdAt: -1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user?.id };
    const lesson = await Lesson.create(data);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
