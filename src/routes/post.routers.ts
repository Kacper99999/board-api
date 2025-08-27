import { Router } from 'express';
import { createPost, getPostsByBoard, getPostByID } from '../controllers/post.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/:boardId/posts', authenticateToken, createPost);
router.get('/:boardId', authenticateToken, getPostsByBoard);
router.get('/:boardId/posts/:postId', authenticateToken, getPostByID);

export default router;
