import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const Overview = ({ handleLogin, handleSignup }) => {
  return(
    <div>
      {/* Background image of Bay Street, Toronto. */}
      <div className = 'overviewContainer'>        
        <img className = 'bayStreetPic' src = 'assets/bayStreet.jpg'/>
        <Typography className = 'title' variant="h3">
            The Ben Graham Value Investing Tool
        </Typography>
        <div className = 'buttonContainer'>
          <Button variant="contained" color="secondary" className = 'buttonMainScreen' onClick = {handleLogin}>
            Login
          </Button>
          <Button variant="contained" color="primary" className = 'buttonMainScreen' onClick = {handleSignup}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;