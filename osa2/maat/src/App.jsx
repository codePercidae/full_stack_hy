import { useEffect, useState } from 'react'
import countryServices from './services/countries'
import weatherServices from './services/weather'

const CountryForm = ({filter, handleFilterChange}) => {
  return (
  <form>
    <div>
      find country <input value={filter} onChange={handleFilterChange}></input>
    </div>
  </form>
  )
}

const Weather = ({weather, country}) => {
  if (weather) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>Weather in {country.capital}</h1>
        <p>
          Temperature {(weather.main.temp - 273.15).toFixed(2)} celsius<br />
        </p>
        <img src={iconUrl} alt="Weather icon" />
        <p>
          Wind {weather.wind.speed} m/s
        </p>
      </div>
    )
  }
  return null
}

const RenderCountry = ({country}) => {
  if (country) {
    const languages = (Object.values(country.languages)).map(l => <li key={l}>{l}</li>)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital}<br/>
          area {country.area}
          <br/>
        </p>
        <b>languages:</b>
        <br/>
        <br/>
        {languages}
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    )
  }
  return null
}

const ShowButton = ({country, handleClick}) => {
  return <button onClick={() => handleClick(country)}>show</button>
}

const RenderCountries = ({countries, handleClick, filter}) => {
  if (!countries || countries.length === 1) {
    return null
  }
  const countriesToShow = countries.filter(c => c.name.official.toLowerCase().includes(filter))
  if (countriesToShow.length > 10){
    return <p>Too many matches, specify another filter please.</p>
  }
  return countriesToShow.map(c => <p key={c.name.official}>{c.name.common} <ShowButton country={c} handleClick={handleClick}/></p>)
}


// Doesn't have "perfect" functionality, but it gets the job done, and does not crash.
const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null) 
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)})
        console.log('null the country')
        setCountry(null)
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setWeather(null)
    setCountry(null)
  }

  function handleClick (country) {
    console.log(country.name.common)
    countryServices
      .getOne(country.name.common).then(c => setCountry(c))
    weatherServices
      .getForecast(country.latlng[0], country.latlng[1]).then(weatherdata => setWeather(weatherdata))
    setCountries(null)
  }

  return (
    <div>
      <CountryForm filter={filter} handleFilterChange={handleFilterChange}/>
      <RenderCountries countries={countries} handleClick={handleClick} filter={filter}/>
      <RenderCountry country={country}/>
      <Weather weather={weather} country={country}/>
    </div>
  )
}

export default App