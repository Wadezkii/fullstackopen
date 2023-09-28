import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNotNumber } from './utils';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    res.json({
      error: "malformatted parameters"
    });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi
  });
});

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;
  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (!Array.isArray(body.daily_exercises) || isNaN(body.target)) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  if (isNotNumber(body.target)) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const target = Number(body.target);
  const dailyHours = body.daily_exercises.map(Number);

  try {
    const result = calculateExercises(dailyHours, target);
    return res.json(result);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(400).json({
      error: error.message
    });
  }


})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});