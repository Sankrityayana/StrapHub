import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getMe, completeLesson, uncompleteLesson, completeProject, uncompleteProject } from '../controllers/userController.js';

const router = Router();

router.get('/me', auth, getMe);
router.post('/progress/lessons/:lessonId', auth, completeLesson);
router.delete('/progress/lessons/:lessonId', auth, uncompleteLesson);
router.post('/progress/projects/:projectId', auth, completeProject);
router.delete('/progress/projects/:projectId', auth, uncompleteProject);

export default router;
