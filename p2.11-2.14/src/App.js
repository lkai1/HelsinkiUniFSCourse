import React, { useState } from 'react'
import PrintPersons from './components/PersonsForm'
import AddPersonForm from './components/AddPersonForm.js'
import FilterForm from './components/FilterForm'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 - 1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={personFilter} setFilter={setPersonFilter}/>
      <AddPersonForm name={newName} number={newNumber} persons={persons} setPersons={setPersons} setNumber={setNewNumber} setName={setNewName} />
      <h2>Numbers</h2>
      <PrintPersons persons={persons} personFilter={personFilter} />
    </div>
  )
}

export default App
