import express from 'express';
import boardRouters from './routes/board.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/boards', boardRouters);

app.listen(PORT, () => {
  console.log(`Backend działa na porcie ${PORT}`);
});
