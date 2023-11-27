import { Gender, NewPatientEntry, Entry} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
      throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
  };
  

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown,gender: unknown, occupation: unknown, entries: unknown};  


const toNewPatientEntry = ({name , dateOfBirth, ssn, gender,occupation, entries}: Fields): NewPatientEntry => {

    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries) || []
    };

    return newEntry;
};

export default toNewPatientEntry;