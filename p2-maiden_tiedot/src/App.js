import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterCountries from './components/FilterCountries'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  return (
    <div>
      <FilterCountries countries={countries} />
    </div>
  )
}

export default App;
