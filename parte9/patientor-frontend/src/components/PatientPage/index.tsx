import React from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { faGenderless } from '@fortawesome/free-solid-svg-icons/faGenderless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import { Grid } from '@mui/material';

interface PatientDetailsProps {
    patients: Patient[];
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type){
    case "Hospital":
      return <Hospital entry={entry}/>;
    
    case "HealthCheck": 
      return <HealthCheck entry={entry}/>;
    
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry}/>;
    
    default: 
      return assertNever(entry);
  }
};

const PatientDetails : React.FC<PatientDetailsProps> = ({patients}) => {
    
    const { id } = useParams<{ id: string }>();


    const patient = Object.values(patients).find(
        (patient: Patient) => patient.id === id
      );
    
    let iconName: React.ReactElement;

    if (patient) {
        switch(patient.gender) {
            case 'male':
              iconName = <MaleIcon/>;
              break;
            
            case 'female':
              iconName = <FemaleIcon/>;
              break;
            case 'other':
              iconName = <FontAwesomeIcon icon={faGenderless} />;
              break;
            default:
              iconName = <FemaleIcon/>;
          }
        
        return (
            <div>
            <h2>
              {patient.name}<Icon>{''}{iconName}</Icon> 
            </h2>
            <p>ssh: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            {patient.entries.length === 0 ? (
          <p>No entries available.</p>
        ) : (
          <Grid container spacing={2}>
            {patient.entries.map((entry, i) => (
              <Grid item key={i} xs={12} sm={4}>
                <EntryDetails entry={entry}></EntryDetails>
              </Grid>
            ))}
          </Grid>
        )}
            </div>
        );
    }
    return null;
};

export default PatientDetails;