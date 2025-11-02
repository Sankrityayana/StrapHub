import { Router } from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', auth, requireAdmin, createProject);
router.put('/:id', auth, requireAdmin, updateProject);
router.delete('/:id', auth, requireAdmin, deleteProject);

export default router;
