import express from 'express';
import diagnosesData from '../data/diagnoses';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnosesData);
});

export default router;