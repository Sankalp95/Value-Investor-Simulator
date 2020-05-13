import React, { Component } from "react";
import EquityData from './EquityData.js';
import StockChart from './StockChart.js';

const EquityInformation = ({selectedEquity}) => {
  if (!selectedEquity) return(<React.Fragment></React.Fragment>);

  const highLevelInfo = selectedEquity.highLevelInfo;
  const metaData = selectedEquity.metaData;
  const timeSeries = selectedEquity.timeSeries;
  const timeSeriesSortedKeys = Object.keys(timeSeries).sort().reverse();
  return(
    <div className = 'equityInformation_Width'>
      <EquityData 
        highLevelInfo = {highLevelInfo} 
        metaData = {metaData} 
        timeSeries = {timeSeries} 
        timeSeriesSortedKeys = {timeSeriesSortedKeys}
      />
      <StockChart 
        timeSeries = {timeSeries} 
        timeSeriesSortedKeys = {timeSeriesSortedKeys}
      />
    </div>
  );
};

export default EquityInformation;