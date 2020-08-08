import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FilterWeather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState('')

    useEffect(() => {
        const params = {
            access_key: api_key,
            query: country
        }
        axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
                const apiResponse = response.data
                console.log(apiResponse)
                setWeather(<span>
                    <p>temperature: {apiResponse.current.temperature} Celcius</p>
                    <img src={apiResponse.current.weather_icons}></img>
                <p>wind: {apiResponse.current.wind_speed} mph direction {apiResponse.current.wind_dir}</p>
                </span>)
            })
    }, [])

    return (
        <div>
            {weather}
        </div>
    )
}
export default FilterWeather