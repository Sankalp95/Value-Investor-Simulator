import React, { Component } from "react";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const StockTable = ({stocks}) => {
  console.log(stocks);
  return(
    <div className = 'stockTableContainer'>
      <TableContainer>
        <TableRow>
          {/* First row. */}
          <TableCell>Ticker</TableCell>
          <TableCell align="right">Price At Purchase</TableCell>
          <TableCell align="right">Quantity Purchased</TableCell>
        </TableRow>
        {
          stocks && stocks.map(stock => {
            return(
              <TableRow key = {stock.ticker}>
                <TableCell align="right">{stock.ticker}</TableCell>
                <TableCell align="right">${stock.priceAtPurchase.$numberDecimal}</TableCell>
                <TableCell align="right">{stock.quantityPurchased}</TableCell>
              </TableRow>
            )
          })
        }
      </TableContainer>
    </div>
  );
}

export default StockTable;