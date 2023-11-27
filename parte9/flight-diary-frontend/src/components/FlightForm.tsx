import React, { useState } from 'react';
import { createFlight } from '../services/flightService';
import { Weather, Visibility, Flight } from '../types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

interface FormProps {
  onNewFlight: (newFlight: Flight) => void;
}

const FlightForm: React.FC<FormProps> = ({ onNewFlight }) => {
  const [inputValues, setInputValues] = useState<Flight>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const flightCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdFlight = await createFlight(inputValues);
      onNewFlight(createdFlight);
      setInputValues({
        date: '',
        weather: Weather.Sunny,
        visibility: Visibility.Good,
        comment: '',
      });
    } catch (error) {
      console.error('Error al crear el vuelo', error);
    }
  };

  return (
    <form onSubmit={flightCreation}>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <TextField
          name="date"
          onChange={handleInputChange}
          value={inputValues.date}
          type="text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Visibility</FormLabel>
        <TextField
          name="visibility"
          onChange={handleInputChange}
          value={inputValues.visibility}
          type="text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Weather</FormLabel>
        <TextField
          name="weather"
          onChange={handleInputChange}
          value={inputValues.weather}
          type="text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Comment</FormLabel>
        <TextField
          name="comment"
          onChange={handleInputChange}
          value={inputValues.comment}
          type="text"
        />
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FlightForm;