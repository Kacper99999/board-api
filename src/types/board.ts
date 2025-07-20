import { Types } from 'mongoose';

export interface BoardInput {
  title: string;
}

export interface Board {
  _id: Types.ObjectId;
  title: string;
}
