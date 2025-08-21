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

router.get('/', getBoards);
router.get('/', authenticateToken, getBoardByUser);
router.post('/', authenticateToken, postBoards);
router.delete('/:id', deleteBoard);
router.put('/:id', updateBoard);

export default router;
