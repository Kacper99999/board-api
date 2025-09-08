import { Router } from 'express';
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/comment.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/:boardId/posts/:postId/comments', authenticateToken, getComments);
router.post('/:boardId/posts/:postId/comments', authenticateToken, createComment);
router.delete('/:boardId/posts/:postId/commentId', authenticateToken, deleteComment);
router.put('/:boardId/posts/:postId/commentId', authenticateToken, updateComment);

export default router;
