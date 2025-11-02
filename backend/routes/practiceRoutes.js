import { Router } from 'express';
import { listChallenges, validateChallenge } from '../controllers/practiceController.js';

const router = Router();

router.get('/', listChallenges);
router.post('/validate', validateChallenge);

export default router;
