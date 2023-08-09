import React, {useState, useEffect} from 'react';
import axios from 'axios' ;
import './App.css';
import Filter from './Components/Filter'
import Content from './Components/Content';


function App() {
  
  const [ countries, setCountries ] = useState([ ])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
     setFilter(event.target.value)
  } 
  
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  ); 

  return (
    <div className="App">
          <Filter value={filter} onChange={handleFilterChange}></Filter>
          <Content countries={filteredCountries} setCountries={setCountries}></Content>
    </div>
  );
}

export default App;
