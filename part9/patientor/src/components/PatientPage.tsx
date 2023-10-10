import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosesService from '../services/diagnosis';
import { Entry, Diagnosis } from '../types';
import EntryDetails from './EntryDetails';

const PatientPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [patientEntries, setPatientEntries] = useState<Entry[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] >([]);

  useEffect(() => {
    const fetchPatientEntries = async () => {
      try {
        const entries = await patientService.getPatientEntries(id);
        setPatientEntries(entries);
      } catch (error) {
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnosesService.getDiagnoses();
        setDiagnoses(diagnoses);
      } catch (error) {
      }
    };

    fetchPatientEntries();
    fetchDiagnoses();
  }, [id]);

  return (
    <div>
      <h2>Patient's Entries</h2>
      <ul>
        {patientEntries.map((entry) => (
          <li key={entry.id}>
            <EntryDetails entry={entry}/>
            <strong>Date:</strong> {entry.date}
            <br />
            <strong>Description:</strong> {entry.description}
            <br />
            {entry.diagnosisCodes && (
              <div>
                <strong>Diagnosis Codes:</strong>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientPage;