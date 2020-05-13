import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

import './homePage.css';

class HomePage extends Component{
  handleChange(event) {
    console.log(event.target.value);
  }
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
            inputProps={{style: {fontSize: 25}}} // font size of input text
            variant="outlined"
            autoFocus = "true"
            size = 'large'
          />
        </div>
      </div>
    );
  }
};
  
  export default HomePage;