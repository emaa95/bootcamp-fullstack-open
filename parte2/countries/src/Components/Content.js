import React from 'react'
import Country from './Country'

function Content({countries, setCountries}) {
  if (countries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  else if ((countries.length > 2 && countries.length < 10) || countries.length === 0){
    
    return(
      <div>
      <ul>
        {countries.map((country, i) => 
  
          <li key={i}> {country.name.common}  <button onClick={() => setCountries([country]) }>show</button></li>
           
        )}
      </ul>
    </div>
    )
  }
  
  
  else {
    return(
    <Country country={countries[0]}/>
    )
  }
}

export default Content