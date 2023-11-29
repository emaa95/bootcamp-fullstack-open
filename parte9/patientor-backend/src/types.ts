export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?:string
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export interface SickLeave {
    startDate: string;
    endDate: string;
  }

  export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave
 }

 export interface Discharge {
  date: string;
  criteria: string;
  }
 
  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: Discharge 
 }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' >; //'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

type UnionOmit<T, K extends string | number | symbol> 
    = T extends unknown ?
        Omit<T, K> 
        : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;