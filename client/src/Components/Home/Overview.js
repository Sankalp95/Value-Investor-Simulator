import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const Overview = () => {
  return(
    <div>
      {/* Background image of Bay Street, Toronto. */}
      <div className = 'overviewContainer'>        
        <img className = 'bayStreetPic' src = 'assets/bayStreet.jpg'/>
        <Typography className = 'title' variant="h3">
            The Ben Graham Value Investing Tool
        </Typography>
        <div className = 'buttonContainer'>
          <Button variant="contained" color="primary" className = 'buttonMainScreen'>
            Login
          </Button>
          <Button variant="contained" color="primary" className = 'buttonMainScreen'>
            Sign Up
          </Button>
        </div>
      </div>
      <div className = 'overviewTextContainer'>
        {/* <div className = 'mainTitleText'>
          What is this tool?
        </div> */}
        {/* <Typography className = 'overviewText' paragraph={true} align="left" variant="subtitle1"> 
          This tool acts as a stock simulator: users can create accounts and are virtual given money ($100,000) which is then used to buy stocks. All stock prices are as up-to-date as of the day before. For a given target company, users (soon) will be able to get an approximate valuation range based on the web app's built-in Discounted Cash Flow and Comparable Company analyses. For each valuation model, the user can change some of the high-level critical variables and measure their impact on the valuation range. This way, a lot of nuances and minute details of financial modelling are abstracted away.
        </Typography>
        <Typography className = 'overviewText' paragraph={true} align="left" variant="subtitle1"> 
          Take a look below, to see the latest information for a particular stock.
        </Typography> */}
      </div>
    </div>
  );
};

export default Overview;