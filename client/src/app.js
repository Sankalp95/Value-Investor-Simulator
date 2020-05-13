import React, { Component } from "react";
import {hot} from "react-hot-loader";

import HomePage from './Components/Home/HomePage.js';
import "./app.css";

class App extends Component{
  render(){
    return(
      <HomePage />
    );
  }
}

export default hot(module)(App);