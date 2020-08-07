import React from 'react'

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
                window.alert(`${person.name} is already added to phonebook`)
                nameExists = true;
            }
        })
        if (nameExists === false) {
            props.setPersons(props.persons.concat(person));
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