import patientsData from '../../data/patients';
import { Entry, EntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientEntry> = patientsData;

const getEntries = () : Array<PatientEntry> => {
  return patients;
};


const getNonSensitiveEntries = (): NonSensitivePatientEntry[]  => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation, 
        entries
    })) ;

    
  };

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patients.find(patient => patient.id === id);
  return entry;
} ; 

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: PatientEntry, entry: EntryWithoutId): Entry =>{
   
  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntry
};