import { Request, Response, NextFunction } from 'express';
import { BoardModel } from '../models/board.model';
import { BoardInput } from '../types/board';
import { AuthRequest } from '../middleware/auth.middleware';
import { validateFields } from '../utils/validateFields';

interface BoardRequest extends AuthRequest {
  body: BoardInput;
}
interface DeleteRequest extends AuthRequest {
  params: { boardId: string };
}

export const getBoards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const boards = await BoardModel.find();
    res.status(200).json(boards);
  } catch (error) {
    return next(error);
  }
};

export const postBoards = async (req: BoardRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { valid, data, missing } = validateFields({
    title: req.body.title,
    description: req.body.description,
  });
  if (!valid) {
    return res.status(400).json({ message: `Missing ${missing.join(',')}` });
  }
  try {
    const newBoard = await BoardModel.create({
      title: data.title,
      description: data.description,
      authorId: req.user.userId,
    });
    res.status(201).json(newBoard);
  } catch (error) {
    return next(error);
  }
};

export const deleteBoard = async (req: DeleteRequest, res: Response, next: NextFunction) => {
  const { boardId } = req.params;
  if (!boardId) {
    return res.status(400).json({ message: 'Board is required!' });
  }
  try {
    const board = await BoardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    if (board.authorId.toString() !== req.user?.userId) {
      return res.status(403).json({ message: 'Forbidden: you can only delete your own comments' });
    }
    const deletedBoard = await BoardModel.findByIdAndDelete(board);
    res.status(200).json(deletedBoard);
  } catch (error) {
    return next(error);
  }
};

export const updateBoard = async (
  req: Request<{ id: string }, unknown, BoardInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { valid, data, missing } = validateFields({
    title: req.body.title,
    description: req.body.description,
  });
  if (!valid) {
    return res.status(400).json({ message: `Missing ${missing.join(',')}` });
  }
  if (!id) {
    return res.status(400).json({ message: 'Board is required!' });
  }
  try {
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      id,
      { title: data.title, description: data.description },
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    return next(error);
  }
};

export const getBoardByUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const userBoards = await BoardModel.find({ authorId: req.user.userId });
    res.status(200).json(userBoards);
  } catch (error) {
    return next(error);
  }
};
