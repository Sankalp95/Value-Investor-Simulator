import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import './SearchBar.css';

export default class SearchBar extends Component{
  /**
   * Constructor.
   */
  constructor() {
    super();
    this.state = {
      searchValue: "",
      typingTimeout: null,
      equities: [],
      showingSearch: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchSearch = this.fetchSearch.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
    this.handleStockSelection = this.handleStockSelection.bind(this);
    this.handlequantityToBuy = this.handlequantityToBuy.bind(this);
    this.stockPurchase = this.stockPurchase.bind(this);
  };

  /**
   * Event handler when the user searches for a value.
   */
  handleChange(event) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout)
    }
    
    // If the user has inputted text or not.
    if (!event.target.value) {
      this.setState({
        searchValue: "",
        equities: [],
        showingSearch: false,
        quantityToBuy: 0
      });
    } else {
      this.setState({
        searchValue: event.target.value,
        typingTimeout: setTimeout(() => this.fetchSearch(), 500)
      });
    };
  };

  /**
   * Make the async call to get the dropdown values.
   */
  fetchSearch() {
    axios.get('http://localhost:8080/api/stocks/', {
      params: {
        ticker:this.state.searchValue
      }
    }).then(response => {
      if (response && response.data && response.data.bestMatches && response.data.bestMatches.length > 0) {
        let instruments = response.data.bestMatches;
        let equities = instruments.filter(instrument => instrument['3. type'] === 'Equity');
        this.setState({
          equities,
          showingSearch: true,
        });
      }
    }).catch(err => {
      console.log('ERR' + err);
    });
  };

  /**
   * Handles onClick.
   */
  handleStockSelection(equity) {
    this.setState({
      showingSearch: false,
    });
    this.props.handleStockSelection(equity);
  }

  /**
   * Update the state's quantityToBuy property. Controlled component.
   */
  handlequantityToBuy(event) {
    this.setState({
      quantityToBuy: event.target.value,
    });
  }

  /**
   * Renders the list items for the equities searched.
   */
  renderListItems() {
    if (this.state.equities && this.state.equities.length > 0) {
      return this.state.equities.map(equity => {
        return (
          <ListItem 
            onClick = {() => this.handleStockSelection(equity)} 
            className = 'homePage_listItem'
            key = {`${equity['1. symbol']}`} 
            style={{display:'flex', justifyContent:'space-around'}}
          >
            <ListItemText 
              primary={`${equity['1. symbol']}`}              
            />
            <ListItemText
              style={{display:'flex', justifyContent:'center'}}
              primary={`${equity['2. name']}`} />
            <ListItemText 
              style={{display:'flex', justifyContent:'flex-end'}} 
              primary={`${equity['4. region']}`}/>
          </ListItem>
        );
      });
    };
  };

  /**
   * Handler for buying a stock.
   */
  stockPurchase(quantity) {
    this.setState({
      quantityToBuy: ""
    });
    this.props.stockPurchase(quantity);
  };

  /**
   * Main rendering method.
   */
  render() {
    const cssForGridResults = (this.state.showingSearch) ? 'searchResultsGrid' : 'hidden';
    return(
      <div className="homePage_searchButtonContainer">        
        <div>
          <TextField
            id="standard-full-width"
            placeholder="Search for a ticker..."
            fullWidth
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{style: {fontSize: 25}}}
            variant="outlined"
          />
        </div>
        <Grid style={{display:'flex'}}>
          <Button 
            variant="contained" 
            color="primary" 
            className = 'buyStockButton'
            onClick = {() => this.stockPurchase(this.state.quantityToBuy)}
          >
            Buy Stock
          </Button>
          <TextField 
            id="standard-basic" 
            label="Quantity to Buy" 
            className = 'quantityStockBuy' 
            onChange = {this.handlequantityToBuy} 
          />
        </Grid>
        <Grid className = {cssForGridResults}>
          <div>
            <List className = 'searchResults'>                
              {this.renderListItems()}
            </List>
          </div>
        </Grid>        
      </div>
    );
  };
};