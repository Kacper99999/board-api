import { Request, Response, NextFunction } from 'express';
import { PostModel } from '../models/post.model';
import { PostInput } from '../types/post';
import { AuthRequest } from '../middleware/auth.middleware';

interface PortRequest extends AuthRequest{
    body: PortInput;
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
       return res.status(401).json({ message: 'Unauthorized' });
    }
    const {title, content} = req.body;
    if( !title || !content ){
        return res.status(400).json({ message: 'Title and constent is required' });
    }
    try{
        const newPost = await PostModel.create({title, content, board: req.user._id, author: req.user.author});
        res.status(201).json(newPost);
    }
    catch(error){
        return next(error);
    }
};
