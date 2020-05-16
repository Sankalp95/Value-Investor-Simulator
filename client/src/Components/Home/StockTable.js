import React, { Component } from "react";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { PieChart } from 'react-chartkick';

const createPieChartData = stockData => {
  if (!stockData) return;
  return stockData.map(stock => [stock.ticker, stock.totalCost]);
};

const calculateTotalCost = stocks => {
  if (!stocks) return
  return stocks.map(stock => {
    stock.totalCost = Number(stock.quantityPurchased * stock.priceAtPurchase.$numberDecimal).toFixed(2);
    return stock
  });
}

const StockTable = ({ stocks }) => {
  stocks = calculateTotalCost(stocks);
  return(
    <div className = 'stockTableContainer'>
      <Grid style={{display:'flex'}} >
        <TableContainer>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Purchase Price </TableCell>
            <TableCell align="right">Quantity Purchased</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
          {stocks && stocks.map(stock => {
              return(
                <TableRow key = {stock.ticker}>
                  <TableCell align="right">{stock.ticker}</TableCell>
                  <TableCell align="right">${Number(stock.priceAtPurchase.$numberDecimal).toFixed(2)}</TableCell>
                  <TableCell align="right">{stock.quantityPurchased}</TableCell>
                  <TableCell align="right">${stock.totalCost} </TableCell>
                </TableRow>
              );
            })}
        </TableContainer>
        <PieChart data= {createPieChartData(stocks)} />
      </Grid>
    </div>
  );
}

export default StockTable;