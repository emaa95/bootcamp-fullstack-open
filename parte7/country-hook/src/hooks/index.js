import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(false);

  useEffect(() => {
    
    if (name.trim() === '') {
      setCountry(null);
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        if (response.data.length > 0) {
          setCountry({ found: true, data: response.data[0] });
        } else {
          setCountry({ found: false , data: null});
        }
      
      })
      .catch((error) => {
        console.error(error);
        setCountry({ found: false, data: null });
      });
  }, [name]);
  return country;
};