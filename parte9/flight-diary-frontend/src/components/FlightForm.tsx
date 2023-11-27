import React, { useState } from 'react';
import { createFlight } from '../services/flightService';
import { Weather, Visibility, Flight } from '../types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
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

  const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error('Error de respuesta del servidor:', error.response.data);

    // Acceder al mensaje específico del backend (si está disponible)
    const backendErrorMessage = (error.response.data as { message?: string })?.message;

    // Mostrar notificación de error con el mensaje específico del backend
    toast.error(backendErrorMessage ?? 'Error al crear el vuelo');

    // Puedes ajustar la duración y otras opciones según tus necesidades
  } else if (error.request) {
    // La solicitud fue hecha, pero no se recibió respuesta
    console.error('No se recibió respuesta del servidor');

    // Mostrar notificación de error
    toast.error('Error al crear el vuelo');

    // Puedes ajustar la duración y otras opciones según tus necesidades
  } else {
    // Algo sucedió al configurar la solicitud que desencadenó un error
    console.error('Error al configurar la solicitud:', error.message);

    // Mostrar notificación de error
    toast.error('Error al crear el vuelo');

    // Puedes ajustar la duración y otras opciones según tus necesidades
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
    <div>
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
    </div>
  );
};

export default FlightForm;