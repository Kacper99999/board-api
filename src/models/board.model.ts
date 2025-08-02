import mongoose, { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BoardModel = model('Board', boardSchema);
