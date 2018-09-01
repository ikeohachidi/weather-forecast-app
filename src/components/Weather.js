import React from 'react'

import GetForecast from '../api/GetForecast'

const Weather = () => {
  
  let location

  let days = {
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: []
  }
  
  let soon = []

  const onFormSubmit = (e) => {
    e.preventDefault();
    GetForecast(location.value)
      .then((res) => {
        let count = 0;
        let weatherInfo = res.list
        let day

        for (let i in days) {
          for (let j in weatherInfo) {
            if (weatherInfo[count].dt_txt != day) {
              day = weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]
              console.log("=====", day)
              count++
            } else {
              console.log("xxxxx", day)
              break;
            }
          }
        }

      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="text" ref={el => location = el}/>
        <button>Get Weather</button>
      </form>
    </div>
  )
}

export default Weather;