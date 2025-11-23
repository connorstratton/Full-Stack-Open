import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/countries'
import CountryService from './services/country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const shownCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    CountryService.getAll().then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    setSelected(null)
  }

  const handleSelect = (country) => {
     if (selected?.cca3 === country.cca3) {
      setSelected(null)
    }
    else{
      setSelected(country)
    }
    
  }


  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <Countries shownCountries={shownCountries} onShow={handleSelect} selectedCountry={selected}/>
    </div>
  )
}

export default App