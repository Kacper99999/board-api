import { Response, NextFunction } from 'express';
import { PostModel } from '../models/post.model';
import { PostInput } from '../types/post';
import { AuthRequest } from '../middleware/auth.middleware';
import { BoardModel } from '../models/board.model';

interface PostRequest extends AuthRequest {
  body: PostInput;
  params: { boardId: string };
}

export const createPost = async (req: PostRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { boardId } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content is required' });
  }
  try {
    const board = await BoardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    const newPost = await PostModel.create({ title, content, boardId, authorId: req.user.userId });
    const populatePost = await newPost.populate('authorId', 'userName');
    res.status(201).json(populatePost);
  } catch (error) {
    return next(error);
  }
};
