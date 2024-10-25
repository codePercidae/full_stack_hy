import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


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
const Alert = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='alert'>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newAlert, setAlert] = useState(null)
  const [newError, setError] = useState(null)

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
          setAlert(`${newName} added succesfully to phonebook!`)
          setTimeout(() => {
            setAlert(null)
          }, 5000)
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
            setAlert(`Number changed succesfully!`)
            setTimeout(() => {
              setAlert(null)
            }, 5000)})
          .catch(error => {
            console.log('Something went terribly wrong...')
            setError(`Number update failed! ${newName} is already deleted from the phonebook.`)
            setPersons(persons.filter(p => p.id !== idToUpdate))
          })
      } 
    }
    
    setNewName('')
    setNewNumber('')
  }

  function handleDelete(id) {
    const nameToDelete = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${nameToDelete}?`)) { 
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setAlert(`${nameToDelete} deleted succesfully!`)
        }) 
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
      <Alert message={newAlert}/>
      <Error message={newError}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ShowNames namesToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App