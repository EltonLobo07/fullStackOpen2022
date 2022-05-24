import { useState, useEffect } from 'react'
import axios from 'axios'

import DisplayCountries from './components/DisplayCountries'

const App = () => {
  //States
  const [ inText, setInText ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filtered, setFiltered ] = useState([])

  //Event handlers
  const inTextChanged = event => { 
    setInText(event.target.value)
    setFiltered(countries.filter(country => event.target.value && country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  //Effect hook
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
  }, [])

  //JSX
  return (
    <div>
      find countries <input value = { inText } onChange = { inTextChanged } />
      
      <DisplayCountries filtered = { filtered } setFiltered = { setFiltered } />
    </div>
  )
}

export default App