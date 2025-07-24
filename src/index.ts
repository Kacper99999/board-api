import express, { NextFunction } from 'express';
import boardRouters from './routes/board.routes';
import userRouters from './routes/user.routers';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/boards', boardRouters);
app.use('/auth', userRouters);

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});
