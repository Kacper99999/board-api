import { Request, Response } from 'express';
import { boards } from '../data/boards';
import { Board } from '../types/board';

export const getBoards = (req: Request, res: Response) => {
  res.json(boards);
};

export const postBoards = (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send('Title is required');
  }
  const newBoard: Board = {
    id: boards.length + 1,
    title,
  };

  boards.push(newBoard);
  res.status(201).json(newBoard);
};
