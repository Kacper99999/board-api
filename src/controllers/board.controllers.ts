import { Request, Response, NextFunction } from 'express';
import { BoardModel } from '../models/board.model';
import { Board, BoardInput } from '../types/board';

export const getBoards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const boards: Board[] = await BoardModel.find();
    res.status(200).json(boards);
  } catch (error) {
    return next(error);
  }
};

export const postBoards = async (
  req: Request<Record<string, never>, unknown, BoardInput>,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required!' });
  }
  try {
    const newBoard = await BoardModel.create({ title });
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

export const getBoardByID = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Board is required!' });
  }
  try {
    const foundBoard = await BoardModel.findById(id);
    if (!foundBoard) {
      return res.status(404).json({ message: 'Board not fount' });
    }
    res.status(200).json(foundBoard);
  } catch (error) {
    return next(error);
  }
};
