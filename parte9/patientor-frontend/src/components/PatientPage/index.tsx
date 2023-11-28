import React from 'react';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { faGenderless } from '@fortawesome/free-solid-svg-icons/faGenderless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PatientDetailsProps {
    patients: Patient[];
}

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
            <p>{patient.entries.map((entry, i) => (
          <div key={i}>
            
            {entry.date} {entry.description}  
            <ul>
            {entry.diagnosisCodes ? (
              entry.diagnosisCodes.map((diagnose, i) => (
             <li key={i}>{diagnose}</li>
            ))
            ) : (
              <li>No diagnosis codes available</li>
            )}
            </ul>
          </div>
        ))}</p>
            </div>
        );
    }
    return null;
};

export default PatientDetails;