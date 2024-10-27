import { useEffect, useState } from 'react'
import countryServices from './services/countries'

const CountryForm = ({filter, handleFilterChange}) => {
  return (
  <form>
    <div>
      find country <input value={filter} onChange={handleFilterChange}></input>
    </div>
  </form>
  )
}

const RenderCountry = ({country}) => {
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

const RenderCountries = ({countries}) => {
  if (countries.length > 10){
    return <p>Too many matches, specify another filter please.</p>
  }
  if (countries.length === 1) {
    return <RenderCountry country={countries[0]}/>
  }
  return countries.map(c => <p key={c.name.official}>{c.name.common}</p>)
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])


  const countriesToShow = countries.filter(c => c.name.official.toLowerCase().includes(filter))

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {setCountries(initialCountries)})
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <CountryForm filter={filter} handleFilterChange={handleFilterChange}/>
      <RenderCountries countries={countriesToShow}/>
    </div>
  )
}

export default App