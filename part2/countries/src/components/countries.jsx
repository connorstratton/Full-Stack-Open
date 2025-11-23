import { useState, useEffect } from 'react'
import country from '../services/country'
import WeatherService from '../services/weather'


const Countries = ({shownCountries, selectedCountry, onShow}) => {

    if (shownCountries.length > 10){
        return <p>Too many matches, specify another filter</p>
    }
    else if (shownCountries.length > 1)
    {
        if (selectedCountry !== null)
        {
            
            return (
                <div>
                    {selectedCountry && <CountryInfo country={selectedCountry} />}
                </div>
            )
        }
        return(
            <ul>
                {shownCountries.map(country => 
                    <Country key={country.cca3} country={country} onShow={onShow}/>
                )}

                
            </ul>
        )
    }
    else if (shownCountries.length == 1)
    {
        return <CountryInfo country={shownCountries[0]}/>
    }
  
}

const Country = ({ country, onShow }) => {
  return(
    <li>{country.name.common} <button onClick={() => onShow(country)}>Show</button></li>
  )
}

const CountryInfo = ({country}) => {
    const [selected, setSelected] = useState(null)

    useEffect (() => {
        WeatherService.getAll(country.capital[0], country.tld).then(weatherCountry => {
        setSelected(weatherCountry)})
    }, [country])

    if (!selected) return <p>Loading weather...</p>;
    
    const imgLink = `https://openweathermap.org/img/wn/${selected.weather[0].icon}@2x.png`

    return(
        <div>
            <h1>{country.name.common}</h1>
            <br></br>

            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <br></br>

            <h2>Languages</h2>
            <ul>
                { country.languages ? Object.values(country.languages).map(lang => 
                <li key={lang}>{lang}</li>
            ) : <li>No languages listed</li>}
            </ul>

            <img src={country.flags.png}></img>

            <h1>Weather in {country.capital}</h1>

            <p>Temperature {selected.main.temp} Celcius</p>
            <img src={imgLink}></img>
            <p>Wind {selected.wind.speed} m/s</p>

        </div>
    )
}

export default Countries