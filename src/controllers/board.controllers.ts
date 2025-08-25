import { Request, Response, NextFunction } from 'express';
import { BoardModel } from '../models/board.model';
import { BoardInput } from '../types/board';
import { AuthRequest } from '../middleware/auth.middleware';

interface BoardRequest extends AuthRequest {
  body: BoardInput;
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
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description is required!' });
  }
  try {
    const newBoard = await BoardModel.create({ title, description, author: req.user.userId });
    res.status(201).json(newBoard);
  } catch (error) {
    return next(error);
  }
};

export const deleteBoard = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Board is required!' });
  }
  try {
    const deletedBoard = await BoardModel.findByIdAndDelete(id);
    if (!deletedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }
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
  const { title } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Board is required!' });
  }
  try {
    const updatedBoard = await BoardModel.findByIdAndUpdate(id, { title }, { new: true });
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
    const userBoards = await BoardModel.find({ author: req.user.userId });
    res.status(200).json(userBoards);
  } catch (error) {
    return next(error);
  }
};
