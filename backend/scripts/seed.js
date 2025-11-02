import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Lesson from '../models/Lesson.js';
import Project from '../models/Project.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Lesson.deleteMany({});
  await Project.deleteMany({});

  const lessons = await Lesson.insertMany([
    {
      title: 'Bootstrap Grid System',
      summary: 'Learn containers, rows, and columns',
      content: '<h3>Grid Basics</h3><p>Use .container &gt; .row &gt; .col-*</p>',
      tags: ['layout', 'grid'],
      level: 'beginner',
    },
    {
      title: 'Bootstrap Utilities',
      summary: 'Spacing, colors, display utilities',
      content: '<p>Use p-3, m-2, text-center, d-flex...</p>',
      tags: ['utilities'],
      level: 'beginner',
    },
  ]);

  const projects = await Project.insertMany([
    {
      title: 'Portfolio Landing Page',
      difficulty: 'easy',
      steps: [
        { title: 'Setup', content: 'Create navbar and hero section' },
        { title: 'Portfolio', content: 'Cards grid with images' },
      ],
    },
    {
      title: 'Admin Dashboard',
      difficulty: 'medium',
      steps: [
        { title: 'Sidebar', content: 'Build collapsible sidebar' },
        { title: 'Charts', content: 'Integrate charts placeholder' },
      ],
    },
  ]);

  console.log(`Seeded ${lessons.length} lessons and ${projects.length} projects`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
