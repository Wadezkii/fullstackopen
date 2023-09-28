import express from 'express';
import patients from '../data/patients';
import { PublicPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({ ssn, ...rest }) => rest);
  res.json(publicPatients);
});

export default router;
