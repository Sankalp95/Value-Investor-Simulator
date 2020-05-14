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
    };
    this.handleStockSelection = this.handleStockSelection.bind(this);
    this.fetchStockPrices = this.fetchStockPrices.bind(this);
    this.fetchUserInformation = this.fetchUserInformation.bind(this);    
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
          userStocks: res.data.user.stocks
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return(
      <div className = 'userInfoContainer'>
          <Typography gutterBottom variant="h5" className = 'userInfoWelcomeText' fontWeight = '600'> 
            Your Portfolio.
          </Typography>
          <StockTable stocks = {this.state.userStocks} />
          <SearchBar handleStockSelection = {this.handleStockSelection} />
          <EquityInformation selectedEquity = {this.state.selectedEquity} />
      </div>
    );
  };
};

export default UserInformation;