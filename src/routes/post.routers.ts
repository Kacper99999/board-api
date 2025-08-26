import { Router } from 'express';
import { createPost } from '../controllers/post.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/:boardId/posts', authenticateToken, createPost);

export default router;
