import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<NonSensitivePatient> = patientsData;

const getAll = (): Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })) ;

    
  };

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAll,
  addPatient
};