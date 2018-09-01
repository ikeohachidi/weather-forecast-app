const axios = require('axios')

// API_KEY should be gotten from openweathermap user dashboard when signed in
const API_KEY = 'c7f42dff99a576f1eab8a55f0f7f1411';
const weatherMapURL = `http://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&units=metric`

function GetForecast(location) {
  let encodedLocation = encodeURIComponent(location)
  
  // searchString is the complete URL which is going to be searched
  let searchString = `${weatherMapURL}&q=${encodedLocation}`

  return axios.get(searchString)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })
}

module.exports = GetForecast