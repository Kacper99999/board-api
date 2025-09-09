import { Router } from 'express';
import {
  getBoards,
  getBoardByUser,
  postBoards,
  deleteBoard,
  updateBoard,
} from '../controllers/board.controllers';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/',authenticateToken, getBoards);
router.get('/', authenticateToken, getBoardByUser);
router.post('/', authenticateToken, postBoards);
router.delete('/:id', authenticateToken, deleteBoard);
router.put('/:id',authenticateToken, updateBoard);

export default router;
