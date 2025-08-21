import mongoose, { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', requred: true },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model('Post', postSchema);
