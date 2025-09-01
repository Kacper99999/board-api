import { Router } from 'express';
import {
  createPost,
  getPostsByBoard,
  getPostByID,
  updatePost,
} from '../controllers/post.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/:boardId/posts', authenticateToken, createPost);
router.get('/:boardId', authenticateToken, getPostsByBoard);
router.get('/:boardId/posts/:postId', authenticateToken, getPostByID);
router.put('/:boardId/posts/:postId', authenticateToken, updatePost);

export default router;
