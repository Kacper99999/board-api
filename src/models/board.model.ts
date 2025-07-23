import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    title: { type: String, requirded: true },
  },
  {
    timestamps: true,
  }
);

export const BoardModel = model('Board', boardSchema);
