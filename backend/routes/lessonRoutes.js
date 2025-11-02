import { Router } from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';
import { listLessons, getLesson, createLesson, updateLesson, deleteLesson } from '../controllers/lessonController.js';

const router = Router();

router.get('/', listLessons);
router.get('/:id', getLesson);
router.post('/', auth, requireAdmin, createLesson);
router.put('/:id', auth, requireAdmin, updateLesson);
router.delete('/:id', auth, requireAdmin, deleteLesson);

export default router;
