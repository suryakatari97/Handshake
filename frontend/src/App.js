import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
    
      <Router>
        <div>
          <Main/>
        </div>
      </Router>


    )
  }
}

export default App;