import { useState,useEffect } from 'react'
import React from 'react'

import personService from './services/persons' 

import Filter from './components/Filter'
import NameNumberForm from './components/NameNumberForm'
import DisplayArrOfTableCells from './components/DisplayArrOfTableCells'
import Notification from './components/Notification'

const App = () => {

  //State variables and functions to modify states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [msg, setMsg] = useState(null)
  const [color, setColor] = useState('')
  const timeoutTime = 3000

  //Event handlers (For one liners, used arrow functions)
  const nameTyped = event => setNewName(event.target.value) 

  const numberTyped = event => setNewNumber(event.target.value)

  const queryTyped = event => setNewSearch(event.target.value)

  function addPerson(event)
  {
    event.preventDefault()

    const lowercaseNewName = newName.toLowerCase()

    if (persons.map(person => person.name.toLowerCase()).includes(lowercaseNewName))
    {
      if (window.confirm(`${ newName } is already added to phonebook, replace the old number with a new one?`))
      {
        const person = persons.filter(person => person.name.toLowerCase() === lowercaseNewName)[0]
        const newObj = {name : person.name, number : newNumber}

        personService.update(person.id, newObj).then(updated => {
            setPersons(persons.map(p => person.id !== p.id ? p : updated))
            setNewName('')
            setNewNumber('')

            setMsg(`Name: ${newObj.name}, number updated to ${newObj.number}`)
            setColor('green')

            setTimeout(() => setMsg(null), timeoutTime)
        }).catch(() => {
            setPersons(persons.filter(p => person.id !== p.id))
            
            setMsg(`Information of ${persons.filter(p => person.id === p.id)[0].name} has already been removed from the server`)
            setColor('red')

            setTimeout(() => setMsg(null), timeoutTime)
          })
      }  
    }
    else
    {
      const newObj = { name : newName, number : newNumber }

      personService.create(newObj).then(personObj => {
          setPersons(persons.concat(personObj))
          setNewName('')
          setNewNumber('')

          setMsg(`Added ${personObj.name}`)
          setColor('green')

          setTimeout(() => setMsg(null), timeoutTime)
      })
    }
  }

  //Helpers (Extras)
  const deletePerson = (personID) => {
    personService.deleteEntry(personID)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personID))

      setMsg(`Deleted ${persons.filter(person => person.id === personID)[0].name}`)
      setColor('green')

      setTimeout(() => setMsg(null), timeoutTime)
    } )
    .catch(() => {
      setPersons(persons.filter(person => person.id !== personID))
      
      setMsg(`Information of ${persons.filter(person => person.id === personID)[0].name} has already been removed from the server`)
      setColor('red')

      setTimeout(() => setMsg(null), timeoutTime)
    })
  }

  //Not a component but a helper function for map method
  const displayPeople = (person) => {
      return (
        <tr key = { person.id }>
          <td>{ person.name }</td> 
          <td>{ person.number }</td>
          <td><button onClick = { () => {
              if (window.confirm(`Delete ${ person.name } ?`))
                  deletePerson(person.id)
          } }>delete</button></td>
        </tr>
      ) 
  }

  //Effect hook
  useEffect(() => { personService.getAll().then(personsArr => setPersons(personsArr)) }, [])

  //JSX

  //Not sure if tables are good to use to structure my application
  //Tables make this application look neat, so used them anyways
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg = { msg } color = { color } />

      <Filter arr = { persons } searchState = { newSearch } searchEventHandler = { queryTyped } />

      <h3>Add a new</h3>

      <NameNumberForm onSubmit = { addPerson } 
        nameState = { newName } nameEventHandler = { nameTyped }
        numberState = { newNumber } numberEventHandler = { numberTyped }
      />

      <h3>Numbers</h3>

      <DisplayArrOfTableCells arr = { persons.map(displayPeople) } />
    </div>
  )
}

export default App