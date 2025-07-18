import { Router } from "express";
import { getBoards, postBoards } from "../controllers/board.controllers";

const router = Router();

router.get('/',getBoards)
router.post('/',postBoards)

export default router;