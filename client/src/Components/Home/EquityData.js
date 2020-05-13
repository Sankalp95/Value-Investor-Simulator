import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const get30DayAverage = (timeSeries, timeSeriesSortedKeys) => {    
  let averagePrice = 0;
  let minDays = Math.min(30, timeSeriesSortedKeys.length)
  for (let i = 0; i <= minDays; i++) {
    averagePrice += Number(timeSeries[timeSeriesSortedKeys[i]]['4. close']);
  };
  return (averagePrice/minDays).toFixed(2);
};

const EquityData = ({highLevelInfo, timeSeriesSortedKeys, timeSeries, metaData}) => {
  return(
    <Grid direction = "row">
    {/* Name of Company. */}
    <Typography gutterBottom variant="h4"> {highLevelInfo['2. name']} </Typography>
    {/* Latest Price. */}
    <div>
      <Grid direction = "row" style={{display:'flex'}} justify = "space-between">
        {/* Ticker. */}
        <Grid direction = 'column' style={{display:'flex'}} >
          <Typography gutterBottom variant="subtitle1"> 
            <strong>Ticker</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1"> 
            {highLevelInfo['1. symbol']} 
          </Typography>
        </Grid>
        {/* Latest Price. */}
        <Grid direction = 'column' style={{display:'flex'}} >
          <Typography gutterBottom variant="subtitle1"> 
            <strong>Latest Closing Price ({highLevelInfo['8. currency']}) </strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1"> 
            $ { Number(timeSeries[timeSeriesSortedKeys[0]]['4. close']) }
          </Typography>
        </Grid>
        {/* Region. */}
        <Grid direction = 'column' style={{display:'flex'}} >
          <Typography gutterBottom variant="subtitle1"> 
            <strong>Region</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1"> 
            {highLevelInfo['4. region']} 
          </Typography>
        </Grid>
        {/* Type. */}
        <Grid direction = 'column' style={{display:'flex'}} >
          <Typography gutterBottom variant="subtitle1"> 
            <strong>Type</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1"> 
            {highLevelInfo['3. type']} 
          </Typography>
        </Grid>
        {/* Last 30 day average. */}
        <Grid direction = 'column' style={{display:'flex'}} >
          <Typography gutterBottom variant="subtitle1"> 
            <strong>Trailing 30 Day Average</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1"> 
            $ { get30DayAverage(timeSeries, timeSeriesSortedKeys) }
          </Typography>
        </Grid>
      </Grid>
    </div>
  </Grid>
  );
};

export default EquityData;