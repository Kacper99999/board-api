import express, { NextFunction, Response, Request } from 'express';
import boardRouters from './routes/board.routes';
import userRouters from './routes/user.routers';
import postRouter from './routes/post.routers';
import commentRouter from './routes/comment.router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/boards', boardRouters);
app.use('/auth', userRouters);
app.use('/boards', postRouter);
app.use('/boards', commentRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017/boardApp')
  .then(() => {
    console.log('Connect MongoDB!');
    app.listen(PORT, () => {
      console.log(`Backend działa na porcie ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error MongoDB ${error}`);
  });

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    res.status(500).json({ message: `Something went wrong ${error.message}` });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
});
