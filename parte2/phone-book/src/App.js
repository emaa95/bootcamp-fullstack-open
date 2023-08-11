import React, {useState, useEffect} from 'react'
import Content from './Components/Content'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import axios from 'axios'

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
  

  useEffect (() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      console.log(response.data)
    })

  }) 

  

  const addPerson = (event) =>{
    event.preventDefault()
    
    const nameExists = persons.some(person => person.name === newName);

  if (nameExists) {
    alert(`${newName} already exists in the phonebook.`)
  }
  else{
    const personObject = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', personObject)
    .then(response =>{
      setPersons(persons.concat(personObject))
      setNewName('')
    })
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
    <Content persons = {filteredPersons}></Content>
  </div>
  );
}

export default App;
