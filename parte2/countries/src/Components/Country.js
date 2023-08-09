import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Country({country}) {
  const [ weather , setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios.get('http://api.weatherstack.com/current', {params}).then(response =>{
    const apiResponse = response.data;
    console.log(apiResponse)
    setWeather([apiResponse])
  })
  
  })


  if (weather.length > 0 ) {
    return(
      <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>languages</h2>
      <ul>
      {Object.keys(country.languages).map(language => (
                <li key={language}>{country.languages[language]} </li>
              ))}
      </ul>
      <p> {country.flag}</p>
      
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.temperature}° Celcius</p>
      {weather.weather_icons && (
            <img src={weather.weather_icons[0]} alt="Weather Icon" />
          )}
      <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
      
      
      </div>
    )
  }
  else{
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        <ul>
        {Object.keys(country.languages).map(language => (
                <li key={language}>{country.languages[language]} </li>
              ))}
        </ul>
        <p>{country.flag}</p>
    </div>
  )
}
}
export default Country
