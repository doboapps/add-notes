import React, { Component } from 'react';
import './App.css';
import { Header, Main } from "./components/";
import table from "./images/table.png"

class App extends Component {
  render() {
    return (
      <div className="App">
      
      <Header/>
      <img className="table" src={table} alt="table"/>
      <Main/>

      </div>
    );
  }
}

export default App;
