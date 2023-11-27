import React, { useState } from 'react';
import { createFlight } from '../services/flightService';
import { Weather, Visibility, Flight } from '../types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import 'react-toastify/dist/ReactToastify.css';

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

  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>(Visibility.Good);

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisibility(event.target.value as Visibility);
  };

  const [selectedWeather, setSelectedWeather] = useState<Weather>(Weather.Sunny);

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeather(event.target.value as Weather);
  };

  const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    console.error('Error de respuesta del servidor:', error.response.data);

    const backendErrorMessage = (error.response.data as { message?: string })?.message;

    toast.error(backendErrorMessage ?? 'Error al crear el vuelo');

  } else if (error.request) {
    console.error('No se recibió respuesta del servidor');

    toast.error('Error al crear el vuelo');

  } else {
    console.error('Error al configurar la solicitud:', error.message);

 
    toast.error('Error al crear el vuelo');

  }
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

      toast.success('Vuelo creado con exito', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error)
      } else {
        toast.error('Error desconocido al crear el vuelo');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    <form onSubmit={flightCreation}>
    <Grid container direction="row" spacing={2}>
      <Grid item>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <TextField
          name="date"
          id="outlined-basic" variant="outlined"
          onChange={handleInputChange}
          value={inputValues.date}
          type="date"
          size='small'
        />
      </FormControl>
      </Grid>

      <Grid item>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Visibility</FormLabel>
        <RadioGroup aria-label="visibility" name="visibility" value={selectedVisibility} onChange={handleVisibilityChange}>
        {Object.values(Visibility).map((visibility) => (
          <FormControlLabel key={visibility} value={visibility} control={<Radio />} label={visibility} />
        ))}
      </RadioGroup>
      </FormControl>
      </Grid>
      
      <Grid item>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Weather</FormLabel>
        <RadioGroup aria-label="weather" name="weather" value={selectedWeather} onChange={handleWeatherChange}>
        {Object.values(Weather).map((weather) => (
          <FormControlLabel key={weather} value={weather} control={<Radio />} label={weather} />
        ))}
      </RadioGroup>
      </FormControl>
      </Grid>

      <Grid item>
      <FormControl>
        <FormLabel>Comment</FormLabel>
        <TextField
          name="comment"
          onChange={handleInputChange}
          value={inputValues.comment}
          type="text"
          size='small'
        />
      </FormControl>
      </Grid>
      <Grid item>
      <Button type="submit"  style={{ marginTop: '25px' }}>ADD</Button>
      </Grid>
      </Grid>
    </form>
    </div>
  );
};

export default FlightForm;