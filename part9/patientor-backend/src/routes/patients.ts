import express from 'express';
import patients from '../data/patients';
import { NewPatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({ ssn, ...rest }) => rest);
  res.json(publicPatients);
});

router.post('/',(req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatientEntry;

    const newPatient: Patient = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }

    patients.push(newPatient);
    res.json(newPatient);
});

router.post('/api/patients', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        res.json(newPatient);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    const patient = patients.find(p => p.id === id);

    if (!patient){
        return res.status(400).json({ error: 'Patient not found' });
    }

    try {
        const {type, description, date, diagnosisCodes} = req.body;
        if (!type || !description || !date || !diagnosisCodes){
            return res.status(400).json({ error: 'Missing data' });
        }
        const newEntry = {
            id: uuid(),
            type,
            description,
            date,
            diagnosisCodes: diagnosisCodes || []
        };
        res.json(newEntry);
    } catch (error) {
        return res.status(400).send((error as Error).message);
    }
})

export default router;
