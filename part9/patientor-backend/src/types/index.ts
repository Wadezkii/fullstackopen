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

export type PublicPatient = Omit<Patient, 'ssn'>;