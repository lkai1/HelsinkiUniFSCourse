import React from 'react'
import personService from '../services/persons'

const PrintPersons = ({persons, setPersons, personFilter}) => {

    const buttonFunction = (person) => {
        if(window.confirm(`Delete ${person.name}?`)) {
        personService.deleteObj(person.id);
        const personsCopy = [...persons].filter((item) => item.id !== person.id);
        setPersons(personsCopy);
        }
    }

    return (persons.map((e) => {
        if (personFilter === '') {
            return <p key={e.id}>{e.name} {e.number} <button onClick={() => buttonFunction(e)}>delete {e.id}</button></p>
        } else if (e.name.toUpperCase().startsWith(personFilter.toUpperCase())) {
            return <p key={e.id}>{e.name} {e.number} <button onClick={() => buttonFunction(e)}>delete {e.id}</button></p>
        }
    })
    )
}
export default PrintPersons