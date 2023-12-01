import React, { useState } from 'react';
import { Diagnosis, Entry, EntryWithoutId, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { faGenderless } from '@fortawesome/free-solid-svg-icons/faGenderless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import { Button, Grid } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';
import patientService from '../../services/patients';

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
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const [error, setError] = useState<string>();
  
   const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryWithoutId) => {
      try {
          if(patient){
              const entry = await patientService.addEntry(patient.id, values);
              patient = {...patient, entries: patient.entries.concat(entry)};
              setModalOpen(false);
          }
      } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
    
    const { id } = useParams<{ id: string }>();


    let patient = Object.values(patients).find(
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
            <AddEntryModal
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            modalOpen={modalOpen}
        />
        <Button variant="contained" onClick={() => openModal()} style={{marginTop:"0.5rem"}}>
         Add New Entry
        </Button>
        
            </div>
        );
    }
    return null;
};

export default PatientDetails;