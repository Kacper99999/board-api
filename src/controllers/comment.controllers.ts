import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { CommentModel } from '../models/comment.model';
import { CommentInput } from '../types/comment';
import { validateFields } from '../utils/validateFields';

interface CommentRequest extends AuthRequest {
  body: CommentInput;
  params: { boardId: string; postId: string };
}
interface GetCommentRequest extends AuthRequest {
  params: { boardId: string; postId: string };
}
interface DeleteRequest extends AuthRequest {
  params: { boardId: string; postId: string; commentId: string };
}
interface UpdateRequest extends AuthRequest {
  body: CommentInput;
  params: {baordId: string; postId:string; commentId: string};
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
    const newComment = await CommentModel.create({
      content: data.content,
      postId,
      authorId: req.user.userId,
    });
    const populateComment = newComment.populate('authorId', 'userName');
    res.status(201).json(populateComment);
  } catch (error) {
    return next(error);
  }
};

export const getComments = async (req: GetCommentRequest, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  try {
    const allComments = await CommentModel.find({ postId });
    res.status(200).json(allComments);
  } catch (error) {
    return next(error);
  }
};

export const deleteComment = async (req: DeleteRequest, res: Response, next: NextFunction) => {
  const { commentId } = req.params;
  try {
    const comment = await CommentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.authorId.toString() !== req.user?.userId) {
      return res.status(403).json({ message: 'Forbidden: you can only delete your own comments' });
    }
    const deletedComment = CommentModel.findByIdAndDelete(comment);
    return res.status(200).json(deletedComment);
  } catch (error) {
    return next(error);
  }
};

// export const updateComment = async (req:UpdateRequest, res:Response, next:NextFunction)=>{
//   const {commentId} = req.params;
//   try{
//     const {valid, data, missing}= validateFields({content: req.body.content});
//     if(!valid){

//     }
//     const comment = CommentModel.findById(commentId);
//     if(!comment){
//       return res.status(404).json({message:"Comment nor found."});
//     }
//     if(comment.authorId.toString()!== req.user?.userId){
//       return res.status(403).json(message:'Forbidden: you can only update your own comments')
//     }

//   }catch(error){
//     return next(error);
//   }
// }
