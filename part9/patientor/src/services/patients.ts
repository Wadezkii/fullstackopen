import axios from "axios";
import { Patient, PatientFormValues, NewPatientEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: NewPatientEntry) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientEntries = async (id: string): Promise<Entry[]> => {
  const { data } = await axios.get<Entry[]>(`${apiBaseUrl}/patients/${id}/entries`);
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientEntries
};

