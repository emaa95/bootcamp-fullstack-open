import patientsData from '../../data/patients';
import { NonSensitivePatient } from '../types';

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

  export default {
    getAll
  };