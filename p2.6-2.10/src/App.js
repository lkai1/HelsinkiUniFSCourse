import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 - 1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    let nameExists = false;
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    persons.forEach((e) => {
      if (e.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        nameExists = true;
      }
    })
    if (nameExists === false) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const printPersons = () => {
    return (persons.map((e) => {
      if(personFilter === '') {
      return <p>{e.name} {e.number}</p>
      } else {
        let same = false;
        for(let i = 0; i < e.name.length; i++) {
          if (e.name[i] === personFilter[i]) {
            same=true;
          } else {
            same=false;
          }
        }
        if(same=true) {
          return <p>{e.name} {e.number}</p>
        } else {
          return <p></p>
        }
      }
    })
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const [personFilter, setPersonFilter] = useState('')

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        filter shown with<input
        value={personFilter}
        onChange={handleFilterChange}
      />
      <form onSubmit={addPerson}>
        <div>
          <h2>add a new</h2>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {printPersons()}
    </div>
  )

}

export default App