const Persons = ({shownPeople, removePerson}) => {
  return(
    <ul>
        {shownPeople.map(person => 
          <Person key={person.name} person={person} removePerson={removePerson}/>
        )}
    </ul>
  )
}

const Person = ({ person, removePerson }) => {
  return(
    <li>{person.name}   {person.number}  <button onClick={() => removePerson(person)}>delete</button>
</li>
  )
}

export default Persons