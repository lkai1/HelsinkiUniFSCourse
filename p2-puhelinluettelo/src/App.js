import React, { useState, useEffect } from 'react'
import PrintPersons from './components/PersonsForm'
import AddPersonForm from './components/AddPersonForm.js'
import FilterForm from './components/FilterForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={personFilter} setFilter={setPersonFilter}/>
      <AddPersonForm name={newName} number={newNumber} persons={persons} setPersons={setPersons} setNumber={setNewNumber} setName={setNewName} />
      <h2>Numbers</h2>
      <PrintPersons persons={persons} setPersons={setPersons} personFilter={personFilter} />
    </div>
  )
}

export default App