
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;


interface OccupationalHealthcareEntry {
  type: "OccupationalHealthcare";
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
 interface HospitalEntry {
  type: "Hospital";
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface Entry{
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
}

export type {Entry, OccupationalHealthcareEntry, HospitalEntry};