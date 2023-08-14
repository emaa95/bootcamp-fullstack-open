import React, {useState, useEffect} from 'react'
import Content from './Components/Content'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'

import personService from './services/persons'

function App() {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' } 
  
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter , setFilter] = useState('')
  const [ message, setMessage ] = useState(null)
  

  useEffect (() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  }, []) 


  const addPerson = (event) =>{
    event.preventDefault()
  
    const person = persons.filter(person => person.name === newName)
    
    const personToAdd = person[0]
    const updatedPerson = {...personToAdd, number: newNumber}
    
    if (person.length !== 0 ) {
      if (window.confirm(`${(personToAdd.name)} 
      is already added to the phonebook, replace the old number with a new one?`)){
        personService.update(updatedPerson.id, updatedPerson).then(
          returnedPerson =>  {
          console.log(`${returnedPerson.name} successfully updated`)
          setPersons(persons.map(personItem => personItem.id !== personToAdd.id ? personItem : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `${updatedPerson.name} was successfully updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        }
        )
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(person => person.id !== updatedPerson.id))
          setNewName('')
          setNewNumber('')
          setMessage(
            `[ERROR] ${updatedPerson.name} was already deleted from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)

        })
      }
    } 

  else {
    const personToAdd = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personToAdd)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(
        `${newName} was successfully added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }  
    )
    .catch(error => {
      setMessage(
        `[ERROR] ${error.response.data.error}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(error.response.data)

    })
   }
  }

  const deletePerson = id => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id

    if (window.confirm(`Delete ${personName} ?`)){
      personService.eliminate(personId)
      console.log(`${personName} successfully deleted`)
      setMessage(`${personName} was successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }; // Handle filter input changes

  // Filter persons based on the filter value
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={message} />
    <div>
      <Filter value={filter} onChange={handleFilterChange}></Filter>
    </div>
    <PersonForm 
    newName={newName} 
    newNumber={newNumber} 
    onSubmit={addPerson} 
    handleNameChange={handleNameChange} 
    handleNumberChange={handleNumberChange}>
      
    </PersonForm>
    <h2>Numbers</h2>
    <Content persons = {filteredPersons} deletePerson={deletePerson}></Content>
  </div>
  );
}

export default App;
