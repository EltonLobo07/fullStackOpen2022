import { useState, useEffect } from 'react'
import axios from 'axios'

import HalfCountryInfo from './HalfCountryInfo'

const Country = ({ country }) => {
  const [ weatherInfo, setWeatherInfo ] = useState({})
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  useEffect(() => {
    axios
    .get(url)
    .then((response) => setWeatherInfo(response.data))
  }, [url])

  if ("main" in weatherInfo)
    return (
      <div>
        <HalfCountryInfo country = { country } />

        <h3>Weather in { country.capital[0] }</h3>
        <p>temperature: { weatherInfo.main.temp } Celcius</p>

        <img src = { "http://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + ".png" } alt = "weather icon" width = "100px" height = "100px" />
        <div>Wind { weatherInfo.wind.speed } m/s</div> 
      </div>
    )

  return <HalfCountryInfo country = { country } />
}

export default Country