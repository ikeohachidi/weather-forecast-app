import React from 'react'

import './WeatherStyle.css'

const WeatherForm = ({ onSearch }) => {

  let location

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSearch(location.value)
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type='text' ref={el => location = el} className='searchInput'/><br/>
        <button>Get Weather</button>
      </form>
    </div>
  )
}

export default WeatherForm