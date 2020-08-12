import React, { useEffect } from 'react'
import personService from '../services/persons'

const AddPersonForm = (props) => {

    const handleNameChange = (event) => {
        props.setName(event.target.value)
    }
    const handleNumberChange = (event) => {
        props.setNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        let nameExists = false;
        const person = {
            name: props.name,
            number: props.number
        }
        props.setName('')
        props.setNumber('')
        props.persons.forEach((e) => {
            if (e.name === person.name) {
                if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
    
                    personService
                    .update(e.id, person)
                    .then(response => {
                        props.setPersons(props.persons.map(p => p.id === e.id ? response.data : p))
                        props.setMadeChange(`${person.name} number changed`)
                    }).catch(() => {
                        props.setMadeChange(`Information of ${person.name} has already been removed from server`)
                    })
                }
                nameExists = true;
            }
        })
        if (nameExists === false) {
            personService
                .create(person)
                .then(response => {
                    props.setPersons(props.persons.concat(response.data));
                    props.setMadeChange(`Added ${response.data.name}`)
                })
        }
    }

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    <h2>add a new</h2>
                    name: <input
                        value={props.name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number: <input
                        value={props.number}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    )
}
export default AddPersonForm