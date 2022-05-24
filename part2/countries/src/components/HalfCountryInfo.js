const HalfCountryInfo = ({ country }) => {
  const languages = []

  for (const key in country.languages)
    languages.push(country.languages[key])

  return (
    <div>
      <h2>{ country.name.common }</h2>

      <p>Capital: { country.capital[0] }</p>
      <p>Area: { country.area }</p>

      <h4>Languages:</h4>
      <ul>
        { languages.map(language => <li key = { language }>{ language }</li>) }
      </ul>

      <img src = { country.flags.png } alt = "Country flag" border = "1px solid black" width = "150px" height = "100px" />
    </div>
  )
}

export default HalfCountryInfo