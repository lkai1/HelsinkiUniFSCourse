import React, { useState, useEffect } from 'react'

const FilterCountries = ({ countries }) => {
    const countriesCopy = [...countries];
    const [overTen, setOverTen] = useState(true)
    const [filteredCountries, setFilteredCountries] = useState([])
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        if (event.target.value === '') {
            setFilteredCountries([])
            setOverTen(true)
        }
    }

    const showOneCountry = (country) => {
        const languages = []
        country.languages.forEach((e, i) => {
            languages.push(<li key={i}>{e.name}</li>)
        })
        setFilteredCountries(<div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {languages}
            </ul>
            <img src={country.flag} width={'140px'} height={'100px'}></img>
        </div>)
        setOverTen(false)
    }

    useEffect(() => {
        const list = []
        if (countriesCopy.length !== 0) {
            for (let i = 0; i < countriesCopy.length; i++) {
                if (countriesCopy[i].name.startsWith(filter)) {
                    list.push(countriesCopy[i])
                }
            }
            if (list.length < 11 && list.length > 1) {
                for (let i = 0; list.length > i; i++) {
                    const listObjCopy = {...list[i]}
                    const btn = <button onClick={() => showOneCountry(listObjCopy)}>show</button>
                    list.splice(i, 1, <div key={i}><span>{list[i].name}</span> {btn}</div>)
                }
                setFilteredCountries(list)
                setOverTen(false)
            } else if (list.length === 1) {
                showOneCountry(list[0])
            } else {
                setOverTen(true)
            }
        }
    }, [filter])
    return (
        <div>
            find countries <input
                value={filter}
                onChange={handleFilterChange}
            />
            <br />
            {overTen ? 'Too many matches, specify another filter' : filteredCountries}
        </div>
    )
}

export default FilterCountries