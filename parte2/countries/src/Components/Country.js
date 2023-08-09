import React from 'react'

function Country({country}) {
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

export default Country
