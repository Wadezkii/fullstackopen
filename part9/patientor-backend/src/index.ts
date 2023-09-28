import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter)

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});