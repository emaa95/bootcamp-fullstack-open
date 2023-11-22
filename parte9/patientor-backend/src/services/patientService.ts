import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientEntry> = patientsData;

const getEntries = () : Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[]  => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })) ;

    
  };

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};