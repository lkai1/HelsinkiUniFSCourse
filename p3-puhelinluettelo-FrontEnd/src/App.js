import React, { useState, useEffect } from 'react'
import PrintPersons from './components/PersonsForm'
import AddPersonForm from './components/AddPersonForm.js'
import FilterForm from './components/FilterForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [madeChange, setMadeChange] = useState('')
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
      <Notification madeChange={madeChange} setMadeChange={setMadeChange}/>
      <FilterForm filter={personFilter} setFilter={setPersonFilter}/>
      <AddPersonForm madeChange={madeChange} setMadeChange={setMadeChange} name={newName} number={newNumber} persons={persons} setPersons={setPersons} setNumber={setNewNumber} setName={setNewName} />
      <h2>Numbers</h2>
      <PrintPersons setMadeChange={setMadeChange} persons={persons} setPersons={setPersons} personFilter={personFilter} />
    </div>
  )
}

export default App