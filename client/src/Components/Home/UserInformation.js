import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import EquityInformation from './EquityInformation.js';
import Typography from '@material-ui/core/Typography';
import StockTable from './StockTable.js';
import axios from 'axios';
import './UserInformation.css';

class UserInformation extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      accessToken: this.props.userInfo.user.token,
      userStocks: null,
      selectedEquity: null,
      balance: null,
    };
    this.handleStockSelection = this.handleStockSelection.bind(this);
    this.fetchStockPrices = this.fetchStockPrices.bind(this);
    this.fetchUserInformation = this.fetchUserInformation.bind(this);  
    this.stockPurchase = this.stockPurchase.bind(this);  
  }

  componentDidMount() {
    this.fetchUserInformation();
  }
  /**
   * Handler when the user clicks on a new stock from the dropdown.
   */
  handleStockSelection(equity) {
    if (!equity) return;
    this.fetchStockPrices(equity, equity['1. symbol']);
  };

  /**
   * Make the async call to get the stock prices.
   */
  fetchStockPrices(equity, ticker) {
    axios.get('http://localhost:8080/api/stocks/timeSeriesDaily/', {
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

  /**
   * Get the user information.
   */
  fetchUserInformation() {
    axios.get('http://localhost:8080/api/users/profile/', {
      params: {
        secret_token: this.state.accessToken
      }
    }).then(res => {
      if (res.data.success) {
        this.setState({
          userStocks: res.data.user.stocks,
          balance: res.data.user.balance.$numberDecimal,
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  /**
   * Saving new stock.
   */
  stockPurchase(quantityPurchased) {
    // Has a stock been chosen?
    if (!this.state.selectedEquity) return;
    if (!quantityPurchased || quantityPurchased <= 0) return;

    // Create the request body.
    const timeSeries = this.state.selectedEquity.timeSeries;
    const timeSeriesSortedKeys = Object.keys(timeSeries).sort().reverse();
    const priceAtPurchase = timeSeries[timeSeriesSortedKeys[0]]['4. close'];

    // Calculate the new balance. Check that it's not negative.
    let newBalance = this.state.balance - (quantityPurchased * priceAtPurchase);
    if (newBalance < 0) return;

    // Request body.
    const requestBody = {
      ticker: this.state.selectedEquity.highLevelInfo['1. symbol'],
      quantityPurchased,
      priceAtPurchase,
      balance: newBalance
    };

    // Create the request query parameters - for the access token.
    const queryParams = {
      params: {
        secret_token: this.state.accessToken
      }
    };

    // Make the POST request.
    // axios.post(url[, data[, config]])
    axios.post('http://localhost:8080/api/users/stock/', requestBody, queryParams)
    .then(response => {
      if (response.data.success) {
        this.fetchUserInformation();
      }
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return(
      <div className = 'userInfoContainer'>
        <Typography gutterBottom variant="h5" className = 'userInfoWelcomeText' fontWeight = '600'> 
          Remaining Balance: ${Number(this.state.balance).toFixed(2)}
        </Typography>
        <StockTable stocks = {this.state.userStocks} />
        <Typography gutterBottom variant="h5" className = 'userInfoWelcomeText' fontWeight = '600'> 
          Buy / Sell Stocks
        </Typography>
        <SearchBar handleStockSelection = {this.handleStockSelection} stockPurchase = {this.stockPurchase}/>
        <EquityInformation selectedEquity = {this.state.selectedEquity} />
      </div>
    );
  };
};

export default UserInformation;