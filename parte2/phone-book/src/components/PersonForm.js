import React from 'react'

function PersonForm( {onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) {
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameChange}></input>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}></input>
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm