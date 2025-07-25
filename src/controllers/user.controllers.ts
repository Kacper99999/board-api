import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { UserInput } from '../types/user';

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
    next(error);
  }
};
