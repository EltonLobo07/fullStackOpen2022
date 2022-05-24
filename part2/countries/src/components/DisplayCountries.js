import Country from './Country'
import DisplayCountry from './DisplayCountry'

const DisplayCountries = ({ filtered, setFiltered }) => 
{
  if (filtered.length === 0)
    return

  if (filtered.length > 10)
    return <div>Too many matches, specify other filter</div>

  if (filtered.length > 1)
    return filtered.map(country => <DisplayCountry key = { country.name.common } country = { country } setFiltered = { setFiltered } />)
  
  return <Country country = { filtered[0] } />
}

export default DisplayCountries