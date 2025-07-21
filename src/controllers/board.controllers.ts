import { Request, Response } from 'express';
import { BoardModel } from '../model/board.model';
import { Board, BoardInput } from '../types/board';

export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards: Board[] = await BoardModel.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong${error as Error}` });
  }
};

export const postBoards = async (
  req: Request<Record<string, never>, unknown, BoardInput>,
  res: Response
) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required!' });
  }
  try {
    const newBoard = await BoardModel.create({ title });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${error as Error}` });
  }
};

export const deleteBoard = async (req: Request<{ id: string }>, res: Response) => {
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
    if (error instanceof Error) {
      res.status(500).json({ message: `Something went wrong ${error.message}` });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};
