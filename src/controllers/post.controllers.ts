import { Response, NextFunction } from 'express';
import { PostModel } from '../models/post.model';
import { PostInput } from '../types/post';
import { AuthRequest } from '../middleware/auth.middleware';
import { BoardModel } from '../models/board.model';

interface PostRequest extends AuthRequest {
  body: PostInput;
  params: { boardId: string };
}

interface GetPostsByBoardRequest extends AuthRequest {
  params: { boardId: string };
}

interface PostByIDRequest extends AuthRequest {
  params: { boardId: string; postId: string };
}

interface UpdateRequest extends AuthRequest {
  body: PostInput;
  params: { boardId: string; postId: string };
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

export const getPostsByBoard = async (
  req: GetPostsByBoardRequest,
  res: Response,
  next: NextFunction
) => {
  const { boardId } = req.params;
  try {
    const posts = await PostModel.find({ boardId }).populate('authorId', 'userName');
    res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

export const getPostByID = async (req: PostByIDRequest, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  try {
    const findedPost = await PostModel.findById(postId).populate('authorId', 'userName');
    if (!findedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(findedPost);
  } catch (error) {
    return next(error);
  }
};

export const updatePost = async (req: UpdateRequest, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.authorId?.toString() !== req.user?.userId) {
      return res.status(403).json({ message: 'Forbidden: you can only edit your own posts' });
    }
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    ).populate('authorId', 'userName');
    res.status(200).json(updatedPost);
  } catch (error) {
    return next(error);
  }
};
