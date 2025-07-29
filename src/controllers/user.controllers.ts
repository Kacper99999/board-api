import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { UserInput } from '../types/user';
import { AuthRequest } from '../middleware/auth.middleware';
import * as jwt from 'jsonwebtoken';

export const registerUser = async (
  req: Request<Record<string, never>, unknown, UserInput>,
  res: Response,
  next: NextFunction
) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).send({ message: 'All fields are required!' });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registerd' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ userName, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (
  req: Request<Record<string, never>, unknown, UserInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Emial or password are required' });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const payload = { userId: user._id, email: user.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not definet in environment variables');
    }
    console.log(secret);
    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await UserModel.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
