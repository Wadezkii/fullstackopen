export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NewPatientEntry = Omit<Patient, 'id'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface OccupationalHealthcareEntry {
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

export interface HospitalEntry {
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

export type Entry = OccupationalHealthcareEntry | HospitalEntry;