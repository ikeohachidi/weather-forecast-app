import React, {Component} from 'react'

import GetForecast from '../api/GetForecast'
import WeatherForm from './WeatherForm'

export default class Weather extends Component {
  constructor() {
    super()
    this.handleSearch = this.handleSearch.bind(this)
    this.renderWeather = this.renderWeather.bind(this)
    this.state = { days: {
      day1: {},
      day2: {},
      day3: {},
      day4: {},
      day5: {},
      day6: {}
    },
    loaded: false}
  }

  handleSearch(location) {
    this.setState({ loaded: false })
    GetForecast(location)
      .then(res => {

        let count = 0;
        let weatherInfo = res.list

        let day = weatherInfo[0].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]

        let  dayMaxTemp = []
        let  dayMinTemp = []
        let  dayWeather = []
        let  dayIcon = []

        if (res) {
          this.setState({loaded: true})
        }
        
        for ( let i in this.state.days ) {
          while( count <= weatherInfo.length ) {
            if ( day === weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0] ) {

              dayMaxTemp.push(weatherInfo[count].main.temp_max)
              dayMinTemp.push(weatherInfo[count].main.temp_min)
              dayWeather.push(weatherInfo[count].weather[0].description)
              dayIcon.push(weatherInfo[count].weather[0].icon)

              let days = { ...this.state.days }

              days[i].date = day
              days[i].weatherDescription = dayWeather[0]
              days[i].maxTemp = Math.max(...dayMaxTemp)
              days[i].minTemp = Math.min(...dayMinTemp)
              days[i].weatherIcon = dayIcon[0]

              this.setState({ days })

            } else {
                dayMaxTemp = []
                dayMinTemp = []
                dayWeather = []
                dayIcon = []
                day = weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0];
                console.log(this.state.days)
                break;
              }
              console.log(this.state.days)
            count++
          } // end of while loop
        } // end of i for loop
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderWeather() {
    if (this.state.loaded) {
      let dayVal = []
      Object.keys(this.state.days).forEach((day) => {
        dayVal.push(this.state.days[day])
      })
      return (
        <div>
          {dayVal.map((day) => {
            if (day.date !== undefined) {
              return (
                <ul>
                  <li><b>{day.date}</b></li>
                  <li>{day.maxTemp}</li>
                  <li>{day.minTemp}</li>
                  <li><img src={`http://openweathermap.org/img/w/${day.weatherIcon}.png`} alt="weather icon"/></li>
                </ul>
              )
            }
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <WeatherForm onSearch={this.handleSearch}/>
        <div>
          { this.renderWeather() }
        </div>
      </div>
    )
  }
}