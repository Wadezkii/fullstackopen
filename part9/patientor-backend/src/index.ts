import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
