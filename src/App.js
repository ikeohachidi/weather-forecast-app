import React, { Component } from 'react';

// import Components
import Weather from './components/Weather'
import Monday from './components/Monday'
import Tuesday from './components/Tuesday'


import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Weather/>
        <Monday/>
        <Tuesday/>
      </div>
    )
  }
}

export default App;
