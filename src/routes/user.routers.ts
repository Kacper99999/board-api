import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
