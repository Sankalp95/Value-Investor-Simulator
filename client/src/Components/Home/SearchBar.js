import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
      equities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchSearch = this.fetchSearch.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
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
        equities: []
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
    axios.get('http://localhost:8080/api/stocks/stock/', {
      params: {
        ticker:this.state.searchValue
      }
    }).then(response => {
      if (response && response.data && response.data.bestMatches && response.data.bestMatches.length > 0) {
        let instruments = response.data.bestMatches;
        let equities = instruments.filter(instrument => instrument['3. type'] === 'Equity');
        this.setState({
          equities,
        });
      }
    }).catch(err => {
      console.log('ERR' + err);
    });
  };

  /**
   * Renders the list items for the equities searched.
   */
  renderListItems() {
    if (this.state.equities && this.state.equities.length > 0) {
      return this.state.equities.map(equity => {
        return (
          <ListItem 
            onClick = {() => this.props.handleStockSelection(equity)} 
            className = 'homePage_listItem'
            key = {`${equity['1. symbol']}`} 
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
    }
  };

  /**
   * Main rendering method.
   */
  render() {
    return(
      <div className="homePage_searchButtonContainer">
        <div>
          <TextField
            id="standard-full-width"
            placeholder="Search for a ticker..."
            fullWidth
            margin="normal"
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{style: {fontSize: 25}}}
            variant="outlined"
          />
        </div>
        <Grid>
          <div>
            <List>                
              {this.renderListItems()}
            </List>
          </div>
        </Grid>        
      </div>
    );
  }
};