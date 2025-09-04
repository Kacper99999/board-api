import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { CommentModel } from '../models/comment.model';
import { CommentInput } from '../types/comment';
import { validateFields } from '../utils/validateFields';

interface CommentRequest extends AuthRequest {
  body: CommentInput;
  params: { boardId: string; postId: string };
}

export const createComment = async (req: CommentRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { postId } = req.params;
  const { valid, data, missing } = validateFields({ content: req.body.content });
  if (!valid) {
    return res.status(400).json({ message: `Missing ${missing.join(',')}` });
  }
  try {
    const newComment = (
      await CommentModel.create({ content: data.content, postId, authorId: req.user.userId })
    ).populate('authorId', 'userName');
    res.status(201).json(newComment);
  } catch (error) {
    return next(error);
  }
};
