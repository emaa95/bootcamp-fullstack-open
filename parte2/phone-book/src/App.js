import React, {useState} from 'react'
import Content from './components/Content'

function App() {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  

  const addPerson = (event) =>{
    event.preventDefault()
    
    const nameExists = persons.some(person => person.name === newName);

  if (nameExists) {
    alert(`${newName} already exists in the phonebook.`)
  }
  else{
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  return (
    <div>
    <h2>Phonebook</h2>
    <form onSubmit={addPerson}>
      <div>
        name: <input value = {newName} onChange={handleNameChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <Content persons = {persons}></Content>
  </div>
  );
}

export default App;
