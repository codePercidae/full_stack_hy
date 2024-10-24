import { useState, useEffect } from 'react'
import personService from './services/persons'


const checkNames = ({newName, persons}) => {
  let boolArray = persons.map((person) => person.name !== newName)
  return boolArray.reduce((p, c) => p === c)
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <form>
    <div>
      filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  </form>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const ShowNames = ({namesToShow, handleDelete}) => {
  return namesToShow.map(person => <p key={person.id}>{person.name} {person.number} <DelBtn id={person.id} handler={handleDelete}/></p>)
}

const DelBtn = ({id, handler}) => {
  return (
    <button onClick={() => handler(id)}>delete</button>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes((newFilter).toLowerCase()))


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName, number: newNumber}

    if (checkNames({newName, persons})){
      personService
        .create(nameObject)
        .then(initialPerson => {
          setPersons(persons.concat(initialPerson))
      })
    }

    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const idToUpdate = (persons.find(p => p.name === newName)).id
        personService
          .update(idToUpdate, nameObject)
          .then(initialPerson => {
            const updatedPersons = persons.map(p => p.id === idToUpdate ? initialPerson : p)
            setPersons(updatedPersons)
          })
      }
    }
    
    setNewName('')
    setNewNumber('')
  }

  function handleDelete(id) {
    if (window.confirm(`Delete ${(persons.find(p => p.id === id).name)}?`)) { 
      personService
        .del(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ShowNames namesToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App