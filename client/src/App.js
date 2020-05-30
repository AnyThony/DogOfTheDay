import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Media from './components/Media'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <div id="app">
      <NavBar/>
      <div id="feed-container">
        <div class="row">
          <div class="col s4"><Media/></div>
          <div class="col s4"><Media/></div>
          <div class="col s4"><Media/></div>
        </div>
        
      </div>
      </div>
    );
  }
}

export default App;
