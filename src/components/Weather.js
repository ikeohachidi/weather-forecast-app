import React, {Component} from 'react'

import GetForecast from '../api/GetForecast'
import WeatherForm from './WeatherForm'

export default class Weather extends Component {
  constructor() {
    super()
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { days: {} }
  }

  handleSearch(location) {
    console.log(location)
    GetForecast(location)
      .then(res => {
        console.log(res.list)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <WeatherForm onSearch={this.handleSearch}/>
        {this.state.newLocation}
      </div>
    )
  }
}




// for (let i in this.state.days) {
//   while(count <= weatherInfo.length) {
//     if (day === weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]) {

//       dayMaxTemp.push(weatherInfo[count].main.temp_max)
//       dayMinTemp.push(weatherInfo[count].main.temp_min)
//       dayWeather.push(weatherInfo[count].weather[0].description)
//       dayIcon.push(weatherInfo[count].weather[0].icon)

//       this.state.days[i].date = day
//       this.state.days[i].weatherDescription = dayWeather[1]
//       this.state.days[i].maxTemp = Math.max(...dayMaxTemp)
//       this.state.days[i].minTemp = Math.max(...dayMinTemp)
//       this.state.days[i].weatherIcon = dayIcon[1]

//       console.log(this.state)

//     } else {
//       dayMaxTemp = []
//       dayMinTemp = []
//       dayWeather = []
//       dayIcon = []
//       day = weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0];
//       break;
//     }
//     count++
//   } // end of while for loop
// } // end of i for loop