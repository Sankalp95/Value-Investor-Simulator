import React, { Component } from "react";
import { LineChart } from 'react-chartkick';
import 'chart.js'

const extractClosingPrice = (timeSeriesSortedKeys, timeSeries) => {
  let result = {}
  for (let i = 0; i < timeSeriesSortedKeys.length; i++) {
    let date = timeSeriesSortedKeys[i];
    let price = timeSeries[date]['4. close'];
    result[date] = price;
  }
  return result;
};

const StockChart = ({timeSeriesSortedKeys, timeSeries}) => {
  const lineGraphData = extractClosingPrice(timeSeriesSortedKeys, timeSeries);
  return(
    <div>
      <LineChart 
        data={lineGraphData} 
        xtitle="Dates" 
        ytitle="Price in USD"
        prefix="$"
        thousands=","
        download={true} 
        dataset={{borderWidth: 1}}
      />
    </div>
  );
};

export default StockChart;