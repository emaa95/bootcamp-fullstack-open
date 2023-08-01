import React from 'react'
import Person from './Person'

function Content({persons}) {
  return (
    <div>
        {
            persons.map(person => 
                <Person key={person.name} person={person}></Person>                   
            )
        }    
    </div>
  )
}

export default Content