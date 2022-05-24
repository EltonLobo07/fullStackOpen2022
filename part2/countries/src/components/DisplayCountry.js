const DisplayCountry = ({ country, setFiltered }) => {
  return (
    <div>
      { country.name.common }
      <button onClick = { () => setFiltered([country]) }>show</button>
    </div>
  )
}

export default DisplayCountry