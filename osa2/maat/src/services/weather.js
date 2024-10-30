import axios from "axios"
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = import.meta.env.VITE_API_KEY

const getForecast = (lat, long) => {
    console.log(lat)
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${long}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default {
    getForecast: getForecast,
}