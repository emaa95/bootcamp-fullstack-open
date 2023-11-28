import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnosesData;

const getAll = (): Array<DiagnoseEntry> => {
    return diagnoses;
  };

  export default {
    getAll
  };