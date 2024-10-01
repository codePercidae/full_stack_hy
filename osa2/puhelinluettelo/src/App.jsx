import { useState, useEffect } from 'react'
import axios from 'axios' 

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

const ShowNames = ({namesToShow}) => {
  return namesToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (checkNames({newName, persons})){
      const nameObject = [{name: newName, number: newNumber}]
      setPersons(persons.concat(nameObject))
    }

    else {
      alert(`${newName} is already added to phonebook`)
    }
    
    setNewName('')
    setNewNumber('')
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes((newFilter).toLowerCase()))

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
      <ShowNames namesToShow={namesToShow}/>
    </div>
  )
}

export default App