import React from 'react'
import Person from './Person'

function Content({persons, deletePerson}) {
  return (
    <div>
        {
            persons.map(person => 
                <Person key={person.name} person={person} deletePerson={deletePerson}></Person>                   
            )
        }    
    </div>
  )
}

export default Content