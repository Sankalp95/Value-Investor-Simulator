import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import EquityInformation from './EquityInformation.js';
import Overview from './Overview.js';
import axios from 'axios';

export default class HomePage extends Component{
  constructor() {
      super();
      this.state = {
        selectedEquity: null,
      };

      // Fixing the context.
      this.handleStockSelection = this.handleStockSelection.bind(this);
      this.fetchStockPrices = this.fetchStockPrices.bind(this);
  };

  handleStockSelection(equity) {
    if (!equity) return;
    this.fetchStockPrices(equity, equity['1. symbol']);
  };

  fetchStockPrices(equity, ticker) {
    axios.get('http://localhost:8080/api/stocks/stockPrice/', {
      params: {
        ticker,
      }
    }).then(response => {
      // If the API complains that we've reached the limit.      
      if (response.data.Note) return;

      this.setState({
        selectedEquity: {
          highLevelInfo: equity,
          metaData: response.data['Meta Data'],
          timeSeries: response.data['Time Series (Daily)'],
        },
      });
    }).catch(err => {
      console.log('ERR' + err);
    });
  };
  
  render() {
    return(
      <div>
        {/* Overview on what this page is + sign up buttons. */}
        <Overview />

        {/* Search bar and stock selection. */}
        <SearchBar handleStockSelection = {this.handleStockSelection} />

        {/* Information for a particular stock. */}
        <EquityInformation selectedEquity = {this.state.selectedEquity} />
      </div>
    )
  };
};