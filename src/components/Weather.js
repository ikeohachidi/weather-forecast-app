import React from 'react'

import GetForecast from '../api/GetForecast'

const Weather = () => {
  
  let location

  let days = {
    day1: {},
    day2: {},
    day3: {},
    day4: {},
    day5: {}
  }
  
  let soon = []

  const onFormSubmit = (e) => {
    e.preventDefault();
    GetForecast(location.value)
      .then((res) => {
        let weatherInfo = res.list
        // let day
        
        // let newTemp = []
        // for (let i in days) {
        //   for (let j in weatherInfo) {
        //     if (weatherInfo[count].dt_txt != day) {
        //       day = weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]
        //       console.log('----', day)
        //       newTemp.push(weatherInfo[j].main.temp_max)
        //       count++
        //     } else {
        //       console.log("xxxxx", day)
        //       break;
        //     }
        //   } // end of second j for loop
        // } // end of first i for loop

        let day = weatherInfo[0].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]
        let count = 0;
        let newTemp = []

        for (let i in days) {
          while(count <= weatherInfo.length) {
            if (day == weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0]) {
              newTemp.push(weatherInfo[count].main.temp_max)
              days[i].maxTemp = Math.max(...newTemp)
            } else {
              newTemp = []
              day = weatherInfo[count].dt_txt.match(/\d{4}-\d{2}-\d{2}/)[0];
              break;
            }
            count++
          } // end of while for loop
        } // end of i for loop

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