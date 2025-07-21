import { Router } from 'express';
import { getBoards, postBoards, deleteBoard, updateBoard } from '../controllers/board.controllers';

const router = Router();

router.get('/', getBoards);
router.post('/', postBoards);
router.delete('/:id', deleteBoard);
router.put('/:id', updateBoard);

export default router;
