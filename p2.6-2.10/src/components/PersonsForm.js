import React, {useCallback} from 'react'

const PrintPersons = ({persons, personFilter}) => {
    return (persons.map((e) => {
        if (personFilter === '') {
            return <p>{e.name} {e.number}</p>
        } else if (e.name.toUpperCase().startsWith(personFilter.toUpperCase())) {
            return <p>{e.name} {e.number}</p>
        }
    })
    )
}
export default PrintPersons