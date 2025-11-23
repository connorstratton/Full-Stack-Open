import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const shownPeople = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.some(person => person.name === newName))
    {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setType('noti')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
    else{
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const p = persons.find(p => p.name === newName)
        const changedPerson = { ...p, number: newNumber}
        personService.update(p.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id === p.id ? returnedPerson : person))
        })
      }
    }
    
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const removePerson = (person) => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.remove(person.id).then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        }).catch(error => {
          setType('error')
          setMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
            setType(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type}/>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={(handleNewName)} newNumber={newNumber} handleNewNumber={handleNewNumber}/>

      <h2>Numbers</h2>
      <Persons shownPeople={shownPeople} removePerson={(removePerson)}/>

    </div>
  )
}

export default App