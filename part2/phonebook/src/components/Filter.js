const Filter = ({ searchState, searchEventHandler, arr }) => {
  const filtered = arr.filter(person => searchState && person.name.toLowerCase().includes(searchState.toLowerCase()))

  return (
    <div>
      filter shown with <input value = { searchState } onChange = { searchEventHandler } />

      { filtered.map(person => <p key = { person.id }>{ person.name } { person.number }</p>) }
    </div>
  )
}

export default Filter