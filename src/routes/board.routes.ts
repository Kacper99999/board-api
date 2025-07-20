import { Router } from 'express';
import { getBoards, postBoards } from '../controllers/board.controllers';

const router = Router();

router.get('/', getBoards);
router.post('/', postBoards);
// router.delete('/:id', deleteBoard);

export default router;
