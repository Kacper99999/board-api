import express from 'express';
import boardRouters from './routes/board.routes';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/boards', boardRouters);

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
