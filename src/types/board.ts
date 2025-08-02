import { Types } from 'mongoose';

export interface BoardInput {
  title: string;
  description: string;
}

export interface Board {
  _id: Types.ObjectId;
  title: string;
}
